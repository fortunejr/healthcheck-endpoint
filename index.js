import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// 🔐 Load private key from .env (make sure it’s formatted correctly with newlines)
const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");

// ✅ Health Check Route (no encryption required)
app.get("/whatsapp/flows", (req, res) => {
  res.status(200).send("Health check passed ✅");
});

// 🔄 Data Exchange Route (encryption required)
app.post("/whatsapp/flows", (req, res) => {
    console.log("Incoming Flow data:", req.body);
    
  // Your actual response data (this is what WhatsApp expects back)
  const responseData = {
    status: "success",
    data: {
      message: "Data exchange handled successfully 🚀",
    },
  };

  const jsonString = JSON.stringify(responseData);

  // 🔒 Encrypt using your private key
  const encrypted = crypto.privateEncrypt(
    {
      key: PRIVATE_KEY,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(jsonString)
  );

  // Base64 encode the encrypted result before sending
  const base64Response = encrypted.toString("base64");

  // ✅ Send encrypted Base64 response
  res.status(200).type("text/plain").send(base64Response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
