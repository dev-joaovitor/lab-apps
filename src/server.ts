import "reflect-metadata";
import express from 'express';

const app = express();

app.use(express.static("public"));

app.use((req, res) => {
    res.status(404);
    res.redirect("/404");
    res.end();
})

app.listen(3000, () => console.log("App listening on port 3000"));