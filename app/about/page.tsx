import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { TagLine } from "@/components/ui/TagLine";
import { Mail, Scan } from "lucide-react";
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
      <Card className="prose-sm relative flex max-w-none items-start gap-4 p-10 sm:p-12 lg:max-w-none lg:p-14">
        <TableOfContents />
        <article className="prose-sm pb-2 lg:prose sm:pb-4">
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
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Will my image be processed by third-party providers?
              </AccordionTrigger>
              <AccordionContent>
                Yes, in the beta phase of the Lateral Flow Test Analyzer, we use{" "}
                <a href="https://roboflow.com/" target="_blank">
                  Roboflow
                </a>
                's infrastructure in the EU to analyze the test image with our AI model.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Will my images be used to further improve the neural network?
              </AccordionTrigger>
              <AccordionContent>
                No. Our model is already accurate enough and requires no further input. However, if
                a test is obviously not recognized, you can provide us with your image with one
                click so that we can add the model type from the lateral flow test to our model.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <h2>Support us</h2>
          <p>
            If you like our work, please consider supporting us with a small donation. This will
            help us to continue our work and improve the Lateral Flow Test Analyzer.
          </p>
        </article>
      </Card>
    </div>
  );
}
