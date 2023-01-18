import React, { useState } from 'react'
import "./Parametres.css";
import { UpdateEmailComponent } from './UpdateEmail/UpdateEmail';
import { UpdatePasswordComponent } from './UpdatePassword/UpdatePassword';
import { UpdatePersonalInfoComponent } from './UpdatePersonalInfo/UpdatePersonalInfo';
const Parametres = () => {

    const [etat , setEtat] = useState(1);

   

    const RenderCompoent  = () => {
        switch(etat){
            case 1 : return  <UpdatePasswordComponent /> ;
            case 2 :return <UpdateEmailComponent /> ;
            case 3 :  return<UpdatePersonalInfoComponent /> ;
            default : return <UpdatePasswordComponent />;
        }
       
    }
  return (
    <div className="page-parametres">
        <div className='page-left'>
            <div className={`parametre ${etat === 1 ? ' active' : ''}`} onClick={()=>setEtat(1)}> <span> Update Your Password </span> </div>
            <div className={`parametre ${etat === 2 ? ' active' : ''}`} onClick={()=>setEtat(2)}> <span> Update Your Email </span> </div>
            <div className={`parametre ${etat === 3 ? ' active' : ''}`} onClick={()=>setEtat(3)}> <span> Personal Info  </span> </div>
        </div>

        <div className='page-right'>
            <RenderCompoent />
        </div>
    </div>
  )
}

export default Parametres ; 























// <div className='page-parametres-container'>
//     <div class="page-parametre-content">
//         <section className='section-parametres-left'>
//                 <div className='para' onClick={()=>setPage(1)}>Updtae Profile</div>
//                 <div className='para' onClick={()=>setPage(2)}>Update Password</div>
//                 <div className='para' onClick={()=>setPage(3)}>Add Journalist</div>
//                 <div className='para' onClick={()=>setPage(4)}>Add Teams</div>
//                 <div className='para' onClick={()=>setPage(5)}>Add Project</div>
//                 <div className='para' onClick={()=>setPage(6)}>Add Tach</div>
//         </section>
//         <section className='section-parametres-right'>
//             <Render /> 
//         </section>
//     </div>
// </div>