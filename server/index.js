const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser());
app.get("/v1/reference_data", (req, res) => {
  res.json({
    module: "user-registration",
    ui_definition: {
      mandatory_fields: ["name", "type", "first_home_buyer"],
      user_types: [
        {
          key: 0,
          value: "Select one"
        },
        {
          key: 1,
          value: "Group 1"
        },
        {
          key: 2,
          value: "Group 2"
        }
      ]
    }
  });
});

app.post("/v1/customer", (req, res) => {
  res.json({
    success: true
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
