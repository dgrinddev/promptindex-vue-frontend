// =================================================================
// Validation
// =================================================================

export interface ValidationErrors {
  [field: string]: string[]
}

export interface LaravelValidationErrorResponse {
  message: string
  errors: ValidationErrors
}

// =================================================================
// HTTP / Generic Errors
// =================================================================

export interface HttpErrorResponse {
	message: string
}

export type ApiErrorResponse =
	| LaravelValidationErrorResponse
	| HttpErrorResponse