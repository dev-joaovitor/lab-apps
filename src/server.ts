import "reflect-metadata";
import express from "express";
import { Request, Response } from "express";
import { myDataSource } from "./server-datasource";
import { Form } from "./entity/form.entity";
import { Weights } from "./entity/weights.entity";
import * as BalanceControllers from "./controller/BalanceControllers";
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

app.use(express.static("public"));
app.use(express.json());

app.get("/api/get-weights", BalanceControllers.getAllWeights);

app.get("/api/get-weights/:batch", BalanceControllers.getWeightsByBatch);

app.post("/api/store-weights", BalanceControllers.StoreWeights);

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