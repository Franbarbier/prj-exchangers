import express from 'express'

import { createWpp, getWpps, updateWpp, deleteWpp} from '../controllers/wpps.js'


const router = express.Router()
// router.get('/saldo/:id', getSaldoWpp)
// router.get('/ordenes/:id', (req, res) => getOrdenesWpp(req, res, false))
router.get('/', getWpps)
router.post('/', createWpp)
router.delete('/:id', deleteWpp)
router.patch('/', updateWpp)

export default router