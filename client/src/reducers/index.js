import { GET_DOGS, GET_NAME_DOG, GET_TEMPERAMENT, FILTER_BY_TEMPERAMENTS, FILTER_CREATED, ORDER_BY_NAME,ORDER_BY_WEIGHT,GET_DETAILS,CREATE_DOG } from "../actions"

const initialState = {
    dogs : [],
    temperaments: [],
    detail: [],
    filterDogs: [],
}
function rootReducer(state=initialState, action){   
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs:action.payload, //se envia todo lo que te envia la accion dogs
                filterDogs:action.payload
            }

        case GET_NAME_DOG:
            return{
                ...state,
                dogs: action.payload
            }
        case GET_TEMPERAMENT:
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENTS:
            const allDogs = state.filterDogs;
            const temperamentFilter=
            action.payload === 'All' ? allDogs:
            allDogs.filter((e)=> e.temperament?.includes(action.payload))
        
            return {
                ...state,
                dogs: temperamentFilter,
            }
        case FILTER_CREATED:
            const allDogsCreated = state.filterDogs
            const createdFilter= action.payload === 'created'?
            allDogsCreated.filter((e)=> e.createdInDB):
            action.payload === 'api' ?
            allDogsCreated.filter((e)=> !e.createdInDB):
            action.pay === 'all' && allDogsCreated
            return {
                ...state,
                dogs: createdFilter,
            }
        case ORDER_BY_NAME:
            let order = action.payload === "asc" ? state.dogs.sort(function (a,b){
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0
            }):
                state.dogs.sort(function(a,b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if (b.name > a.name){
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                dogs:order
            }
        case ORDER_BY_WEIGHT:
            let sortArrayW= action.payload === 'desc' ?
            state.dogs.sort((a,b)=>{
                return b.minweight - a.minweight
            }):
            state.dogs.sort((a,b)=> {
                return a.minweight - b.minweight
            })
            return{
                ...state,
                dogs:sortArrayW
            }
        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            }
        case CREATE_DOG:
            return {
                ...state
            }
                
        default:
            return state;    
    }  

}


export default rootReducer;