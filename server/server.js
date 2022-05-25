const express = require('express');
const app = express();
const PORT = process.env.port || 5001;
const listRouter = require('./routes/router.js')

// Middle ware

app.use(express.static('server/public'));
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/list', listRouter)

// Listeners

// Boot up

app.listen(PORT, () => {
    console.log('listening on port:', PORT);
})