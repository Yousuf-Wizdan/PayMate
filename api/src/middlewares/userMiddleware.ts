import { NextFunction , Request , Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'


export const userMiddleware = (req: Request , res: Response , next: NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.json(403).json({
            message: "Error in middleware"
        })
        return
    }

    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token , JWT_SECRET) as {id: string}
        req.userId = decoded.id
        next()
    }catch(err){
        res.status(403).json({
            error: err
        })
        return
    }
}