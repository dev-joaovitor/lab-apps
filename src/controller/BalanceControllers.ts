import { Form } from "../entity/form.entity";
import { Weights } from "../entity/weights.entity";
import { Request, Response } from "express";
import { myDataSource } from "../server-datasource";

export async function StoreForm(req: Request, res: Response) {
    // const user = myDataSource.getRepository(Form).create(req.body);
}

export async function StoreWeights(req: Request, res: Response) {
    const repo = myDataSource.getRepository(Weights);
    // const {} = req.body; TODO: status 400..
    
    const weights = repo.create(req.body);
    const result = await repo.save(weights);
    console.log(result);

    res.status(200).json({ message: "Valores salvos no banco de dados!" });
}

export async function getAllWeights(req: Request, res: Response) {
    const weights = await myDataSource.getRepository(Weights).find()
                            .catch(e => res.status(400).json({ error: "Alguma coisa deu errado =(" }));
    console.log(weights);

    res.status(200).json(weights);
}

export async function getWeightsByBatch(req: Request, res: Response) {
    const weights = await myDataSource.getRepository(Weights).findBy({
        batchNo: parseInt(req.params.batch)
     }).catch(e => res.status(400).json({ error: "Alguma coisa deu errado =(" }))
     console.log(weights);

     res.status(200).json(weights);
}