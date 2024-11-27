import { Header } from "@/components/Header";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
      <Header />
      <Card className="p-8">
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
