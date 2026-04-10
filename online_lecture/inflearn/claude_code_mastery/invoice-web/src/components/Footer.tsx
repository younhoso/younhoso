import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-screen-2xl px-4 md:px-6">
        {/* 메인 푸터 콘텐츠 */}
        <div className="py-12 grid md:grid-cols-4 gap-8">
          {/* 브랜드 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Next.js Starter Kit</h3>
            <p className="text-sm text-muted-foreground">
              최신 기술을 사용한 생산성 높은 스타터 템플릿
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h4 className="font-semibold mb-4">빠른 링크</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  href="/components"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  컴포넌트
                </Link>
              </li>
              <li>
                <Link
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  Next.js 문서
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* 리소스 */}
          <div>
            <h4 className="font-semibold mb-4">리소스</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  Tailwind CSS
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  shadcn/ui
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://lucide.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  Lucide Icons
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* 소셜 링크 */}
          <div>
            <h4 className="font-semibold mb-4">연락하기</h4>
            <div className="flex flex-col gap-3">
              <Link
                href="mailto:contact@example.com"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm"
              >
                <Mail className="w-4 h-4" />
                이메일
              </Link>
              <div className="text-xs text-muted-foreground space-y-2">
                <p>GitHub | Twitter | LinkedIn</p>
                <p>소셜 미디어 링크를 추가하세요</p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="border-t border-border/40 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} Next.js Starter Kit. 모든 권리 보유.</p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
            >
              개인정보 보호정책
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
            >
              서비스 약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
