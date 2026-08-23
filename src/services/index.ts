/**
 * Service layer — mock implementations.
 *
 * Every function here is async and returns synthetic data so the UI can be
 * wired to a real Node.js/Express + PostgreSQL + Python ML backend later by
 * swapping the bodies for fetch() calls. No component imports mock data
 * directly for list/detail views.
 */
export * from "./authService";
export * from "./personnelService";
export * from "./wellnessService";
export * from "./riskService";
export * from "./alertService";
export * from "./interventionService";
