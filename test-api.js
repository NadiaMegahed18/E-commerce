const https = require('https');

const url = "https://ecommerce.routemisr.com/api/v1/categories";

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log("Status Code:", res.statusCode);
            console.log("Response Structure Keys:", Object.keys(json));
            if (json.data && Array.isArray(json.data)) {
                console.log("Number of categories:", json.data.length);
                console.log("First category sample:", JSON.stringify(json.data[0], null, 2));
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
