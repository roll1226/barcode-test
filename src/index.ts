/**
 * Barcode Generator
 *
 * This script demonstrates how to generate barcodes using the JsBarcode library
 * with Node.js Canvas and save them as PNG files.
 */

// Import required libraries
import { createCanvas } from "canvas";
import fs from "fs";
import JsBarcode from "jsbarcode";
import path from "path";

// Define the text to encode in the barcode
const barcodeText = "\u00F1(91)912345123456789012345678901125013100123404";

// Define the output file path
const outputFilePath = path.join(__dirname, "..", "barcode.png");

/**
 * Generate a barcode and save it as a PNG file
 * @param text - Text to encode in the barcode
 * @param outputPath - Path where the PNG file will be saved
 */
async function generateBarcode(
  text: string,
  outputPath: string
): Promise<void> {
  try {
    console.log(`Generating barcode for text: ${text}`);

    // Create a canvas with appropriate dimensions
    const canvas = createCanvas(300, 100);

    // Generate the barcode on the canvas
    JsBarcode(canvas, text, {
      format: "CODE128C", // CODE128C を明示
       // 1モジュールの幅（600dpi換算）
      height: 472, // 10mm = 約472px（1200dpi）
      displayValue: true, // 人間が読めるテキストを表示
      textAlign: "center",
      margin: 120, // クワイエットゾーン（左右 2.54mm × 1200dpi ≈ 120px）
      ean128: true, // GS1-128 を使用
    });

    // Convert canvas to a PNG buffer
    const buffer = canvas.toBuffer("image/png");

    // Save the buffer to a file
    fs.writeFileSync(outputPath, buffer);

    console.log(`Barcode saved successfully at: ${outputPath}`);
  } catch (error) {
    console.error("Error generating barcode:", error);
  }
}

// Generate the barcode and handle the promise
generateBarcode(barcodeText, outputFilePath)
  .then(() => {
    console.log("Barcode generation process completed.");
  })
  .catch((error) => {
    console.error("Failed to generate barcode:", error);
    process.exit(1);
  });

// Export the function for potential use in other modules
export { generateBarcode };
