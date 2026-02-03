import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ArrowRight, Code2, Zap, Package } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto py-12 md:py-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Next.js Starter Kit
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A modern, production-ready starter template with Next.js 15, TypeScript, Tailwind CSS v4, and shadcn/ui
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/components">
            <Button size="lg">
              View Components <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg">
              Documentation
            </Button>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <FeatureCard
          icon={<Code2 className="w-6 h-6" />}
          title="TypeScript Ready"
          description="Fully typed with TypeScript for better developer experience and type safety"
        />
        <FeatureCard
          icon={<Zap className="w-6 h-6" />}
          title="Performance Optimized"
          description="Built with modern best practices including image optimization and code splitting"
        />
        <FeatureCard
          icon={<Package className="w-6 h-6" />}
          title="Component Library"
          description="Pre-configured with shadcn/ui components and lucide-react icons"
        />
      </div>

      {/* Tech Stack */}
      <div className="bg-muted rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <TechItem label="Framework" value="Next.js 15 with App Router" />
          <TechItem label="Language" value="TypeScript" />
          <TechItem label="Styling" value="Tailwind CSS v4" />
          <TechItem label="UI Components" value="shadcn/ui" />
          <TechItem label="Icons" value="lucide-react" />
          <TechItem label="Package Manager" value="npm" />
        </div>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>Get up and running in seconds</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Step step={1} title="Install dependencies" code="npm install" />
            <Step step={2} title="Run development server" code="npm run dev" />
            <Step step={3} title="Open in browser" code="http://localhost:3000" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function TechItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="font-medium text-foreground">{label}:</span>
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
}

function Step({
  step,
  title,
  code,
}: {
  step: number;
  title: string;
  code: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
        {step}
      </div>
      <div className="flex-1">
        <p className="font-medium mb-1">{title}</p>
        <code className="block bg-muted px-3 py-1 rounded text-sm text-muted-foreground">
          {code}
        </code>
      </div>
    </div>
  );
}
