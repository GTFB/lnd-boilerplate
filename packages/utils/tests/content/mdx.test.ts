import { describe, it, expect, mock } from 'bun:test'
import {
  parseMDX,
  extractFrontmatter,
  validateMDXFrontmatter,
  generateExcerpt,
  parseMDXFiles,
  type MDXContent,
  type MDXOptions
} from '../../src/content/mdx'

// Mock gray-matter
const mockMatter = mock(() => ({
  content: 'This is the content',
  data: { title: 'Test Article', author: 'John Doe' },
  excerpt: 'This is an excerpt'
}))

// Mock the gray-matter import
mock.module('gray-matter', () => ({
  default: mockMatter
}))

describe('MDX Utils', () => {
  describe('parseMDX', () => {
    it('should parse MDX content with frontmatter', () => {
      const source = `---
title: Test Article
author: John Doe
---

This is the content.`

      const result = parseMDX(source)

      expect(mockMatter).toHaveBeenCalledWith(source, {})
      expect(result).toEqual({
        content: 'This is the content',
        data: { title: 'Test Article', author: 'John Doe' },
        excerpt: 'This is an excerpt'
      })
    })

    it('should parse MDX with custom options', () => {
      const source = `---
title: Test Article
---

This is the content.`
      const options: MDXOptions = {
        excerpt: true,
        excerpt_separator: '<!--more-->'
      }

      const result = parseMDX(source, options)

      expect(mockMatter).toHaveBeenCalledWith(source, options)
      expect(result).toEqual({
        content: 'This is the content',
        data: { title: 'Test Article', author: 'John Doe' },
        excerpt: 'This is an excerpt'
      })
    })

    it('should handle empty source', () => {
      const result = parseMDX('')

      expect(mockMatter).toHaveBeenCalledWith('', {})
      expect(result).toEqual({
        content: 'This is the content',
        data: { title: 'Test Article', author: 'John Doe' },
        excerpt: 'This is an excerpt'
      })
    })

    it('should handle source without frontmatter', () => {
      const source = 'This is just content without frontmatter.'

      const result = parseMDX(source)

      expect(mockMatter).toHaveBeenCalledWith(source, {})
      expect(result).toEqual({
        content: 'This is the content',
        data: { title: 'Test Article', author: 'John Doe' },
        excerpt: 'This is an excerpt'
      })
    })
  })

  describe('extractFrontmatter', () => {
    it('should extract frontmatter data only', () => {
      const source = `---
title: Test Article
author: John Doe
tags: [test, article]
---

This is the content.`

      const result = extractFrontmatter(source)

      expect(mockMatter).toHaveBeenCalledWith(source)
      expect(result).toEqual({ title: 'Test Article', author: 'John Doe' })
    })

    it('should return empty object for content without frontmatter', () => {
      const source = 'This is just content without frontmatter.'

      const result = extractFrontmatter(source)

      expect(mockMatter).toHaveBeenCalledWith(source)
      expect(result).toEqual({ title: 'Test Article', author: 'John Doe' })
    })
  })

  describe('validateMDXFrontmatter', () => {
    it('should validate when all required fields are present', () => {
      const data = {
        title: 'Test Article',
        author: 'John Doe',
        date: '2024-01-01'
      }

      const result = validateMDXFrontmatter(data)

      expect(result.title).toBe('Test Article')
      expect(result.author).toBe('John Doe')
      expect(result.date).toBe('2024-01-01')
    })

    it('should detect missing required fields', () => {
      const data = {
        title: 'Test Article'
      }

      expect(() => validateMDXFrontmatter(data)).toThrow('Missing required frontmatter fields: author')
    })

    it('should handle empty data object', () => {
      const data = {}

      expect(() => validateMDXFrontmatter(data)).toThrow('Missing required frontmatter fields: title')
    })

    it('should handle empty required fields array', () => {
      const data = {
        title: 'Test Article',
        author: 'John Doe'
      }

      const result = validateMDXFrontmatter(data)

      expect(result.title).toBe('Test Article')
      expect(result.author).toBe('John Doe')
    })

    it('should handle falsy values as missing', () => {
      const data = {
        title: 'Test Article',
        author: '',
        date: null,
        tags: undefined
      }

      const result = validateMDXFrontmatter(data)

      expect(result.title).toBe('Test Article')
      expect(result.author).toBe('')
      expect(result.date).toBe(null)
      expect(result.tags).toEqual([])
    })
  })

  describe('generateExcerpt', () => {
    it('should generate excerpt from plain text', () => {
      const content = 'This is a simple article about web development and modern frameworks.'
      const result = generateExcerpt(content, 50)

      expect(result).toBe('This is a simple article about web development...')
    })

    it('should remove markdown images', () => {
      const content = 'This is an article with ![alt text](image.jpg) an image in it.'
      const result = generateExcerpt(content, 100)

      expect(result).toBe('This is an article with  an image in it.')
    })

    it('should convert markdown links to text', () => {
      const content = 'This is an article with [a link](https://example.com) in it.'
      const result = generateExcerpt(content, 100)

      expect(result).toBe('This is an article with a link in it.')
    })

    it('should remove markdown formatting', () => {
      const content = 'This is **bold** and *italic* and `code` text.'
      const result = generateExcerpt(content, 100)

      expect(result).toBe('This is bold and italic and code text.')
    })

    it('should replace newlines with spaces', () => {
      const content = 'This is\na multi-line\narticle content.'
      const result = generateExcerpt(content, 100)

      expect(result).toBe('This is a multi-line article content.')
    })

    it('should return full content if shorter than max length', () => {
      const content = 'Short content.'
      const result = generateExcerpt(content, 100)

      expect(result).toBe('Short content.')
    })

    it('should truncate at word boundary when possible', () => {
      const content = 'This is a longer article that should be truncated at a word boundary.'
      const result = generateExcerpt(content, 30)

      expect(result).toBe('This is a longer article that...')
    })

    it('should truncate at character boundary when no word boundary found', () => {
      const content = 'ThisIsAVeryLongWordWithoutSpacesThatCannotBeTruncatedAtWordBoundary'
      const result = generateExcerpt(content, 20)

      expect(result).toBe('ThisIsAVeryLongWordW...')
    })

    it('should use custom separator', () => {
      const content = 'This is an article with custom separator.'
      const result = generateExcerpt(content, 20, '-')

      expect(result).toBe('This is an article w...')
    })

    it('should handle empty content', () => {
      const result = generateExcerpt('', 100)

      expect(result).toBe('')
    })

    it('should handle content with only whitespace', () => {
      const result = generateExcerpt('   \n  \t  ', 100)

      expect(result).toBe('')
    })

    it('should handle very short max length', () => {
      const content = 'This is a test article.'
      const result = generateExcerpt(content, 5)

      expect(result).toBe('This...')
    })
  })

  describe('parseMDXFiles', () => {
    // Mock fetch
    const mockFetch = mock(() => Promise.resolve({
      text: () => Promise.resolve(`---
title: Test Article
---

This is the content.`)
    }))

    // Mock global fetch
    global.fetch = mockFetch as any

    it('should parse multiple MDX files', async () => {
      const files = ['/path/to/file1.mdx', '/path/to/file2.mdx']
      
      const result = await parseMDXFiles(files)

      expect(mockFetch).toHaveBeenCalledTimes(2)
      expect(mockFetch).toHaveBeenCalledWith('/path/to/file1.mdx')
      expect(mockFetch).toHaveBeenCalledWith('/path/to/file2.mdx')
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        content: 'This is the content',
        data: { title: 'Test Article', author: 'John Doe' },
        excerpt: 'This is an excerpt',
        filepath: '/path/to/file1.mdx'
      })
      expect(result[1]).toEqual({
        content: 'This is the content',
        data: { title: 'Test Article', author: 'John Doe' },
        excerpt: 'This is an excerpt',
        filepath: '/path/to/file2.mdx'
      })
    })

    it('should handle empty files array', async () => {
      const result = await parseMDXFiles([])

      expect(result).toEqual([])
    })

    it('should handle fetch errors gracefully', async () => {
      const mockFetchError = mock(() => Promise.reject(new Error('Network error')))
      global.fetch = mockFetchError as any

      const files = ['/path/to/error.mdx']
      
      const result = await parseMDXFiles(files)

      expect(result).toEqual([])
    })

    it('should pass options to parseMDX', async () => {
      const files = ['/path/to/file.mdx']
      const options: MDXOptions = {
        excerpt: true,
        excerpt_separator: '<!--more-->'
      }

      const result = await parseMDXFiles(files, options)

      expect(mockMatter).toHaveBeenCalledWith(
        `---
title: Test Article
---

This is the content.`,
        options
      )
    })

    it('should handle mixed success and failure', async () => {
      const mockFetchMixed = mock((url: string) => {
        if (url.includes('error')) {
          return Promise.reject(new Error('Network error'))
        }
        return Promise.resolve({
          text: () => Promise.resolve(`---
title: Test Article
---

This is the content.`)
        })
      })
      global.fetch = mockFetchMixed as any

      const files = ['/path/to/success.mdx', '/path/to/error.mdx', '/path/to/another-success.mdx']
      
      const result = await parseMDXFiles(files)

      expect(result).toHaveLength(2) // Only successful files
      expect(result[0].filepath).toBe('/path/to/success.mdx')
      expect(result[1].filepath).toBe('/path/to/another-success.mdx')
    })
  })
})
