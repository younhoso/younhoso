import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Heart, Star, Check, X } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export default function ComponentsPage() {
  return (
    <div className="container mx-auto py-12 md:py-24">
      {/* Theme Toggle */}
      <div className="flex justify-end mb-8">
        <ModeToggle />
      </div>

      {/* Header */}
      <div className="mb-12">
        <Link href="/" className="text-primary hover:underline mb-4 inline-block">
          ← Back to home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Components
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Pre-built UI components ready to use in your project
        </p>
      </div>

      {/* Buttons */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>Different button styles for various use cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Default</p>
              <Button>Click me</Button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Outline</p>
              <Button variant="outline">Outline</Button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Ghost</p>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Destructive</p>
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Badge</CardTitle>
          <CardDescription>Labels and badges for categorization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Input */}
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
          <CardDescription>Text input field</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-2">Regular input</label>
            <Input placeholder="Type something..." />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
