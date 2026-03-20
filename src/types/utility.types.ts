/**
 * UTILITY TYPES:
 * Shared low-level TypeScript helpers.
 */

// Ensures that SubsetUnion is strictly a subset of ParentUnion.
export type StrictSubset<ParentUnion, SubsetUnion extends ParentUnion> = SubsetUnion