import { Microscope } from "lucide-react";

export function Header() {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6">
        <Microscope className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Rapid Test Analyzer
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Upload your rapid test images and get instant AI-powered analysis. Our system detects test lines
        and provides accurate results interpretation.
      </p>
    </header>
  );
}