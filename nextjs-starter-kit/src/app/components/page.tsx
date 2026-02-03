import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Heart, Star, Check, X } from "lucide-react";
import Link from "next/link";

export default function ComponentsPage() {
  return (
    <div className="container mx-auto py-12 md:py-24">
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
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Link</p>
              <Button variant="link">Link button</Button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Secondary</p>
              <Button variant="secondary">Secondary</Button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Disabled</p>
              <Button disabled>Disabled</Button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">With icon</p>
              <Button>
                <Heart className="w-4 h-4" />
                Like
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Button Sizes */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Button Sizes</CardTitle>
          <CardDescription>Various button sizes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Star className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Input */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Input</CardTitle>
          <CardDescription>Text input field</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-2">Regular input</label>
            <Input placeholder="Type something..." />
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Email input</label>
            <Input type="email" placeholder="your@email.com" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Disabled input</label>
            <Input placeholder="Disabled" disabled />
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
            <Badge className="gap-1">
              <Check className="w-3 h-3" />
              Success
            </Badge>
            <Badge variant="destructive" className="gap-1">
              <X className="w-3 h-3" />
              Error
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Cards */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Card Component</CardTitle>
          <CardDescription>Containers for content grouping</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-muted">
              <CardHeader>
                <CardTitle className="text-lg">Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                Card content with all standard card elements
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Another Card</CardTitle>
              </CardHeader>
              <CardContent>
                This card demonstrates nesting capabilities
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Icons */}
      <Card>
        <CardHeader>
          <CardTitle>lucide-react Icons</CardTitle>
          <CardDescription>Thousands of icons available from lucide-react</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            <div className="flex flex-col items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="text-xs">Heart</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              <span className="text-xs">Star</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Check className="w-6 h-6 text-green-500" />
              <span className="text-xs">Check</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <X className="w-6 h-6 text-red-500" />
              <span className="text-xs">X</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full" />
              <span className="text-xs">Custom</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">🎨</span>
              <span className="text-xs">More...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
