import React , {useState,useEffect }  from 'react';
import Layout from '../containers/common/common-layout'
import axios from 'axios';
import { BASE_URL } from '../constant/constants';


const Profile = () => {
const [file,setFile]=useState(null);
const [user,setUser]=useState();
const[imgsrc,setImgsrc]=useState("");
   useEffect(() => {
    
    setUser(JSON.parse(localStorage.getItem("user")))
    
    
  }, []);

  useEffect(()=>{
    console.log(user)
      if (user)
    setImgsrc("images/users/"+user["firstName"]+user["lastName"]+".jpg");

  },[user])

const onInputChange = (e)=>{
    setFile(e.target.files[0])
}
const clicked=(e)=>{
    const formData= new FormData()
    formData.append('username',user["firstName"]+user["lastName"]);
    formData.append('photo',file);
    const config ={
        headers:{
            'content-type':'multipart/form-data',
        }
    }
    axios.post(BASE_URL+"user/uploadProfileImg",formData,config).then(window.location.reload());

}
    return(
        <>
    <div>hello</div>
    <iframe src="https://cdn.videosdk.live/encoded/videos/625c1bedb0e49264154a9ccd.mp4"></iframe>
    </>
)
    }


export default Profile;