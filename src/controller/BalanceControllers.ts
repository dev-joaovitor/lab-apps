import { Form } from "../entity/form.entity";
import { Weights } from "../entity/weights.entity";
import { productivePoints } from "../entity/productivePoints.entity";
import { Request, Response } from "express";
import { myDataSource } from "../server-datasource";
import { individualTolerances } from "../entity/tolerance.entity";
import formValidation from "../model/formValidation";

export async function StoreForm(req: Request, res: Response) {
    let formError = false;

    const repo = myDataSource.getRepository(Form);
    const { equipment, nominalVolume } = req.body;
    const formCookie = JSON.stringify(req.body);

    const inputValidation = formValidation(req.body);

    if (inputValidation.error) return res.status(400).json({ error: inputValidation.error });

    const productivePoint = (await myDataSource.getRepository(productivePoints).findOneBy({ equipment })).productivePoint;
    const individualTolerance = (await myDataSource.getRepository(individualTolerances).findOneBy({ nominalVolume })).individualTolerance;

    delete req.body.equipment;
    req.body["productivePoint"] = productivePoint;
    req.body["individualTolerance"] = individualTolerance;

    const form = repo.create(req.body);
    
    await repo.save(form).catch(e => formError = true)

    if (formError) return res.status(400).json({ formError }).end();
    
    res.cookie("form", formCookie);
    res.status(200).json({ message: "success" });
}

export async function StoreWeights(req: Request, res: Response) {
    const repo = myDataSource.getRepository(Weights);
    const { batchNo } = JSON.parse(req.cookies.form);
    req.body.batchNo = batchNo;

    const weights = repo.create(req.body);
    const result = await repo.save(weights).catch(e => {
        return res.status(400).json({ error: "error" })
    });

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