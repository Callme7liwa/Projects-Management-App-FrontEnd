
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addFunctionsToJournalist } from "../../../../4-actions/2-auth";
import { saveFunction } from "../../../../4-actions/8-function";
import "./PopUpSkills.css";

export const PopUpSkills = ({setPopSkills}) => {

    const {user} = useSelector(state=>state.auth);

    const {fonctions} = useSelector(state=>state.fonction);

    const [selectedSkills , setSelectedSkills] = useState([]);

    const [name , setName] = useState("");

    const [error , setError] = useState("");


    const dispatch = useDispatch();

    const verfierFonctionExsitence =(array , value ) => {
        var flag = 0 ; 
        for(var i=0; i<array?.length; i++) {
            if(value.toLowerCase() === array[i]?.name.toLowerCase()) {
                 flag = 1;
                 return flag;
            }
        }
        return flag ; 
    }

    const handleSelectSkill = (skill) => {
        if(verfierFonctionExsitence(user?.functions , skill.name)===0 )
            {
                if( verfierFonctionExsitence(selectedSkills, skill.name)===0)
                   {  console.log("okokook")  ;  setSelectedSkills((prev)=>[...prev , skill]);}
                else
                    {setSelectedSkills(selectedSkills.filter(myskill=>myskill.name != skill.name))}
            }
    }

    const handleChangeName = (e) => {
        setName(e.target.value) ;
        if(name.length<=2)
            setError("At least 2 characters");
        else
            if(verfierFonctionExsitence(fonctions , e.target.value) === 1)
                setError("this skill already exist !")
            else
                setError("")
    }

    const handleSubmitSkill = (e) => {
        dispatch(saveFunction(name));
        setName("");
    }

    const handleAddSkillToUser = () => {
        let functionsName = selectedSkills.map(skill=>skill.name);
        dispatch(addFunctionsToJournalist(user.id,functionsName));
        setSelectedSkills([]);
    }

    return (
        <div className={`pic-container skill-container`}>
            <div className='pic-content skills-content'>
                <span className='close-page'   onClick={()=>{setPopSkills(false)}}></span>
                <div className="skills-content-header">
                    <h2>Skills make you rich  ! </h2>
                    <h4> Add new Skill </h4>
                </div>
                <div className="old-skills">
                    <div className=""> Your skills </div>
                    <div className="skills-container">

                    {
                        user?.functions.length>0 ?
                        (
                            user?.functions?.map(skill=>{
                                return <div key={skill.id} className="skill-container">
                                            <span><i className="fa fa-thumbs-o-up"></i></span>
                                            <span> {skill.name}</span>
                                    </div>  
                            })
                            )
                            :
                            (
                                <div className="skill-container">
                                        <span><i className="fa fa-thumbs-o-down"></i></span>
                                        <span>you have any skill </span>
                                </div>  
                            )
                        }
                    </div>
                </div>

                <div className="add-skills">
                    <label> ADD NEW SKILL </label>
                    <input type="text" name="name" placeholder="type name of skill here " onChange={handleChangeName} value={name} ></input>
                    {
                        error !==""
                        ?
                        (<p className="error"> {error} </p>)
                        :
                        (null)
                    }
                    {
                        name  === ""  || error!==""
                        ?
                        (<span className="submit-add-skills not-active bg-danger text-white"> can't submit </span>)
                        :
                        (<span className="submit-add-skills active" onClick={handleSubmitSkill}> submit </span>)
                    }
                    
                </div>

                <div className="skills-suggested">
                    <label> Skills suggested </label>
                    {
                        fonctions?.length > 0 
                        ?
                        (
                            <div className="list-skills-suggested">
                                {
                                    fonctions.map(fonction=>{
                                        return(
                                            <div key={fonction.id} onClick={()=>handleSelectSkill(fonction)} className={`skill-suggested-container ${verfierFonctionExsitence(user?.functions,fonction.name) === 1 ? `bg-danger text-white` : verfierFonctionExsitence(selectedSkills,fonction.name) ? `active` :``}`}> 
                                                <span> <i className="fa fa-tag"> </i></span>
                                                <span>  {fonction.name}</span>
                                            </div>
                                        )
                                      
                                    })
                                }
                            </div>
                        )
                        :
                        (<>Nothing to suggest ! add new function with the input above</>)
                    }
                
                {
                    selectedSkills.length > 0
                    ?
                    (<span className="submit-add-skills active" onClick={handleAddSkillToUser}> submit </span>)
                    :
                    (<span className="submit-add-skills not-active bg-danger text-white "> can't submit </span>) 
                }
                
                </div>

            </div>
        </div>
    )

}