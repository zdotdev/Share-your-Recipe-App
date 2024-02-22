import express from 'express'
import { addReceipt, deletReceipt, editReceipt, getAllReceipt, getReceipt, getRecipeByName } from '../controllers/receipt-controller.js'

const router = express.Router()

router.get("/", getAllReceipt)
router.get("/:id", getReceipt)
router.get("/dishName/:dishNameParam", getRecipeByName)
router.post("/addReceipt", addReceipt)
router.put("/editReceipt/:id", editReceipt)
router.delete("/deleteReceipt/:id", deletReceipt)

export default router