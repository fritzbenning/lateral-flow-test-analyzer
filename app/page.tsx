import { Header } from "@/components/Header";
import { Lab } from "@/components/views/Lab";

export default function Home() {
  return (
    <div className="mx-auto flex flex-col gap-6 px-4 py-4 sm:gap-6 md:py-8 lg:gap-8">
      <Header />
      <Lab />
    </div>
  );
}
