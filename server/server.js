const express = require('express');
const app = express();
const PORT = 5000;

// Middle ware

app.use(express.static('server/public'));
app.use(express.urlencoded({extended: true}));

// Listeners

// Boot up

app.listen(PORT, () => {
    console.log('listening on port:', PORT);
})