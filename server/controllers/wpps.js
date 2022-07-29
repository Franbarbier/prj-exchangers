import Wpp from '../models/wpp.js';



export const getWpps = async (req, res)=>{
    

    try{
        const wpps = await Wpp.find().sort({createdAt: 'desc'});
        res.status(200).json(wpps)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const createWpp = async(req, res) =>{
    
    const wpp = req.body.wpp;
    console.log(wpp)
    const newWpp = new Wpp(wpp);
    console.log(newWpp)

    try{
        await newWpp.save();
        res.status(201).json(newWpp)
    }catch(error){
        res.status(409).json({message: error.message})
    }

}

export const deleteWpp = async (req, res)=>{
    
    const id = req.params.id;
    await Wpp.findByIdAndRemove(id)
    res.json({message: 'Wpp deleted succesfully', id: id})

}

export const updateWpp = async (req, res) =>{

    const wpp = req.body.wpp;
    const filter = {_id: wpp._id}
    var wppToUpdate = await Wpp.findOneAndUpdate(filter, wpp, {new: true})

    try{                            
        res.status(201).json(wppToUpdate)
            
    }catch(error){
        res.status(409).json({message: error.message})
    }

}