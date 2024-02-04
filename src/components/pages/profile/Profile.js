import { useEffect, useState } from "react";
import AuthUser from "../../backend/Auth/AuthUser";
import axios from "axios";

const Profile = () =>{

    const { http} = AuthUser();
    const [userdetail,setUserdetail] = useState();
    useEffect(()=>{
        oldurls();
        fetchUserDetail();

    },[]);

    const oldurls = () => {
        http.get('/users')
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          });
      }
    
    const fetchUserDetail = () =>{
        http.post('/me').then((res)=>{
            setUserdetail(res.data);
        })
    
    };

   

  



    function renderElement(){
        if(userdetail){
           return <div>
             User Name Fatch Api Token : {userdetail.name}
           </div>
        }else{
            return <p>Loding...</p>
        }
    }

    return (
        <div>
            <h4>
            
            {renderElement()}
            </h4>
        </div>
    )
}
export default Profile;