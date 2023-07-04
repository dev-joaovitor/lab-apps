const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "/public")));

app.use((req, res) => {
    res.status(404);
    res.redirect("/404");
    res.end();
})

app.listen(6969, () => console.log("App listening on port 6969"));