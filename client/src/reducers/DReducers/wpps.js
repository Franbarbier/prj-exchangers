
export default (state=[], action) => {

    // Si falla el auth lo mandamos al login
    
    switch(action.type){
        
        case 'CREATE_WPP':
            return [action.payload, ...state];
            
        case 'FETCH_ALL_WPPS':
            
            return action.payload;

        case 'UPDATE_WPP':
            return state.map(wpp => {
                if (wpp._id !== action.payload._id) {
                  return wpp
                }else{
                    return action.payload
                }})

        case 'DELETE_WPPS':
            var id_deleted = action.payload.id
            return state.filter((wpp)=> wpp._id != id_deleted);

        default:
            return state;
    }

}