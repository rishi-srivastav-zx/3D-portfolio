<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Sitemap | Rishi Srivastav</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            background-color: #09090b;
            color: #fafafa;
            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem 1rem;
            position: relative;
            overflow-x: hidden;
          }
          
          /* Modern ambient glowing background blur */
          .glow-bg {
            position: absolute;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            pointer-events: none;
            filter: blur(130px);
            z-index: 0;
            opacity: 0.15;
          }
          .glow-1 {
            background: #10b981;
            top: -100px;
            left: -100px;
          }
          .glow-2 {
            background: #6366f1;
            bottom: -150px;
            right: -100px;
          }

          .container {
            width: 100%;
            max-width: 800px;
            background: rgba(17, 17, 17, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            padding: 2.5rem;
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            z-index: 10;
            position: relative;
          }

          header {
            margin-bottom: 2.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 2rem;
          }
          .header-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
          }
          h1 {
            font-size: 2.2rem;
            font-weight: 800;
            background: linear-gradient(135deg, #a78bfa 0%, #34d399 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.03em;
          }
          .badge {
            background: rgba(99, 102, 241, 0.15);
            color: #818cf8;
            border: 1px solid rgba(99, 102, 241, 0.2);
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          p.desc {
            color: #a1a1aa;
            font-size: 0.95rem;
            max-width: 600px;
            margin-bottom: 1rem;
          }

          .stats {
            display: flex;
            gap: 1.5rem;
            margin-top: 1.5rem;
          }
          .stat-item {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.04);
            padding: 0.75rem 1.25rem;
            border-radius: 12px;
            font-size: 0.85rem;
            color: #d4d4d8;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .stat-count {
            font-weight: 700;
            color: #34d399;
          }

          .table-container {
            overflow-x: auto;
          }
          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 10px;
            margin-top: -10px;
          }
          th {
            text-align: left;
            padding: 1rem 1.25rem;
            color: #71717a;
            font-size: 0.75rem;
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 0.05em;
            border: none;
          }
          tr.url-row {
            background: rgba(255, 255, 255, 0.02);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 12px;
          }
          tr.url-row:hover {
            background: rgba(255, 255, 255, 0.05);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          }
          td {
            padding: 1.25rem;
            vertical-align: middle;
            font-size: 0.9rem;
            color: #e4e4e7;
            border-top: 1px solid rgba(255, 255, 255, 0.04);
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          }
          td:first-child {
            border-left: 1px solid rgba(255, 255, 255, 0.04);
            border-radius: 12px 0 0 12px;
          }
          td:last-child {
            border-right: 1px solid rgba(255, 255, 255, 0.04);
            border-radius: 0 12px 12px 0;
            text-align: right;
          }
          
          .url-link {
            color: #fafafa;
            text-decoration: none;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: color 0.2s ease;
          }
          .url-link:hover {
            color: #a78bfa;
          }
          .url-link svg {
            width: 14px;
            height: 14px;
            opacity: 0.5;
            transition: transform 0.2s ease, opacity 0.2s ease;
          }
          .url-link:hover svg {
            transform: translate(2px, -2px);
            opacity: 1;
          }

          .priority-container {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .priority-bar {
            width: 60px;
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 9999px;
            overflow: hidden;
            display: inline-block;
          }
          .priority-fill {
            height: 100%;
            border-radius: 9999px;
            background: linear-gradient(90deg, #6366f1, #34d399);
          }
          .priority-val {
            font-weight: 600;
            font-size: 0.8rem;
          }
          .freq-badge {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.2rem 0.5rem;
            border-radius: 6px;
            font-size: 0.75rem;
            text-transform: capitalize;
            color: #d4d4d8;
          }

          footer.info {
            margin-top: 3rem;
            text-align: center;
            font-size: 0.8rem;
            color: #52525b;
            width: 100%;
            max-width: 800px;
            z-index: 10;
          }
          footer.info a {
            color: #71717a;
            text-decoration: none;
            transition: color 0.2s ease;
          }
          footer.info a:hover {
            color: #a78bfa;
          }
        </style>
      </head>
      <body>
        <div class="glow-bg glow-1"></div>
        <div class="glow-bg glow-2"></div>

        <div class="container">
          <header>
            <div class="header-top">
              <h1>XML Sitemap</h1>
              <span class="badge">Google SEO ready</span>
            </div>
            <p class="desc">
              This XML Sitemap is dynamically designed for indexing and search engine optimization. Human visitors can easily navigate the website routes using the links below.
            </p>
            <div class="stats">
              <div class="stat-item">
                Total URLs: <span class="stat-count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
              </div>
              <div class="stat-item">
                Status: <span class="stat-count" style="color:#34d399">Active &amp; Live</span>
              </div>
            </div>
          </header>

          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th style="width: 50%;">URL Location</th>
                  <th style="width: 18%;">Change Freq</th>
                  <th style="width: 18%;">Priority</th>
                  <th style="width: 14%; text-align: right;">Last Mod</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr class="url-row">
                    <td>
                      <a class="url-link">
                        <xsl:attribute name="href">
                          <xsl:value-of select="sitemap:loc"/>
                        </xsl:attribute>
                        <xsl:value-of select="sitemap:loc"/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    </td>
                    <td>
                      <span class="freq-badge">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <div class="priority-container">
                        <div class="priority-bar">
                          <div class="priority-fill">
                            <xsl:attribute name="style">
                              width: <xsl:value-of select="sitemap:priority * 100"/>%
                            </xsl:attribute>
                          </div>
                        </div>
                        <span class="priority-val">
                          <xsl:value-of select="sitemap:priority * 100"/>%
                        </span>
                      </div>
                    </td>
                    <td style="text-align: right; white-space: nowrap;">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </div>

        <footer class="info">
          Managed by <a href="https://rishisrivastav3d.vercel.app/" target="_blank">Rishi Srivastav Portfolio</a> | Designed for Google, Bing, and Yahoo Search Engine Crawling.
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
