import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { setError } from "@/stores/testStore";
import { toast } from "sonner";

interface UseImageUploaderProps {
  onFilesSelected: (files: File[]) => void;
}

export function useImageUploader({ onFilesSelected }: UseImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
      },
      multiple: true,
    });

  useEffect(() => {
    if (fileRejections.length > 0) {
      const errorMessage = fileRejections
        .map(
          (rejection) =>
            `The file format of "${rejection.file.name}" is not supported. Please upload a JPG, PNG or WebP image.`,
        )
        .join(", ");

      toast.error(errorMessage);
      setError(0, true, errorMessage);
    }
  }, [fileRejections]);

  return {
    getRootProps,
    getInputProps,
    isDragActive,
  };
}
