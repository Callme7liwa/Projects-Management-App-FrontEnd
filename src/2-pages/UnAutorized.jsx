import unauthorized from "./../assets/unauthorized.png";
export const UnAuthorized = () => {
    return (
        <div className="container-not-found">
          <div className="image-not-found">
              <img src={unauthorized}></img>
          </div>
          <div className="message-not-found"> Youre not authorized ! </div>
        </div>
    )
}