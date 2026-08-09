# Restful Booker API Automation

API automation framework built with **Playwright, TypeScript and Zod**, designed to demonstrate modern QA Automation practices for REST APIs.

The project covers functional, negative, smoke, regression and contract testing, with reporting through Allure and automated execution through Docker and GitHub Actions.

---

## Tech Stack

| Technology     | Purpose                                |
| -------------- | -------------------------------------- |
| Playwright     | API test execution and assertions      |
| TypeScript     | Static typing                          |
| Zod            | Runtime schema and contract validation |
| Allure         | Test reporting                         |
| ESLint         | Code quality                           |
| Prettier       | Code formatting                        |
| Husky          | Git hooks                              |
| Docker         | Reproducible execution                 |
| GitHub Actions | CI/CD                                  |
| dotenv         | Environment configuration              |

---

## Application Under Test

The project uses the public **Restful Booker API**.

Base URL:

```text
https://restful-booker.herokuapp.com
```

The API provides booking management functionality and authentication.

Main endpoints used by this project:

```text
POST   /auth

GET    /booking

POST   /booking

GET    /booking/{id}

PUT    /booking/{id}

DELETE /booking/{id}
```

---

# Project Goals

This project was created to demonstrate an API automation framework rather than simply a collection of API tests.

The main goals are:

- Build a maintainable API automation architecture.
- Separate API communication from test logic.
- Implement reusable fixtures.
- Validate API contracts at runtime.
- Generate dynamic test data.
- Cover positive and negative scenarios.
- Support smoke and regression execution.
- Produce test reports.
- Execute tests locally and in CI.
- Provide a reproducible Docker environment.

---

# Architecture

The framework follows a layered architecture.

```text
                    Tests
                      │
                      ▼
                  Fixtures
                      │
                      ▼
                 API Clients
                      │
                      ▼
                  ApiClient
                      │
                      ▼
                   REST API
                      │
             ┌────────┴────────┐
             ▼                 ▼
          Models             Zod
       TypeScript          Contracts
```

## Tests

Tests contain business scenarios and assertions.

They should not contain duplicated HTTP implementation.

Example:

```typescript
const response = await bookingClient.createBookingResponse(booking);

expect(response.status()).toBe(200);
```

---

## API Client Layer

`ApiClient` centralizes HTTP communication.

Resource-specific clients extend it.

```text
ApiClient
   │
   ├── AuthClient
   │
   └── BookingClient
```

This keeps endpoint-specific logic separated from the test cases.

---

## Fixtures

Fixtures provide reusable dependencies to tests.

Examples:

```text
authClient
bookingClient
authToken
bookingId
```

The fixture system also allows test data to be created and cleaned up automatically.

---

## Models

TypeScript interfaces represent expected application structures.

Example:

```typescript
export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
}
```

These provide compile-time type safety.

---

## Schemas

Zod provides runtime validation.

TypeScript can verify our code at compile time, but it cannot guarantee that an external API returns the expected JSON structure.

Zod validates the actual response.

```typescript
const validated = bookingSchema.parse(response);
```

This allows the framework to detect contract changes.

---

# Test Strategy

The project uses multiple testing levels.

## Smoke Testing

Purpose:

Verify that the most important API functionality is available.

Examples:

```text
Authentication
Create Booking
```

Run:

```bash
npm run test:smoke
```

---

## Functional Testing

Validates business behavior.

Examples:

```text
Create booking
Get booking
Update booking
Delete booking
```

The tests validate:

- HTTP status
- response body
- returned identifiers
- updated values
- deleted resources

---

## Negative Testing

Validates incorrect or unauthorized requests.

Examples:

```text
Invalid credentials
Missing/invalid authentication
Invalid resources
Unexpected input
```

The goal is to verify that the API fails in the expected way.

---

## Contract Testing

Zod validates response structures.

Example:

```text
API Response
     │
     ▼
Zod Schema
     │
     ├── Valid → Test continues
     │
     └── Invalid → Test fails
```

Contract tests help detect breaking API changes.

Run:

```bash
npm run test:contract
```

---

## Regression Testing

Regression tests cover the existing API behavior.

Run:

```bash
npm run test:regression
```

---

# Test Coverage Matrix

| Area             | Positive | Negative | Contract | Smoke |
| ---------------- | -------: | -------: | -------: | ----: |
| Authentication   |       ✅ |       ✅ |       ✅ |    ✅ |
| Create Booking   |       ✅ |  Planned |       ✅ |    ✅ |
| Get Booking      |       ✅ |  Planned |       ✅ |     - |
| Update Booking   |       ✅ |  Planned |        - |     - |
| Delete Booking   |       ✅ |  Planned |        - |     - |
| Response Headers |       ✅ |        - |        - |     - |
| Data Validation  |       ✅ |  Planned |        - |     - |

`Planned` scenarios represent future extensions of the MVP.

---

# Test Tags

Tests use Playwright tags.

Available tags:

```text
@smoke
@regression
@contract
```

Examples:

```bash
npm run test:smoke
```

```bash
npm run test:regression
```

```bash
npm run test:contract
```

---

# Installation

## Requirements

Recommended environment:

```text
Node.js 22+
npm
Docker
Git
```

---

## Clone

```bash
git clone <repository-url>
```

```bash
cd restful-booker-api-automation
```

---

## Install dependencies

```bash
npm ci
```

---

## Install Playwright browsers

```bash
npx playwright install
```

---

# Environment Configuration

Create a local `.env` file:

```env
BASE_URL=https://restful-booker.herokuapp.com
HEADLESS=false
TIMEOUT=30000
```

The repository includes:

```text
.env.template
```

as the configuration template.

Environment files containing local configuration or secrets must not be committed.

---

# Running Tests

## All tests

```bash
npm test
```

## Smoke

```bash
npm run test:smoke
```

## Regression

```bash
npm run test:regression
```

## Contract

```bash
npm run test:contract
```

## Debug

```bash
npm run test:debug
```

---

# Reports

## Playwright HTML Report

After test execution:

```bash
npm run report
```

---

## Allure

Generate the report:

```bash
npm run allure:generate
```

Open it:

```bash
npm run allure:open
```

Allure results are generated under:

```text
allure-results/
```

The generated report is stored under:

```text
allure-report/
```

These directories are ignored by Git.

---

# Docker

The framework can run inside a Playwright Docker environment.

Build the image:

```bash
docker build \
    -t restful-booker-api-tests .
```

Run:

```bash
docker run \
    --rm \
    restful-booker-api-tests
```

---

## Docker Compose

Run the tests using:

```bash
docker compose up --build
```

Environment variables can be configured through `.env`.

Example:

```env
BASE_URL=https://restful-booker.herokuapp.com
HEADLESS=true
TIMEOUT=30000
```

---

# CI/CD

GitHub Actions executes the automation suite on:

```text
Push to main
Pull Requests to main
Manual workflow execution
```

The pipeline performs:

```text
Checkout
   │
   ▼
Node setup
   │
   ▼
npm ci
   │
   ▼
ESLint
   │
   ▼
Prettier
   │
   ▼
Playwright installation
   │
   ▼
API tests
   │
   ▼
Artifacts
```

---

# CI Artifacts

When the workflow finishes, the following artifacts can be available:

```text
playwright-report
allure-results
test-results
```

These are uploaded even when tests fail, allowing failures to be investigated.

---

# Code Quality

The project uses ESLint and Prettier.

Run lint:

```bash
npm run lint
```

Check formatting:

```bash
npm run format:check
```

Format files:

```bash
npm run format
```

---

# Git Hooks

Husky runs checks before commits.

The current pre-commit workflow executes:

```text
ESLint
   ↓
Prettier
```

This helps prevent poorly formatted or invalid code from being committed.

---

# Data Management

Booking data is generated dynamically.

Example:

```typescript
const booking = createBookingData({
  firstname: 'QA',
  lastname: 'Automation',
  totalprice: 999,
});
```

This allows tests to customize only the properties relevant to a scenario.

The fixture system also supports automatic creation and cleanup of test bookings.

---

# Design Principles

The framework follows several principles.

## Separation of concerns

Tests should focus on behavior and assertions.

API communication belongs in clients.

Data generation belongs in factories/utilities.

Contract validation belongs in schemas.

---

## Reusability

Common functionality should be implemented once and reused through:

- API clients
- fixtures
- factories
- schemas
- utilities

---

## Explicit assertions

Tests should clearly express what is being validated.

Example:

```typescript
expect(response.status()).toBe(200);

expect(booking.firstname).toBe(expectedFirstname);
```

---

## Runtime contract validation

External API responses should not be trusted only because TypeScript defines an interface.

Zod is used when the response contract needs runtime verification.

---

# Project Quality Gates

A change should satisfy:

```text
ESLint
   │
   ▼
Prettier
   │
   ▼
Tests
   │
   ▼
CI
```

The objective is to prevent broken code from reaching the main branch.

---

# Current MVP Scope

The current MVP demonstrates:

- Playwright API automation
- TypeScript
- REST API testing
- Authentication
- CRUD testing
- Negative testing
- Contract testing
- Zod
- Fixtures
- Dynamic test data
- Allure
- ESLint
- Prettier
- Husky
- Docker
- GitHub Actions

---

# Future Improvements

Possible future iterations include:

- Advanced negative testing
- Schema validation for every endpoint
- API request/response logging
- Custom Allure metadata
- Environment-specific configuration
- Multiple environments
- Test data cleanup service
- API performance testing
- OpenAPI contract validation
- Authentication token caching
- Parallel execution optimization
- Security testing
- Dependency vulnerability scanning

---

# Project Status

```text
MVP
 │
 ├── Foundation              ✅
 ├── API Architecture        ✅
 ├── Authentication         ✅
 ├── Booking CRUD            ✅
 ├── Contract Testing        ✅
 ├── Test Data               ✅
 ├── Docker                  ✅
 ├── CI/CD                   ✅
 ├── Allure                  ✅
 └── Documentation           ✅
```

---

## License

This project is intended as a QA Automation portfolio and learning project.
