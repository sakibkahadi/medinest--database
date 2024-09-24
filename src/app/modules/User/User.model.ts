import { model, Schema } from "mongoose";
import { TUser, UserStatic } from "./User.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const userSchema = new Schema<TUser, UserStatic>({
              
    password:{
        type:String,
        required:true
    },

   role:{
        type:String,
        enum:  ['admin' , 'patient' , 'doctor'],
       required:true
    },
    status:{
        type:String,
        enum: ['active' , 'blocked', 'in-progress'],
        default:'active'
    },
    isDeleted:{
        type:Boolean,
        default:false
    },notification:{
        type: [String],
        default: []
    },
    seenNotification:{
        type:Boolean,
        default: false
    },bloodDonor:{
        type:Boolean,
        default:false
    }
}, {
    timestamps:true,
    toJSON:{
        transform:(doc,response)=>{
            delete response.password;
            delete response.__v;
            return response
        }
    }
},

)

userSchema.pre('save', async function (next){
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    )
    next()
})
userSchema.post('save', function(doc,next){
    doc.password='';
    next()
})

userSchema.statics.isPasswordMatched = async function(plainTextPassWord, hashedPassword){
    return await bcrypt.compare(plainTextPassWord,hashedPassword)
}



export const UserModel = model<TUser, UserStatic>('User', userSchema)