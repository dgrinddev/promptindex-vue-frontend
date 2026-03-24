<script setup lang="ts">
	import { ref, useTemplateRef, watch } from 'vue'
	import ImageUploadGallery from '@/components/inputs/ImageUploadGallery.vue'
	import { useDeleteResource } from '@/composables/useDeleteResource'
	import { toast } from '@/services/toast'
	import { API_BASE_URL, IS_DEV } from '@/config/env'

	import vueFilePond from 'vue-filepond'
	import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
	import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
	import 'filepond/dist/filepond.min.css'
	import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
	import { FileStatus } from 'filepond'

	import type { ClassProp } from '@/types/vue.types'
	import type { Image } from '@/types/prompts/image.types'
	import type { HttpErrorResponse } from '@/types/api/errors.types'
	import type { LaravelValidationErrorResponse } from '@/types/api/errors.types'
	import type { ApiActionResponseWithData } from '@/types/api/responses.types'
	import type { FilePond as FilePondInstance } from 'filepond'

	// vue-filepond doesn't expose a typed component instance compatible with useTemplateRef(),
	// so we recreate VueFilePondInstanceMethods manually.
	// The omitted keys match FilteredMethods in node_modules/vue-filepond/types/index.d.ts.
	// FilePondInstance refers to the FilePond interface in node_modules/filepond/types/index.d.ts.
	// Keep this list in sync if vue-filepond updates FilteredMethods.
	type VueFilePondInstanceMethods = Omit<
		FilePondInstance,
		| 'setOptions'
		| 'on'
		| 'off'
		| 'onOnce'
		| 'appendTo'
		| 'insertAfter'
		| 'insertBefore'
		| 'isAttachedTo'
		| 'replaceElement'
		| 'restoreElement'
		| 'destroy'
	>

	const props = withDefaults(
		defineProps<{
			id: string,
			name: string,
			label?: string
			nameGallery: string,
			enableRadio?: boolean
			showActionButton?: boolean
			galleryGroupLabel?: string
			galleryDescription?: string
			noImagesMessage?: string
			promptId: number | null
			uploadImageToken: string | null
			rootClass?: ClassProp
			labelClass?: ClassProp
		}>(),
		{
			showActionButton: true,
			noImagesMessage: 'No images uploaded yet!',
		}
	)

	const images = defineModel<Image[]>('images', { required: true })
	const coverImageId = defineModel<number | null>('coverImageId')
	const isProcessing = defineModel<boolean>('isProcessing', { default: false })

	if (IS_DEV && props.enableRadio && coverImageId.value === undefined) {
		throw new Error('ImageUploadInput: v-model:coverImageId is required when enableRadio is used.')
	}

	const {
		deleteResource_isLoading: deleteImage_isLoading,
		deleteResource: deleteImage,
	} = useDeleteResource('image')

	watch(deleteImage_isLoading, () => {
		syncProcessingState()
	})

	const serverMessage = ref<string | null>(null)
	const FilePond = vueFilePond( // Create FilePond component
		FilePondPluginFileValidateType,
		FilePondPluginFileValidateSize,
		FilePondPluginImagePreview
	)
	const pond = useTemplateRef<VueFilePondInstanceMethods>('pond')


	// ondata — modify formData before upload
	// Adds prompt_id and upload_image_token to the upload request when available.
	function handleFilePondData(formData: FormData): FormData {
		if (props.promptId !== null) {
			formData.append('prompt_id', String(props.promptId))
		}

		if (props.uploadImageToken !== null) {
			formData.append('upload_image_token', props.uploadImageToken)
		}

		return formData
	}


	// onload — handle successful upload
	// Parses API response and appends the uploaded image to local state
	function handleFilePondLoad(response: string): number {
		let parsed: ApiActionResponseWithData<Image>

		try {
			parsed = JSON.parse(response) as ApiActionResponseWithData<Image>
		} catch {
			console.error('FilePond onload - invalid JSON response:', response)
			throw new Error('FilePond onload - invalid JSON response.')
		}

		if (parsed.status !== 'success' || !parsed.data) {
			console.error('FilePond onload - invalid API response format:', parsed)
			throw new Error('FilePond onload - invalid API response format.')
		}

		images.value.push(parsed.data)

		// if the above was successful then FilePond requires a `serverId` (the image id on the server),
		// which is used among other things for revert handling.
		return parsed.data.id
	}


	// onerror — handle failed upload
	// Handles Laravel validation errors and generic API errors
	function handleFilePondError(response: string): void {
		let errorData: unknown

		try {
			errorData = JSON.parse(response)
		} catch {
			console.error('FilePond onerror - invalid JSON response:', response)
			serverMessage.value = 'Something went wrong. Please try again.'
			return
		}

		// Laravel validation error (HTTP 422)
		if (
			typeof errorData === 'object'
			&& errorData !== null
			&& 'errors' in errorData
		) {
			const validationError = errorData as LaravelValidationErrorResponse
			console.error('FilePond onerror - LaravelValidationErrorResponse:', validationError)
			serverMessage.value = validationError.message
			return
		}

		// All other API errors
		if (
			typeof errorData === 'object'
			&& errorData !== null
			&& 'message' in errorData
		) {
			const httpError = errorData as HttpErrorResponse
			console.error('FilePond onerror - HttpErrorResponse:', httpError)
			serverMessage.value = 'Something went wrong. Please try again.'
			return
		}

		console.error('Unexpected API response for FilePond:', errorData)
		serverMessage.value = 'Something went wrong. Please try again.'
	}


	// local state helper — remove image from component state
	// Keeps `images` and `coverImageId` consistent after deletion.
	function removeImageFromLocalState(imageId: number): void {
		images.value = images.value.filter(
			image => image.id !== imageId
		)

		if (coverImageId.value === imageId) {
			coverImageId.value = null
		}
	}


	// revert — handle deletion triggered from FilePond UI
	// Deletes the image via the API and keeps local state in sync
	async function handleFilePondRevert(
		uniqueFileId: string | number,
		load: () => void,
		error: (message: string) => void
	): Promise<void> {
		// FilePond requires that either `load` or `error` is always called.
		// This is how FilePond knows whether the revert operation succeeded or failed.

		if (typeof uniqueFileId !== 'number') { // We expect a number here, since `image.id` is returned from `onload`
			console.error('FilePond revert - invalid serverId returned in onload:', uniqueFileId)
			error('FilePond revert - invalid file reference')
			return
		}

		const success = await deleteImage(uniqueFileId)

		if (!success) {
			console.error('FilePond revert - deleting image failed:', uniqueFileId)
			toast.error('Failed to delete the image. Please reload the page.')
			error('FilePond revert - deleting image failed')
			return
		}

		removeImageFromLocalState(uniqueFileId)
		load()
	}


	// processfile - Called when FilePond finishes processing a file (both success and error cases).
	// In this case I have used it for debugging to access the FilePond error object and its error code,
	// which is not available in the `onerror` callback.
	// Also used for syncProcessingState()
	function handleProcessedFile(error: unknown, file: unknown): void {
		if (error) {
			console.warn('FilePond processfile error', { error, file })
		}
		syncProcessingState()
	}


	// Determines if images are currently being processed (upload or delete) and updates `isProcessing` accordingly.
	function syncProcessingState(): void {
		const files = pond.value?.getFiles() ?? []

		const isUploading = files.some(file =>
			file.status === FileStatus.INIT
			|| file.status === FileStatus.PROCESSING_QUEUED
			|| file.status === FileStatus.PROCESSING
			|| file.status === FileStatus.LOADING
		)

		isProcessing.value = isUploading || deleteImage_isLoading.value
	}


	// remove-image - Triggered when clicking the delete button on an image in ImageUploadGallery.
	async function handleRemoveImage(imageId: number): Promise<void> {
		const file = pond.value
			?.getFiles()
			.find(f => f.serverId != null && Number(f.serverId) === imageId)

		// If the image being deleted from ImageUploadGallery is still managed by FilePond,
		// then let FilePond handle the deletion via `handleFilePondRevert()`...
		if (file) {
			pond.value?.removeFile(file.id, { revert: true })
			return
		}

		// ...Otherwise, continue below to delete the image manually.

		const success = await deleteImage(imageId)

		if (!success) {
			console.error('handleRemoveImage - deleting image failed:', imageId)
			toast.error('Failed to delete the image. Please reload the page.')
			return
		}

		removeImageFromLocalState(imageId)
	}


	// helper — read XSRF token from cookies
	// Used by FilePond to authenticate upload requests against Laravel Sanctum.
	function getXsrfTokenFromCookie(): string | null {
		const cookieString = document.cookie.trim()
		const match = cookieString.match(/(?:^|;\s*)XSRF-TOKEN=([^;\s]+)/)

		if (!match || !match[1]) {
			return null
		}

		return decodeURIComponent(match[1])
	}
</script>

<template>
	<div :class="rootClass">
		<label
			v-if="label"
			:for="id"
			class="block text-sm/6 font-medium text-white"
			:class="labelClass"
		>
			{{ label }}
		</label>
		<div class="mt-2 grid grid-cols-1">
			<file-pond
				:name="name"
				:id="id"
				ref="pond"
				:disabled="deleteImage_isLoading"
				label-idle="Upload a image or drag and drop"
				allow-multiple="true"
				accepted-file-types="image/jpg, image/jpeg, image/png"
				:server="{
					url: '',
					process: {
						url: `${API_BASE_URL}/api/app/images`,
						method: 'POST',
						withCredentials: true,
						headers: () => ({
							'X-XSRF-TOKEN': getXsrfTokenFromCookie(),
							'Accept': 'application/json',
						}),
						ondata: handleFilePondData,
						onload: handleFilePondLoad,
						onerror: handleFilePondError,
					},
					revert: handleFilePondRevert,
				}"
				@addfile="syncProcessingState"
				@processfilestart="syncProcessingState"
				@processfile="handleProcessedFile"
				@processfileabort="syncProcessingState"
				@processfilerevert="syncProcessingState"
				:labelFileProcessingError="() => serverMessage ?? 'Upload failed'"
				max-file-size="1024KB"
			/>
		</div>
		<div>
			<ImageUploadGallery
				:name="nameGallery"
				:group-label="galleryGroupLabel"
				:description="galleryDescription"
				:images="images"
				v-model="coverImageId"
				:show-action-button="showActionButton"
				:enable-radio="enableRadio"
				:is-processing="isProcessing"
				@remove-image="handleRemoveImage($event)"
				root-class="mt-5"
				:no-images-message="noImagesMessage"
			/>
		</div>
	</div>
</template>