import Faq from '../models/faq.js';



export const getFaqs = async (req, res)=>{
    

    try{
        const faqs = await Faq.find().sort({createdAt: 'desc'});
        res.status(200).json(faqs)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const createFaq = async(req, res) =>{
    
    const faq = req.body.faq;
    const newFaq = new Faq(faq);

    try{
        await newFaq.save();
        res.status(201).json(newFaq)
    }catch(error){
        res.status(409).json({message: error.message})
    }

}

export const deleteFaq = async (req, res)=>{
    
    const id = req.params.id;
    await Faq.findByIdAndRemove(id)
    res.json({message: 'Faq deleted succesfully', id: id})

}

export const updateFaq = async (req, res) =>{

    const faq = req.body.faq;
    const filter = {_id: faq._id}
    var faqToUpdate = await Faq.findOneAndUpdate(filter, faq, {new: true})

    try{                            
        res.status(201).json(faqToUpdate)
            
    }catch(error){
        res.status(409).json({message: error.message})
    }

}