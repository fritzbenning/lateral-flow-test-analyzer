import { ReactNode } from "react";
import { Card, CardHeader, CardContent } from "./Card";
import { TagLine } from "./TagLine";

interface InfoCardProps {
  tagLine?: string;
  title: string;
  children: ReactNode;
}

export function InfoCard({ tagLine, title, children }: InfoCardProps) {
  return (
    <Card className="not-prose flex flex-1 flex-col gap-3">
      <CardHeader className="pb-0 font-bold">
        {tagLine && <TagLine marginBottom={false}>{tagLine}</TagLine>}
        <h3 className="text-lg leading-none">{title}</h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 leading-normal">{children}</CardContent>
    </Card>
  );
}
