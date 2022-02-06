import axios from 'axios';
export const GET_DOGS = "GET_DOGS";
export const GET_NAME_DOG = "GET_NAME_DOG";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";
export const FILTER_BY_TEMPERAMENTS= "FILTER_BY_TEMPERAMENTS"
export const FILTER_CREATED = "FILTER_CREATED"
export const ORDER_BY_NAME= "ORDER_BY_NAME"
export const ORDER_BY_WEIGHT= "ORDER_BY_WEIGHT"
export const GET_DETAILS="GET_DETAILS"
export const CREATE_DOG="CREATE_DOG"
//const {API_KEY} = process.env;


export function getAll(){
    return async function(dispatch){   //aca en donde se conecta el front con el back
        let json = await axios.get("http://localhost:3001/dogs");
        return dispatch({
            type: GET_DOGS,
            payload: json.data
        });
    };
};

export function getNameDog (payload) {
    return async function (dispatch) {
       var json = await axios(`http://localhost:3001/dogs?name=${payload}`);
            return dispatch ({
                type: GET_NAME_DOG,
                payload: json.data
            })
   
    }
}

export function getTemperaments (){
    return async function (dispatch){
        var json = await axios("http://localhost:3001/temperaments", {});
        return dispatch ({
            type: GET_TEMPERAMENT, 
            payload: json.data
        })
    }
}

export function filterByTemperaments (payload) {
    return {
        type: FILTER_BY_TEMPERAMENTS,
        payload
    }
}

export function filterCreated (payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

 export function orderByName(payload){
    return{
        type:ORDER_BY_NAME,
        payload

    }
} 
export function orderByWeight(payload){
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}


export function getDetail(id){
    return async function(dispatch){
            var json = await axios("http://localhost:3001/dogs/" + id)
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
                
            });
         
    }
}

export function createDog(payload){
    return async function(dispatch){

            const response = await axios.post('http://localhost:3001/dogs', payload);
            return response
    
    }
}