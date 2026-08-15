const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// No fallback route needed for a single page app without client-side routing

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
