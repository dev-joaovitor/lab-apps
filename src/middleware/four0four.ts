import { Request, Response } from "express";

export default function PageNotFound(req: Request, res: Response) {
    res.status(404).redirect("/404");
}