import { PixelData } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TestData {
  image: HTMLImageElement | null;
  optimizedImage: HTMLImageElement | null;
  rotatedImage: HTMLImageElement | null;
  allPixels: PixelData[][];
  controlPixels: PixelData[];
  controlIntensity: { LAB: number; HSL: number; deputy: number };
  testPixels: PixelData[];
  testIntensity: { LAB: number; HSL: number; deputy: number };
  comparedIntensity: { LAB: number; HSL: number };
  mergedIntensity: null | number;
  result: boolean | null;
  resultMessage: string;
}

interface TestState {
  tests: TestData[];
}

const storage = {
  name: "lateral-flow-tests",
  storage: createJSONStorage(() => sessionStorage),
  partialize: (state: TestState) => ({
    tests: state.tests.map((test) => {
      const excludeFields = [
        "allPixels",
        "image",
        "optimizedImage",
        "rotatedImage",
      ];
      return Object.fromEntries(
        Object.entries(test).filter(([key]) => !excludeFields.includes(key)),
      );
    }),
  }),
};

export const useTestStore = create<TestState>()(
  persist(
    () => ({
      tests: [] as TestData[],
    }),
    storage,
  ),
);

const ensureTestExists = (index: number) => {
  useTestStore.setState((state) => {
    const tests = [...state.tests];
    while (tests.length <= index) {
      tests.push({
        image: null,
        optimizedImage: null,
        rotatedImage: null,
        allPixels: [],
        controlPixels: [],
        controlIntensity: { LAB: 0, HSL: 0, deputy: 0 },
        testPixels: [],
        testIntensity: { LAB: 0, HSL: 0, deputy: 0 },
        comparedIntensity: { LAB: 0, HSL: 0 },
        mergedIntensity: null,
        result: null,
        resultMessage: "",
      });
    }
    return { tests };
  });
};

export const setImage = (index: number, newImage: HTMLImageElement) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, image: newImage } : test,
    ),
  }));
};

export const setOptimizedImage = (
  index: number,
  newImage: HTMLImageElement,
) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, optimizedImage: newImage } : test,
    ),
  }));
};

export const setRotatedImage = (index: number, newImage: HTMLImageElement) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, rotatedImage: newImage } : test,
    ),
  }));
};

export const setAllPixels = (index: number, pixels: PixelData[][]) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, allPixels: pixels } : test,
    ),
  }));
};

export const setControlPixels = (index: number, pixels: PixelData[]) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, controlPixels: pixels } : test,
    ),
  }));
};

export const setTestPixels = (index: number, pixels: PixelData[]) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, testPixels: pixels } : test,
    ),
  }));
};

export const setControlIntensity = (
  index: number,
  intensity: { LAB: number; HSL: number; deputy: number },
) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, controlIntensity: intensity } : test,
    ),
  }));
};

export const setTestIntensity = (
  index: number,
  intensity: { LAB: number; HSL: number; deputy: number },
) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, testIntensity: intensity } : test,
    ),
  }));
};

export const setComparedIntensity = (
  index: number,
  intensity: { LAB: number; HSL: number },
) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, comparedIntensity: intensity } : test,
    ),
  }));
};

export const setMergedIntensity = (index: number, intensity: number | null) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, mergedIntensity: intensity } : test,
    ),
  }));
};

export const setResult = (
  index: number,
  result: boolean | null,
  resultMessage: string,
) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, result, resultMessage } : test,
    ),
  }));
};

export const resetStore = () => {
  useTestStore.setState({
    tests: [],
  });
};
