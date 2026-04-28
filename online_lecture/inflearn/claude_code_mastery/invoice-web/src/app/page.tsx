/**
 * 홈 랜딩 페이지
 * 노션 기반 견적서 공유 서비스 소개
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FileText, Link2, Download } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-3xl">
      {/* Hero 섹션 */}
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4">
          노션 기반 견적서 공유 서비스
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          노션에서 작성하고,
          <br />
          링크로 공유하세요.
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          노션 데이터베이스에 입력한 견적서를 고유 URL로 클라이언트에게 공유하고,
          클라이언트는 브라우저에서 확인 및 PDF로 저장할 수 있습니다.
        </p>
      </div>

      {/* 사용 방법 */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Card>
          <CardHeader>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <CardTitle className="text-base">1. 노션에 입력</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              노션 데이터베이스에 견적서 항목을 입력합니다.
              별도 도구 없이 기존 노션 워크플로우를 그대로 사용합니다.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 text-primary">
              <Link2 className="w-5 h-5" />
            </div>
            <CardTitle className="text-base">2. 링크 공유</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              노션 페이지 ID로 생성된 URL을
              <code className="text-xs bg-muted px-1 py-0.5 rounded mx-1">
                /invoice/[id]
              </code>
              형태로 클라이언트에게 전달합니다.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 text-primary">
              <Download className="w-5 h-5" />
            </div>
            <CardTitle className="text-base">3. 확인 및 저장</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              클라이언트는 브라우저에서 견적서를 확인하고
              PDF 다운로드 버튼으로 저장합니다.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 환경변수 안내 */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-base">시작하기</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            서비스를 사용하려면 다음 환경변수를 <code className="bg-background px-1 py-0.5 rounded border">.env.local</code> 파일에 설정하세요:
          </p>
          <div className="bg-background rounded-md border p-4 font-mono text-xs space-y-1">
            <p>NOTION_API_KEY=secret_xxxxx</p>
            <p>NEXT_PUBLIC_SUPPLIER_NAME=홍길동</p>
            <p>NEXT_PUBLIC_SUPPLIER_EMAIL=contact@example.com</p>
          </div>
          <p className="text-muted-foreground">
            설정 후{" "}
            <code className="bg-background px-1 py-0.5 rounded border">
              /invoice/[노션_페이지_ID]
            </code>{" "}
            로 접근하면 견적서를 확인할 수 있습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
