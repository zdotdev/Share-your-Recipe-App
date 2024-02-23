import Dish from '../models/receipt-model.js'

export const getAllReceipt = async(req, res) => {
    let dishes

    try{
        dishes = await Dish.find()
    }
    catch(err){
        return console.log(err)
    }
    if(!dishes){
        return res.status(404).json({error: "No Receipt found"})
    }
    return res.status(200).json({dishes})
}


export const getReceipt = async(req, res) => {
    const id = req.params.id
    let dishes

    try{
        dishes = await Dish.findById(id)
    }
    catch(err){
        return console.log(err)
    }
    if(!dishes){
        return res.status(404).json({error: "Receipt not found"})
    }
    return res.status(200).json({dishes})
}

export const getRecipeByName = async(req, res) => {
    const dish = req.params.dishNameParam
    let dishes

    try{
        dishes = await Dish.findOne({dishName : dish})
    }
    catch(err){
        return console.log(err)
    }
    if(!dishes){
        return res.status(404).json({error: "Receipt not found", "status" : 404})
    }
    return res.status(200).json({dishes})
}

export const addReceipt = async(req, res) => {
    const {dishName, dishIngredients, dishProcedure, dishImage} = req.body

    let dishes = new Dish({
        dishName,
        dishIngredients,
        dishProcedure,
        dishImage
    })

    try{
        await dishes.save({Dish})
    }
    catch(err){
        return res.status(500).json({error: err})
    }
    return res.status(200).json({dishes})
}

export const editReceipt = async(req, res) => {
    const {dishName, dishIngredients, dishProcedure, dishImage} = req.body
    const id = req.params.id
    let dishes

    try{
        dishes = await Dish.findByIdAndUpdate(id, {
            dishName,
            dishIngredients,
            dishProcedure,
            dishImage
        })
    }
    catch(err){
        return console.log(err)
    }
    if(!dishes){
        return res.status(500).json({error: "Can't update the Dish"})
    }
    return res.status(200).json({dishes})
}

export const deletReceipt = async(req, res) => {
    const id = req.params.id
    let dishes

    try{
        dishes = await Dish.findByIdAndDelete(id)
    }
    catch(err){
        return console.log(err)
    }
    if(!dishes){
        return res.status(404).json({error: "No Dishes found"})
    }
    return res.status(200).json({dishes})
}