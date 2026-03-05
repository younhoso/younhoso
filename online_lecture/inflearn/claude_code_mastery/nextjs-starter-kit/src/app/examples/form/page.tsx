"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useCounterStore } from "@/stores/counter";
import { registerSchema, type RegisterFormData } from "@/lib/validations";

export default function FormExamplePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">통합 예시</h1>
        <p className="mt-2 text-muted-foreground">
          react-hook-form + zod, zustand, sonner, radix-ui 통합 데모
        </p>
      </div>

      <Tabs defaultValue="form">
        <TabsList className="mb-6">
          <TabsTrigger value="form">폼 유효성 검사</TabsTrigger>
          <TabsTrigger value="state">상태 관리</TabsTrigger>
          <TabsTrigger value="toast">토스트 / 다이얼로그</TabsTrigger>
        </TabsList>

        {/* 탭 1: 폼 유효성 검사 */}
        <TabsContent value="form">
          <RegisterForm />
        </TabsContent>

        {/* 탭 2: Zustand 카운터 */}
        <TabsContent value="state">
          <CounterDemo />
        </TabsContent>

        {/* 탭 3: 토스트 & 다이얼로그 */}
        <TabsContent value="toast">
          <ToastDialogDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── 폼 섹션 ───────────────────────────────────────────────────────────────
function RegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: undefined, terms: false },
  });

  const onSubmit = async (data: RegisterFormData) => {
    // 실제 API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("폼 데이터:", data);
    toast.success("회원가입 성공!", {
      description: `${data.name}님 환영합니다.`,
    });
    reset();
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">회원가입 폼</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 이름 */}
        <div className="space-y-1">
          <Label htmlFor="name">이름</Label>
          <Input id="name" placeholder="홍길동" {...register("name")} />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* 이메일 */}
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="hong@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="space-y-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="영문+숫자 8자 이상"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="space-y-1">
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="비밀번호 재입력"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* 역할 선택 (Radix Select + react-hook-form Controller) */}
        <div className="space-y-1">
          <Label>역할</Label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="역할을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">일반 사용자</SelectItem>
                  <SelectItem value="editor">에디터</SelectItem>
                  <SelectItem value="admin">관리자</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && (
            <p className="text-xs text-destructive">{errors.role.message}</p>
          )}
        </div>

        {/* 이용약관 */}
        <div className="flex items-center gap-2">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 rounded border border-input"
            {...register("terms")}
          />
          <Label htmlFor="terms" className="cursor-pointer">
            이용약관에 동의합니다
          </Label>
        </div>
        {errors.terms && (
          <p className="text-xs text-destructive">{errors.terms.message}</p>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "처리 중..." : "회원가입"}
        </Button>
      </form>
    </div>
  );
}

// ─── 카운터 섹션 ───────────────────────────────────────────────────────────
function CounterDemo() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-2 text-xl font-semibold">Zustand 카운터</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        페이지를 이동했다가 돌아와도 상태가 유지됩니다.
      </p>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={decrement}>
          −
        </Button>
        <span className="min-w-[3rem] text-center text-3xl font-bold">
          {count}
        </span>
        <Button variant="outline" size="icon" onClick={increment}>
          +
        </Button>
        <Button variant="ghost" size="sm" onClick={reset} className="ml-4">
          초기화
        </Button>
      </div>
    </div>
  );
}

// ─── 토스트 & 다이얼로그 섹션 ──────────────────────────────────────────────
function ToastDialogDemo() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Sonner 토스트 & 다이얼로그</h2>

      <div className="space-y-4">
        {/* 토스트 종류 */}
        <div>
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            토스트 유형
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={() =>
                toast.success("성공!", {
                  description: "작업이 완료되었습니다.",
                })
              }
            >
              성공
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() =>
                toast.error("오류 발생!", { description: "다시 시도해주세요." })
              }
            >
              오류
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                toast.warning("주의!", {
                  description: "이 작업은 되돌릴 수 없습니다.",
                })
              }
            >
              경고
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                toast.info("알림", {
                  description: "새로운 업데이트가 있습니다.",
                })
              }
            >
              정보
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                toast.promise(
                  new Promise((resolve) => setTimeout(resolve, 2000)),
                  {
                    loading: "처리 중...",
                    success: "완료!",
                    error: "실패",
                  },
                )
              }
            >
              프로미스
            </Button>
          </div>
        </div>

        {/* 다이얼로그 */}
        <div>
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            다이얼로그 (포커스 트랩 / ARIA 자동)
          </p>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">다이얼로그 열기</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Radix UI Dialog</DialogTitle>
                <DialogDescription>
                  포커스 트랩, ESC 닫기, ARIA 속성이 자동으로 처리됩니다.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                배경 클릭 또는 ESC 키로도 닫을 수 있습니다.
              </p>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  취소
                </Button>
                <Button
                  onClick={() => {
                    setDialogOpen(false);
                    toast.success("확인되었습니다!");
                  }}
                >
                  확인
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
