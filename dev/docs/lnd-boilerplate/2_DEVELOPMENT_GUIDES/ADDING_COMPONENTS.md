# Adding Components Guide

This guide explains the workflow for creating new UI components, following the project's three-tier architecture.

### Philosophy

Before creating a component, determine its purpose and reusability.
- Is it a generic, unstyled building block (e.g., a container with a variant)? It might be a **Primitive**.
- Is it a specific piece of UI that solves a business need (e.g., a `UserProfileCard`)? It's a **Component (Composition)**.

For this guide, we will focus on adding a **Component**.

### Step 1: Identify the Domain

Where does the new component belong? Components are organized by feature or domain inside `packages/ui/src/components/`.
- `common/`: For components used everywhere (e.g., a site-wide banner).
- `blog/`: For components used only in the blog section.
- `docs/`: For components specific to documentation pages.
- `marketing/`: For components used on marketing or landing pages.

### Step 2: Create the Component File

Let's create a new `TestimonialCard` component for the marketing domain.

Create the file at: `packages/ui/src/components/marketing/TestimonialCard.tsx`

### Step 3: Build the Component

Build your component by composing existing **Primitives** from `packages/ui/src/primitives/`.

```tsx
// packages/ui/src/components/marketing/TestimonialCard.tsx

import { Card, CardContent, CardHeader } from '@/primitives/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/primitives/avatar';

interface TestimonialCardProps {
  authorName: string;
  authorTitle: string;
  avatarUrl: string;
  quote: string;
}

export function TestimonialCard({
  authorName,
  authorTitle,
  avatarUrl,
  quote,
}: TestimonialCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={avatarUrl} alt={authorName} />
            <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{authorName}</p>
            <p className="text-sm text-muted-foreground">{authorTitle}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="italic">"{quote}"</blockquote>
      </CardContent>
    </Card>
  );
}
```

### Step 4: Export the Component

To make the new component available for import, export it from the domain's index file.

Add the following line to `packages/ui/src/components/marketing/index.ts`:

```typescript
// packages/ui/src/components/marketing/index.ts
export * from './Hero';
export * from './PricingTable';
export * from './TestimonialCard'; // Add this line
```

### Step 5: Use the Component

You can now import and use your new component anywhere in the `apps/landing` application.

```tsx
// in apps/landing/app/[locale]/page.tsx
import { TestimonialCard } from '@lnd/ui/components/marketing';

export default function HomePage() {
  return (
    <section>
      <h2>What our users say</h2>
      <TestimonialCard
        authorName="Jane Doe"
        authorTitle="CEO, Example Inc."
        avatarUrl="/avatars/jane.png"
        quote="This boilerplate is amazing!"
      />
    </section>
  );
}