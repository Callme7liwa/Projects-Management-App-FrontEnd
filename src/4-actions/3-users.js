import UserService from "../3-services/2-user.service"

export const setUsers  = () => (dispatch) => {
    console.log("sssssssssssssssssss");
    UserService
    .getAllUsers()
    .then((response)=>{
        console.log(response);
    },(error)=>{
        console.log("error" , error);
    }
    )


}