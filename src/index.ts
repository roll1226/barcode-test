/**
 * Barcode Generator
 *
 * This script demonstrates how to generate barcodes using the JsBarcode library
 * with Node.js Canvas and save them as PNG files.
 */

// Import required libraries
import { createCanvas } from 'canvas';
import JsBarcode from 'jsbarcode';
import fs from 'fs';
import path from 'path';

// Define the text to encode in the barcode
const barcodeText = '12345678';

// Define the output file path
const outputFilePath = path.join(__dirname, '..', 'barcode.png');

/**
 * Generate a barcode and save it as a PNG file
 * @param text - Text to encode in the barcode
 * @param outputPath - Path where the PNG file will be saved
 */
async function generateBarcode(text: string, outputPath: string): Promise<void> {
  try {
    console.log(`Generating barcode for text: ${text}`);

    // Create a canvas with appropriate dimensions
    const canvas = createCanvas(300, 100);

    // Generate the barcode on the canvas
    JsBarcode(canvas, text, {
      format: 'CODE128', // Barcode format (CODE128 supports alphanumeric)
      width: 2,          // Width of the bars
      height: 100,       // Height of the barcode
      displayValue: true, // Show the text below the barcode
      text: text,        // Text to display (can be different from encoded value)
      fontOptions: 'bold', // Font style
      fontSize: 18,      // Font size
      margin: 10,        // Margin around the barcode
    });

    // Convert canvas to a PNG buffer
    const buffer = canvas.toBuffer('image/png');

    // Save the buffer to a file
    fs.writeFileSync(outputPath, buffer);

    console.log(`Barcode saved successfully at: ${outputPath}`);
  } catch (error) {
    console.error('Error generating barcode:', error);
  }
}

// Generate the barcode and handle the promise
generateBarcode(barcodeText, outputFilePath)
  .then(() => {
    console.log('Barcode generation process completed.');
  })
  .catch((error) => {
    console.error('Failed to generate barcode:', error);
    process.exit(1);
  });

// Export the function for potential use in other modules
export { generateBarcode };
