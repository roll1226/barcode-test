# Barcode Test Project

A simple Node.js and TypeScript project that generates barcodes using JsBarcode and saves them as PNG files.

## Technologies Used

- Node.js
- TypeScript
- JsBarcode (for barcode generation)
- Canvas (for image creation and manipulation)

## Installation

Follow these steps to set up the project locally:

1. Clone the repository or create a new directory
   ```
   mkdir barcode-test
   cd barcode-test
   ```

2. Initialize the project and install dependencies
   ```
   npm init -y
   npm install --save typescript ts-node @types/node jsbarcode canvas
   ```

3. Initialize TypeScript configuration
   ```
   npx tsc --init
   ```

## Project Structure

```
barcode-test/
├── src/
│   └── index.ts
├── dist/
│   └── (compiled JavaScript files)
├── package.json
├── tsconfig.json
└── README.md
```

## Usage

The project includes several npm scripts to make development easier:

### Build the Project

Compile TypeScript files to JavaScript:

```
npm run build
```

### Run the Project

Execute the compiled JavaScript:

```
npm start
```

### Development Mode

Run the TypeScript code directly using ts-node:

```
npm run dev
```

## Example

When you run the project, it will generate a barcode from the sample text (e.g., "12345678") and save it as a PNG file in the project directory.

## Customization

You can modify the `src/index.ts` file to:
- Change the barcode format
- Adjust the barcode size and styling
- Change the text being encoded
- Modify the output file path

## License

This project is open source and available under the [MIT License](LICENSE).
