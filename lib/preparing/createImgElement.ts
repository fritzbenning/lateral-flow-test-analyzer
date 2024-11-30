export const createImgElement = (file: File): HTMLImageElement => {
  const imgElement: HTMLImageElement = new Image();
  imgElement.src = URL.createObjectURL(file);

  return imgElement;
};
