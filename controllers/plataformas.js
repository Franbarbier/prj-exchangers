import Plataforma from '../models/plataforma.js';



export const getPlataformas = async (req, res)=>{
    

    try{
        const plataformas = await Plataforma.find().sort({createdAt: 'desc'});
        res.status(200).json(plataformas)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const createPlataforma = async(req, res) =>{
    
    const platform = req.body.final_platform;
    const newPlatform = new Plataforma(platform);

    try{
        await newPlatform.save();
        res.status(201).json(newPlatform)
    }catch(error){
        res.status(409).json({message: error.message})
    }

}

export const deletePlataforma = async (req, res)=>{
    
    const id = req.params.id;
    await Plataforma.findByIdAndRemove(id)
    res.json({message: 'Plataforma deleted succesfully', id: id})

}

export const updatePlataforma = async (req, res) =>{

    // const cliente = req.body;
    // const filter = {_id: cliente._id}
    // var clienteToUpdate = await Cliente.findOneAndUpdate(filter, cliente, {new: true})

    // try{                            
    //     res.status(201).json(clienteToUpdate)
            
    // }catch(error){
    //     res.status(409).json({message: error.message})
    // }

}