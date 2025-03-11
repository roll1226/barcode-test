import bwipjs, { RenderOptions } from "bwip-js";
import fs from "fs";
import path from "path";

const barcodeExamples = [
  {
    name: "gs1-128",
    text: "(91)912345123456789012345678901125013100123404",
    options: {
      bcid: "gs1-128",
      text: "(91)912345123456789012345678901125013100123404",
      scale: 4, // 1モジュール = 4ピクセル（600 DPI に合わせる）
      width: 255, // バーコード部分の長さ 48.77mm
      height: 52, // バーコードの高さ 10mm 以上
      includetext: true,
      textxalign: "center" as "center",
    } as RenderOptions,
  },
  {
    name: "code128",
    text: "BWIP-JS Example",
    options: {
      bcid: "code128",
      text: "BWIP-JS Example",
      scale: 5, // 600 DPI に合わせる
      height: 10,
      includetext: true,
      textxalign: "center" as "center",
    },
  },
  {
    name: "qrcode",
    text: "https://example.com",
    options: {
      bcid: "qrcode",
      text: "https://example.com",
      scale: 5, // 600 DPI に合わせる
      includetext: false,
      format: "full",
    },
  },
  {
    name: "datamatrix",
    text: "BWIP-JS DataMatrix Example",
    options: {
      bcid: "datamatrix",
      text: "BWIP-JS DataMatrix Example",
      scale: 5, // 600 DPI に合わせる
      format: "square",
    },
  },
];

async function generateBarcode(
  options: RenderOptions,
  outputPath: string,
  format: "png" | "svg" = "svg"
): Promise<void> {
  try {
    console.log(
      `Generating ${format} barcode: ${options.bcid} for text: ${options.text}`
    );

    // Generate the barcode in requested format
    const renderOptions = { ...(options as any) };
    if (format === "svg") {
      renderOptions.svg = true;
    }

    const buffer = await bwipjs.toBuffer(renderOptions);

    // Save the buffer to a file
    fs.writeFileSync(outputPath, buffer);

    console.log(`Barcode saved successfully at: ${outputPath}`);
  } catch (error) {
    console.error(`Error generating ${options.bcid} barcode:`, error);
  }
}

async function generateAllBarcodes(): Promise<void> {
  try {
    const barcodeDir = path.join(__dirname, "..", "barcodes");
    if (!fs.existsSync(barcodeDir)) {
      fs.mkdirSync(barcodeDir);
    }

    for (const example of barcodeExamples) {
      // Generate SVG version
      const svgOutputPath = path.join(barcodeDir, `${example.name}.svg`);
      await generateBarcode(example.options, svgOutputPath, "svg");

      // Generate PNG version
      const pngOutputPath = path.join(barcodeDir, `${example.name}.png`);
      await generateBarcode(example.options, pngOutputPath, "png");
    }

    console.log(
      "All barcodes generated successfully in both SVG and PNG formats!"
    );
  } catch (error) {
    console.error("Error in barcode generation process:", error);
  }
}

generateAllBarcodes()
  .then(() => {
    console.log("Barcode generation process completed.");
  })
  .catch((error) => {
    console.error("Failed to generate barcodes:", error);
    process.exit(1);
  });

export async function generateCustomBarcode(
  bcid: string,
  text: string,
  outputPath: string,
  additionalOptions: Partial<RenderOptions> = {},
  format: "png" | "svg" = "svg"
): Promise<void> {
  const options: RenderOptions = {
    bcid,
    text,
    scale: 3,
    height: 10,
    includetext: true,
    ...additionalOptions,
  };

  return generateBarcode(options, outputPath, format);
}

export { generateAllBarcodes, generateBarcode };
