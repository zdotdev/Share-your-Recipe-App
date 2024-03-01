import express from 'express'
import {
  addReceipt,
  deletReceipt,
  editReceipt,
  getAllReceipt,
  getReceipt,
  getRecipeByName
} from '../controllers/receipt-controller.js'

const router = express.Router()

router.get('/', getAllReceipt)
router.get('/:id', getReceipt)
router.get('/dishName/:dishNameParam', getRecipeByName)
router.post('/addRecipe', addReceipt)
router.put('/editRecipe/:id', editReceipt)
router.delete('/deleteRecipe/:id', deletReceipt)

export default router
