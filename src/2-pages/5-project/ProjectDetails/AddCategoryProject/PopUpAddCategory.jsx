import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCategories } from "../../../../4-actions/10-category";
import { addCategoryToProject } from "../../../../4-actions/6-projects";

export const PopUpAddCategory  = ({dispatch , setAddCategory}) => {

    const [selectedCategory , setSelectedCategory] = useState(null);

    const {project} = useSelector(state=>state.project);


    const {categories} = useSelector(state=>state.category);

    useEffect(()=>{
        dispatch(getCategories())
    },[])

    const handleAddCategoryToProject = () => {
       dispatch(addCategoryToProject(project?.id , selectedCategory.name));
       setAddCategory(false)
    }



    const DisplayCategories = () => {
        return (
            categories?.map(category=>{
                return(
                    <div className={`category-container ${selectedCategory?.categoryId === category.categoryId ? " active" : ""}` } onClick={()=>setSelectedCategory(category)}>
                        <div className="category-name-circle">
                        {category.name.slice(0,1).toUpperCase()+category.name.slice(1,2).toLowerCase()}
                        </div>
                        <div className="category-name">{category.name.slice(0,1).toUpperCase()+category.name.slice(1,category.name.length).toLowerCase()}</div>
                    </div>
                )
            })
        )
    }
    
    return (
    <div className={`page-add-employe-container`}  style={{zIndex : 999999}}>
        <div className="page-add-employe-content">
            <span className="close-page" onClick={()=>{setAddCategory(false);setSelectedCategory(null)}}> </span>
            <div className="page-header">
                <h1> ADD Category TO THE PROJECT  </h1>
                <h3> {project.name} </h3>
                <span className="badge badge1"></span>
            </div>
           
            <div className="page-body page-add-employe-to-team">
                <div className="body1">
                    <input   placeholder="search category here ... "></input>
                </div>
                <div className="body2 webkit">
                    <DisplayCategories />
                </div>
            </div>

            <div className="footer">
            {
                selectedCategory!==null 
                ?
                (
                <button type="submit" onClick={handleAddCategoryToProject}> <i className="fa fa-check-circle-o mr-2"></i> Submit </button>
                )
                :
                (
                <button type="submit " className="bg-danger text-black"> <i className="fa fa-times-o mr-2"></i> can't Submit </button>
                )
            }
            </div>

        </div>
    </div>
    )
}