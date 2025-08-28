/**
 * Image utilities for LND Boilerplate
 */

export interface ImageConfig {
  width: number
  height: number
  quality?: number
  format?: 'webp' | 'jpeg' | 'png'
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
  crop?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'entropy' | 'attention'
}

export interface UnsplashImageConfig extends ImageConfig {
  blur?: number
  grayscale?: boolean
  saturation?: number
}

/**
 * Generate Unsplash image URL with parameters
 */
export function generateUnsplashUrl(
  photoId: string,
  config: UnsplashImageConfig
): string {
  const params = new URLSearchParams()
  
  if (config.width) params.append('w', config.width.toString())
  if (config.height) params.append('h', config.height.toString())
  if (config.quality) params.append('q', config.quality.toString())
  if (config.fit) params.append('fit', config.fit)
  if (config.crop) params.append('crop', config.crop)
  if (config.blur) params.append('blur', config.blur.toString())
  if (config.grayscale) params.append('grayscale', '1')
  if (config.saturation) params.append('sat', config.saturation.toString())
  
  return `https://images.unsplash.com/photo-${photoId}?${params.toString()}`
}

/**
 * Generate placeholder image URL
 */
export function generatePlaceholderUrl(
  width: number,
  height: number,
  text?: string,
  bgColor?: string,
  textColor?: string
): string {
  const params = new URLSearchParams()
  params.append('size', `${width}x${height}`)
  if (text) params.append('text', text)
  if (bgColor) params.append('bg', bgColor)
  if (textColor) params.append('color', textColor)
  
  return `https://via.placeholder.com/${params.toString()}`
}

/**
 * Validate image URL
 */
export function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

/**
 * Get image dimensions from URL parameters
 */
export function getImageDimensionsFromUrl(url: string): { width?: number; height?: number } {
  try {
    const parsed = new URL(url)
    const width = parsed.searchParams.get('w')
    const height = parsed.searchParams.get('h')
    
    return {
      width: width ? parseInt(width, 10) : undefined,
      height: height ? parseInt(height, 10) : undefined
    }
  } catch {
    return {}
  }
}

/**
 * Generate responsive image URLs for different breakpoints
 */
export function generateResponsiveImageUrls(
  baseUrl: string,
  breakpoints: { [key: string]: number }
): { [key: string]: string } {
  const urls: { [key: string]: string } = {}
  
  Object.entries(breakpoints).forEach(([breakpoint, width]) => {
    try {
      const url = new URL(baseUrl)
      url.searchParams.set('w', width.toString())
      urls[breakpoint] = url.toString()
    } catch {
      urls[breakpoint] = baseUrl
    }
  })
  
  return urls
}

/**
 * Default image breakpoints
 */
export const DEFAULT_IMAGE_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

/**
 * Generate srcset string for responsive images
 */
export function generateSrcSet(
  baseUrl: string,
  breakpoints: { [key: string]: number } = DEFAULT_IMAGE_BREAKPOINTS
): string {
  const urls = generateResponsiveImageUrls(baseUrl, breakpoints)
  
  return Object.entries(urls)
    .map(([breakpoint, url]) => `${url} ${breakpoints[breakpoint]}w`)
    .join(', ')
}

/**
 * Get image file extension from URL
 */
export function getImageExtension(url: string): string | null {
  try {
    const parsed = new URL(url)
    const pathname = parsed.pathname
    const extension = pathname.split('.').pop()?.toLowerCase()
    
    if (extension && ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(extension)) {
      return extension
    }
    
    return null
  } catch {
    return null
  }
}

/**
 * Check if image format is supported
 */
export function isSupportedImageFormat(format: string): boolean {
  const supportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg']
  return supportedFormats.includes(format.toLowerCase())
}

/**
 * Generate image alt text from filename
 */
export function generateAltText(filename: string): string {
  return filename
    .replace(/[_-]/g, ' ')
    .replace(/\.[^/.]+$/, '')
    .replace(/\b\w/g, l => l.toUpperCase())
}
