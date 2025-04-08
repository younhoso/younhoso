import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-bold">🎉 결제가 완료되었습니다!</h1>
      <p className="mt-4">강의를 즐겨주세요 🙌</p>
      <div className="mt-6 flex justify-center gap-4">
        <Button variant="default" onClick={() => router.push("/")}>
          메인으로 이동
        </Button>
        <Button variant="outline" onClick={() => router.push("/management")}>
          마이페이지 이동
        </Button>
      </div>
    </main>
  );
}
