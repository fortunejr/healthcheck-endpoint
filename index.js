import express from "express";
import crypto from "crypto";
import fs from "fs";

const app = express();
app.use(express.json());

// Load your private key (not uploaded to GitHub!)
const PRIVATE_KEY = fs.readFileSync("./private_key.pem", "utf8");

// ✅ Health check route (Meta calls this first)
app.get("/whatsapp/flows", (req, res) => {
  res.status(200).send("OK");
});

// ✅ Data exchange route
app.post("/whatsapp/flows", (req, res) => {
  console.log("Incoming Flow Data:", req.body);

  // Response to WhatsApp
  const responsePayload = {
    status: "success",
    data: {
      message: "Data exchange handled successfully",
    },
  };

  const responseJson = JSON.stringify(responsePayload);

  try {
    // Encrypt response
    const encrypted = crypto.privateEncrypt(
      {
        key: PRIVATE_KEY,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(responseJson)
    );

    // Encode as Base64
    const base64Encoded = encrypted.toString("base64");

    // Send plain text Base64 string (no JSON)
    res.status(200).type("text/plain").send(base64Encoded);
  } catch (error) {
    console.error("Encryption error:", error);
    res.status(500).send("Encryption failed");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
