import { Form } from "../entity/form.entity";
import { Weights } from "../entity/weights.entity";
import { productivePoints } from "../entity/productivePoints.entity";
import { Request, Response } from "express";
import { myDataSource } from "../server-datasource";
import { individualTolerances } from "../entity/tolerance.entity";
import formValidation from "../model/formValidation";
import weightsValidation from "../model/weightsValidation";
import mqttPublish from "../mqtt/mqttPublish";
import weightsFormat from "../utils/weightsFormat";
import criteriacalc from "../utils/criteriaCalc";

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
    let topic = "/soda/laboratorio/11882"
    let error: string = ""
    const repo = myDataSource.getRepository(Weights);

    const validate = weightsValidation(req.body);
    if (validate) return res.status(400).json({ error: validate.error });

    req.body.batchNo = JSON.parse(req.cookies.form).batchNo;

    const weights = repo.create(req.body);
    const result = await repo.save(weights).catch(e => error = "Couldn't save weights at database");
    const form = await myDataSource.getRepository(Form).findBy({ batchNo: req.body.batchNo }).catch(e => error = "Couldn't find data from specified batch");
    
    if (error) return res.status(400).json({ error });

    const payload = weightsFormat(form, req.body);

    const sodaResult = await mqttPublish(topic, payload).catch(e => e);

    console.log(sodaResult);

    res.status(200).json({ message: "Valores salvos no banco de dados!", sodaResult });
}


export async function calcCriteria(req: Request, res: Response) {
    let error = "";
    const validate = weightsValidation(req.body);
    if (validate) return res.status(400).json({ error: validate.error });

    req.body.batchNo = JSON.parse(req.cookies.form).batchNo;

    const form = await myDataSource.getRepository(Form).findBy({ batchNo: req.body.batchNo }).catch(e => error = "Couldn't find data from specified batch");

    if (error) return res.status(400).json({ error });

    const criteria = criteriacalc(req.body, form);

    return res.status(200).json(criteria);
}



export async function getAllWeights(req: Request, res: Response) {
    let err: string = "";

    const weights = await myDataSource.getRepository(Weights).find().catch(e => err = "Alguma coisa deu errado =(");
    
    if (err) return res.status(400).json({ error: err })

    res.status(200).json(weights);
}

export async function getWeightsByBatch(req: Request, res: Response) {
    const weights = await myDataSource.getRepository(Weights).findBy({
        batchNo: parseInt(req.params.batch)
     }).catch(e => res.status(400).json({ error: "Alguma coisa deu errado =(" }))
     console.log(weights);

     res.status(200).json(weights);
}