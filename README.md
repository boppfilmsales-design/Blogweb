# BOPP Films Sale - Multi-language Commercial Website

A professional multi-language commercial website for BOPP film products, built with Next.js and optimized for international trade.

## Features

### 🌐 Multi-Language Support
- **Chinese (中文)** - 简体中文
- **English** - English
- **Arabic (العربية)** - العربية (RTL support)
- **Español** - Spanish
- **Português** - Portuguese

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- RTL layout support for Arabic

### 🛍️ Product Management
- Comprehensive product catalog
- Detailed product pages with specifications
- Category filtering
- Search functionality
- Featured products showcase

### 📧 Inquiry System
- Contact forms with validation
- Product-specific inquiries
- Professional inquiry management

### 🎨 Modern UI/UX
- Clean, professional design
- Smooth animations
- Intuitive navigation
- Professional color scheme

### 📊 SEO Optimization
- Meta tags optimization
- Structured data
- Sitemap generation
- Multi-language SEO

### 🔧 Admin Features
- Product management interface
- Import/Export functionality (JSON & CSV)
- Content management system

## Project Structure

```
blogWeb/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   ├── products/          # Product pages
│   │   │   ├── page.tsx       # Products listing
│   │   │   └── [slug]/        # Individual product pages
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   └── admin/             # Admin dashboard
│   ├── components/            # Reusable components
│   │   ├── layout/            # Layout components
│   │   ├── home/              # Homepage components
│   │   ├── products/          # Product components
│   │   └── contact/           # Contact components
│   ├── context/               # React context providers
│   ├── data/                  # Static data
│   ├── locales/               # Translation files
│   ├── styles/                # CSS styles
│   └── utils/                 # Utility functions
├── public/                    # Static assets
└── package.json              # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd blogWeb
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

### Static Export

```bash
npm run export
```

This will generate a static site in the `out` folder that can be deployed to any static hosting service.

## Deployment Options

### GitHub Pages
1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. Set source to `/docs` folder after running `npm run export`

### Vercel
1. Connect GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `.next`

### Netlify
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`

### Traditional Hosting
1. Run `npm run build`
2. Upload `.next` folder to your server
3. Configure server to run Next.js

## Customization

### Adding Languages
1. Create new translation file in `src/locales/`
2. Update `next.config.js` to include new locale
3. Update language selector in Header component

### Adding Products
1. Edit `src/data/products.ts`
2. Add new product object with all required fields
3. Include translations for all supported languages

### Styling
- Uses Tailwind CSS for styling
- Custom styles in `src/styles/globals.css`
- Component-specific styles using Tailwind classes

### Content Management
- Access admin panel at `/admin`
- Use import/export for bulk updates
- Edit product data in `src/data/products.ts`

## Key Features Explained

### Multi-Language System
- Automatic language detection based on browser settings
- Manual language switching with persistence
- RTL support for Arabic language
- Complete translation coverage

### Product Showcase
- Grid and list view modes
- Advanced filtering and search
- Detailed product specifications
- Related products suggestions
- Product inquiry integration

### SEO Optimization
- Dynamic meta tags for each page
- Structured data markup
- Multi-language sitemap
- Optimized page titles and descriptions

### Admin Dashboard
- Product management interface
- Bulk import/export functionality
- Content editing capabilities
- Analytics integration ready

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Static site generation for optimal performance
- Image optimization
- Code splitting
- Lazy loading
- Minimal JavaScript bundle

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for commercial purposes.

## Support

For support and questions, please contact:
- Email: info@boppfilmsale.com
- Website: https://boppfilmsale.com

---

Built with ❤️ for the global packaging industry.
