import { notFound } from 'next/navigation';
import { PublicLayout } from '@lnd/ui/templates';
import { SiteConfigProvider } from '@lnd/ui/providers/SiteConfigProvider';
import { getDocsPage } from '@lnd/utils/content/readers';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function IntroductionPage() {
  console.log('IntroductionPage: Starting');
  
  const page = await getDocsPage('introduction');
  console.log('IntroductionPage: Page result:', page ? 'found' : 'not found');
  
  if (!page) {
    console.log('IntroductionPage: Returning notFound()');
    return notFound();
  }

  console.log('IntroductionPage: Rendering page');
  return (
    <SiteConfigProvider>
      <PublicLayout>
        <div className="w-full prose prose-lg max-w-none">
          <h1>{page.frontmatter.title}</h1>
          <p>{page.frontmatter.description}</p>
          <MDXRemote source={page.content} />
        </div>
      </PublicLayout>
    </SiteConfigProvider>
  );
}
