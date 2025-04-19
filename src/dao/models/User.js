import mongoose from 'mongoose';

const collection = 'Users';

const schema = new mongoose.Schema({
    first_name:{
        type: String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String, enum: ['user', 'admin']
    },
    pets:{
        type:[{_id:{ type:mongoose.SchemaTypes.ObjectId,ref:'Pet'}}], 
        /* type: mongoose.SchemaTypes.ObjectId,
        ref: 'Pet', */
        default:[]
    }
},{ timestamps: true }); 

const userModel = mongoose.model(collection,schema);

export default userModel;