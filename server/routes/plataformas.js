import express from 'express'

import { createPlataforma, getPlataformas, updatePlataforma, deletePlataforma} from '../controllers/plataformas.js'


const router = express.Router()
// router.get('/saldo/:id', getSaldoPlataforma)
// router.get('/ordenes/:id', (req, res) => getOrdenesPlataforma(req, res, false))
router.get('/', getPlataformas)
router.post('/', createPlataforma)
router.delete('/:id', deletePlataforma)
router.patch('/', updatePlataforma)

export default router