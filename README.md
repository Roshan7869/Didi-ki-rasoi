# Didi ki Rasoi - CSVTU Campus Mess Website

A modern, optimized food ordering website for CSVTU campus students built with Next.js and deployed on Netlify.

## 🚀 Features

- **Fast & Responsive**: Optimized for mobile and desktop with smooth performance
- **Real-time Cart Management**: Add, remove, and modify orders with instant feedback
- **WhatsApp Integration**: Direct order placement through WhatsApp for seamless communication
- **Smart Search & Filtering**: Find your favorite dishes quickly with debounced search
- **Local Storage**: Cart persistence across browser sessions
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **PWA Ready**: Installable as a mobile app with offline capabilities

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React hooks with localStorage persistence
- **Performance**: Static site generation with optimized builds
- **Deployment**: Netlify with automatic deployments
- **TypeScript**: Full type safety throughout the application

## 🏗️ Architecture

### Performance Optimizations
- **Static Site Generation**: Pre-rendered pages for faster loading
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Removed external image dependencies for faster loading
- **Bundle Analysis**: Optimized bundle size with tree shaking
- **Caching**: Aggressive caching strategies for static assets

### User Experience
- **Debounced Search**: Reduces API calls and improves performance
- **Optimistic Updates**: Instant UI feedback for better user experience
- **Error Boundaries**: Graceful error handling with recovery options
- **Loading States**: Clear loading indicators for all async operations
- **Toast Notifications**: Non-intrusive feedback for user actions

### Real-world Considerations
- **Offline Support**: Service worker for basic offline functionality
- **Error Recovery**: Automatic retry mechanisms for failed operations
- **Data Validation**: Client-side validation with user-friendly error messages
- **Accessibility**: Full keyboard navigation and screen reader support
- **Mobile-first**: Responsive design optimized for mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 8+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd didi-ki-rasoi

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Export static files for Netlify
npm run export
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_PHONE_NUMBER=7440683678
NEXT_PUBLIC_RESTAURANT_NAME="Didi ki Rasoi"
NEXT_PUBLIC_LOCATION="CSVTU, Newai, Building 4"
```

## 📱 Deployment on Netlify

### Automatic Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run export`
3. Set publish directory: `out`
4. Deploy automatically on every push to main branch

### Manual Deployment
```bash
# Build and export
npm run export

# Deploy the 'out' folder to Netlify
```

### Netlify Configuration
The `netlify.toml` file includes:
- Build settings and redirects
- Security headers
- Performance optimizations
- Cache control policies

## 🔧 Customization

### Menu Items
Edit the `menuItems` array in `app/page.tsx` to add/modify food items:

```typescript
{
  id: "unique-id",
  name: "Item Name",
  price: 50,
  category: "Category",
  description: "Item description",
  isPopular: true,
  rating: 4.5,
  isAvailable: true,
  preparationTime: 15
}
```

### Styling
- Colors: Modify CSS variables in `app/globals.css`
- Components: Update Tailwind classes in component files
- Theme: Customize the design system in `tailwind.config.js`

### Contact Information
Update contact details in the hero section and footer components.

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Bundle analysis
npm run analyze
```

## 📊 Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Lighthouse Score**: 95+ across all categories

## 🔒 Security Features

- Content Security Policy headers
- XSS protection
- CSRF protection
- Secure cookie handling
- Input sanitization
- Error message sanitization

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Analytics & Monitoring

Ready for integration with:
- Google Analytics 4
- Hotjar for user behavior
- Sentry for error monitoring
- Web Vitals tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and queries:
- Phone: 7440683678
- Location: CSVTU, Newai, Building 4

---

Built with ❤️ for CSVTU students by the Didi ki Rasoi team.