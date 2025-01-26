import express from 'express'
import { userMiddleware } from '../middlewares/userMiddleware'
import { AccountModel } from '../db'
import mongoose from 'mongoose'

const accountRouter = express.Router()

accountRouter.get('/balance' , userMiddleware , async (req,res) => {

    const userAccount = await AccountModel.findOne({
        userId: req.userId
    })
    
    res.json({
        balance: userAccount?.balance
    })
})

accountRouter.post('/transfer' , userMiddleware , async (req , res) => {
    try{

            const session = await mongoose.startSession()

        session.startTransaction()
        const {to , amount} = req.body
        const account = await AccountModel.findOne({userId: req.userId}).session(session)

        if(!account || account.balance <  amount){
            await session.abortTransaction()
            res.status(403).json({
                message: "Insufficent Balance"
            })
            return
        }


        const toAccount = await AccountModel.findOne({userId: to}).session(session)
        if(!toAccount){
            await session.abortTransaction()
            res.status(400).json({
                message: 'Invalid Account'
            })
            return
        }

        //Perform Transaction
        await AccountModel.updateOne({userId: req.userId} , {$inc: {balance: -amount}}).session(session)
        await AccountModel.updateOne({userId: to} , {$inc: {balance: +amount}}).session(session)

        await session.commitTransaction()
        res.json({
            message: "Transfer Successfull"
        })    
    }catch(err){
        console.log(err)
    }
})
export default accountRouter