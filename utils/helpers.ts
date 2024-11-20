export function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function findHighHueAndRedUnits(pixelData: PixelData[][]) {
  const thresholdHue = 200;
  const thresholdRed = 150;
  const results: { x: number; y: number }[] = [];

  for (let y = 0; y < pixelData.length; y++) {
    for (let x = 0; x <= pixelData[y].length - 4; x++) {
      const sequence = pixelData[y].slice(x, x + 4);
      if (
        sequence.every(
          (pixel) => pixel.hsl.h > thresholdHue && pixel.red > thresholdRed
        )
      ) {
        results.push({ x, y });
      }
    }
  }

  return results;
}

export function groupUnitsByProximity(
  units: { x: number; y: number }[],
  proximity: number = 3
) {
  const grouped: { x: number; y: number }[][] = [];

  units.sort((a, b) => a.y - b.y);

  units.forEach((unit) => {
    let added = false;
    for (const group of grouped) {
      if (Math.abs(group[group.length - 1].y - unit.y) <= proximity) {
        group.push(unit);
        added = true;
        break;
      }
    }
    if (!added) {
      grouped.push([unit]);
    }
  });

  return grouped;
}
