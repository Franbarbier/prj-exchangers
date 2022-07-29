import mongoose from 'mongoose'

const wpp = mongoose.Schema({

    vendedor : String,
    numero: Number,
    createdAt: {
        type: Date,
        default: new Date()
    }

}
)

const Wpp = mongoose.model('Wpps', wpp);

export default Wpp;