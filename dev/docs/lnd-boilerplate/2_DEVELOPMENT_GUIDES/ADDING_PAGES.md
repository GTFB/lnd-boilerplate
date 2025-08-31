# Adding Pages Guide

This guide covers the process for creating new pages for both content-driven and application-driven use cases.

## 1. Creating a Content-Driven Page (e.g., a new Blog Post)

Content-driven pages separate their content (MDX) from their rendering logic (TSX).

### Step 1: Create the Content File

Create a new `.mdx` file in the appropriate content directory. For a blog post, this would be `apps/landing/_content/blog/`. The filename should include the locale.

**File:** `apps/landing/_content/blog/my-new-post.en.mdx`

```
---
title: "My New Awesome Post"
description: "A short description for SEO purposes."
date: "2024-05-21"
authorId: "jane-doe"
---
```

## Introduction

This is the content of my new blog post, written in Markdown. I can even use **JSX**!


### Step 2: Create the Page Route File

Create the corresponding page file in the `apps/landing/app` directory. Use dynamic segments like `[slug]` to handle multiple posts with one file.

**File:** `apps/landing/app/[locale]/blog/[slug]/page.tsx`

```tsx
// This file likely already exists. You don't need to create it for every post.
import { readLocalizedMdx } from '@lnd/utils/content/readers';
import { MdxRenderer } from '@lnd/ui/components/mdx';
import { ContentLayout } from '@lnd/ui/templates';
// ... other imports

export default async function BlogPostPage({ params }: { params: { slug: string; locale: string } }) {
  // The 'readLocalizedMdx' function contains the logic to find the correct file
  const { content, frontmatter } = await readLocalizedMdx('blog', params.slug, params.locale);

  return (
    <ContentLayout title={frontmatter.title} description={frontmatter.description}>
      <MdxRenderer content={content} />
    </ContentLayout>
  );
}
```

## 2. Creating an Application-Driven Page (e.g., a Settings Page)

Application-driven pages contain their logic and structure directly within the TSX file.

### Step 1: Create the Page Route File

Create a new `page.tsx` file in the desired route within `apps/landing/app/[locale]/`.

**File:** `apps/landing/app/[locale]/settings/profile/page.tsx`

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { ApplicationLayout } from '@lnd/ui/templates';
import { Button } from '@lnd/ui/primitives/button';
import { Input } from '@lnd/ui/primitives/input';

export default function ProfileSettingsPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    alert('Profile updated!');
    console.log(data);
  };

  return (
    <ApplicationLayout title="Profile Settings" description="Update your profile information.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name">Name</label>
          <Input id="name" {...register('name')} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" {...register('email')} />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </ApplicationLayout>
  );
}
```

This page is marked with `'use client'` because it uses React hooks for interactivity. It is built using components from the `packages/ui` library and uses the `ApplicationLayout` template.