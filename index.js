import express from "express";

const app = express();
app.use(express.json());

// ✅ Health Check
app.get("/whatsapp/flows", (req, res) => {
  res.status(200).send("Health check passed");
});

// ✅ Data Exchange
app.post("/whatsapp/flows", (req, res) => {
  console.log("📩 Data Exchange received:", req.body);

  // Create your normal response object
  const responseData = {
    status: "success",
    data: {
      message: "Data exchange handled successfully",
    },
  };

  // Encode as Base64 (required by WhatsApp Flows)
  const base64Response = Buffer.from(JSON.stringify(responseData)).toString("base64");

  res.status(200).send({
    response: base64Response, // WhatsApp expects Base64 string in the 'response' field
  });
});

// ✅ Error Notification
app.post("/whatsapp/flows/error", (req, res) => {
  console.error("⚠️ Error Notification received:", req.body);
  res.status(200).json({ status: "acknowledged" });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
