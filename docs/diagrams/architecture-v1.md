# NGO Donation & Impact Tracking - Architecture

```mermaid
flowchart TD
    U[User] --> R[React Frontend]
    R --> S[Spring Boot Backend]
    S --> DB[(MySQL Database)]
    S --> P[Payment Gateway]
    S --> E[Email Service]
```