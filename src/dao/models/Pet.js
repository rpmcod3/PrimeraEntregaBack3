import mongoose from 'mongoose';

const collection = 'Pets';

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:false,
    },
    specie:{
        type:String,
        required:false,
    },
    age:{
        birthDate:Date,
    },
        adopted:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    image:String
},{ timestamps: true });

const petModel = mongoose.model(collection,schema);

export default petModel;
