import { useToast } from 'vue-toast-notification'

const baseToast = useToast({
  position: 'top-right',
})

/**
 * Escape text so it renders as plain characters when vue-toast-notification
 * assigns it with v-html (no tags or entities from input are interpreted as markup).
 */
function escapeHtmlForToast(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeMessageInProps(props: Record<string, unknown>): Record<string, unknown> {
  const next = { ...props }
  if (typeof next.message === 'string') {
    next.message = escapeHtmlForToast(next.message)
  }
  return next
}

type ToastOpenArg = Parameters<typeof baseToast.open>[0]

function openWithEscapedMessage(
  message: string,
  type: string,
  options: Record<string, unknown> = {},
) {
  const props = escapeMessageInProps(Object.assign({}, { message, type }, options))
  return baseToast.open(props as unknown as ToastOpenArg)
}

/**
 * App-level toast API: all messages are HTML-escaped before reaching the plugin,
 * so notifications show plain text only.
 */
export const toast = {
  open(options: string | Record<string, unknown>) {
    if (typeof options === 'string') {
      return baseToast.open(escapeHtmlForToast(options) as unknown as ToastOpenArg)
    }
    return baseToast.open(escapeMessageInProps(options) as unknown as ToastOpenArg)
  },

  clear() {
    baseToast.clear()
  },

  success(message: string, options: Record<string, unknown> = {}) {
    return openWithEscapedMessage(message, 'success', options)
  },

  error(message: string, options: Record<string, unknown> = {}) {
    return openWithEscapedMessage(message, 'error', options)
  },

  info(message: string, options: Record<string, unknown> = {}) {
    return openWithEscapedMessage(message, 'info', options)
  },

  warning(message: string, options: Record<string, unknown> = {}) {
    return openWithEscapedMessage(message, 'warning', options)
  },

  default(message: string, options: Record<string, unknown> = {}) {
    return openWithEscapedMessage(message, 'default', options)
  },
}
