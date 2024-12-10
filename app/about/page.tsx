import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { TagLine } from "@/components/ui/TagLine";
import { Mail, Scan } from "lucide-react";
import { HideOnMobile } from "@/components/ui/HideOnMobile";

import NextLink from "next/link";
import { InfoCard } from "@/components/ui/InfoCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

export default function Home() {
  return (
    <div className="mx-auto flex flex-col gap-4 px-4 py-4 sm:gap-6 md:py-8 lg:gap-8">
      <Header />
      <Card className="relative flex max-w-none items-start gap-4 p-6 sm:p-10 lg:max-w-none lg:p-14">
        <HideOnMobile className="w-1/4 shrink-0">
          <TableOfContents />
        </HideOnMobile>
        <article className="prose pb-2 sm:pb-4">
          <TagLine>How it works</TagLine>
          <h1>Lateral Flow Test Analyzer</h1>
          <p>
            The Lateral Flow Test Analyzer helps you to measure the intensity of many lateral flow
            tests in a short time. This means you no longer have to use a physical lateral flow
            reader or evaluate the test manually, e.g. with ImageJ.
          </p>
          <p>
            To make this possible, we use a <strong>neural network</strong> that uses{" "}
            <strong>computer vision</strong> to recognize one or more lateral flow tests in an
            image.{" "}
          </p>
          <p>
            Using a classic contrast analysis of the gray-colored image, we can measure the exact
            intensity of the test.
          </p>
          <p className="not-prose py-4">
            <NextLink href="/">
              <Button className="flex items-center gap-2">
                <Scan width={16} height={16} /> Scan your fist test
              </Button>
            </NextLink>
          </p>
          <h2>Instructions</h2>
          <p>
            Analyzing a lateral flow test is very simple. Take a photo of your test on a neutral
            background such as a table top and align it so that the control line (C) is at the top
            and the test line (T) is at the bottom. Also make sure that the test is as centered and
            straight as possible in the picture.
          </p>
          <p>
            Then upload the image here to the Lateral Flow Test Analyzer and you will receive the
            result in just a few seconds.
          </p>
          <p>
            You can then display the analyzed image information in a chart. You also have the option
            of downloading the result as an Excel file for further processing.
          </p>
          <h2>Our process in detail</h2>
          <p>
            A few steps are necessary to ensure that a test is not misinterpreted. We would like to
            briefly introduce these for the sake of clarity.
          </p>
          <div className="flex flex-col gap-3 py-4">
            <InfoCard tagLine="Step 1" title="Image preprocessing">
              <p>
                We first use the Yolo v8 model to remove the background, eliminate possible sources
                of error eliminate sources of error and improve edge detection.
              </p>
              <p>
                Since our test detection model can only recognize rectangles, it is necessary to
                determine the position of the test in the image image and rotate the test area (ROI)
                vertically.
              </p>
            </InfoCard>
            <InfoCard tagLine="Step 3" title="Test + RIO detection">
              Our test detection model has been trained with over 500 sample images and reliably
              recognizes known lateral flow tests and specifically the area (ROI) where the test
              lanes can be measured.
            </InfoCard>
            <InfoCard tagLine="Step 4" title="Pixel analysis">
              <p>
                To interpret the lateral flow test, the test image is first converted unweighted to
                grayscale. A test pixel is then defined for each y-coordinate. Possible peaks are
                then identified on the basis of the gray value.
              </p>
              <p>You can see the result of the pixel analysis in the visualisation chart.</p>
            </InfoCard>
            <InfoCard tagLine="Step 5" title="Interpretation">
              <p>
                In the final step, the peaks are checked for plausibility. If no peak is found, the
                test has not yet been used. If one peak is found, it is assumed that the test is
                negative and if two peaks are found, it is assumed that the test is positive.
              </p>
              <p>
                In this case, the ratio of the two peaks is calculated and output as the intensity
                of the test.
              </p>
            </InfoCard>
          </div>
          <h4>Do you have any questions?</h4>
          <p>
            If you have any questions about our approach or require further details, please take a
            look at our FAQ section or contact us directly.
          </p>
          <p className="not-prose py-4">
            <NextLink href="/">
              <Button className="flex items-center gap-2">
                <Mail width={16} height={16} /> Contact us
              </Button>
            </NextLink>
          </p>
          <h2>FAQs</h2>
          <Accordion type="single" collapsible className="not-prose w-full">
            <AccordionItem value="lateral-flow-test">
              <AccordionTrigger>What is a lateral flow test?</AccordionTrigger>
              <AccordionContent>
                <p>
                  A lateral flow test (LFT) is a simple, rapid diagnostic tool used to detect the
                  presence or absence of a specific substance, typically biomarkers, pathogens, or
                  other analytes, in a liquid sample. It uses a thin strip of material where a
                  sample flows laterally (via capillary action) across a series of specialized zones
                  containing reagents.
                </p>
                <p>
                  Results are usually visualized as lines, often within minutes, and are widely used
                  for medical diagnostics, environmental testing, and food safety due to their
                  affordability, portability, and ease of use.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="third-party-provider">
              <AccordionTrigger>Are my images processed by third-party providers?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, in the beta phase of the Lateral Flow Test Analyzer, we use{" "}
                  <a href="https://roboflow.com/" target="_blank" className="underline">
                    Roboflow&apos;s
                  </a>{" "}
                  infrastructure in the EU to analyze the test image with our AI model.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="network-training">
              <AccordionTrigger>
                Will my images be used to further improve the neural network?
              </AccordionTrigger>
              <AccordionContent>
                No. Our model is already accurate enough and requires no further input. However, if
                a test is obviously not recognized, you can provide us with your image with one
                click so that we can add the model type from the lateral flow test to our model.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="pixel-analysis">
              <AccordionTrigger>Which pixels are used for the analysis?</AccordionTrigger>
              <AccordionContent>
                <p>
                  The test area is determined with the help of our AI model. Then 2x2 pixels are
                  combined into one pixel unit in order to filter out outliers and reduce the
                  calculation load (this process is called pixel binding). Then all pixel units that
                  are positioned in the centre of the X-axis are evaluated. In this way, only one
                  pixel unit is analysed for each Y coordinate.
                </p>
                <p>
                  To filter out possible edge shading, the top and bottom 10% of the pixel units on
                  the Y axis are also removed from the analysis.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="greyscale-conversion">
              <AccordionTrigger>How are the images converted to greyscale?</AccordionTrigger>
              <AccordionContent>
                We currently use an unimportant conversion of the RGB values to greyscale. This
                means that the values for red, green and blue are added together and then divided by
                3. The calculated value is then set for each colour value.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="peak-detection">
              <AccordionTrigger>How are the peaks identified?</AccordionTrigger>
              <AccordionContent>
                <p>
                  To detect the peaks, the grey values of each Y-coordinate are systematically
                  analysed. Each individual pixel unit is compared with the neighbouring units (10%
                  in each direction) to determine whether they have a higher grey value. If this is
                  the case, this unit is evaluated as a peak.
                </p>
                <p>
                  If there are pixel units with the same grey value among the direct neighbours, it
                  can be assumed that a plateau has been formed. In this case, these pixel units are
                  evaluated as a peak and the first pixel unit in this group is further processed as
                  a peak.
                </p>
                <p>
                  In order to exclude non-significant peaks, a relative minimum grey value must also
                  be achieved. This is 110% of the grey value mediaan.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="result-interpretation">
              <AccordionTrigger>Which result is assumed for which intensities?</AccordionTrigger>
              <AccordionContent>
                <p>The result for a given intensity is determined based on its value:</p>
                <ul>
                  <li>
                    <strong>Intensity = 0:</strong> The result is considered{" "}
                    <em>negative with a high probability</em>.
                  </li>
                  <li>
                    <strong>Intensity between 1 and 19:</strong> The result is{" "}
                    <em>positive with a small probability</em>.
                  </li>
                  <li>
                    <strong>Intensity between 20 and 49:</strong> The result is{" "}
                    <em>positive with a moderate probability</em>.
                  </li>
                  <li>
                    <strong>Intensity between 50 and 99:</strong> The result is{" "}
                    <em>positive with a high probability</em>.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <h2>Support us</h2>
          <p>
            If you like our work, please consider supporting us with a small donation. This will
            help us to continue our work and improve the Lateral Flow Test Analyzer.
          </p>
          <p>
            <strong>
              For more information on how you can support us, please contact us personally.
            </strong>
          </p>
          <p className="not-prose py-4">
            <NextLink href="/">
              <Button className="flex items-center gap-2">
                <Mail width={16} height={16} /> Get in touch
              </Button>
            </NextLink>
          </p>
        </article>
      </Card>
    </div>
  );
}
