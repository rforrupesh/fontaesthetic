<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Sitemap | AestheticFonts</title>
        <style>
          :root{--bg:#f7f7fb;--card:#fff;--text:#1d1d2b;--muted:#6b6b80;--border:#e6e6ef;--primary:#6d4aff;--soft:#efeaff}
          @media(prefers-color-scheme:dark){:root{--bg:#0f0f17;--card:#171723;--text:#ececf5;--muted:#9a9ab0;--border:#2a2a3a;--primary:#9b82ff;--soft:#241f3d}}
          *{box-sizing:border-box}
          body{margin:0;background:var(--bg);color:var(--text);font:15px/1.55 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
          .wrap{max-width:1100px;margin:0 auto;padding:32px 20px 56px}
          h1{margin:0 0 6px;font-size:1.7rem}
          .sub{color:var(--muted);margin:0 0 20px}
          .stats{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:22px}
          .pill{background:var(--soft);color:var(--primary);padding:5px 12px;border-radius:999px;font-weight:600;font-size:.85rem}
          .card{background:var(--card);border:1px solid var(--border);border-radius:14px;overflow:hidden}
          .scroll{overflow-x:auto}
          table{width:100%;border-collapse:collapse;min-width:640px}
          th,td{padding:11px 16px;text-align:left;border-bottom:1px solid var(--border);white-space:nowrap}
          th{background:var(--soft);color:var(--muted);font-size:.74rem;text-transform:uppercase;letter-spacing:.05em}
          tr:last-child td{border-bottom:0}
          tbody tr:hover{background:var(--soft)}
          td.url{white-space:normal;word-break:break-all}
          a{color:var(--primary);text-decoration:none}
          a:hover{text-decoration:underline}
          .num{color:var(--muted);width:48px}
          .tag{background:var(--soft);color:var(--primary);border-radius:6px;padding:2px 8px;font-size:.78rem;font-weight:600}
          footer{margin-top:20px;color:var(--muted);font-size:.8rem;text-align:center}
        </style>
      </head>
      <body>
        <div class="wrap">
          <h1>AestheticFonts Sitemap</h1>
          <xsl:choose>
            <xsl:when test="sm:sitemapindex">
              <p class="sub">This is the sitemap index. It lists the sitemap files search engines crawl.</p>
              <div class="stats"><span class="pill"><xsl:value-of select="count(sm:sitemapindex/sm:sitemap)"/> sitemap files</span></div>
              <div class="card scroll">
                <table>
                  <thead><tr><th>#</th><th>Sitemap</th><th>Last modified</th></tr></thead>
                  <tbody>
                    <xsl:for-each select="sm:sitemapindex/sm:sitemap">
                      <tr>
                        <td class="num"><xsl:value-of select="position()"/></td>
                        <td class="url"><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
                        <td><xsl:value-of select="substring(sm:lastmod,1,10)"/></td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </div>
            </xsl:when>
            <xsl:otherwise>
              <p class="sub">All posts, pages and categories included for search engines.</p>
              <div class="stats"><span class="pill"><xsl:value-of select="count(sm:urlset/sm:url)"/> URLs</span></div>
              <div class="card scroll">
                <table>
                  <thead><tr><th>#</th><th>URL</th><th>Last modified</th><th>Change freq</th><th>Priority</th></tr></thead>
                  <tbody>
                    <xsl:for-each select="sm:urlset/sm:url">
                      <tr>
                        <td class="num"><xsl:value-of select="position()"/></td>
                        <td class="url"><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
                        <td><xsl:value-of select="substring(sm:lastmod,1,10)"/></td>
                        <td><span class="tag"><xsl:value-of select="sm:changefreq"/></span></td>
                        <td><xsl:value-of select="sm:priority"/></td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </div>
            </xsl:otherwise>
          </xsl:choose>
          <footer>aestheticfonts.in</footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
