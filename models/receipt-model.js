import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true
    },
    dishIngredients: {
        type: String,
        required: true
    },
    dishProcedure: {
        type: String,
        required: true
    },
    dishImage: {
        type: String,
        required : true
    }
})

export default mongoose.model("Dish", receiptSchema)