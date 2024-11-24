import { Header } from "@/components/header";
import { TestView } from "@/components/TestView";

export default function Home() {
  return (
    <main className="flex-1 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="mt-12">
          <TestView />
        </div>
      </div>
    </main>
  );
}
