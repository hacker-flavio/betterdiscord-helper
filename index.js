const express = require("express");
const fs = require("fs");
const app = express();
const port = 3050;
const cors = require("cors");

app.use(express.static("themes"));
app.use(cors());

app.get("/update-css", (req, res) => {
  const newBackgroundImage = req.query.backgroundImage;

  // Read the CSS file
  const cssFilePath = "themes/ClearVision_v6.theme.css";
  fs.readFile(cssFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading CSS file: ${err}`);
      return res.status(500).send("Error reading CSS file");
    }

    // Modify the CSS content (for example, change the background image)
    // Modify the CSS content (update the background image URL)
    const modifiedData = data.replace(
      /--background-image: url\(.*\);/,
      `--background-image: url(${newBackgroundImage});`
    );

    // Write the modified CSS back to the file
    fs.writeFile(cssFilePath, modifiedData, "utf8", (err) => {
      if (err) {
        console.error(`Error writing CSS file: ${err}`);
        return res.status(500).send("Error writing CSS file");
      }
      console.log("CSS file updated successfully!");
      res.send("CSS file updated successfully!");
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
