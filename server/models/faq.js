import mongoose from 'mongoose'

const faq = mongoose.Schema({

    pregunta : String,
    rta: String,
    createdAt: {
        type: Date,
        default: new Date()
    }

}
)

const Faq = mongoose.model('Faqs', faq);

export default Faq;