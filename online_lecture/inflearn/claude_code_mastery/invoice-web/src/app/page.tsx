import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { ArrowRight, Code2, Zap, Package, Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto py-12 md:py-24">
      {/* Hero 섹션 */}
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4">
          Next.js 15 + TypeScript + Tailwind CSS v4
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Next.js
          </span>{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Starter Kit
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          모던 웹 개발을 위한 프로덕션 레디 스타터 템플릿. shadcn/ui 컴포넌트와
          다크 모드가 기본으로 포함되어 있습니다.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/components">
            <Button size="lg">
              구성 요소 보기 <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              <Github className="w-4 h-4" /> GitHub
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats 섹션 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <StatCard value="10+" label="UI 컴포넌트" />
        <StatCard value="MIT" label="라이센스" />
        <StatCard value="Next.js 15" label="프레임워크" />
        <StatCard value="TypeScript" label="타입 안전성" />
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <FeatureCard
          icon={<Code2 className="w-6 h-6" />}
          title="TypeScript Ready"
          description="완전한 타입 지원으로 더 나은 개발 경험과 안전한 코드 작성"
        />
        <FeatureCard
          icon={<Zap className="w-6 h-6" />}
          title="Performance Optimized"
          description="이미지 최적화, 코드 스플리팅 등 최신 성능 최적화 기법 적용"
        />
        <FeatureCard
          icon={<Package className="w-6 h-6" />}
          title="Component Library"
          description="shadcn/ui 패턴 기반의 재사용 가능한 컴포넌트 라이브러리 제공"
        />
      </div>

      {/* 포함된 컴포넌트 미리보기 */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-2">포함된 컴포넌트</h2>
        <p className="text-muted-foreground mb-6">
          즉시 사용 가능한 10개의 UI 컴포넌트
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Button",
            "Card",
            "Badge",
            "Input",
            "Separator",
            "Avatar",
            "Skeleton",
            "Alert",
            "Label",
            "Textarea",
          ].map((name) => (
            <div
              key={name}
              className="border rounded-lg p-4 text-center hover:bg-muted/50 transition-colors"
            >
              <p className="font-medium text-sm">{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 아바타 + 스켈레톤 미리보기 */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Avatar</CardTitle>
            <CardDescription>사용자 프로필 아바타</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  KR
                </AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-secondary">AB</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Skeleton</CardTitle>
            <CardDescription>콘텐츠 로딩 상태</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tech Stack */}
      <div className="bg-muted rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">기술 스택</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <TechItem label="프레임워크" value="Next.js 15 (App Router)" />
          <TechItem label="언어" value="TypeScript 5.9" />
          <TechItem label="스타일링" value="Tailwind CSS v4" />
          <TechItem label="UI 컴포넌트" value="shadcn/ui 패턴" />
          <TechItem label="아이콘" value="lucide-react" />
          <TechItem label="패키지 매니저" value="npm" />
        </div>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle>빠른 시작</CardTitle>
          <CardDescription>몇 초 안에 개발을 시작하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Step step={1} title="의존성 설치" code="npm install" />
            <Step step={2} title="개발 서버 실행" code="npm run dev" />
            <Step
              step={3}
              title="브라우저에서 확인"
              code="http://localhost:3000"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border rounded-lg p-6 text-center bg-card">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
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
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
        {step}
      </div>
      <div className="flex-1">
        <p className="font-medium mb-1 text-sm">{title}</p>
        <code className="block bg-muted px-3 py-2 rounded-md text-sm text-muted-foreground font-mono border">
          {code}
        </code>
      </div>
    </div>
  );
}
