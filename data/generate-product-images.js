// Node.js script to generate product-images.json from img/product/
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../img/product');
const outFile = path.join(__dirname, 'product-images.json');

const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

fs.readdir(imgDir, (err, files) => {
    if (err) throw err;
    const images = files.filter(f => validExtensions.includes(path.extname(f).toLowerCase()));
    fs.writeFileSync(outFile, JSON.stringify(images, null, 2));
    console.log(`Wrote ${images.length} images to product-images.json`);
});
