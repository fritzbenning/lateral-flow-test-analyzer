export const calcTestImageDimensions = (
  imgElement: HTMLImageElement,
  newWidth: number
) => {
  const scaleFactor = newWidth / imgElement.naturalWidth;
  const height = imgElement.naturalHeight * scaleFactor;

  return { width: newWidth, height };
};
