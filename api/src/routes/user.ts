import express from 'express'
import { signInSchema, updateUserSchema, userSchema } from '../schemas/userSchema'
import { AccountModel, UserModel } from '../db'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import { userMiddleware } from '../middlewares/userMiddleware'

const userRouter = express.Router()

userRouter.post('/signup', async (req, res) => {
    const { success } = userSchema.safeParse(req.body)

    if (!success) {
        res.status(403).json({
            message: 'Incorrect Inputs',
        })
        return
    }

    const existingUser = await UserModel.findOne({
        username: req.body.username
    })
    if (existingUser) {
        res.status(411).json({
            message: 'Username Already taken'
        })
        return
    }

    const user = await UserModel.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    const userId = user._id
    await AccountModel.create({
        userId:  userId,
        balance: 1+Math.random()*10000
    })

    res.json({
        message: "User Created Successfully!",
    })
})

userRouter.post('/signin', async (req, res) => {
    const { success } = signInSchema.safeParse(req.body)

    if (!success) {
        res.status(411).json({
            message: 'Incorrect Input'
        })
        return
    }

    const user = await UserModel.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if (user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET)

        res.json({
            token
        })
        return
    }

    res.status(411).json({
        message: 'Error While Logging!'
    })
})

userRouter.put('/', userMiddleware, async (req, res) => {
    const userId = req.userId;
    const { success } = updateUserSchema.safeParse(req.body)
    if (!success) {
        res.status(403).json({
            message: 'Incorrect Input'
        })
        return
    }

    await UserModel.updateOne({
        _id: userId
    }, req.body)

    res.json({
        message: "Updated Successfully!"
    })
})

userRouter.get('/' , userMiddleware , async (req,res) => {
    
    const user = await UserModel.findOne({
        _id: req.userId
    })
    if(!user){
        res.json({
            message: "No User Found!"
        })
        return
    }

    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username
    })
})

userRouter.get('/bulk', async (req, res) => {
    const filter = req.query.filter || ''

    const users = await UserModel.find({
        $or: [
            {
                firstName: {
                    '$regex': filter
                }
            },
            {
                lastName: {
                    '$regex': filter
                }
            }
        ]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

})


export default userRouter