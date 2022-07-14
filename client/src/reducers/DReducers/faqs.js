
export default (state=[], action) => {

    // Si falla el auth lo mandamos al login
    
    switch(action.type){
        
        case 'CREATE_FAQ':
            return [action.payload, ...state];
            
        case 'FETCH_ALL_FAQS':
            
            return action.payload;

        case 'UPDATE_FAQ':
            return state.map(cliente => {
                if (cliente._id !== action.payload._id) {
                  return cliente
                }else{
                    return action.payload
                }})

        case 'DELETE_FAQS':
            var id_deleted = action.payload.id
            return state.filter((factura)=> factura._id != id_deleted);

        default:
            return state;
    }

}