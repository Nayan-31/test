import mongoose from 'mongoose'

export const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI !) //ek null check ki agar undefined aaye future me toh aap isko ignore kar dena ye basically shortform hai
        console.log("mongodb connected ✅")
    } catch (error) {
        console.log("error while connecting to db" , error)
    }
}
