# Changelog

All notable changes to **CyberShield Security Platform** are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-06-27
### Added
- Complete React 18 Cyber SOC Dashboard with live threat event feed and active session revocation console.
- Web Application Firewall (WAF) rule inspector with automated SQLi and XSS signature detection.
- Distributed ABAC and RBAC policy evaluation engine supporting conditional environmental gates.
- Multi-stage Docker containerization and Docker Compose orchestration.
- 7 comprehensive automated test suites verifying cryptography, policy evaluation, and threat detection.

## [0.3.0] - 2025-04-28
### Added
- Web Application Firewall (WAF) regex pattern scanner guarding all inbound API requests.
- Dynamic IP reputation manager with automated brute-force rate violation quarantine.
- Real-time token revocation check against database session blacklist.

## [0.2.0] - 2025-02-28
### Added
- Attribute-Based Access Control (ABAC) policy evaluator with condition parser.
- Role-Based Access Control (RBAC) permission scoping with hierarchical inheritance.
- Password complexity validator and brute-force account lockout mechanism.

## [0.1.0] - 2025-01-31
### Added
- Core MongoDB schema models: User, SecurityRole, AccessPolicy, ThreatEvent, and SecurityToken.
- Cryptographic hashing module using PBKDF2/SHA-256 with per-user salt generation.
- Public JSON Web Key Set (JWKS) discovery endpoint.
