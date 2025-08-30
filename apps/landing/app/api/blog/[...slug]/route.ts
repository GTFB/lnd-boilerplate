import { NextRequest, NextResponse } from 'next/server';
import { getBlogPost, getBlogPosts } from '@lnd/utils/content/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    const slug = params.slug.join('/');

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // Get the specific blog post
    const post = await getBlogPost(slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Get all posts to find neighbors
    const allPosts = await getBlogPosts();
    const sortedPosts = allPosts.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

    const currentIndex = sortedPosts.findIndex(p => p.slug === slug);
    const previousPost =
      currentIndex < sortedPosts.length - 1
        ? sortedPosts[currentIndex + 1]
        : null;
    const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;

    return NextResponse.json({
      post: {
        slug: post.slug,
        frontmatter: post.frontmatter,
        content: post.content,
      },
      neighbors: {
        previous: previousPost
          ? {
              slug: previousPost.slug,
              title: previousPost.frontmatter.title,
              date: previousPost.frontmatter.date,
            }
          : null,
        next: nextPost
          ? {
              slug: nextPost.slug,
              title: nextPost.frontmatter.title,
              date: nextPost.frontmatter.date,
            }
          : null,
      },
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
