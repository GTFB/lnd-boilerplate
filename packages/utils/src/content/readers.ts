import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join, extname } from 'path'
import matter from 'gray-matter'

export interface MDXFile {
  slug: string
  frontmatter: Record<string, any>
  content: string
  filePath: string
}

export interface ExpertData {
  id: string
  name: string
  title: string
  avatar: string
  bio: string
  expertise: string[]
  social: Record<string, string>
  location: string
  joined: string
}

export interface DocsMeta {
  [key: string]: string | {
    title: string
    pages: Record<string, string>
  }
}

/**
 * Read MDX file with frontmatter
 */
export function readMDXFile(filePath: string): MDXFile {
  try {
    const fileContent = readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(fileContent)
    
    // Extract just the filename without extension
    const fileName = filePath.split(/[/\\]/).pop() || ''
    const slug = fileName.replace(/\.mdx?$/, '')
    
    return {
      slug,
      frontmatter,
      content,
      filePath
    }
  } catch (error) {
    throw new Error(`Failed to read MDX file ${filePath}: ${error}`)
  }
}

/**
 * Read all MDX files from directory
 */
export function readMDXDirectory(directoryPath: string): MDXFile[] {
  if (!existsSync(directoryPath)) {
    return []
  }
  
  const files: MDXFile[] = []
  const items = readdirSync(directoryPath)
  
  for (const item of items) {
    const itemPath = join(directoryPath, item)
    const stat = statSync(itemPath)
    
    if (stat.isFile() && (extname(item) === '.mdx' || extname(item) === '.md')) {
      try {
        const mdxFile = readMDXFile(itemPath)
        files.push(mdxFile)
      } catch (error) {
        console.warn(`Failed to read MDX file ${itemPath}:`, error)
      }
    }
  }
  
  return files
}

/**
 * Read JSON file
 */
export function readJSONFile<T>(filePath: string): T {
  try {
    const fileContent = readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    throw new Error(`Failed to read JSON file ${filePath}: ${error}`)
  }
}

/**
 * Read all JSON files from directory
 */
export function readJSONDirectory<T>(directoryPath: string): T[] {
  if (!existsSync(directoryPath)) {
    return []
  }
  
  const files: T[] = []
  const items = readdirSync(directoryPath)
  
  for (const item of items) {
    const itemPath = join(directoryPath, item)
    const stat = statSync(itemPath)
    
    if (stat.isFile() && extname(item) === '.json') {
      try {
        const jsonFile = readJSONFile<T>(itemPath)
        files.push(jsonFile)
      } catch (error) {
        console.warn(`Failed to read JSON file ${itemPath}:`, error)
      }
    }
  }
  
  return files
}

/**
 * Get content directory path
 */
export function getContentPath(): string {
  // Try different possible paths
  const possiblePaths = [
    join(process.cwd(), 'apps', 'landing', '_content'),
    join(process.cwd(), '_content'),
    join(__dirname, '..', '..', '..', 'apps', 'landing', '_content')
  ]
  
  for (const path of possiblePaths) {
    if (existsSync(path)) {
      return path
    }
  }
  
  // Fallback to the first path
  return possiblePaths[0]
}

/**
 * Read blog posts
 */
export async function getBlogPosts(): Promise<MDXFile[]> {
  const contentPath = getContentPath()
  const blogPath = join(contentPath, 'blog')
  const posts = readMDXDirectory(blogPath).filter(post => !post.frontmatter.draft)
  
  // Sort posts by date (newest first) to match API sorting
  return posts.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

/**
 * Read single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<MDXFile | null> {
  const contentPath = getContentPath()
  const blogPath = join(contentPath, 'blog')
  const filePath = join(blogPath, `${slug}.mdx`)
  
  if (!existsSync(filePath)) {
    return null
  }
  
  return readMDXFile(filePath)
}

/**
 * Read experts data
 */
export async function getExperts(): Promise<ExpertData[]> {
  const contentPath = getContentPath()
  const expertsPath = join(contentPath, 'experts')
  return readJSONDirectory<ExpertData>(expertsPath)
}

/**
 * Read single expert by ID
 */
export async function getExpert(id: string): Promise<ExpertData | null> {
  const contentPath = getContentPath()
  const expertsPath = join(contentPath, 'experts')
  const filePath = join(expertsPath, `${id}.json`)
  
  if (!existsSync(filePath)) {
    return null
  }
  
  return readJSONFile<ExpertData>(filePath)
}

/**
 * Read docs meta
 */
export async function getDocsMeta(): Promise<DocsMeta> {
  const contentPath = getContentPath()
  const docsPath = join(contentPath, 'docs')
  const metaPath = join(docsPath, '_meta.json')
  
  if (!existsSync(metaPath)) {
    return {}
  }
  
  return readJSONFile<DocsMeta>(metaPath)
}

/**
 * Convert docs meta to navigation items
 */
export function docsMetaToNavigation(meta: DocsMeta): Array<{
  title: string
  href: string
  children?: Array<{
    title: string
    href: string
  }>
}> {
  const navigationItems: Array<{
    title: string
    href: string
    children?: Array<{
      title: string
      href: string
    }>
  }> = []

  for (const [key, value] of Object.entries(meta)) {
    if (typeof value === 'string') {
      // Simple string entry
      navigationItems.push({
        title: value,
        href: `/docs/${key}`
      })
    } else if (typeof value === 'object' && value.title && value.pages) {
      // Section with subpages
      const children = Object.entries(value.pages).map(([pageKey, pageTitle]) => ({
        title: pageTitle,
        href: `/docs/${key}/${pageKey}`
      }))
      
      navigationItems.push({
        title: value.title,
        href: `/docs/${key}`,
        children
      })
    }
  }

  return navigationItems
}

/**
 * Read docs pages recursively
 */
export async function getDocsPages(): Promise<MDXFile[]> {
  const contentPath = getContentPath()
  const docsPath = join(contentPath, 'docs')
  
  function readDocsRecursively(dirPath: string, baseSlug: string = ''): MDXFile[] {
    const pages: MDXFile[] = []
    
    if (!existsSync(dirPath)) {
      return pages
    }
    
    const items = readdirSync(dirPath)
    
    for (const item of items) {
      const itemPath = join(dirPath, item)
      const stat = statSync(itemPath)
      
      if (stat.isDirectory()) {
        // Recursively read subdirectories
        const subPages = readDocsRecursively(itemPath, baseSlug ? `${baseSlug}/${item}` : item)
        pages.push(...subPages)
      } else if (item.endsWith('.mdx') && item !== '_meta.mdx') {
        // Read MDX files
        const slug = baseSlug ? `${baseSlug}/${item.replace(/\.mdx?$/, '')}` : item.replace(/\.mdx?$/, '')
        const mdxFile = readMDXFile(itemPath)
        pages.push({
          ...mdxFile,
          slug
        })
      }
    }
    
    return pages
  }
  
  return readDocsRecursively(docsPath)
}

/**
 * Read single docs page by slug (supports subdirectories)
 */
export async function getDocsPage(slug: string): Promise<MDXFile | null> {
  const contentPath = getContentPath()
  const docsPath = join(contentPath, 'docs')
  const filePath = join(docsPath, `${slug}.mdx`)
  
  if (!existsSync(filePath)) {
    return null
  }
  
  const mdxFile = readMDXFile(filePath)
  return {
    ...mdxFile,
    slug
  }
}

/**
 * Read legal pages
 */
export async function getLegalPages(): Promise<MDXFile[]> {
  const contentPath = getContentPath()
  const legalPath = join(contentPath, 'legal')
  return readMDXDirectory(legalPath)
}

/**
 * Read single legal page by slug
 */
export async function getLegalPage(slug: string): Promise<MDXFile | null> {
  const contentPath = getContentPath()
  const legalPath = join(contentPath, 'legal')
  const filePath = join(legalPath, `${slug}.mdx`)
  
  if (!existsSync(filePath)) {
    return null
  }
  
  return readMDXFile(filePath)
}
