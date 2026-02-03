# Next.js Starter Kit

A modern, production-ready starter template for building web applications with Next.js 15, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Features

- ✅ **Next.js 15** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS v4** (no config file needed)
- ✅ **shadcn/ui** component library
- ✅ **lucide-react** for icons
- ✅ **Pre-configured UI components** (Button, Card, etc.)
- ✅ **Responsive design** out of the box
- ✅ **SEO ready** with metadata

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation

1. **Clone or extract the project**

```bash
cd nextjs-starter-kit
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run linter
npm run lint
```

## Project Structure

```
nextjs-starter-kit/
├── public/              # Static assets
├── src/
│   ├── app/            # App router pages and layouts
│   │   ├── layout.tsx  # Root layout
│   │   ├── page.tsx    # Home page
│   │   └── globals.css # Global styles with Tailwind
│   ├── components/
│   │   └── ui/         # Pre-built UI components
│   ├── lib/
│   │   └── utils.ts    # Utility functions (cn helper)
│   └── types/          # TypeScript type definitions
├── .env.example        # Environment variables template
├── next.config.js      # Next.js configuration
├── postcss.config.mjs  # PostCSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## UI Components

Pre-built components are available in `src/components/ui/`:

- **Button** - Customizable button with variants (default, outline, ghost, destructive, etc.)
- **Card** - Card container with header, title, description, content, and footer

### Using Components

```tsx
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function Example() {
  return (
    <>
      <Button variant="outline">Click me</Button>
      <Card>
        <CardHeader>
          <CardTitle>Hello</CardTitle>
        </CardHeader>
        <CardContent>Card content here</CardContent>
      </Card>
    </>
  );
}
```

## Icons

Use lucide-react for icons:

```tsx
import { Heart, Star, ArrowRight } from "lucide-react";

export default function Icons() {
  return (
    <>
      <Heart className="w-6 h-6" />
      <Star className="w-6 h-6" />
      <ArrowRight className="w-6 h-6" />
    </>
  );
}
```

## Styling

### Global Styles

Global styles are defined in `src/app/globals.css` using Tailwind CSS directives.

### Component Styles

Use Tailwind CSS utility classes directly in your components:

```tsx
export default function Example() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted">
      <h1 className="text-4xl font-bold">Hello World</h1>
    </div>
  );
}
```

### Using the `cn` Helper

The `cn` utility helper combines classNames with Tailwind CSS merge:

```tsx
import { cn } from "@/lib/utils";

export default function Example() {
  return (
    <div className={cn("px-2 py-1", "px-4")}> {/* Results in px-4 py-1 */}
      Content
    </div>
  );
}
```

## Adding More Components

To add more shadcn/ui components, follow these steps:

1. Copy components from [shadcn/ui](https://ui.shadcn.com/)
2. Save them in `src/components/ui/`
3. Adjust the import paths to use `@/` alias

## Deployment

### Vercel (Recommended)

1. Push your project to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

### Other Platforms

This project can be deployed to any Node.js hosting platform:

```bash
npm run build
npm start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [lucide-react Icons](https://lucide.dev/)

## License

MIT - Feel free to use this starter kit for your projects

## Support

For questions or issues, please open an issue on GitHub.
