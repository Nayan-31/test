import { IUser } from '@/types/user.types'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema<IUser>({
    name : {
        type : String,
        trim : true,
        required : [true , "name is required"]
    },
     email : {
        type : String,
        trim : true,
        required : [true , "email is required"]
    },
     password : {
        type : String,
        trim : true,
        required : [true , "password is required"],
        minlength : [6 , "minimum 6 characters are required"]
    },
    mobile : {
        type : String,
        trim : true,
        required : [true , "mobile number is required"],
        minlength : [10 , "minimum 10 digits are required"],
        maxlength : [10 , "maximum 10 digits are required"]
    }
}, {
    timestamps : true
})

userSchema.pre("save" , function():void{
    if(!this.isModified("password")) return //Agar password field modify/change nahi hui hai, to yahin function se bahar nikal jao.
    this.password = bcrypt.hashSync(this.password , 10)
})

userSchema.methods.comparePass = function(candidatePassword : string) : boolean { //.methods isliye use karte ho kyunki tum schema ke documents/instances ke liye custom function bana rahe ho.   Har user document ke paas comparePass() naam ka method hoga.
    return bcrypt.compareSync(candidatePassword , this.password)
}

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;

//ab maan ke chalte hai ki agar koi intern aaya hai jo yaha models me koi naya field add karta hai
//jo ki hum nahi chahte therefore we use interface jisme hum banate hai contracts ki itne hi fields chhaiye 