import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/Skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { DialogDemo, SelectDemo, TabsDemo, DropdownMenuDemo } from "@/components/ui/RadixDemos";
import {
  Heart,
  Star,
  Check,
  X,
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function ComponentsPage() {
  return (
    <div className="container mx-auto py-12 md:py-24">
      {/* 헤더 */}
      <div className="mb-12">
        <Link href="/" className="text-primary hover:underline mb-4 inline-block text-sm">
          ← 홈으로 돌아가기
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          컴포넌트
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          프로젝트에 바로 사용할 수 있는 사전 제작 UI 컴포넌트 모음
        </p>
      </div>

      {/* Button */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Button</CardTitle>
          <CardDescription>다양한 사용 사례를 위한 버튼 스타일</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">Variants</p>
            <div className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">Sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon"><Heart className="w-4 h-4" /></Button>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">With Icons</p>
            <div className="flex flex-wrap gap-3">
              <Button><Star className="w-4 h-4" /> Star</Button>
              <Button variant="outline"><Check className="w-4 h-4" /> Confirm</Button>
              <Button variant="destructive"><X className="w-4 h-4" /> Delete</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badge */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Badge</CardTitle>
          <CardDescription>분류 및 레이블을 위한 배지</CardDescription>
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

      {/* Avatar */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>사용자 프로필 아바타 - 이미지 또는 이니셜 폴백 표시</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">크기 변형</p>
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">SM</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10">
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-lg">LG</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">색상 변형</p>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix"
                  alt="User"
                />
                <AvatarFallback>FX</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">KR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-secondary">AB</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-destructive text-destructive-foreground">XY</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skeleton */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Skeleton</CardTitle>
          <CardDescription>콘텐츠 로딩 상태를 나타내는 스켈레톤 애니메이션</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">프로필 카드</p>
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">콘텐츠 블록</p>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">카드 그리드</p>
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Alert</CardTitle>
          <CardDescription>4가지 스타일의 알림 메시지</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert variant="default">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            <div>
              <AlertTitle>안내</AlertTitle>
              <AlertDescription>
                일반적인 안내 메시지입니다. 추가적인 정보를 제공합니다.
              </AlertDescription>
            </div>
          </Alert>
          <Alert variant="success">
            <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
            <div>
              <AlertTitle>성공</AlertTitle>
              <AlertDescription>
                작업이 성공적으로 완료되었습니다.
              </AlertDescription>
            </div>
          </Alert>
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <div>
              <AlertTitle>경고</AlertTitle>
              <AlertDescription>
                주의가 필요한 상황입니다. 계속 진행하기 전에 확인해주세요.
              </AlertDescription>
            </div>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <div>
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>
                작업을 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.
              </AlertDescription>
            </div>
          </Alert>
        </CardContent>
      </Card>

      {/* Label + Input */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Label + Input</CardTitle>
          <CardDescription>폼 레이블과 입력 필드 조합</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-w-sm">
          <div className="space-y-1.5">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" placeholder="name@example.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="disabled" className="opacity-50">비활성화됨</Label>
            <Input id="disabled" placeholder="사용 불가" disabled />
          </div>
        </CardContent>
      </Card>

      {/* Textarea */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Textarea</CardTitle>
          <CardDescription>여러 줄 텍스트 입력 영역</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-w-sm">
          <div className="space-y-1.5">
            <Label htmlFor="message">메시지</Label>
            <Textarea id="message" placeholder="메시지를 입력하세요..." />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="feedback">피드백 (비활성화)</Label>
            <Textarea id="feedback" placeholder="현재 사용할 수 없습니다" disabled />
          </div>
        </CardContent>
      </Card>

      {/* Separator */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Separator</CardTitle>
          <CardDescription>수평 및 수직 구분선</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">수평 구분선</p>
            <div className="space-y-4">
              <p className="text-sm">위 콘텐츠</p>
              <Separator />
              <p className="text-sm">아래 콘텐츠</p>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">수직 구분선</p>
            <div className="flex items-center gap-4 h-8">
              <span className="text-sm">왼쪽</span>
              <Separator orientation="vertical" />
              <span className="text-sm">가운데</span>
              <Separator orientation="vertical" />
              <span className="text-sm">오른쪽</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input (기존) */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Input</CardTitle>
          <CardDescription>기본 텍스트 입력 필드</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-w-sm">
          <Input placeholder="일반 입력..." />
          <Input placeholder="검색..." type="search" />
          <Input type="number" placeholder="숫자 입력..." />
        </CardContent>
      </Card>

      {/* Dialog */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Dialog</CardTitle>
          <CardDescription>Radix UI 기반 모달 — 포커스 트랩, ESC 닫기, ARIA 자동 처리</CardDescription>
        </CardHeader>
        <CardContent>
          <DialogDemo />
        </CardContent>
      </Card>

      {/* Select */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Select</CardTitle>
          <CardDescription>Radix UI 기반 드롭다운 선택 — 포털 렌더링, 키보드 내비게이션</CardDescription>
        </CardHeader>
        <CardContent>
          <SelectDemo />
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
          <CardDescription>Radix UI 기반 탭 — 키보드 화살표 이동, ARIA 역할 자동 설정</CardDescription>
        </CardHeader>
        <CardContent>
          <TabsDemo />
        </CardContent>
      </Card>

      {/* DropdownMenu */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>DropdownMenu</CardTitle>
          <CardDescription>Radix UI 기반 컨텍스트 메뉴 — 체크박스/라디오 항목 지원</CardDescription>
        </CardHeader>
        <CardContent>
          <DropdownMenuDemo />
        </CardContent>
      </Card>
    </div>
  );
}
