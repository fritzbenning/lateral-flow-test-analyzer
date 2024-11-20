import { Microscope } from "lucide-react";

export function Header() {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6">
        <Microscope className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">
        Lateral Flow Test Analyzer
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Upload a image of your test and get instant analysis. Our system detects
        test lines and provides accurate results interpretation.
      </p>
    </header>
  );
}
