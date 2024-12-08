import { PixelData } from "@/types";
import { ChartDataPoint } from "@/types/chart";
import { create } from "zustand";

interface TestData {
  image: HTMLImageElement | null;
  optimizedImage: HTMLImageElement | null;
  allPixels: PixelData[][];
  chartData: ChartDataPoint[];
  controlPixels: PixelData[];
  controlIntensity: { LAB: number; HSL: number; deputy: number };
  testPixels: PixelData[];
  testIntensity: { LAB: number; HSL: number; deputy: number };
  comparedIntensity: { LAB: number; HSL: number };
  mergedIntensity: null | number;
  result: boolean | null;
  resultMessage: string;
  testAreaImage: HTMLImageElement | null;
  previewImage: HTMLImageElement | null;
  error: boolean;
  errorMessage: string;
  status: string;
}

interface TestState {
  tests: TestData[];
}

export const useTestStore = create<TestState>()(() => ({
  tests: [] as TestData[],
}));

const ensureTestExists = (index: number) => {
  useTestStore.setState((state) => {
    const tests = [...state.tests];
    while (tests.length <= index) {
      tests.push({
        image: null,
        optimizedImage: null,
        allPixels: [],
        chartData: [],
        controlPixels: [],
        controlIntensity: { LAB: 0, HSL: 0, deputy: 0 },
        testPixels: [],
        testIntensity: { LAB: 0, HSL: 0, deputy: 0 },
        comparedIntensity: { LAB: 0, HSL: 0 },
        mergedIntensity: null,
        result: null,
        resultMessage: "",
        testAreaImage: null,
        previewImage: null,
        error: false,
        errorMessage: "",
        status: "Warming up ...",
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

export const setTestAreaImage = (index: number, newImage: HTMLImageElement) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, testAreaImage: newImage } : test,
    ),
  }));
};

export const setPreviewImage = (index: number, newImage: HTMLImageElement) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, previewImage: newImage } : test,
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

export const setChartData = (index: number, dataPoints: ChartDataPoint[]) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, chartData: dataPoints } : test,
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

export const setError = (
  index: number,
  error: boolean,
  errorMessage: string,
) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, error, errorMessage } : test,
    ),
  }));
};

export const setStatus = (index: number, status: string) => {
  ensureTestExists(index);
  useTestStore.setState((state) => ({
    tests: state.tests.map((test, i) =>
      i === index ? { ...test, status } : test,
    ),
  }));
};

export const resetStore = () => {
  useTestStore.setState({
    tests: [],
  });
};
