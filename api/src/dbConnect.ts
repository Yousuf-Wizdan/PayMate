import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

async function dbConnect(){
    try{
        const db = await mongoose.connect(process.env.MONGODB_URL || '')
        console.log(`DataBase Connected: ${db.connection.host}`)
    }catch(err){
        console.log(`Error Connecting DataBase: ${err}`)
        process.exit(1)
    }
}

export default dbConnect
