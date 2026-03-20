/**
 * APPLICATION TYPES:
 * 
 * High-level UI abstractions for the application.
 * The types declared here represent global UI dimensions
 * that sit above features and domains and define the
 * structural surface in which the application operates.
 */


// =================================================================
// APPLICATION SURFACE
// =================================================================
// Represents a top-level UI surface. Each value corresponds to one of the application's layouts.
export type ApplicationSurface =
  | 'guest'
  | 'guest-docs'
  | 'auth'
  | 'app'
  | 'errors'
//| 'admin'