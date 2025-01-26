import express from "express";
import rootRouter from "./routes";
import cors from 'cors'
import dbConnect from "./dbConnect";

const app = express()

app.use(cors({
    origin: ["https://pay-mate-gamma.vercel.app/"],
    methods: ["POST" , "GET" , "PUT"],
    credentials: true
}))
app.use(express.json())

app.use('/api/v1' , rootRouter)

app.listen(3000 , () => {
    dbConnect()
    console.log('Server Running on PORT:3000')
})

