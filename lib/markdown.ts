import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const contentDirectory = path.join(process.cwd(), 'content/blog-drafts')

export interface BlogPost {
  slug: string
  title: string
  description: string
  keywords: string[]
  image: string
  date: string
  author: string
  content: string
  htmlContent: string
}

export function getAllBlogSlugs(): string[] {
  try {
    const files = fs.readdirSync(contentDirectory)
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''))
  } catch {
    return []
  }
}

// Helper function to normalize keywords to array
function normalizeKeywords(keywords: unknown): string[] {
  if (Array.isArray(keywords)) {
    return keywords.map(k => String(k))
  }
  if (typeof keywords === 'string') {
    return keywords.split(',').map(k => k.trim()).filter(k => k.length > 0)
  }
  return []
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    const { data, content } = matter(fileContents)
    const htmlContent = marked(content) as string
    
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      keywords: normalizeKeywords(data.keywords),
      image: data.image || '/images/blog-default.jpg',
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'Gratisschadeverhalen.nl',
      content,
      htmlContent
    }
  } catch {
    return null
  }
}
