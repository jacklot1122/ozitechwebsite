# OzisTech Website

High-converting website built for Meta Ads traffic. Mobile-first, speed-optimised, and designed to convert visitors into leads.

## 📁 File Structure

```
ozitechwebsite/
├── index.html          # Main landing page (single-page site)
├── portfolio.html      # Dedicated portfolio page
├── styles.css          # All CSS styles
├── script.js           # Interactive functionality
├── assets/
│   └── logo.png        # Add your logo here
└── README.md           # This file
```

## 🚀 Quick Start

1. **Add your logo**: Save your OzisTech logo as `assets/logo.png`
2. **Update contact details** in the footer of both HTML files:
   - Email address
   - Phone number
   - ABN
3. **Open `index.html`** in a browser to preview

## 📝 What to Update Before Launch

### Required Updates
- [ ] Add logo to `assets/logo.png`
- [ ] Update email: `hello@ozistech.com.au` → your real email
- [ ] Update phone: `0400 000 000` → your real phone
- [ ] Add your ABN in footer
- [ ] Update domain references to your actual domain
- [ ] Replace placeholder testimonials with real reviews

### Recommended Updates
- [ ] Add real OG image for social sharing (`assets/og-image.jpg`)
- [ ] Update pricing if amounts differ
- [ ] Add Meta Pixel code (instructions below)
- [ ] Add Google Analytics code

## 📊 Meta Pixel Setup

Add this code to the `<head>` section of both HTML files, just before `</head>`:

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

Replace `YOUR_PIXEL_ID` with your actual Meta Pixel ID.

## 🔧 Form Integration

The contact form currently logs to console. To make it functional:

### Option 1: Formspree (Easiest)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get your endpoint
3. Update the form action in `index.html`:
```html
<form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Netlify Forms
If hosting on Netlify, add `data-netlify="true"` to the form tag.

### Option 3: Custom Backend
Send form data to your own API endpoint.

## 🎨 Customisation

### Colours
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #00b4d8;      /* Main brand colour */
    --primary-dark: #0096c7;
    --primary-light: #48cae4;
    /* ... */
}
```

### Fonts
Currently using Inter from Google Fonts. Change in the `<head>` section if needed.

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px  
- Desktop: > 1024px

## ⚡ Performance Tips

1. **Optimise logo**: Use WebP format, max 50KB
2. **Compress images**: Use TinyPNG or similar
3. **Host on CDN**: Cloudflare, Netlify, or Vercel recommended
4. **Enable caching**: Configure on your hosting platform

## 🔍 SEO Checklist

- [x] Title tag optimised
- [x] Meta description written
- [x] H1/H2/H3 hierarchy correct
- [x] Mobile-responsive
- [x] Fast loading
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Business Profile
- [ ] Add structured data (optional)

## 📧 Support

For updates or custom modifications, contact the original developer.

---

**Keywords for SEO:**
web design Australia, Meta Ads landing pages, Facebook Ads website, small business website, conversion-focused web design, mobile-first website, Australian web designer, lead generation website

---

Built with ❤️ by OzisTech
