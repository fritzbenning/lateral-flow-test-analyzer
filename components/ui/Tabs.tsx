"use client";

import { forwardRef, ComponentPropsWithoutRef, ElementRef } from "react";
import { Root, List, Trigger, Content } from "@radix-ui/react-tabs";
import { cn } from "@/utils/helpers";

// Types
type TabsListProps = ComponentPropsWithoutRef<typeof List>;
type TabsListElement = ElementRef<typeof List>;

type TabsTriggerProps = ComponentPropsWithoutRef<typeof Trigger>;
type TabsTriggerElement = ElementRef<typeof Trigger>;

type TabsContentProps = ComponentPropsWithoutRef<typeof Content>;
type TabsContentElement = ElementRef<typeof Content>;

// Components
const Tabs = Root;

const TabsList = forwardRef<TabsListElement, TabsListProps>(({ className, ...props }, ref) => (
  <List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = List.displayName;

const TabsTrigger = forwardRef<TabsTriggerElement, TabsTriggerProps>(
  ({ className, ...props }, ref) => (
    <Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className,
      )}
      {...props}
    />
  ),
);
TabsTrigger.displayName = Trigger.displayName;

const TabsContent = forwardRef<TabsContentElement, TabsContentProps>(
  ({ className, ...props }, ref) => (
    <Content
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  ),
);
TabsContent.displayName = Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
