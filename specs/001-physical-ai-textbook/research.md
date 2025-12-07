# Research: Physical AI & Humanoid Robotics Textbook

## Decision: Docusaurus Version and Preset
**Rationale**: Using Docusaurus v3.9 with classic preset as specified in requirements to provide a proven documentation framework with good search, navigation, and theming capabilities.
**Alternatives considered**:
- Custom React site: More complex to implement and maintain
- GitBook: Less flexible than Docusaurus
- Hugo: Different technology stack, requires learning curve

## Decision: Content Organization Structure
**Rationale**: Organizing content in 4 main modules with weekly breakdowns as specified, following the 13-week curriculum structure. This matches the pedagogical requirements from the spec.
**Alternatives considered**:
- Topic-based organization: Would not align with the required 4-module structure
- Chronological organization: Would be less clear for navigation

## Decision: Code Example Presentation
**Rationale**: Using tabs to present Python (primary) and C++ (optional) code examples as specified. This allows for clear presentation of both languages while prioritizing Python as per requirements.
**Alternatives considered**:
- Separate files: Would make navigation more complex
- Single language only: Would not meet the requirement for both Python and C++ examples

## Decision: Multilingual Support Implementation
**Rationale**: Implementing static toggle for Urdu translation as specified, likely using Docusaurus i18n functionality. This provides a clean separation between languages while maintaining content integrity.
**Alternatives considered**:
- Dynamic translation: Would compromise quality for educational content
- Inline translation: Would clutter the interface

## Decision: Diagram and Image Storage
**Rationale**: Storing diagrams in static/img/ as specified, with organized subdirectories for different types of diagrams including the required Jetson wiring diagrams. This follows Docusaurus best practices.
**Alternatives considered**:
- Inline base64 images: Would increase file sizes
- External hosting: Would create dependencies on external services

## Decision: Cloud Setup Documentation
**Rationale**: Focusing on AWS g5.2xlarge as primary example with notes for Azure/GCP equivalents as specified. This provides a concrete example while acknowledging alternative platforms.
**Alternatives considered**:
- Equal treatment of all platforms: Would create more content without significant benefit
- Only one platform: Would limit student options

## Decision: RAG Readiness Implementation
**Rationale**: Ensuring semantic HTML structure (H1/H2/H3) for all content to enable future vectorization as specified. This follows accessibility best practices while enabling RAG functionality.
**Alternatives considered**:
- Custom structure: Would not be as compatible with RAG systems
- Minimal structure: Would limit future RAG capabilities

## Decision: Deployment Strategy
**Rationale**: Using gh-pages branch with docusaurus.config.js for deployment as specified. This provides a reliable, free hosting solution that integrates well with Docusaurus.
**Alternatives considered**:
- Netlify/Vercel: Would require additional setup and potential costs
- Self-hosting: Would add operational complexity