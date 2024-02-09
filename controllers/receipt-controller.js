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

export const addReceipt = async(req, res) => {
    const {dishName, dishIngredients, dishProcedure} = req.body

    let dishes = new Dish({
        dishName,
        dishIngredients,
        dishProcedure
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

}

export const deletReceipt = async(req, res) => {

}