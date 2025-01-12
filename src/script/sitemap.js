// sitemap.js
const fs = require('fs');
const globby = require('globby');
const prettier = require('prettier');
const config = require('config/config.js');
const path = require('path');

async function generateSitemap() {
    try {
        const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
        
        // Find all pages and posts
        const pages = await globby([
            'app/*.js',
            'posts/**/*.mdx',
            'posts/**/*.md',
        ]);

        const sitemap = `
            <?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${pages
                    .map((page) => {
                        // Skip dynamic routes and 404 page
                        if (page === `app/404.js` || page === `app/blog/[...slug].js`) {
                            return null;
                        }

                        // Process the path
                        const path = page
                            .replace('app/', '/')
                            .replace('posts/', '/blog/')
                            .replace('.js', '')
                            .replace('.mdx', '')
                            .replace('.md', '')
                            .replace('/feed.xml', '');
                            
                        const route = path === '/index' ? '' : path;

                        return `
                            <url>
                                <loc>${config.siteUrl}${route}</loc>
                                <lastmod>${new Date().toISOString()}</lastmod>
                                <changefreq>monthly</changefreq>
                                <priority>1.0</priority>
                            </url>
                        `;
                    })
                    .filter(Boolean)
                    .join('')}
            </urlset>
        `;

        // Format with prettier
        const formatted = await prettier.format(sitemap, {
            ...prettierConfig,
            parser: 'html',
        });

        // Write the sitemap
        const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
        fs.writeFileSync(outputPath, formatted);
        
        console.log('Sitemap generated successfully!');
    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
}

generateSitemap();