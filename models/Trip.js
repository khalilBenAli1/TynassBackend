const mongoose=require("mongoose")

const tripSchema = new mongoose.Schema({

    tripname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
      },
    teamNumber:{
        type:Number,
    },
    startingDate:{
        type:Date,
    },
    fixedDate:{
        type:Date,
    },
    gameOverMsg:{
        type:String,
    },
    returnLocation:{

    }

})