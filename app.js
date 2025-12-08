const express = require('express');
const path = require('path');
const app = express();

// get the port from env variable
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'dist', 'full-stack-open-pokedex')));

app.get('/health', (req, res) => {
  res.send('ok');
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
