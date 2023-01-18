import { useState } from "react";
import { useDispatch } from "react-redux";
import { ResponseComponent } from "../../../1-component";
import { saveCategory } from "../../../4-actions/10-category";

export  const PopUpAddCategory = ({setAddCategory,lengthCategories}) => {

    const [isSubmited , setIsSubmited] = useState(false);
    const [categoryName , setCategoryName] = useState("");
    const dispatch = useDispatch();

    const handleSubmitCategory = () => {
        setIsSubmited(true);
        dispatch(saveCategory(categoryName));
    }
    
    return(
        <div className={` page-add-employe-container page-categories`} >
         <ResponseComponent classStyle="request-result-client"  dispatch={dispatch} isSubmited = {isSubmited} setIsSubmited={setIsSubmited} />            
  
            <div className="page-categories-content">
                <span className="close-page" onClick={()=>{setAddCategory(false)}}> </span>
                <div className="page-header">
                    <h1> ADD NEW CATEGORY  </h1>
                    <p> more than {lengthCategories} categories existent</p>
                    <span className="badge badge1"></span>
                </div>
            
                <div className="page-body">
                    <div className="form-group">
                        <label>Category Name</label>
                        <input className="" value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} type="text" placeholder="Type here ... " ></input>
                    </div>
                </div>

                <div className="page-footer">
                    {
                        categoryName !== ""
                        ?
                        (<span className="submit-category" onClick={handleSubmitCategory}> <i className="fa fa-check"></i> submit</span>)
                        :
                        (<span className="submit-category bg-danger"> <i className="fa fa-times"></i> can't submit</span>) 
                    }
                </div>

            </div>
        </div>
    )
}