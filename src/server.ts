import "reflect-metadata";
import express from "express";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

import { myDataSource } from "./server-datasource";

import * as BalanceControllers from "./controller/BalanceControllers";
import * as BalanceMiddlewares from "./middleware/BalanceMiddlewares";

import * as SkalarControllers from "./controller/SkalarControllers";
import skalarValidation from "./middleware/skalarFileSizeLimiter";

import PageNotFound from "./middleware/four0four";

const app = express()

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        app.listen(3000, () => console.log("App listening on port 3000"));
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    })

app.use(cookieParser());
app.use(express.json());
app.get("/", (_, res) => res.redirect("/home-page"));


// balance routes
app.get("/balance-table", BalanceMiddlewares.cookieCheck, express.static("public"));

app.use(express.static("public"));


app.get("/api/get-weights", BalanceControllers.getAllWeights);

app.get("/api/get-weights/:batch", BalanceControllers.getWeightsByBatch);

app.post("/api/store-weights", BalanceControllers.StoreWeights);

app.post("/api/store-form", BalanceControllers.StoreForm);

app.post("/api/calc-criteria", BalanceControllers.calcCriteria);

// skalar routes
app.post("/api/extract-skalar-data",
    fileUpload(), 
    skalarValidation,
    SkalarControllers.ExtractSkalarData);

app.post("/api/store-skalar-analysis", SkalarControllers.StoreSkalarAnalysis);

// 404
app.use(PageNotFound);

// websockets mock --- this code will be moved to balance's raspberry
import { Server } from "ws";
const ws = new Server({ port: 9999 });

ws.on("connection", (stream) => {
    console.log("connected");
    const mockArray = [1034.18, 1035.06, 1021.5, 1034.88, 1029.27, 1037.02, 1031.89, 1022.07, 1030.28, 1034.06, 1025.83, 1026.13, 1027.44, 1038.28, 1026.85, 1031.14, 1030.54, 1026.02, 1026.04, 1025.6, 1061.63, 1062.38, 1050.43, 1057.73, 1056.13, 1067.02, 430.66, 432.21, 421.28, 424.86, 427.73, 432.92, 424.67, 417.62, 428.66, 423.15, 419.15, 419.36, 420.46, 433.7, 417.18, 424.09, 425.28, 415.91, 419.36, 418, 1058.01, 1058.53, 1052.26, 1046.44, 1053.57, 1062.76]

    //mock
    // stream.send((Math.random() * (400 - 100) + 100).toFixed(2));
    let i = 0;
    const mockInterval = setInterval(() => {
        if (i === mockArray.length) return (
            stream.send((200 * Math.random()).toFixed(2))
        );
        stream.send(mockArray[i]);
        i++;
    }, 200)
});
// --------------------------------------------------------