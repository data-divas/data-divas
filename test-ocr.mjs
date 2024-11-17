import fs from "fs/promises";
import path from "path";

async function main() {
  try {
    const imageBase64 = await fs.readFile(path.join("public", "soap.jpeg"));
    console.log(imageBase64);
    
    const imageBlob = new Blob([imageBase64], { type: 'image/jpeg' });

    const response = await fetch(
      "https://zfhct821-8000.use.devtunnels.ms/ocr",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageBlob,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

main();
