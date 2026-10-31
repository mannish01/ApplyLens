# ApplyLens — Database Design

## 1. Database Technology

- PostgreSQL
- Prisma ORM
- pgvector for document embeddings

## 2. Database Tables

### User
Stores account and authentication information.

Fields:
- id (PK)
- email (Unique)
- passwordHash
- createdAt
- updatedAt

### StudentProfile
Stores student academic information.

Fields:
- id (PK)
- userId (FK, Unique)
- fullName
- college
- degree
- branch
- graduationYear
- cgpa

### Skill
Stores available skills.

Fields:
- id (PK)
- name (Unique)

### UserSkill
Connects students with skills.

Fields:
- userId (FK)
- skillId (FK)

### Opportunity
Stores available opportunities.

Fields:
- id (PK)
- title
- organization
- description
- type
- location
- deadline
- sourceUrl
- createdAt

### Requirement
Stores opportunity eligibility requirements.

Fields:
- id (PK)
- opportunityId (FK)
- category
- operator
- expectedValue
- isMandatory
- evidenceReference

### SavedOpportunity
Stores student bookmarks.

Fields:
- id (PK)
- userId (FK)
- opportunityId (FK)
- createdAt

### Application
Tracks student applications.

Fields:
- id (PK)
- userId (FK)
- opportunityId (FK)
- status
- appliedAt
- notes

### Document
Stores uploaded document metadata.

Fields:
- id (PK)
- userId (FK)
- fileName
- storageKey
- status
- uploadedAt

### DocumentChunk
Stores extracted document text and embeddings.

Fields:
- id (PK)
- documentId (FK)
- chunkIndex
- content
- pageNumber
- embedding

### AIAnalysis
Stores AI analysis results.

Fields:
- id (PK)
- userId (FK)
- opportunityId (FK, Optional)
- documentId (FK, Optional)
- analysisType
- result
- createdAt

## 3. Relationships

- User has one StudentProfile.
- User has many Applications.
- User has many SavedOpportunities.
- User has many Documents.
- User has many Skills through UserSkill.
- Opportunity has many Requirements.
- Opportunity has many Applications.
- Opportunity has many SavedOpportunities.
- Document has many DocumentChunks.
- User has many AIAnalyses.

## 4. Constraints

- User email must be unique.
- StudentProfile userId must be unique.
- Skill name must be unique.
- UserSkill must have a unique (userId, skillId) pair.
- SavedOpportunity must have a unique (userId, opportunityId) pair.
- Application must have a unique (userId, opportunityId) pair.

## 5. Data Integrity

- Use foreign keys to maintain relationships.
- Use UUID primary keys.
- Index frequently searched fields.
- Preserve application history when opportunities are archived.
- Restrict document access to its owner.
- Store private document references, not public file URLs.
