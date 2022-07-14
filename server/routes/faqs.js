import express from 'express'

import { createFaq, getFaqs, updateFaq, deleteFaq} from '../controllers/faqs.js'


const router = express.Router()
// router.get('/saldo/:id', getSaldoFaq)
// router.get('/ordenes/:id', (req, res) => getOrdenesFaq(req, res, false))
router.get('/', getFaqs)
router.post('/', createFaq)
router.delete('/:id', deleteFaq)
router.patch('/', updateFaq)

export default router