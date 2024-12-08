"use client";

import { forwardRef } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/utils/helpers";

type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>;
type TabsListElement = React.ElementRef<typeof TabsPrimitive.List>;

type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;
type TabsTriggerElement = React.ElementRef<typeof TabsPrimitive.Trigger>;

type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;
type TabsContentElement = React.ElementRef<typeof TabsPrimitive.Content>;

// Components
const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<TabsListElement, TabsListProps>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<TabsTriggerElement, TabsTriggerProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className,
      )}
      {...props}
    />
  ),
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<TabsContentElement, TabsContentProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  ),
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
