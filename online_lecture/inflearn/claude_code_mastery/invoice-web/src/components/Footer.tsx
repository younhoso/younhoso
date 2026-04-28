/**
 * 공통 푸터 컴포넌트
 * 인쇄 시 숨김 (print:hidden)
 */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background print:hidden">
      <div className="container mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="py-6 flex justify-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} 견적서 공유 서비스. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
