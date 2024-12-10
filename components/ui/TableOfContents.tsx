"use client";

import { cn } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { Fade } from "@/components/Fade";

interface TableItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [items, setItems] = useState<TableItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Get all h3 and h4 elements from the article
    const article = document.querySelector("article");
    if (!article) return;

    const headings = Array.from(article.querySelectorAll("h2"));
    const items = headings.map((heading) => ({
      id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, "-") || "",
      text: heading.textContent || "",
      level: parseInt(heading.tagName[1]),
    }));

    // Set IDs for headings that don't have them
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = items[index].id;
      }
    });

    setItems(items);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-12">
      <ul className="m-0 list-none space-y-2 ps-0">
        {items.map((item) => (
          <Fade
            key={item.id}
            className={cn("group m-0 flex items-center gap-3 p-0 transition-colors duration-200")}
          >
            <span
              className={cn(
                "h-px w-4 origin-left transition-colors transition-transform group-hover:scale-x-125",
                activeId === item.id ? "bg-primary" : "bg-muted-foreground",
                "group-hover:bg-red-500",
              )}
            />
            <button
              onClick={() => handleClick(item.id)}
              className={cn(
                "text-left text-sm transition-all group-hover:translate-x-1 group-hover:text-red-500",
                activeId === item.id ? "font-medium text-primary" : "text-muted-foreground",
              )}
            >
              {item.text}
            </button>
          </Fade>
        ))}
      </ul>
    </nav>
  );
}
