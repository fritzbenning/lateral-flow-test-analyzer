import { ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";

interface ResultStatusProps {
  result: "null" | "false" | "true";
  resultMessage: string;
}

const resultConfig = {
  null: {
    icon: <ShieldQuestion width="20" height="20" />,
    colorClass: "text-slate-500",
    info: "No control lane (C) detected",
  },
  false: {
    icon: <ShieldCheck width="20" height="20" />,
    colorClass: "text-green-500",
    info: "Control lane (C) detected",
  },
  true: {
    icon: <ShieldAlert width="20" height="20" />,
    colorClass: "text-red-500",
    info: "Control lane (C) and test lane (T) detected",
  },
} as const;

export const ResultStatus = ({ result, resultMessage }: ResultStatusProps) => (
  <h3 className="flex gap-2 text-md leading-tight sm:text-lg">
    <div>
      <span className={`flex items-center gap-1.5 ${resultConfig[result].colorClass}`}>
        {resultConfig[result].icon}
        {resultMessage}
      </span>
    </div>
  </h3>
);

export { resultConfig };
