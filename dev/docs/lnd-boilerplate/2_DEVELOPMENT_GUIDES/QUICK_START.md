# Quick Start Guide

This guide will walk you through setting up the project locally for the first time.

### Prerequisites

1.  **Git:** You must have Git installed to clone the repository.
2.  **Bun:** This project uses Bun as the package manager and runtime. Install it from [bun.sh](https://bun.sh/).

### 1. Clone the Repository

Clone the project to your local machine using Git.

```bash
git clone https://github.com/[YOUR_USERNAME]/[YOUR_REPO].git
cd [YOUR_REPO]
```

### 2. Install Dependencies

Install all necessary dependencies for the entire monorepo with a single command from the root directory.

```bash
bun install
```

### 3. Set Up Environment Variables

Some parts of the application may require environment variables. Copy the example file to create your local configuration.

```bash
# In the apps/landing directory
cp .env.example .env.local
```

Now, open `apps/landing/.env.local` and fill in any necessary values, such as API keys or the public site URL for production builds.

### 4. Run the Development Server

Start the Next.js development server for the `landing` application.

```bash
bun dev
```

The application should now be running at **[http://localhost:3000](http://localhost:3000)**. The server will automatically reload when you make changes to the code.