# Todo Task Manager

## Overview

This project is a RESTful Todo API built with Node.js, Express, and MySQL.
The goal was not UI development, but to deeply understand backend API design,
validation, error handling, and database interaction, basically how to build
a backend efficiently.

## What I Learned

- Designing RESTful routes with clear and predictable behavior
- Separating concerns between routing, business logic, and data access layers
- Building a centralized error-handling system using Express middleware
- Validating request data and enforcing strict API behavior
- Writing SQL-safe queries using prepared statements
- Structuring backend code for scalability and readability

## Key Engineering Decisions

- Centralized error handling to ensure consistent API responses
- Strict field validation to prevent undefined or unintended API behavior
- Repository pattern for database access to keep routes thin
- Explicit handling of edge cases (invalid IDs, empty updates, invalid JSON)

## Next Steps

This project is intentionally paused to rebuild the same API using
Java and Spring Boot. The goal is to apply the same backend principles
in a strongly-typed, enterprise-grade framework.
