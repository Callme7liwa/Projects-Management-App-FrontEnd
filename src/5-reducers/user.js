import { SET_ALL_USERS } from "../4-actions/1-types";

const initialState = {
    users:[]
};

export default function (state=initialState , action)
{
    const {type,payload} = action ; 

    switch(type)
    {
        case SET_ALL_USERS : 
            return {
                ...state,
                allUser:payload.users
            }
        default :
            return {
                state
            }
    }
}