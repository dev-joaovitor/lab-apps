import "reflect-metadata";
import express from "express";
import cookieParser from "cookie-parser";

import { myDataSource } from "./server-datasource";

import * as BalanceControllers from "./controller/BalanceControllers";
import * as BalanceMiddlewares from "./middleware/BalanceMiddlewares";

import PageNotFound from "./middleware/four0four";
import { Server } from "ws";

const ws = new Server({ host: "10.175.231.8", port: 9999 });

ws.on("connection", (stream) => {
    console.log("connected");
    const mockArray = [1034.18, 1035.06, 1021.5, 1034.88, 1029.27, 1037.02, 1031.89, 1022.07, 1030.28, 1034.06, 1025.83, 1026.13, 1027.44, 1038.28, 1026.85, 1031.14, 1030.54, 1026.02, 1026.04, 1025.6, 1061.63, 1062.38, 1050.43, 1057.73, 1056.13, 1067.02, 430.66, 432.21, 421.28, 424.86, 427.73, 432.92, 424.67, 417.62, 428.66, 423.15, 419.15, 419.36, 420.46, 433.7, 417.18, 424.09, 425.28, 415.91, 419.36, 418, 1058.01, 1058.53, 1052.26, 1046.44, 1053.57, 1062.76]

    //mock
    // stream.send((Math.random() * (400 - 100) + 100).toFixed(2));
    let i = 0;
    const mockInterval = setInterval(() => {
        if (i === mockArray.length) return clearInterval(mockInterval);
        stream.send(mockArray[i]);
        i++;
    }, 200)
});

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

app.get("/balance-table", BalanceMiddlewares.cookieCheck, express.static("public"));

app.use(express.static("public"));

app.get("/api/get-weights", BalanceControllers.getAllWeights);

app.get("/api/get-weights/:batch", BalanceControllers.getWeightsByBatch);

app.post("/api/store-weights", BalanceControllers.StoreWeights);

app.post("/api/store-form", BalanceControllers.StoreForm);

app.post("/api/calc-criteria", BalanceControllers.calcCriteria);

// 404
app.use(PageNotFound);

// // register routes
// app.get("/users", async function (req: Request, res: Response) {
//     const users = await myDataSource.getRepository(User).find()
//     res.json(users)
// })

// app.get("/users/:id", async function (req: Request, res: Response) {
//     const results = await myDataSource.getRepository(User).findOneBy({
//         id: parseInt(req.params.id),
//     })
//     return res.send(results)
// })

// app.post("/users", async function (req: Request, res: Response) {
//     console.log(req.body);
//      const user = myDataSource.getRepository(User).create(req.body);
//     const results = await myDataSource.getRepository(User).save(user).catch(e => {
//         res.status(400).send({ "error": "=(" });
//         return;
//     })

//     return res.send(results);
// })

// app.put("/users/:id", async function (req: Request, res: Response) {
//     const user = await myDataSource.getRepository(User).findOneBy({
//         id: parseInt(req.params.id),
//     })
//     myDataSource.getRepository(User).merge(user, req.body)
//     const results = await myDataSource.getRepository(User).save(user)
//     return res.send(results)
// })

// app.delete("/users/:id", async function (req: Request, res: Response) {
//     const results = await myDataSource.getRepository(User).delete(req.params.id)
//     return res.send(results)
// })