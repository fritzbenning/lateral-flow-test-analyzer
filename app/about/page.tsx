import { Header } from "@/components/header";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="mx-auto flex flex-col gap-4 px-4 py-4 sm:gap-6 md:py-8 lg:gap-8">
      <Header />
      <Card className="p-2 sm:p-4 lg:p-8">
        <CardHeader>
          <CardTitle>How it works</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
