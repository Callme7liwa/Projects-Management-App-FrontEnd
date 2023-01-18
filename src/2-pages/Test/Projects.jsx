import { SideBare } from "../../1-component/SideBare/SideBare";

import ayoub from "./../../assets/ayoub.jpg";
import ayoub2 from "./../../assets/ayoub2.jpg";
import ayoub3 from "./../../assets/ayoub3.jpg";
import ayoub4 from "./../../assets/ayoub4.jpg";
import ayoub5 from "./../../assets/ayoub5.jpg";
import ayoub6 from "./../../assets/ayoub6.jpg";
import can2022 from "./../../assets/can2022.jpg";
import mond2022 from "./../../assets/mond2022.jpg";
import ultras from "./../../assets/ultras.jpg";
import drugs from "./../../assets/drugs.jpg";
import education from "./../../assets/education.jpg";
import enginnering from "./../../assets/enginnering.jpg";

import "./projects.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getEmployes } from "../../4-actions/4-employes";
import { useComponentDidMount } from "../../Hooks/useComponentDidMount";
const ProjectOfCategory = ({navIsClicked}) => {

    const isComponentMounted = useComponentDidMount();
    
    const dispatch = useDispatch();

    const {employes} = useSelector(state=>state.employe);

    useEffect(()=>{
        dispatch(getEmployes())
    },[]);

    useEffect(()=>{
        if(isComponentMounted)
        console.log("employes : {}",employes);
    },[employes]);


    const [color , setColor] = useState([
        "#F54423",
        "#0AD010",
        "#158DE8",
        "#7607AD",
        "#F5680A"
    ]);


    return (
        <div className="page-container">
            <SideBare navIsClicked = {navIsClicked} />
            <div className="page-main">
                <div className="page-main-title">
                    Projects Of Marketing 
                </div>
                <div className="page-main-content">
                    <div className="project-card"  style={{backgroundColor: color[0] }}>
                        <div className="project-text project-card-header"> Project1</div>
                        <div className="project-text project-respo"> Assigned to <span> Ayoub Seddiki </span></div>
                        <div className="project-text project-date"> Created at 11/07/2022 - En cours </div>
                        <div className="project-text project-team">
                            <div className="team-text"> Team </div>
                            <div className="team-pics"> 
                                <div className="pic-container">
                                    <img src={ayoub}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub2}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub3}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub4}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub5}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub6}></img>
                                </div>
                            </div>
                        </div> 
                        <div className="project-details-button">
                            <button> See the details <i className="fa fa-angle-double-right ml-1"></i></button>
                        </div>
                    </div>
                    <div className="project-card"  style={{backgroundColor: color[1] }}>
                        <div className="project-text project-card-header"> Project1</div>
                        <div className="project-text project-respo"> Assigned to <span> Ayoub Seddiki</span> </div>
                        <div className="project-text project-date"> Created at 11/07/2022 - En cours </div>
                        <div className="project-text project-team">
                            <div className="team-text"> Team </div>
                            <div className="team-pics"> 
                                <div className="pic-container">
                                    <img src={ayoub}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub2}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub3}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub4}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub5}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub6}></img>
                                </div>
                            </div>
                           
                        </div> 
                        <div className="project-details-button">
                            <button> See the details <i className="fa fa-angle-double-right ml-1"></i></button>
                        </div>
                    </div>
                    <div className="project-card"  style={{backgroundColor: color[2] }}>
                        <div className="project-text project-card-header"> Project1</div>
                        <div className="project-text project-respo"> Assigned to <span>Ayoub Seddiki</span>  </div>
                        <div className="project-text project-date"> Created at 11/07/2022 - En cours </div>
                        <div className="project-text project-team">
                            <div className="team-text"> Team </div>
                            <div className="team-pics"> 
                                <div className="pic-container">
                                    <img src={ayoub}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub2}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub3}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub4}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub5}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub6}></img>
                                </div>
                            </div>
                           
                        </div>  
                        <div className="project-details-button">
                            <button> See the details <i className="fa fa-angle-double-right ml-1"></i></button>
                        </div>
                    </div>
                    <div className="project-card"  style={{backgroundColor: color[3] }}>
                        <div className="project-text project-card-header"> Project1</div>
                        <div className="project-text project-respo"> Assigned to <span>Ayoub Seddiki</span>  </div>
                        <div className="project-text project-date"> Created at 11/07/2022 - En cours </div>
                        <div className="project-text project-team">
                            <div className="team-text"> Team </div>
                            <div className="team-pics"> 
                                <div className="pic-container">
                                    <img src={ayoub}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub2}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub3}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub4}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub5}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub6}></img>
                                </div>
                            </div>
                        </div> 
                        <div className="project-details-button">
                            <button> See the details <i className="fa fa-angle-double-right ml-1"></i></button>
                        </div>
                    </div>
                    <div className="project-card"  style={{backgroundColor: color[4] }}>
                        <div className="project-text project-card-header"> Project1</div>
                        <div className="project-text project-respo"> Assigned to <span>Ayoub Seddiki</span>  </div>
                        <div className="project-text project-date"> Created at 11/07/2022 - En cours </div>
                        <div className="project-text project-team">
                            <div className="team-text"> Team </div>
                            <div className="team-pics"> 
                                <div className="pic-container">
                                    <img src={ayoub}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub2}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub3}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub4}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub5}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub6}></img>
                                </div>
                            </div>
                        </div> 
                        <div className="project-details-button">
                            <button> See the details <i className="fa fa-angle-double-right ml-1"></i></button>
                        </div>
                    </div>
                    <div className="project-card"  style={{backgroundColor: color[6] }}>
                        <div className="project-text project-card-header"> Project1</div>
                        <div className="project-text project-respo"> Assigned to <span>Ayoub Seddiki</span>  </div>
                        <div className="project-text project-date"> Created at 11/07/2022 - En cours </div>
                        <div className="project-text project-team">
                            <div className="team-text"> Team </div>
                            <div className="team-pics"> 
                                <div className="pic-container">
                                    <img src={ayoub}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub2}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub3}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub4}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub5}></img>
                                </div>
                                <div className="pic-container">
                                    <img src={ayoub6}></img>
                                </div>
                            </div>
                        </div> 
                        <div className="project-details-button">
                            <button> See the details <i className="fa fa-angle-double-right ml-1"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProjectOfCategory ; 