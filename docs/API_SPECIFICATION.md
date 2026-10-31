# ApplyLens — API Specification

## 1. API Configuration

Base URL: /api/v1

Architecture: REST API

Data format: JSON

Authentication: Secure HTTP-only session cookies

## 2. Authentication

POST /auth/register
Create a new student account.

POST /auth/login
Authenticate an existing user.

POST /auth/logout
End the current session.

GET /auth/me
Get the currently authenticated user.

## 3. Student Profile

GET /users/me/profile
Retrieve student profile.

PUT /users/me/profile
Create or update student profile.

GET /skills
Retrieve available skills.

PUT /users/me/skills
Update student skills.

## 4. Opportunities

GET /opportunities
List opportunities with search, filters and pagination.

GET /opportunities/:id
Retrieve opportunity details.

## 5. Saved Opportunities

GET /saved-opportunities
List saved opportunities.

PUT /saved-opportunities/:opportunityId
Save an opportunity.

DELETE /saved-opportunities/:opportunityId
Remove a saved opportunity.

## 6. Applications

GET /applications
List student applications.

POST /applications
Create an application record.

PATCH /applications/:id
Update application status or notes.

## 7. Documents

POST /documents
Upload a PDF document.

GET /documents
List uploaded documents.

GET /documents/:id
Retrieve document metadata.

DELETE /documents/:id
Delete an owned document.

## 8. AI Services

POST /documents/:id/extract
Extract structured requirements from a document.

POST /documents/:id/ask
Ask questions about a document using RAG.

POST /opportunities/:id/analyze
Analyze an opportunity against student information.

POST /opportunities/:id/action-plan
Generate an application preparation plan.

## 9. Dashboard

GET /dashboard/summary
Retrieve dashboard statistics.

## 10. Response and Error Handling

Use appropriate HTTP status codes.

Common codes:
- 200: Success
- 201: Created
- 204: No Content
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 422: Validation or business rule failure
- 500: Internal Server Error

## 11. Security

- Authenticate protected endpoints.
- Derive user identity from the session.
- Validate request bodies and parameters.
- Enforce resource ownership.
- Never expose passwords or API secrets.
- Apply rate limits to sensitive endpoints.
