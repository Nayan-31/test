# Resume Builder Flow

Backend plan: authentication, resume creation, AI features, and user profile.

```text
cv-builder/
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

`.env.local` belongs in the project root (`cv-builder/`), alongside `package.json`. It is planned here but has not been created; `.gitignore` already excludes it from Git.

## Backend flow

1. Set up the MongoDB connection in `lib/mongodb.ts`.
2. Define user and resume data in the two model files.
3. Handle login and registration under `api/auth` using JWT where needed.
4. Create resumes and their summary, project title, and experience title through `api/resume`.
5. Configure the Gemini SDK in `lib/ai-sdk.ts` and expose AI features through `api/ai`.
6. Handle user profile through `api/profile`.

## Resume creation flow

```text
Resume
├── Personal information  → User enters the details
│   ├── Full name
│   ├── Email
│   ├── Mobile
│   ├── GitHub
│   ├── LinkedIn
│   └── Portfolio
├── Summary                → AI generates the summary
│   ├── Experience level   → User input
│   ├── Job role           → User input
│   └── Skills             → User input
├── Work experience        → User enters experience; AI helps write the description
│   ├── Company
│   ├── Designation
│   ├── Start date
│   ├── End date
│   └── Description        → AI assistance available
├── Projects               → User enters project details
│   ├── Title
│   ├── Live link
│   ├── GitHub link
│   ├── Tech stack
│   └── Description        → AI assistance available
├── Education              → User enters the details; no AI help
│   ├── Institute
│   ├── Degree
│   ├── Start date
│   └── End date
├── Skills                 → User enters the skills
└── Achievements           → User enters the details
```

## Resume model

One user can create multiple resumes. Every resume therefore stores the ID of the user who owns it.

```ts
{
  userId: ObjectId,

  personalInformation: {
    fullName: string,
    email: string,
    mobile: string,
    github: string,
    linkedin: string,
    portfolio: string
  },

  summary: string,

  workExperience: [
    {
      company: string,
      designation: string,
      startDate: string,
      endDate: string,
      description: string
    }
  ],

  projects: [
    {
      title: string,
      liveLink: string,
      githubLink: string,
      techStack: string[],
      description: string
    }
  ],

  education: [
    {
      institute: string,
      degree: string,
      startDate: string,
      endDate: string
    }
  ],

  skills: string[],
  achievements: string[]
}
```

### Model rules

1. `userId` links each resume to its owner and allows one user to have multiple resumes.
2. `personalInformation` is a single nested object containing all personal details.
3. `summary` is a single string.
4. `workExperience`, `projects`, and `education` are arrays because a resume can contain multiple entries in each section.
5. `skills` is an array containing only strings.
6. `achievements` is an array containing only strings.

## Current user middleware flow

The resume model needs the current user's `_id`. The user is identified through the JWT already stored in the `token` cookie during login.

In Next.js, cookies are read using the built-in `cookies()` API from `next/headers`. A reusable middleware/helper will read and verify the token, fetch the logged-in user, and return that user to the resume API.

```text
Resume API request
    ↓
Current-user middleware/helper
    ↓
await cookies() from `next/headers`
    ↓
Read the `token` cookie
    ↓
Verify JWT using `verifyJWT(token)`
    ↓
Get `userId` from the decoded JWT payload
    ↓
Fetch the user using `UserModel.findById(userId)`
    ↓
Return the currently logged-in user
    ↓
Store `user._id` in the resume's `userId` field
```

Conceptual helper:

```ts
import { cookies } from "next/headers";

const cookieStore = await cookies();
const token = cookieStore.get("token")?.value;

const payload = verifyJWT(token);
const user = await UserModel.findById(payload.userId);

return user;
```

The resume request body does not need to provide the user ID. The authenticated user's ID comes from the verified cookie token.

### AI responsibilities

1. Generate a professional summary using the user's experience level, target job role, and skills.
2. Turn the user's work experience information into a clear resume description.
3. Turn the user's project information into a clear project description.
4. Do not generate personal details or education details.

This is the planned structure from the lecture diagram; the directories and files shown here are not all implemented yet.
