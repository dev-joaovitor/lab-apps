import { Request, Response, NextFunction } from "express";

export function cookieCheck(req: Request, res: Response, next: NextFunction) {
    console.log("cookie check");
    if (req.cookies.form) return next();
    
    return res.redirect("/balance-form");
}