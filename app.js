const express = require('express');

const port = 3000;

app.listen(port, () => {
  console.log(`my poke server is running at http://localhost:${port}`)
});

const app = express();
