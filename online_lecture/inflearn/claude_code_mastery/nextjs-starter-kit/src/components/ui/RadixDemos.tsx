"use client";

import { useState } from "react";
import { Settings, User, LogOut, ChevronDown } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

// Dialog 데모
export function DialogDemo() {
  return (
    <Dialog>
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
          <Button variant="outline">취소</Button>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Select 데모
export function SelectDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-3 max-w-xs">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder="프레임워크 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frontend</SelectLabel>
            <SelectItem value="next">Next.js</SelectItem>
            <SelectItem value="remix">Remix</SelectItem>
            <SelectItem value="nuxt">Nuxt.js</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Backend</SelectLabel>
            <SelectItem value="express">Express</SelectItem>
            <SelectItem value="fastify">Fastify</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {value && (
        <p className="text-sm text-muted-foreground">선택된 값: <strong>{value}</strong></p>
      )}
    </div>
  );
}

// Tabs 데모
export function TabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">계정</TabsTrigger>
        <TabsTrigger value="password">비밀번호</TabsTrigger>
        <TabsTrigger value="settings">설정</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 rounded-md border border-border mt-2">
        <p className="text-sm">계정 정보를 관리하세요. 이름, 이메일, 프로필 사진 등을 변경할 수 있습니다.</p>
      </TabsContent>
      <TabsContent value="password" className="p-4 rounded-md border border-border mt-2">
        <p className="text-sm">비밀번호를 변경하세요. 보안을 위해 정기적으로 변경하는 것을 권장합니다.</p>
      </TabsContent>
      <TabsContent value="settings" className="p-4 rounded-md border border-border mt-2">
        <p className="text-sm">알림, 테마, 언어 등 앱 설정을 조정하세요.</p>
      </TabsContent>
    </Tabs>
  );
}

// DropdownMenu 데모
export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          메뉴 열기 <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>내 계정</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>프로필</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>설정</span>
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>로그아웃</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
