import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export default function NavigationTabs() {
  return (
    <Tabs defaultValue="product" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">상품</TabsTrigger>
        <TabsTrigger value="password">관리</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
