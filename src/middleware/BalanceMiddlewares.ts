import { Request, Response, NextFunction } from "express";

export function cookieCheck(req: Request, res: Response, next: NextFunction) {
    const { batchNo, equipment } = JSON.parse(req.cookies.form);
    
    console.log("cookie check")

    if (!batchNo) {
        return res.redirect("/balance-form");
    }

    console.log(`cookie-batch: ${batchNo}\ncookie-equip: ${equipment}`);
    next();
}