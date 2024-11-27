interface PixelProps {
  color: { h: number; s: number; l: number };
}

export const Pixel = ({ color }: PixelProps) => (
  <div>
    <div
      className="h-6 w-6 rounded-full"
      style={{
        backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
      }}
    />
  </div>
);
