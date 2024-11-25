import { Header } from "@/components/Header";
import { TestView } from "@/components/TestView";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 gap-8 flex flex-col">
      <Header />
      <TestView />
    </div>
  );
}
