export async function GET() {
    return new Response(
        `
		<?xml version="1.0" encoding="UTF-8"?>

        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://difff.app/</loc>
            <lastmod>2024-02-19</lastmod>
            <changefreq>yearly</changefreq>
            <priority>1.0</priority>
        </url>
        
        <url>
            <loc>http://difff.app/</loc>
            <lastmod>2024-03-01</lastmod>
            <changefreq>yearly</changefreq>
            <priority>1.0</priority>
        </url>

        <url>
            <loc>https://difff.app/changelog</loc>
            <lastmod>2024-02-21</lastmod>
            <changefreq>weekly</changefreq>
            <priority>6.0</priority>
        </url>

        <url>
            <loc>https://difff.app/changelog/10-02-2024</loc>
            <lastmod>2024-02-22</lastmod>
            <changefreq>yearly</changefreq>
            <priority>7.0</priority>
        </url>


        <url>
            <loc>https://difff.app/formatter/yaml</loc>
            <lastmod>2024-02-28</lastmod>
            <changefreq>yearly</changefreq>
            <priority>1.0</priority>
        </url>
        </urlset> `.trim(),
        {
            headers: {
                "Content-Type": "application/xml"
            }
        }
    );
}
