const INITIAL_STATE = {
    nome: "teste",
    blaster: "",
    latitude: "",
    longitude: "",
    uid: ""
 }

 export default (state = INITIAL_STATE, action) => {
    console.log('dentro do reducer');
    console.log(action.payload);
   

    switch(action.type){

        case 'nome_local':
        return { ...state, nome: action.payload }

        case 'nome_blaster':
        return { ...state, blaster: action.payload }

        case 'salva_latitude':
        return { ...state, latitude: action.payload }

        case 'salva_longitude':
        return { ...state, longitude: action.payload }

        case 'uid_usuario':
        return { ...state, uid: action.payload }

        default:
            return state;
    }
    
        

}