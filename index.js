import express from "express";

const app = express();
app.use(express.json());

// ✅ Health Check endpoint
app.get("/whatsapp/flows", (req, res) => {
  return res.status(200).send("Health check passed");
});

// ✅ Data Exchange endpoint
app.post("/whatsapp/flows", (req, res) => {
  console.log("📩 Data Exchange received:", req.body);

  // Respond with the expected format
  const response = {
    status: "success",
    data: {
      message: "Data exchange handled successfully",
    },
  };

  return res.status(200).json(response);
});

// ✅ Error Notification endpoint
app.post("/whatsapp/flows/error", (req, res) => {
  console.error("⚠️ Error Notification received:", req.body);

  return res.status(200).json({
    status: "acknowledged",
  });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
