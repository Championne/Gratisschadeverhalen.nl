# WordPress Headless CMS Setup

Deze documentatie beschrijft hoe je WordPress koppelt aan de Gratisschadeverhalen.nl Next.js website.

## Architectuur

```
┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│  WORDPRESS (Antagonist)         │     │  NEXT.JS (Vercel)               │
│  autoschadebedrijf.nl           │     │  autoschadebureau.nl            │
│                                 │     │                                 │
│  - Content beheer               │ API │  - Website rendering            │
│  - SEO expert beheert           │────►│  - Bezoekers zien dit           │
│  - Media library                │     │  - Cached content (ISR)         │
│                                 │     │                                 │
└─────────────────────────────────┘     └─────────────────────────────────┘
```

## WordPress Setup (Antagonist)

### 1. Hosting & Installatie

1. Bestel WordPress hosting bij Antagonist
2. Installeer WordPress via DirectAdmin
3. Configureer SSL certificaat
4. Koppel domein (bijv. `autoschadebedrijf.nl` of `cms.autoschadebureau.nl`)

### 2. Verplichte Plugins

Installeer deze plugins via WordPress Admin > Plugins > Nieuwe toevoegen:

| Plugin | Doel | Link |
|--------|------|------|
| **Yoast SEO** | SEO metadata via API | Gratis in plugin store |
| **Advanced Custom Fields (ACF)** | Custom velden | Gratis in plugin store |
| **ACF to REST API** | ACF data in REST API | Gratis in plugin store |

### 3. ACF Velden Configureren

Ga naar WordPress Admin > ACF > Veldgroepen > Nieuw:

**Veldgroep: "Blog Post Extra Velden"**

| Veld Label | Veld Naam | Type | Opties |
|------------|-----------|------|--------|
| Leestijd | `leestijd` | Tekst | Placeholder: "5 min" |
| Featured | `featured` | True/False | - |
| Categorie | `categorie` | Select | Handleiding, Praktisch, Juridisch, Financieel, Verzekeringen |

**Locatie:** Post Type = Post

### 4. Permalinks Instellen

Ga naar Instellingen > Permalinks:
- Kies: **Berichtnaam** (`/%postname%/`)
- Opslaan

### 5. REST API Testen

Test of de API werkt:
```
https://autoschadebedrijf.nl/wp-json/wp/v2/posts
```

Je zou een JSON array met posts moeten zien.

## Next.js Configuratie

### 1. Environment Variable

Voeg toe aan `.env.local` (en Vercel):

```env
WORDPRESS_API_URL=https://autoschadebedrijf.nl
```

### 2. Vercel Environment Variables

1. Ga naar Vercel Dashboard > Project > Settings > Environment Variables
2. Voeg toe:
   - Name: `WORDPRESS_API_URL`
   - Value: `https://autoschadebedrijf.nl`
   - Environment: Production, Preview, Development

### 3. Deploy

Na het toevoegen van de environment variable, redeploy de site:
```bash
vercel --prod
```

## Hoe Het Werkt

### Hybride Content Systeem

De site gebruikt een hybride systeem:

1. **WordPress geconfigureerd?** → Haalt content van WordPress API
2. **Geen WordPress?** → Gebruikt hardcoded fallback posts

```typescript
import { getContentPosts } from '@/lib/wordpress'

const { posts, source } = await getContentPosts()
// source = 'wordpress' of 'fallback'
```

### Caching (ISR)

- Content wordt gecached voor 5 minuten
- Na 5 minuten wordt content opnieuw opgehaald
- Bezoekers zien altijd cached versie (snel!)

### Bestaande Posts

De hardcoded blog posts (50+) blijven werken:
- Ze hebben hun eigen TSX bestanden in `/app/blog/[slug]/page.tsx`
- WordPress posts gebruiken `/app/blog/wp/[slug]/page.tsx`
- Geen conflict tussen beide

## Content Workflow

### Voor de SEO Expert

1. Log in op WordPress (`autoschadebedrijf.nl/wp-admin`)
2. Ga naar Berichten > Nieuw
3. Schrijf artikel met:
   - Titel
   - Content (Gutenberg editor)
   - Uitgelichte afbeelding
   - Yoast SEO metadata
   - ACF velden (leestijd, featured, categorie)
4. Publiceer
5. Binnen 5 minuten live op de website

### Preview (Optioneel)

Voor preview functionaliteit vóór publicatie:
1. Installeer JWT Authentication plugin
2. Configureer Next.js Draft Mode
3. (Geavanceerd - later implementeren)

## Troubleshooting

### API Geeft 404
- Check of permalinks op "Berichtnaam" staan
- Flush permalinks: Instellingen > Permalinks > Opslaan

### ACF Velden Niet Zichtbaar
- Check of "ACF to REST API" plugin actief is
- Check of veldgroep toegewezen is aan Posts

### CORS Errors
Voeg toe aan WordPress `functions.php`:
```php
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET');
        header('Access-Control-Allow-Headers: Content-Type');
        return $value;
    });
}, 15);
```

### Content Niet Bijgewerkt
- Wacht 5 minuten (ISR cache)
- Of trigger revalidation via Vercel dashboard

## Volgende Stappen

1. [ ] WordPress installeren op Antagonist
2. [ ] Plugins installeren
3. [ ] ACF velden configureren
4. [ ] Test post maken
5. [ ] Environment variable toevoegen aan Vercel
6. [ ] Testen op productie

## Contact

Bij vragen over de technische implementatie, neem contact op met de developer.
