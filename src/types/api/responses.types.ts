// =================================================================
// Base Laravel Resource
// =================================================================

export interface LaravelResourceResponse<T> {
  data: T
}

// =================================================================
// Laravel Pagination (LengthAwarePaginator)
// =================================================================

// These types represent the default JSON structure returned when
// using Laravel's `->paginate()` method (not `->simplePaginate()`).
// They assume the standard, unmodified Laravel pagination response.

export interface LaravelPaginationLink {
  url: string | null        // The URL for this pagination link (null for previous/next when disabled)
  label: string             // The display label (e.g. '1', 'Next &raquo;')
  page: number | null       // The page number this link points to (null for previous/next when disabled)
  active: boolean           // Indicates if this link represents the current page (always false for previous/next)
}

export interface LaravelPaginationMeta {
  current_page: number      // The current active page number (will always be at least 1 or higher)
  from: number | null       // The index of the first item on the current page (null if there is no items on the current page)
  last_page: number         // The total number of available pages (will always be at least 1 or higher)

  // links: Array of pagination link objects for UI rendering.
  // Laravel guarantees:
  // - The first item always has label = '&laquo; Previous'. Its `url` and `page` will be null if there are no pages before the current page. Its `active` is always false.
  // - The last item always has label = 'Next &raquo;'. Its `url` and `page` will be null if there are no pages after the current page. Its `active` is always false.
  // - There is always at least one page-number link between the first and the last item. Even when `data` is empty, Laravel still generates page 1 (e.g. `{ url: '...?page=1', label: '1', page: 1, active: true }`).
  links: LaravelPaginationLink[]

  path: string              // The base URL path used for pagination (e.g. 'https://myapidomain.com/api/all-posts')
  per_page: number          // The configured page size defined in Laravel (e.g. `->posts()->paginate(10)`), not the actual number of items returned in this response
  to: number | null         // The index of the last item on the current page (null if there is no items on the current page)
  total: number             // Total number of items across all pages
}

export interface LaravelPaginationLinks {
  first: string             // URL to the first page (always present, even when there are no results; will point to page=1)
  last: string              // URL to the last page (always present, even when there are no results; will point to page=1)
  prev: string | null       // URL to the previous page. Null when on the first page (including when there is only one page).
  next: string | null       // URL to the next page. Null when on the last page (including when there is only one page).
}

export interface LaravelPaginatedResponse<T> {
  data: T[]                     // The paginated collection of resources
  links: LaravelPaginationLinks // Navigation URLs for pagination
  meta: LaravelPaginationMeta   // Metadata describing the pagination state
}

// =================================================================
// Auth Responses
// =================================================================

export interface AuthLoginResponse {
  two_factor: boolean
}

// =================================================================
// API Action Responses
// =================================================================

// Application-level statuses that the responses can contain.
// Currently only 'success' is used, but can be extended in the future if needed (e.g. 'success' | 'warning').
export type ApiActionStatus = 'success'

// API responses that represent the result of an action and tells the frontend if the action was successful (e.g. `prompts.store`, `prompts.update`).
export interface ApiActionResponse {
	status: ApiActionStatus
	message: string
}

// API responses that represent the result of an action that also returns data for the frontend (for example `images.store` that contains the path to the stored image etc.).
export interface ApiActionResponseWithData<TData>
	extends ApiActionResponse {
	data: TData
}