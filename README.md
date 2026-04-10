# PromptIndex — Vue Frontend

> Frontend for [PromptIndex](https://promptindex.io/), a community-driven platform to discover and share AI prompts for ChatGPT, Midjourney, Claude, and more.

This repository contains the Vue SPA. The backend (Laravel API) lives in a [separate repository](https://github.com/dgrinddev/promptindex-laravel-backend).

---

## Tech stack

- **Vue.js** (Composition API)
- **TypeScript**
- **Tailwind CSS**

Hosted on **Hostinger**.

---

## Architecture

The frontend is intentionally decoupled from the backend — each lives in its own repository and is deployed independently. Authentication is handled via **Laravel Sanctum** with cookie-based sessions and CSRF protection. All HTTP errors are handled centrally through an `axiosInstance` configured with interceptors.

### ApplicationSurface

Vue Router uses an `ApplicationSurface` context (`'guest' | 'auth' | 'app' | 'errors'`) to protect routes and control layout. A central route guard enforces auth-required pages, and a `useGetNavItemsFromRoutes` composable builds the navigation structure dynamically from route meta — nothing is hardcoded in layouts.

### Views & components

| File | Purpose |
|---|---|
| `PromptFormView.vue` | Shared create/edit form (avoids duplicated form code) |
| `PromptIndexView.vue` | Listing of prompts — adapts to guest/app context |
| `PromptShowView.vue` | Detailed view of a single prompt — adapts to guest/app context |

Reusable input components (`CheckboxInput.vue`, `ImageUploadGallery.vue`, `RadioInput.vue`, `SelectInput.vue`, `StringInput.vue`, `TextareaInput.vue`) all integrate with a central Pinia errors store (`errorsStore.ts`) for displaying validation errors from the API. Authentication state is managed in `authStore.ts`.

### Composables

All data fetching and mutations are isolated in composables, keeping views free of business logic. Some examples:

- `useGetAllPrompts.ts`
- `useGetPrompt.ts`
- `useSavePrompt.ts`
- `useDeleteResource.ts`

### TypeScript

TypeScript is used consistently throughout the project, including views, components, composables, stores, router meta, injection keys, environment configuration, etc. Everything received from the backend is typed via interfaces (`GetPrompt`, `LaravelPaginatedResponse<T>`, `ApiActionResponse`, etc.).

The `src/types/` directory is structured with a layered type hierarchy under `src/types/ui/`, containing primitive UI types, input types, and component props — modelled on what a larger project or UI component library would require. Generics are used in several places, including `RadioInput.vue` and `LaravelPaginatedResponse<T>`, and utility types like `StrictSubset` are used to constrain type unions.

### Image uploads

Image uploading uses **FilePond** via `ImageUploadInput.vue`. Images can be uploaded before a prompt is saved — this is handled by generating an `upload_image_token` (UUID) in the frontend, which is sent with each upload request. When the prompt is saved, the backend associates the uploaded images with the new prompt using this token.

After uploading, `ImageUploadGallery.vue` allows the user to select one image as the cover.

---

## Features

**All visitors** can browse the public prompt library and copy any prompt with a single click — no account needed.

**Registered users** can additionally:

- Create and publish prompts with a title, type (`text | image | other`), optional category, and content
- Upload images and select a cover image
- Edit and delete their own prompts
- View all their prompts in a private dashboard

---

## Related

- [Backend repository (Laravel API)](https://github.com/dgrinddev/promptindex-laravel-backend)
- [Live site](https://promptindex.io/)
