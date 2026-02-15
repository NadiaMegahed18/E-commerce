const https = require('https');
// Example Category ID (from user's previous message or a known one)
// User gave: https://ecommerce.routemisr.com/api/v1/categories/6407ebf65bbc6e43516931ec
const categoryId = "6407ebf65bbc6e43516931ec";
const url = `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`;

console.log("Testing URL:", url);

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log("Status Code:", res.statusCode);
            if (json.data && Array.isArray(json.data)) {
                console.log("Number of subcategories:", json.data.length);
                if (json.data.length > 0) {
                    console.log("First subcategory sample:", JSON.stringify(json.data[0], null, 2));
                } else {
                    console.log("Subcategories array is empty.");
                }
            } else {
                console.log("Data field is missing or not an array");
                console.log("Full Response:", JSON.stringify(json, null, 2));
            }
        } catch (e) {
            console.error("Error parsing JSON:", e.message);
            console.log("Raw Data:", data);
        }
    });

}).on("error", (err) => {
    console.error("Error: " + err.message);
});
