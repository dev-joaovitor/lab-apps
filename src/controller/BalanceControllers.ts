import { Form } from "../entity/form.entity";
import { Weights } from "../entity/weights.entity";
import { productivePoints } from "../entity/productivePoints.entity";
import { Request, Response } from "express";
import { myDataSource } from "../server-datasource";
import { individualTolerances } from "../entity/tolerance.entity";

export async function StoreForm(req: Request, res: Response) {
    const repo = myDataSource.getRepository(Form);
    const { userId, batchNo, waterDensity, equipment, nominalVolume } = req.body;
    console.log(req.body);

    if (userId < 90000000 || !userId) return res.status(400).json({ error: 1 });
    if (!batchNo) return res.status(400).json({ error: 2 });
    if (!waterDensity) return res.status(400).json({ error: 3 });
    if (!equipment) return res.status(400).json({ error: 4 });
    if (!nominalVolume) return res.status(400).json({ error: 5 });

    const productivePoint = (await myDataSource.getRepository(productivePoints).findOneBy({ equipment })).productivePoint;
    const individualTolerance = (await myDataSource.getRepository(individualTolerances).findOneBy({ nominalVolume })).individualTolerance;

    delete req.body.equipment;
    req.body["productivePoint"] = productivePoint;
    req.body["individualTolerance"] = individualTolerance;

    const form = repo.create(req.body);
    const result = await repo.save(form).catch(e => console.log(e));
    
    res.cookie("batch", batchNo);
    res.status(200).json({ message: "success" });
}

export async function StoreWeights(req: Request, res: Response) {
    const repo = myDataSource.getRepository(Weights);
    // const {} = req.body; TODO: status 400..
    
    const weights = repo.create(req.body);
    const result = await repo.save(weights)
                            .catch(e => res.status(400).json({ error: "Alguma coisa deu errado =(" }));
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