import mongoose from 'mongoose'

const plataforma = mongoose.Schema({

    nombre: String,
    icon_url : {
        type: String,
        default: 'logo-chico.png'
    },
    comision: Number,
    descripcion: String,
    fecha_entrega: Array,
    createdAt: {
        type: Date,
        default: new Date()
    }

}
)

const Plataforma = mongoose.model('Plataformas', plataforma);

export default Plataforma;