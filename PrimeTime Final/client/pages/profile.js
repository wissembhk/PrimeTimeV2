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
    <Layout pathList={['portfolio basic', 'basic-4 grid with title']} pathTitle="Streams">
        <div>hello</div>
        <input type="file" accept="image/*" onChange={onInputChange}></input>
        <button onClick={clicked}>update image</button>
        <img src={imgsrc}></img>
    </Layout>
)
    }


export default Profile;