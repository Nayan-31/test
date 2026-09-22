# Resume Builder Flow

Backend plan: authentication, resume creation, AI features, and user profile.

```text
test/
├── .env.local
└── src/
    ├── app/
    │   ├── api/
    │   │   ├── auth/
    │   │   │   ├── login/
    │   │   │   └── register/
    │   │   ├── resume/
    │   │   │   ├── summary/
    │   │   │   ├── project-title/
    │   │   │   └── experience-title/
    │   │   ├── ai/
    │   │   └── profile/
    │   ├── dashboard/
    │   │   └── home/
    │   ├── layout.tsx
    │   └── page.tsx
    ├── lib/
    │   ├── mongodb.ts
    │   ├── jwt.ts
    │   └── ai-sdk.ts
    ├── models/
    │   ├── user.model.ts
    │   └── resume.model.ts
    └── middlewares/
```

`summary`, `project-title`, and `experience-title` are branches of `resume`. `user.model.ts` and `resume.model.ts` are separate files directly inside `models`.

`.env.local` belongs in the project root (`test/`), alongside `package.json`. It is planned here but has not been created; `.gitignore` already excludes it from Git.

## Backend flow

1. Set up the MongoDB connection in `lib/mongodb.ts`.
2. Define user and resume data in the two model files.
3. Handle login and registration under `api/auth` using JWT where needed.
4. Create resumes and their summary, project title, and experience title through `api/resume`.
5. Configure the Gemini SDK in `lib/ai-sdk.ts` and expose AI features through `api/ai`.
6. Handle user profile through `api/profile`.

This is the planned structure from the lecture diagram; the directories and files shown here are not all implemented yet.
