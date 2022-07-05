
export default (state=[], action) => {

    // Si falla el auth lo mandamos al login
    
    switch(action.type){
        
        case 'CREATE_PLATAFORMA':
            return [action.payload, ...state];
            
        case 'FETCH_ALL_PLATAFORMAS':
            
            return action.payload;

        case 'UPDATE_PLATAFORMA':
            return state.map(cliente => {
                if (cliente._id !== action.payload._id) {
                  return cliente
                }else{
                    return action.payload
                }})

        case 'DELETE_PLATAFORMAS':
            var id_deleted = action.payload.id
            return state.filter((factura)=> factura._id != id_deleted);

        default:
            return state;
    }

}