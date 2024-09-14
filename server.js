// import express from "express";
// import axios from "axios";
// import crypto from "crypto";
// import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json()); 

// app.post("/paapi5/searchitems", async (req, res) => {
//   const { Keywords, SearchIndex, ItemCount, PartnerTag } = req.query; 
//   const AccessKey = process.env.ACCESS_KEY_AMAZONAPI;
//   const SecretKey = process.env.SECRET_KEY_AMAZONAPI;
//   const Host = "webservices.amazon.in";
//   const Region = "eu-west-1";
//   const date = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, "").substring(0, 15) + "Z";
// const date2 =  Date.now();
// console.log(date)
//   const canonicalRequest = `POST\n/paapi5/searchitems\n\nhost:${Host}\n\nhost\n${crypto.createHash("sha256").update("").digest("hex")}`;
//   const stringToSign = `AWS4-HMAC-SHA256\n${date}\n${date.substring(0, 8)}/${Region}/ProductAdvertisingAPIv1/aws4_request\n${crypto.createHash("sha256").update(canonicalRequest).digest("hex")}`;
//   const signingKey = getSignatureKey(SecretKey, date.substring(0, 8), Region, "ProductAdvertisingAPIv1");
//   const signature = crypto.createHmac("sha256", signingKey).update(stringToSign).digest("hex");
//   const authorizationHeader = `AWS4-HMAC-SHA256 Credential=${AccessKey}/${date.substring(0, 8)}/${Region}/ProductAdvertisingAPIv1/aws4_request, SignedHeaders=host, Signature=${signature}`;

//   try {
//     const response = await axios.post(`https://${Host}/paapi5/searchitems`, {
//       Keywords,
//       SearchIndex,
//       SecretKey,
//       Service : "ProductAdvertisingAPIv1",
//       AccessKey,
//       Host,
//       Region,
//       PartnerTag,
//       PartnerType : "Associates"
//     }, {
//       headers: {
//         "Host": Host.toString(),
//         "Content-Type": "application/json; charset=UTF-8",
//         'X-Amz-Target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems',
//         'Content-Encoding': 'amz-1.0',
//         'User-Agent': 'paapi-docs-curl/1.0.0',
//         'server':'server',
//         "X-Amz-Date": date,
//         "Authorization": authorizationHeader
//       }
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.log("Error fetching data from Amazon Affiliate API:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// function getSignatureKey(key, dateStamp, regionName, serviceName) {
//   const kDate = crypto.createHmac("sha256", `AWS4${key}`).update(dateStamp).digest();
//   const kRegion = crypto.createHmac("sha256", kDate).update(regionName).digest();
//   const kService = crypto.createHmac("sha256", kRegion).update(serviceName).digest();
//   const kSigning = crypto.createHmac("sha256", kService).update("aws4_request").digest();
//   return kSigning;
// }

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
