import { Header } from "@/components/Header";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="content mx-auto flex flex-col gap-4 px-4 py-4 sm:gap-6 md:py-8 lg:gap-8">
      <Header />
      <Card className="p-2 sm:p-4 lg:p-8">
        <h1>How It Works: Lateral Flow Test Analyzer</h1>

        <p>
          The <strong>Lateral Flow Test Analyzer</strong> is a scientific tool
          designed to analyze lateral flow test images securely on your device.
          Below, we outline the key steps involved in the analysis process.
        </p>

        <div className="step">
          <h2>1. Image Preprocessing</h2>
          <p>
            The image is prepared to ensure accurate and efficient analysis. The
            preprocessing steps include:
          </p>
          <ul>
            <li>
              <strong>Reducing image size:</strong> This optimizes performance
              and processing speed.
            </li>
            <li>
              <strong>Background removal:</strong> The background is eliminated
              to focus solely on the test area.
            </li>
            <li>
              <strong>Pixel binding:</strong> Pixels are grouped in 2x2 units,
              with the average color value of each unit calculated. This
              simplifies the image while preserving relevant information.
            </li>
          </ul>
        </div>

        <div className="step">
          <h2>2. Pixel Identification</h2>
          <p>
            Each pixel unit is analyzed to determine whether it could belong to
            the <span className="highlight">Control Line</span> or{" "}
            <span className="highlight">Test Line</span>. This is achieved by
            checking specific criteria such as:
          </p>
          <ul>
            <li>Hue values falling within predefined ranges.</li>
            <li>Saturation and lightness levels meeting set thresholds.</li>
            <li>
              LAB color space values, specifically the <em>a*</em> component,
              which measures green-to-red color differences.
            </li>
          </ul>
        </div>

        <div className="step">
          <h2>3. Pixel Grouping</h2>
          <p>
            Pixels identified as potential matches are grouped based on their
            coordinates. Typically, two distinct groups are formed,
            corresponding to the <strong>Control Line (C)</strong> and{" "}
            <strong>Test Line (T)</strong>. During this process:
          </p>
          <ul>
            <li>
              <strong>Saturation peaks:</strong> Each group is analyzed to
              ensure it contains only one significant peak.
            </li>
            <li>
              <strong>Separating overlapping lines:</strong> If two peaks are
              detected within one group, the peaks are separated to distinguish
              the lines accurately.
            </li>
            <li>
              <strong>Negative test detection:</strong> If only one group is
              formed, the result is classified as{" "}
              <span className="highlight">Negative</span>.
            </li>
            <li>
              <strong>Handling ambiguity:</strong> If too many groups are
              identified, the result is deemed uninterpretable.
            </li>
          </ul>
        </div>

        <div className="step">
          <h2>4. Line Comparison</h2>
          <p>
            The Control and Test lines are compared to quantify their relative
            intensity. Two methods are used for this comparison:
          </p>
          <ul>
            <li>
              <strong>LAB Color Space:</strong> The <em>a*</em> value
              (green-to-red axis) measures color intensity differences.
            </li>
            <li>
              <strong>HSL Color Space:</strong> Saturation (S) levels indicate
              the vividness of the colors.
            </li>
          </ul>
          <p>
            To ensure robust comparisons, the 95th percentile of pixel values is
            used for each line. This approach minimizes the impact of outliers
            and focuses on the most representative data. The relative
            differences in these metrics are averaged to calculate the test
            intensity.
          </p>
        </div>

        <div className="step">
          <h2>5. Result Interpretation</h2>
          <p>
            Based on the computed test intensity, the result is categorized into
            one of the following:
          </p>
          <ul>
            <li>
              <strong>Negative:</strong> High probability of a negative result
              (intensity = 0).
            </li>
            <li>
              <strong>Positive with low probability:</strong> Intensity below
              20.
            </li>
            <li>
              <strong>Positive with moderate probability:</strong> Intensity
              between 20 and 50.
            </li>
            <li>
              <strong>Positive with high probability:</strong> Intensity between
              50 and 100.
            </li>
            <li>
              <strong>Positive with very high probability:</strong> Intensity
              above 100.
            </li>
          </ul>
          <p>
            These categories provide a clear interpretation of the lateral flow
            test outcome, helping to assess the likelihood of a positive or
            negative result with precision.
          </p>
        </div>

        <footer>
          <p>
            For further details, explore the project on{" "}
            <a
              href="https://github.com/fritzbenning/lateral-flow-test-analyzer"
              target="_blank"
            >
              GitHub
            </a>
            or try the live application{" "}
            <a
              href="https://lateral-flow-test-analyzer.vercel.app/"
              target="_blank"
            >
              here
            </a>
            .
          </p>
        </footer>
      </Card>
    </div>
  );
}
