import { PixelData } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TestData {
  image: HTMLImageElement | null;
  optimizedImage: HTMLImageElement | null;
  allPixels: PixelData[][];
  controlLinePixels: PixelData[];
  testLinePixels: PixelData[];
  controlLineIntensity: { LAB: null; HSL: number };
  testLineIntensity: { LAB: null; HSL: number };
}

interface TestState {
  tests: TestData[];
}

const storage = {
  name: "lateral-flow-tests",
  storage: createJSONStorage(() => sessionStorage),
  partialize: (state: TestState) => ({
    tests: state.tests.map((test) => {
      const excludeFields = ["allPixels", "image", "optimizedImage"];
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
        allPixels: [],
        controlLinePixels: [],
        testLinePixels: [],
        controlLineIntensity: { LAB: null, HSL: 0 },
        testLineIntensity: { LAB: null, HSL: 0 },
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

export const setAllPixels = (index: number, pixels: PixelData[][]) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, allPixels: pixels } : test,
    ),
  }));
};

export const setControlLinePixels = (index: number, pixels: PixelData[]) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, controlLinePixels: pixels } : test,
    ),
  }));
};

export const setTestLinePixels = (index: number, pixels: PixelData[]) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, testLinePixels: pixels } : test,
    ),
  }));
};

export const setControlLineIntensity = (
  index: number,
  intensity: { LAB: null; HSL: number },
) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, controlLineIntensity: intensity } : test,
    ),
  }));
};

export const setTestLineIntensity = (
  index: number,
  intensity: { LAB: null; HSL: number },
) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, testLineIntensity: intensity } : test,
    ),
  }));
};
