import { forwardRef, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/helpers";

type AlertProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>;

type AlertTitleProps = HTMLAttributes<HTMLHeadingElement>;

type AlertDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

const alertVariants = cva("relative w-full rounded-lg border border-slate-200 p-4", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive: "border-destructive/50 text-destructive dark:border-destructive",
      success: "text-green-600",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Alert = forwardRef<HTMLDivElement, AlertProps>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn("flex flex-col justify-center gap-1", alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("font-regular flex items-center gap-2 text-md leading-none", className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed", "text-slate-500", className)}
      {...props}
    />
  ),
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
