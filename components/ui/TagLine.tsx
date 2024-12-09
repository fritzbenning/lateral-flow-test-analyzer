interface TagLineProps {
  children: React.ReactNode;
  marginBottom?: boolean;
}

export function TagLine({ children, marginBottom = true }: TagLineProps) {
  return (
    <span
      aria-label="subheadline"
      className={`inline-block text-md font-bold leading-none text-red-500 ${
        marginBottom ? "mb-4" : "mb-1"
      }`}
    >
      {children}
    </span>
  );
}
