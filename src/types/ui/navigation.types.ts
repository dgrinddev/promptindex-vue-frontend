import type { Component } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

/**
 * =================================================================
 * NAVIGATION PLACEMENT
 * =================================================================
 * PLACEMENT-ID FORMAT: `<LAYOUTFILE>:<AREA>:<number>[-<camelCaseDescription>][.<number>[-<camelCaseDescription>]]*`
 * The square brackets (`[]`) indicates if a portion is optional
 * The trailing `*` indicates that the optional subsection pattern `.<number>[-<camelCaseDescription>]` may repeat infinitely
 * Example (deep nesting): `AppLayout:navigationSidebar:3-userMenu.1-adminItems.2-dangerZone.1`
 *
 * # STRUCTURE RULES FOR PLACEMENT-ID FORMAT
 * 1. `<LAYOUTFILE>`: The Vue layout component name (e.g. `GuestLayout`, `AppLayout`). Describes where the navigation is rendered — NOT where it routes to.
 * 2. `<AREA>`: Structural UI region within the layout (e.g. `mainNav`, `footer`, `navigationSidebar`, `topbar`) - must be camelCase.
 * 3. SECTION (`<number>[-<camelCaseDescription>]`) / SUBSECTION (`[.<number>[-<camelCaseDescription>]]*`):
 * 3.1 Every structural level follows the pattern `<number>[-<camelCaseDescription>]`.
 * 3.2 `<number>` is required and represents structural order/physical location.
 * 3.3 The optional `-<camelCaseDescription>` can be used when easier identification of a placement is needed. It should describe functional purpose rather than physical location (e.g. `-userMenu` is better than `-topMenu`). Avoiding visual-direction terms (e.g. `top`, `left`, `right`) is especially important when layout structure differs between devices. It must be camelCase.
 * 3.4 There must be at least 1 section. Additional structural levels (subsections) are appended using dot-notation.
 * 3.5 If a structural level has child levels, it must NOT exist alone (e.g. `2` is invalid if `2.1` also exists).
 *
 * # CONST & PROPERTIES NAMING IN LAYOUTS AND COMPONENTS (PLACEMENT-ID CONVERTED INTO JS-SAFE)
 * 1. `<LAYOUTFILE>` is omitted when defining placement-derived consts (e.g. `const navigationSidebar_2_1legal = getNavItemsFromRoutes(...)`) inside the layout file it refers to (e.g. no need to write `const AppLayout_navigationSidebar_2_1legal` if already inside `AppLayout.vue`).
 * 2. `<LAYOUTFILE>` is also omitted when naming props in child components, as the layout is irrelevant there.
 * 3. `:` and `.` are replaced with `_`.
 * 4. `-` is removed.
 * Example: `AppLayout:navigationSidebar:2.1-legal` → `navigationSidebar_2_1legal` | `AppLayout:topbar:1-userMenu.3.2` → `topbar_1userMenu_3_2`
 */
export type Placement =
  // =================================
  // GuestLayout
  // =================================
  // Header (desktop header menu + mobile menu)
  | 'GuestLayout:header:1-logo'
  | 'GuestLayout:header:2-mainNav.1-publicPages'
  | 'GuestLayout:header:2-mainNav.2-accountPages.1-user'
  | 'GuestLayout:header:2-mainNav.2-accountPages.2-guest'
  // Footer
  | 'GuestLayout:footer:1-credits'
  | 'GuestLayout:footer:2.1-legal'
  | 'GuestLayout:footer:2.2-social'
  // =================================
  // AppLayout
  // =================================
  // navigationSidebar
  | 'AppLayout:navigationSidebar:1-primaryNav'
  | 'AppLayout:navigationSidebar:2-items'
  | 'AppLayout:navigationSidebar:3'
  // Topbar (user-menu and other stuff)
  | 'AppLayout:topbar:1-userMenu.1'
  // =================================
  // AuthLayout
  // =================================
  // otherAuthRouteNav (context-based switch between auth routes)
  | 'AuthLayout:otherAuthRouteNav:1-onLogin'
  | 'AuthLayout:otherAuthRouteNav:2-onRegister'
  // leaveAuthNav (navigation that exits the auth pages)
  | 'AuthLayout:leaveAuthNav:1'

// =================================================================
// NAVIGATION ITEM (UI MODEL)
// =================================================================
export interface NavItem {
  id: string
  label: string
  to: RouteLocationRaw
  icon?: Component
}