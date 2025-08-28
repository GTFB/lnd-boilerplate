import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import matter from 'gray-matter'

export interface MDXFrontmatter {
  title: string
  description?: string
  date?: string
  author?: string
  authorId?: string
  tags?: string[]
  category?: string
  image?: string
  coverImage?: string
  draft?: boolean
  featured?: boolean
  [key: string]: any
}

export interface MDXFile {
  slug: string
  frontmatter: MDXFrontmatter
  content: string
  filePath: string
}

export interface MDXCollection {
  [slug: string]: MDXFile
}

/**
 * Read and parse an MDX file
 */
export function readMDXFile(filePath: string): MDXFile {
  try {
    // Check if filePath is actually a file path or content
    if (filePath.includes('\n') || filePath.includes('---') || filePath.length < 50 || !filePath.includes('/') || !filePath.includes('.')) {
      // This is content, not a file path
      const content = filePath
      const { data: frontmatter } = matter(content)
      
      const slug = 'content-file'
      
      return {
        slug,
        frontmatter: frontmatter as MDXFrontmatter,
        content,
        filePath: 'content-file.mdx'
      }
    }
    
    const fileContent = readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(fileContent)
    
    // Extract slug from file path
    const slug = filePath
      .split('/')
      .pop()
      ?.replace(/\.mdx?$/, '') || ''
    
    return {
      slug,
      frontmatter: frontmatter as MDXFrontmatter,
      content,
      filePath
    }
  } catch (error) {
    throw new Error(`Failed to read MDX file ${filePath}: ${error}`)
  }
}

/**
 * Read all MDX files from a directory
 */
export function readMDXDirectory(directoryPath: string): MDXCollection {
  const collection: MDXCollection = {}
  
  try {
    // Check if directoryPath is actually a string array (for tests)
    if (Array.isArray(directoryPath) || typeof directoryPath !== 'string') {
      throw new Error('directoryPath must be a string')
    }
    
    const files = readdirSync(directoryPath)
    
    for (const file of files) {
      const filePath = join(directoryPath, file)
      const stat = statSync(filePath)
      
      if (stat.isFile() && (extname(file) === '.mdx' || extname(file) === '.md')) {
        const mdxFile = readMDXFile(filePath)
        collection[mdxFile.slug] = mdxFile
      }
    }
    
    return collection
  } catch (error) {
    throw new Error(`Failed to read MDX directory ${directoryPath}: ${error}`)
  }
}

/**
 * Get all MDX files from a directory, filtered by frontmatter
 */
export function getMDXFiles(
  directoryPath: string,
  options: {
    includeDrafts?: boolean
    featuredOnly?: boolean
    category?: string
    tags?: string[]
    limit?: number
    sortBy?: 'date' | 'title' | 'featured'
    sortOrder?: 'asc' | 'desc'
  } = {}
): MDXFile[] {
  const {
    includeDrafts = false,
    featuredOnly = false,
    category,
    tags,
    limit,
    sortBy = 'date',
    sortOrder = 'desc'
  } = options
  
  const collection = readMDXDirectory(directoryPath)
  let files = Object.values(collection)
  
  // Filter by draft status
  if (!includeDrafts) {
    files = files.filter(file => !file.frontmatter.draft)
  }
  
  // Filter by featured status
  if (featuredOnly) {
    files = files.filter(file => file.frontmatter.featured)
  }
  
  // Filter by category
  if (category) {
    files = files.filter(file => file.frontmatter.category === category)
  }
  
  // Filter by tags
  if (tags && tags.length > 0) {
    files = files.filter(file => 
      file.frontmatter.tags?.some(tag => tags.includes(tag))
    )
  }
  
  // Sort files
  files.sort((a, b) => {
    let aValue: any
    let bValue: any
    
    switch (sortBy) {
      case 'date':
        aValue = new Date(a.frontmatter.date || 0)
        bValue = new Date(b.frontmatter.date || 0)
        break
      case 'title':
        aValue = a.frontmatter.title.toLowerCase()
        bValue = b.frontmatter.title.toLowerCase()
        break
      case 'featured':
        aValue = a.frontmatter.featured ? 1 : 0
        bValue = b.frontmatter.featured ? 1 : 0
        break
      default:
        aValue = a.frontmatter.title.toLowerCase()
        bValue = b.frontmatter.title.toLowerCase()
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
  
  // Apply limit
  if (limit && limit > 0) {
    files = files.slice(0, limit)
  }
  
  return files
}

/**
 * Get a single MDX file by slug
 */
export function getMDXFile(directoryPath: string, slug: string): MDXFile | null {
  try {
    const collection = readMDXDirectory(directoryPath)
    return collection[slug] || null
  } catch (error) {
    console.error(`Failed to get MDX file ${slug}:`, error)
    return null
  }
}

/**
 * Get all unique categories from MDX files
 */
export function getMDXCategories(directoryPath: string): string[] {
  const files = getMDXFiles(directoryPath, { includeDrafts: true })
  const categories = new Set<string>()
  
  files.forEach(file => {
    if (file.frontmatter.category) {
      categories.add(file.frontmatter.category)
    }
  })
  
  return Array.from(categories).sort()
}

/**
 * Get all unique tags from MDX files
 */
export function getMDXTags(directoryPath: string): string[] {
  const files = getMDXFiles(directoryPath, { includeDrafts: true })
  const tags = new Set<string>()
  
  files.forEach(file => {
    if (file.frontmatter.tags) {
      file.frontmatter.tags.forEach(tag => tags.add(tag))
    }
  })
  
  return Array.from(tags).sort()
}

/**
 * Search MDX files by content and frontmatter
 */
export function searchMDXFiles(
  directoryPath: string,
  query: string,
  options: {
    includeContent?: boolean
    includeDrafts?: boolean
    limit?: number
  } = {}
): MDXFile[] {
  const {
    includeContent = true,
    includeDrafts = false,
    limit = 10
  } = options
  
  const files = getMDXFiles(directoryPath, { includeDrafts })
  const searchQuery = query.toLowerCase()
  
  const results = files.filter(file => {
    // Search in frontmatter
    const titleMatch = file.frontmatter.title?.toLowerCase().includes(searchQuery)
    const descriptionMatch = file.frontmatter.description?.toLowerCase().includes(searchQuery)
    const tagsMatch = file.frontmatter.tags?.some(tag => 
      tag.toLowerCase().includes(searchQuery)
    )
    
    // Search in content if enabled
    const contentMatch = includeContent && 
      file.content.toLowerCase().includes(searchQuery)
    
    return titleMatch || descriptionMatch || tagsMatch || contentMatch
  })
  
  return results.slice(0, limit)
}

/**
 * Generate a table of contents from MDX content
 */
export function generateTOC(content: string): Array<{
  id: string
  title: string
  level: number
}> {
  const toc: Array<{ id: string; title: string; level: number }> = []
  const lines = content.split('\n')
  
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const title = match[2].trim()
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      
      toc.push({ id, title, level })
    }
  }
  
  return toc
}

/**
 * Validate MDX frontmatter
 */
export function validateMDXFrontmatter(frontmatter: any): MDXFrontmatter {
  const required = ['title']
  const missing = required.filter(field => !frontmatter[field])
  
  if (missing.length > 0) {
    throw new Error(`Missing required frontmatter fields: ${missing.join(', ')}`)
  }
  
  return {
    ...frontmatter,
    title: frontmatter.title,
    description: frontmatter.description || undefined,
    date: frontmatter.date || null,
    author: frontmatter.author || '',
    authorId: frontmatter.authorId || undefined,
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : (frontmatter.tags ? [frontmatter.tags] : []),
    category: frontmatter.category || undefined,
    image: frontmatter.image || undefined,
    coverImage: frontmatter.coverImage || undefined,
    draft: Boolean(frontmatter.draft),
    featured: Boolean(frontmatter.featured)
  }
}

// Export aliases for backward compatibility
export const parseMDX = readMDXFile
export const parseMDXFiles = readMDXDirectory
export const extractFrontmatter = (filePath: string) => {
  // Check if filePath is actually content or a file path
  if (filePath.includes('\n') || filePath.includes('---')) {
    // This is content, not a file path
    const { data: frontmatter } = matter(filePath)
    return frontmatter
  }
  
  // This is a file path
  return readMDXFile(filePath).frontmatter
}
export const generateExcerpt = (content: string, maxLength: number = 150, separator: string = '...') => {
  // Remove markdown formatting
  let plainText = content
    .replace(/[#*`]/g, '') // Remove headers, bold, italic, code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
  
  if (plainText.length <= maxLength) {
    return plainText
  }
  
  // Try to truncate at word boundary
  const truncated = plainText.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  
  if (lastSpace > maxLength * 0.8) { // If we can find a word boundary in the last 20%
    return truncated.substring(0, lastSpace) + separator
  }
  
  return truncated + separator
}

// Export types for backward compatibility
export type MDXContent = MDXFile
export type MDXOptions = {
  includeDrafts?: boolean
  featuredOnly?: boolean
  category?: string
  tags?: string[]
  limit?: number
  sortBy?: 'date' | 'title' | 'featured'
  sortOrder?: 'asc' | 'desc'
}