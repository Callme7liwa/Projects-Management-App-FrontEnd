import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ResponseComponent } from "../../1-component";
import { SideBare } from "../../1-component/SideBare/SideBare";
import { saveCategory } from "../../4-actions/10-category";
import { PopUpAddCategory } from "./AddCategory/PopUpAddCategory";
import "./Test.css"
const Test = ({navIsClicked}) => {

    const {colors} = useSelector(state=>state.colors);

    const {categories} = useSelector(state=>state.category);

    const [addCategory , setAddCategory] = useState(false);

    const {user} = useSelector(state=>state.auth);




    const  getFirstLetters = (str) => {
        const firstLetters = str
          .split(' ')
          .map(word => word[0])
          .join('');
        
        return firstLetters[0].toUpperCase()+firstLetters.slice(1,firstLetters.length);
      }

    const getRandomIndex = () =>{
        return Math.floor(Math.random() * colors?.length) ; 
    }

    
   

    const hasRoles = (role) => {
        for(var i=0 ; i<user?.roles.length ; i++)
         {
          for(var j=0 ; j<role.length ; j++)
          {
            if(user?.roles[i].role === role[j])
              return true ;
          }
        }
        return false ; 
    }



 
    return (
        <>
            <div className="page-container">
                <SideBare navIsClicked = {navIsClicked} />
                <div className="page-main">
                    <div className="page-main-title">
                        Categories 
                    </div>
                    <div className="page-main-content">
                        {
                            categories?.map(category=>{
                                return(
                                    <div className="content-card">
                                        <div className="n-empty" style={{backgroundColor: colors[getRandomIndex()] }} >{getFirstLetters(category.name)}</div>
                                        <div className=""> {category.name}</div>
                                    </div>
                                )
                            })
                        }

                        {
                            hasRoles(["ADMIN" , "CHEF"])
                            ?
                            (
                                <div className="content-card" onClick={()=>setAddCategory(true)}>
                                    <div className="empty"><i className="fa fa-plus"></i></div>
                                    <div className=""> Add Category</div>
                                </div>
                            )
                            :
                            (null)
                        }
                    </div>
                </div>
            </div>
            {
                addCategory === true 
                ?
                (<PopUpAddCategory setAddCategory={setAddCategory} lengthCategories={categories?.length} />)
                :
                (null)
            }
        </>
    )
}

export default Test ; 