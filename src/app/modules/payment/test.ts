const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json()); // Parse incoming JSON data

app.post("/ipn", async (req, res) => {
  const { val_id, tran_id, amount, currency, status } = req.body; // Extract necessary fields from IPN request

  // Check if status is VALID (successful transaction)
  if (status === "VALID") {
    try {
      // Send validation request to SSLCOMMERZ
      const store_id = "your_store_id"; // Replace with your actual store ID
      const store_passwd = "your_store_password"; // Replace with your actual store password

      const validationURL = `https://securepay.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${store_id}&store_passwd=${store_passwd}&format=json`;

      const response = await axios.get(validationURL);
      const validationData = response.data;

      // Check if validation is successful
      if (validationData.status === "VALIDATED") {
        // Update order status in your database based on validation response
        console.log(`Transaction ${tran_id} is successfully validated!`);
        res.status(200).send("Payment successfully validated");
      } else {
        console.log(`Transaction ${tran_id} validation failed!`);
        res.status(400).send("Payment validation failed");
      }
    } catch (error) {
      console.error("Error during payment validation:", error);
      res.status(500).send("Internal server error");
    }
  } else {
    console.log(`Transaction ${tran_id} failed with status: ${status}`);
    res.status(400).send("Transaction failed or canceled");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
