import { readFileSync, existsSync, readdirSync } from 'fs'
import { join, extname } from 'path'
import matter from 'gray-matter'
import fs from 'fs/promises'
import path from 'path'

export interface MDXFile {
  slug: string
  content: string
  frontmatter: {
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
    readTime?: string
    [key: string]: any
  }
}

/**
 * Read MDX file with frontmatter
 */
export function readMDXFile(filePath: string): MDXFile {
  const fileContent = readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(fileContent)
  const slug = filePath.split('/').pop()?.replace('.mdx', '') || ''

  return {
    slug,
    content,
    frontmatter: frontmatter as MDXFile['frontmatter']
  }
}

/**
 * Read all MDX files from directory
 */
export function readMDXDirectory(dirPath: string): MDXFile[] {
  if (!existsSync(dirPath)) {
    return []
  }

  const files = readdirSync(dirPath)
  const mdxFiles = files.filter(file => extname(file) === '.mdx')

  return mdxFiles.map(file => {
    const filePath = join(dirPath, file)
    return readMDXFile(filePath)
  })
}

/**
 * Get content path based on environment
 */
function getContentPath(): string {
  return join(process.cwd(), 'apps', 'landing', '_content')
}

/**
 * Read blog posts
 */
export async function getBlogPosts(): Promise<MDXFile[]> {
  const contentPath = getContentPath()
  const blogPath = join(contentPath, 'blog')
  return readMDXDirectory(blogPath)
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
 * Read docs pages
 */
export async function getDocsPages(): Promise<MDXFile[]> {
  const contentPath = getContentPath()
  const docsPath = join(contentPath, 'docs')
  return readMDXDirectory(docsPath)
}

/**
 * Read single docs page by slug
 */
export async function getDocsPage(slug: string): Promise<MDXFile | null> {
  const contentPath = getContentPath()
  const docsPath = join(contentPath, 'docs')
  const filePath = join(docsPath, `${slug}.mdx`)
  
  if (!existsSync(filePath)) {
    return null
  }
  
  return readMDXFile(filePath)
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

// Конфигурация из site.config.json
const DEFAULT_LOCALE = 'en'
const CONTENT_ROOT = path.join(process.cwd(), 'apps', 'landing', '_content')

/**
 * Читает локализованный MDX файл с фолбэком на язык по умолчанию.
 * @param contentType - Тип контента (e.g., 'blog', 'legal').
 * @param slug - Слаг документа.
 * @param locale - Запрошенная локаль.
 */
export async function readLocalizedMdx(contentType: string, slug: string, locale: string): Promise<string> {
  const localizedPath = path.join(CONTENT_ROOT, contentType, `${slug}.${locale}.mdx`)
  
  try {
    // 1. Пытаемся прочитать файл для текущей локали
    return await fs.readFile(localizedPath, 'utf-8')
  } catch (error) {
    // 2. Если не получилось и это не дефолтная локаль, ищем дефолтный файл
    if (locale !== DEFAULT_LOCALE) {
      console.warn(`Content for '${slug}' in locale '${locale}' not found. Falling back to '${DEFAULT_LOCALE}'.`)
      const fallbackPath = path.join(CONTENT_ROOT, contentType, `${slug}.${DEFAULT_LOCALE}.mdx`)
      try {
        return await fs.readFile(fallbackPath, 'utf-8')
      } catch (fallbackError) {
        throw new Error(`Content not found for slug '${slug}' in locale '${locale}' or fallback '${DEFAULT_LOCALE}'.`)
      }
    }
    // 3. Если искали дефолтный и не нашли, бросаем ошибку
    throw error
  }
}

/**
 * Читает локализованный JSON файл с фолбэком на язык по умолчанию.
 * @param contentType - Тип контента (e.g., 'blog', 'legal').
 * @param slug - Слаг документа.
 * @param locale - Запрошенная локаль.
 */
export async function readLocalizedJson<T = any>(contentType: string, slug: string, locale: string): Promise<T> {
  const localizedPath = path.join(CONTENT_ROOT, contentType, `${slug}.${locale}.json`)
  
  try {
    // 1. Пытаемся прочитать файл для текущей локали
    const content = await fs.readFile(localizedPath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    // 2. Если не получилось и это не дефолтная локаль, ищем дефолтный файл
    if (locale !== DEFAULT_LOCALE) {
      console.warn(`Content for '${slug}' in locale '${locale}' not found. Falling back to '${DEFAULT_LOCALE}'.`)
      const fallbackPath = path.join(CONTENT_ROOT, contentType, `${slug}.${DEFAULT_LOCALE}.json`)
      try {
        const content = await fs.readFile(fallbackPath, 'utf-8')
        return JSON.parse(content)
      } catch (fallbackError) {
        throw new Error(`Content not found for slug '${slug}' in locale '${locale}' or fallback '${DEFAULT_LOCALE}'.`)
      }
    }
    // 3. Если искали дефолтный и не нашли, бросаем ошибку
    throw error
  }
}

/**
 * Проверяет существование локализованного файла.
 * @param contentType - Тип контента.
 * @param slug - Слаг документа.
 * @param locale - Локаль.
 */
export async function fileExists(contentType: string, slug: string, locale: string): Promise<boolean> {
  const filePath = path.join(CONTENT_ROOT, contentType, `${slug}.${locale}.mdx`)
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

/**
 * Получает список доступных файлов для указанного типа контента и локали.
 * @param contentType - Тип контента.
 * @param locale - Локаль.
 */
export async function getAvailableFiles(contentType: string, locale: string): Promise<string[]> {
  const contentTypePath = path.join(CONTENT_ROOT, contentType)
  
  try {
    const files = await fs.readdir(contentTypePath)
    return files
      .filter(file => file.endsWith(`.${locale}.mdx`) || file.endsWith(`.${locale}.json`))
      .map(file => file.replace(`.${locale}.mdx`, '').replace(`.${locale}.json`, ''))
  } catch (error) {
    return []
  }
}

/**
 * Читает JSON файл синхронно
 * @param filePath - Путь к файлу
 */
export function readJSONFile(filePath: string): any {
  try {
    const content = readFileSync(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.error(`Failed to read JSON file: ${filePath}`, error)
    return {}
  }
}

/**
 * Read experts pages
 */
export async function getExperts(): Promise<MDXFile[]> {
  const contentPath = getContentPath()
  const expertsPath = join(contentPath, 'experts')
  return readMDXDirectory(expertsPath)
}
