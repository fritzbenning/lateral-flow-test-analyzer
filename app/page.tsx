import { Header } from "@/components/header";
import { Lab } from "@/components/views/Lab";

export default function Home() {
  return (
    <div className="mx-auto flex flex-col gap-4 px-4 py-4 sm:gap-6 md:py-8 lg:gap-8">
      <Header />
      <Lab />
    </div>
  );
}
