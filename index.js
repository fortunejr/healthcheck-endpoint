import express from "express";

const app = express();
app.use(express.json());

// ✅ Health Check endpoint
app.get("/whatsapp/flows", (req, res) => {
  res.status(200).send("Health check passed");
});

// ✅ Data Exchange endpoint
app.post("/whatsapp/flows", (req, res) => {
  console.log("📩 Incoming Data Exchange:", req.body);

  // Normal response
  const responseData = {
    status: "success",
    data: {
      message: "Data exchange handled successfully",
    },
  };

  // Encode entire body as Base64
  const base64Response = Buffer.from(JSON.stringify(responseData)).toString("base64");

  // ✅ Send Base64 string as raw body
  res.status(200).type("text/plain").send(base64Response);
});

// ✅ Error Notification endpoint
app.post("/whatsapp/flows/error", (req, res) => {
  console.error("⚠️ Error Notification:", req.body);
  res.status(200).json({ status: "acknowledged" });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
