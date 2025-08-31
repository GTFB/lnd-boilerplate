# Deployment Guide

This guide covers the deployment process for the `lnd-boilerplate` platform to various hosting providers.

## Build Command

Regardless of the platform, the command to build the application for production is:

```bash
bun run build
```

This will create an optimized production build in the `.next` directory inside `apps/landing`.

## Recommended Platform: Vercel

Vercel is the creator of Next.js and offers a seamless deployment experience with zero configuration.

1.  **Connect Your Git Repository:** Link your GitHub/GitLab/Bitbucket repository to a new Vercel project.
2.  **Configuration:** Vercel automatically detects the Next.js framework and sets the correct build command (`next build`) and output directory (`.next`). Since we are in a monorepo, you may need to specify the **Root Directory** as `apps/landing` in the project settings.
3.  **Deploy:** Pushing to your main branch will automatically trigger a production deployment.

## Alternative Platform: Netlify

Netlify also provides excellent support for Next.js.

1.  **Connect Your Git Repository:** Link your repository to a new Netlify project.
2.  **Configuration:**
    *   **Build Command:** `bun run build`
    *   **Publish Directory:** `apps/landing/.next`
    *   You may need to install the `Next.js runtime` plugin in the Netlify UI.
3.  **Deploy:** Pushing to your main branch will trigger a deployment.

## Self-Hosting with Docker

You can also host the application on your own server using Docker for portability.

1.  **Build the Docker Image:**
    The provided `Dockerfile` is optimized for multi-stage builds to keep the final image size small.
    ```bash
    docker build -t lnd-boilerplate .
    ```

2.  **Run the Docker Container:**
    ```bash
    # Run the container, mapping port 3000 inside to port 80 on the host
    docker run -p 80:3000 lnd-boilerplate
    ```

3.  **Environment Variables:**
    Pass your production environment variables to the container using the `-e` flag or a `.env` file.
    ```bash
    docker run --env-file ./apps/landing/.env.production -p 80:3000 lnd-boilerplate
    ```

## Environment Variables

Ensure you have set up the necessary environment variables for your production environment. Create a `.env.production` file or configure them directly in your hosting provider's dashboard.

**Required Variables:**
```
# .env.production
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```