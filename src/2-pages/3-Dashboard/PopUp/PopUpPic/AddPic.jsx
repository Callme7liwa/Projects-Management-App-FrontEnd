import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateProfileImage, uploadImage } from "../../../../4-actions/2-auth";

const AddPic = ({setChangeImage}) => {

        // Lorsque l"utilisateur tente de faire selection une photo a partir de son system 
        const [imageIsSelected , setImageIsSelected] = useState(false);

        // L'image selectionné a partir du disuqe 
        const [selectedImage , setSelectedImage] = useState();

        // listener : ecoute sur le click sur une ancienne photo .
        const [clickedAncien , setClickedAncien] = useState(false);

        //
        const [photoName , setPhotoName] = useState("");

        const {user} = useSelector(state=>state.auth);


    const [etat  , setEtat] = useState(0);

    const dispatch = useDispatch();
    
    const handleChangeImage = (e) => {
      setImageIsSelected(true);
      setClickedAncien(false);
      setPhotoName("")
      setSelectedImage(e.target.files[0] );    
    };
    
    const handleAncienImage = (name) => {
      setClickedAncien(true);
      setImageIsSelected(false);
      setSelectedImage(null);
      setPhotoName(name);
      console.log(name);
    }
    
    // Submit the update picture ! 
    const handleSubmit = () => {
      if(selectedImage != null )
        dispatch(uploadImage(selectedImage,user?.id))
      else
        dispatch(updateProfileImage(user?.id , photoName))
    }

    return (
      <div className={`pic-container ${ etat === 1 ? "animate__animated animate__backInDown" : ""}`}>
        <div className='pic-content'>
          <span className='close-page'   onClick={()=>{setChangeImage(false); setSelectedImage(null) ; setImageIsSelected(false)}}></span>
        <div className='content-header'>
            UPDATE YOUR PROFIL PICTURE 
        </div>
        <div className='content-suggestion'>
          <div className='title'> Photos Suggested </div>
          {
          user?.oldPics.length > 0 
          ?
          (
            <div className='photos-suggested'>
              {
              user?.oldPics.map(pic=>{
                return (
                  <div className="image-container" key={pic}>
                      <img className="image" src={"http://localhost:8080/journalistes/files/"+pic} onClick={()=>handleAncienImage(pic)}></img>
                  </div>
                )
              })
              }
            </div>
          )
          :
          (null)
        }
         
        </div>
        <div className='form-group'>
                    <div className='form-group-title'> Select new picture</div>
                    <label for="upload-pic-team" className='label-upload-pic'>
                      {imageIsSelected === false  ?
                      (
                      <>
                        <i className='fa fa-image'></i>
                        <span > Select Image </span>
                      </>
                      ) 
                      :
                      selectedImage != null && photoName === ""?
                      (
                        <>{renderPhoto(selectedImage)}</>
                      )
                      :
                      (
                        null
                      )
                      }
                      {
                        clickedAncien === true && photoName!="" ? (
                          <>
                             <img src={"http://localhost:8080/journalistes/files/"+photoName} alt=""  />
                          </>
                        ):(
                          null
                        )
                      }
                      
                    </label>
                    <input id="upload-pic-team" className="d-none" type="file" onChange={handleChangeImage}></input>
                    <button type="submit" onClick={handleSubmit}  className=''> Change Pic </button>
          </div>
        </div>
      </div>
    )
  }

  const renderPhoto = (source) => {
    return (
          <>
            <img src={URL.createObjectURL(source)} alt="" key={source.URL} />
            <i class="fa fa-trash-o"></i>
          </>
        );
  };

  export default AddPic ; 