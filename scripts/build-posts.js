import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, '../posts');
const outputDir = path.join(__dirname, '../public/posts');
const metadataPath = path.join(__dirname, '../public/posts-metadata.json');

// Ensure output directories exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(path.dirname(metadataPath))) {
  fs.mkdirSync(path.dirname(metadataPath), { recursive: true });
}

// Read all markdown files from posts directory
const postFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));

const posts = [];

postFiles.forEach(file => {
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Parse frontmatter
  const { data, content: markdownContent } = matter(content);
  


  // Convert markdown to HTML
  const htmlContent = marked(markdownContent);
  
  // Generate URL-friendly slug (kebab-case)
  const slug = file.replace('.md', '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const outputFile = `${slug}.html`;
  const outputPath = path.join(outputDir, outputFile);
  
  // Format date nicely
  const dateValue = data.date instanceof Date ? data.date : new Date(data.date);
  const formattedDate = dateValue.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long',  
    day: 'numeric' 
  });
  
  // Read template
  const templatePath = path.join(__dirname, 'post-template.html');
  let template = fs.readFileSync(templatePath, 'utf-8');
  
  // Replace template placeholders
  const postHtml = template
    .replace(/\{\{TITLE\}\}/g, data.title)
    .replace('{{DATE}}', formattedDate)
    .replace('{{CONTENT}}', htmlContent)
      
  // Write to output
  fs.writeFileSync(outputPath, postHtml);
  console.log(`✓ Generated ${outputFile}`);
  
  // Add to posts metadata
  // Format date consistently (remove time portion if Date object)
  const dateStr = data.date instanceof Date 
    ? data.date.toISOString().split('T')[0]
    : String(data.date);
  
  posts.push({
    slug,
    title: data.title,
    date: dateStr,
    author: data.author || 'Osman Sarper Kucuk',
    excerpt: data.excerpt || extractExcerpt(markdownContent),
    });
});

// Sort posts by date (newest first)
posts.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB - dateA;
});

// Write metadata file to public directory
fs.writeFileSync(metadataPath, JSON.stringify(posts, null, 2));
console.log(`\n✓ Generated posts metadata (${posts.length} posts)`);

// Helper function to extract excerpt from markdown
function extractExcerpt(markdown) {
  const text = markdown.replace(/[#*`]/g, '').trim();
  return text.substring(0, 150) + (text.length > 150 ? '...' : '');
}
