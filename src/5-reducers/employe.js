import { ADD_EMPLOYE, CLEAR_SEARCH_EMPLOYES, REMOVE_EMPLOYE, SEARCH_ADMINS, SEARCH_CHEF, SEARCH_EMPLOYES, SEARCH_SIMPLE, SET_ADMINS, SET_CHEF_PROJECTS, SET_EMPLOYES, SET_SIMPLE_EMPLOYES } from "../4-actions/1-types";

const initialState = {
    employes : []  , 
    employesSearched:[],
    admins : [],
    simpleEmployes : [] , 
    chefEmployes:[],
}

export default function (state = initialState , action)
{
    const {type , payload} = action ; 

    function getCustomEmploye (employes , value2)
    {
        var array = [];
        for(var i = 0; i < employes?.length; i++){
            for(var j=0 ; j<employes[i]?.roles.length  ; j++)
            {
                if(employes[i].roles[j].role === value2)
                    array.push(employes[i])
            }
        }
        return array ; 
    }

    
    switch(type)
    {
        case SET_EMPLOYES :

            return {
                ...state ,
                employes:payload
            }
        case ADD_EMPLOYE :
            var employesArray = [...state.employes];
            return {
                ...state , 
                employes : [ payload , ...employesArray]
            }
        case REMOVE_EMPLOYE : 
            return {
                ...state , 
                employes : state.employes.filter(employe=>employe.id!==payload.id)
            }
        case SET_ADMINS  : 
            var employesCustom = getCustomEmploye(state.employes,"ADMIN")
            return {
                ...state,
                admins : employesCustom
            }

        case SET_SIMPLE_EMPLOYES : 
             employesCustom = getCustomEmploye(state.employes,"SIMPLE")
            return {
                ...state,
                simpleEmployes : employesCustom
            }
        case SET_CHEF_PROJECTS : 
            employesCustom = getCustomEmploye(state.employes,"CHEF")
            return{
                ...state,
                chefEmployes : [...employesCustom]
            }
        case SEARCH_EMPLOYES : 
               const employesByName = state.employes.filter(employe=>(employe.firstName+" "+employe.secondName+" "+employe.userName).includes(payload));
               var employesByFunction = [];

             state.employes.map(employe=>{
                employe.functions.map(fonction=>{
                    if(fonction.name.toLowerCase().includes(payload))
                    {                    
                        employesByFunction.push(employe);
                    }
                })
             });
            
            employesByName.map(employe=> {
                employesByFunction.map(employe2=>{
                    if(employe.id === employe2.id)
                        employesByFunction.pop(employe2);
                    return employe2 ; 
                })
                return employe ; 
             }
            )  

            const employeFiltre3 = [...employesByName , ...employesByFunction];

            return{
                ...state,
                  employesSearched:[...employeFiltre3]
            }
        
        case SEARCH_ADMINS :
            return {
                ...state , 
                employesSearched : state.admins.filter(admin=>((admin.firstName + " " + admin.secondName + " " + admin.userName).includes(payload)))
            }
        case SEARCH_CHEF : 
         
            return {
                ...state , 
                employesSearched : state.chefEmployes.filter(chef=>((chef.firstName + " " + chef.secondName + " " + chef.userName).includes(payload)))
            }
        case SEARCH_SIMPLE : 
            return {
                ...state , 
                employesSearched : state.simpleEmployes.filter(simple=>((simple.firstName + " " + simple.secondName + " " + simple.userName).includes(payload)))
            }
        case CLEAR_SEARCH_EMPLOYES :
            return {
                ...state , 
                employesSearched  : []
            }
        default :
            return state ; 
    }
}