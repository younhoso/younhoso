import BottomNav from "@/components/BottomNav";
import MarketHeader from "@/components/MarketHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100">
      <MarketHeader />
      <BottomNav />
    </div>
  );
}
