const express = require('express');
const bodyParser = require('body-parser');

// const ffmpeg = require("ffmpeg-static");
// const util = require("util");
// const execFile = util.promisify(require("child_process").execFile);

const app = express();
const PORT = 3005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

// app.post('/convert', async (req, res) => {
//   const blob = Buffer.from(req.body.blob, 'base64');
//   console.log("🚀🚀 ~ file: index.js:18 ~ app.get ~ blob:", blob)

//   const { stdout } = await execFile(ffmpeg, req.body.args);

//   res.send(stdout);

// })


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
