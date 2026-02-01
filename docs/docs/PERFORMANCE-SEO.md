# Performance & SEO Optimalisaties

## ✅ Geïmplementeerde Optimalisaties

### 🚀 Performance

#### 1. Font Optimization
- **Display Swap Strategy**: Voorkomt FOIT (Flash of Invisible Text)
- **Preloading**: Kritieke fonts worden direct geladen
- **Variable Font**: Inter font met CSS variables

#### 2. Bundle Optimization
- **Webpack Bundle Analyzer**: Ingebouwd
- **Tree Shaking**: Automatisch door Next.js
- **Package Import Optimization**: Lucide-react en Radix UI geoptimaliseerd
- **Dynamic Imports**: Canvas-confetti lazy loaded (alleen bij claim submit)

**Bundle Analyzer gebruiken:**
```bash
npm run analyze
# Output: /analyze/client.html
```

#### 3. Image Optimization
- **Next.js Image**: Auto WebP/AVIF conversie
- **Responsive Sizes**: Optimized voor alle devices
- **Lazy Loading**: Automatisch voor images below fold

#### 4. Next.js Config
- **Compression**: Gzip/Brotli enabled
- **Source Maps**: Disabled in productie
- **React Strict Mode**: Enabled voor betere practices

### 📈 SEO

#### 1. Sitemap
- **Automatisch gegenereerd**: `/sitemap.xml`
- **Bevat**: Alle statische pages
- **Update frequentie**: Homepage weekly, rest monthly

**Valideer:** https://www.xml-sitemaps.com/validate-xml-sitemap.html

#### 2. Robots.txt
- **Automatisch gegenereerd**: `/robots.txt`
- **Blocked**: Dashboard, API routes
- **Allowed**: Alle publieke pages
- **Sitemap referentie**: Included

#### 3. Open Graph & Twitter Cards
- **Alle pages**: OG tags voor social sharing
- **Image**: 1200x630 og-image.jpg (TODO: aanmaken)
- **Type**: Website
- **Locale**: nl_NL

**Test:** https://www.opengraph.xyz/

#### 4. Structured Data (JSON-LD)
- **LocalBusiness**: Bedrijfsinformatie
- **WebSite**: Site metadata
- **Service**: Aangeboden diensten
- **Opening Hours**: Ma-Vr 09:00-17:00
- **Address**: Einsteinlaan 28, Rijswijk

**Valideer:** https://search.google.com/test/rich-results

#### 5. Meta Tags
- **Title Templates**: Consistent branding
- **Descriptions**: Unique per page
- **Keywords**: Relevant search terms
- **Canonical URLs**: Duplicate content voorkomen
- **Robots directives**: Index/follow configuratie

---

## 📊 Performance Monitoring

### Huidige Status
- ✅ Sitemap & Robots.txt
- ✅ Open Graph & Twitter Cards
- ✅ Structured Data (JSON-LD)
- ✅ Font optimization
- ✅ Bundle analyzer setup
- ✅ Dynamic imports voor heavy libraries

### Tools om te Testen
1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
2. **GTmetrix**: https://gtmetrix.com/
3. **WebPageTest**: https://www.webpagetest.org/
4. **Lighthouse**: In Chrome DevTools (F12)

### Target Scores
- **Performance**: 90+ (mobile), 95+ (desktop)
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

---

## 🔮 Toekomstige Optimalisaties

### Performance
- [ ] Redis caching voor database queries
- [ ] CDN voor static assets (Vercel doet dit al deels)
- [ ] Service Worker voor offline support
- [ ] Prefetching voor belangrijke routes

### SEO
- [ ] Blog/FAQ content voor long-tail keywords
- [ ] Backlink strategie
- [ ] Google My Business listing
- [ ] Schema markup voor FAQ's
- [ ] Review aggregation (AggregateRating schema)

### Monitoring
- [ ] Vercel Analytics integratie
- [ ] Google Search Console setup
- [ ] Core Web Vitals monitoring
- [ ] Real User Monitoring (RUM)

---

## 🎯 Snelle Checks

### Performance Check (na deployment):
```bash
# Lighthouse CLI
npx lighthouse https://www.autoschadebureau.nl --view

# Bundle size
npm run analyze
```

### SEO Check (na deployment):
- Sitemap: https://www.autoschadebureau.nl/sitemap.xml
- Robots: https://www.autoschadebureau.nl/robots.txt
- Structured Data: https://search.google.com/test/rich-results?url=https://www.autoschadebureau.nl

---

## 📝 TODO's

- [ ] **OG Image aanmaken** (1200x630, zie `/public/og-image-placeholder.md`)
- [ ] **Google Search Console** setup en sitemap indienen
- [ ] **Performance baseline** meten met Lighthouse
- [ ] **Alt tags** voor toekomstige images

---

*Laatste update: 23 januari 2026*
