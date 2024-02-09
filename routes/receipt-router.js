import express from 'express'
import { addReceipt, deletReceipt, editReceipt, getAllReceipt, getReceipt } from '../controllers/receipt-controller.js'

const router = express.Router()

router.get("/", getAllReceipt)
router.get("/:id", getReceipt)
router.post("/addReceipt", addReceipt)
// router.put("/editReceipt", editReceipt)
// router.delete("/deleteReceipt", deletReceipt)

export default router