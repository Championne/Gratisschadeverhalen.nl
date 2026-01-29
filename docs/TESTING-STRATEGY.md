# Testing Strategy for Gratisschadeverhalen.nl

## Overview

This document outlines the recommended testing strategy for the `Gratisschadeverhalen.nl` project, specifically addressing challenges related to Next.js Server Actions and End-to-End (E2E) testing.

## Key Principles

1.  **Prioritize E2E with Playwright for User Flows:** For critical user flows like claim submission, Playwright E2E tests are the most appropriate method to verify the entire client-to-server interaction, including form filling, UI feedback, and the invocation of Next.js Server Actions.
2.  **Server Actions are RPC-like:** Next.js Server Actions are designed for RPC-like invocations within the Next.js framework (client components calling server-side functions). They cannot be directly invoked via standard HTTP POST requests from external scripts (e.g., Python `requests`).
3.  **API Routes vs. Server Actions:**
    *   **API Routes (`/api/*`):** These are traditional HTTP endpoints that can be tested externally using tools like `curl`, Postman, or Python's `requests` library. They are suitable for providing data to external services or for functionalities *not* directly tied to a specific form submission requiring server action invocation.
    *   **Server Actions:** These are functions marked `async` on the server and are invoked directly from client components. Testing them involves either unit/integration tests within the Next.js environment or E2E tests simulating client interaction.

## Current Status and Recommendations

### 1. Playwright E2E Tests (`tests/e2e/claims-submission.spec.ts`)

*   **Status:** This is the correct approach for testing the full claims submission workflow, as it simulates a user interacting with the client-side form, which then correctly invokes the Next.js Server Action (`submitClaim`).
*   **Issues Noted (from `memory/2026-01-28.md` and `claims-submission.spec.ts` review):**
    *   Complexity of OCR and actual file uploads in E2E.
    *   Potential for flaky tests due to server-side processing times (indicated by increased timeouts).
    *   Scope limitations (e.g., some validation checks missing, advanced features like voice input not yet covered).
*   **Recommendation:** Focus on stabilizing and expanding these Playwright tests.
    *   **Environment Setup:** Ensure the Playwright test environment is robust and reliable. Address any underlying installation or browser issues.
    *   **Mocking:** Implement strategic mocking for external services (e.g., OCR API) or complex integrations (like actual file storage) to make E2E tests faster and more reliable, while still verifying UI and core logic.
    *   **Coverage:** Gradually expand test coverage to include more validation scenarios, error handling, and the integration of features like OCR and voice input (with appropriate mocking).
    *   **Performance:** Investigate and optimize slow server actions if timeouts continue to be an issue.

### 2. External API Testing (`api_submit_claim.py` - removed)

*   **Status:** The previous `api_submit_claim.py` script was attempting to POST form data to `/api/agent`, which is incorrect. The `/api/agent` endpoint is designed to process an *existing* `claimId` after the `submitClaim` server action has saved the claim. It does not receive raw form data for initial submission.
*   **Recommendation:**
    *   **Do not attempt to test Next.js Server Actions directly from external scripts using standard HTTP requests.** This is an architectural mismatch.
    *   If there's a need for a separate, simpler API endpoint for testing claim submission *without* simulating the full UI (e.g., for integration with other backend services), a *new dedicated API route* (e.g., `/api/submit-claim-headless`) should be created. This new route would then delegate to the server action or a shared service layer.

## Future Enhancements

*   **Unit/Integration Tests for Server Actions:** Consider adding unit or integration tests for the `submitClaim` server action directly within the Next.js project to test its logic in isolation, without browser overhead.
*   **Contract Testing:** If external services consume data submitted through the claim process, implement contract testing to ensure API compatibility.
