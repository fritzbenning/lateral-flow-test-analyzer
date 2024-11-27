import { Header } from "@/components/Header";
import { Lab } from "@/components/Lab";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
      <Header />
      <Lab />
    </div>
  );
}
