
import spawn from 'child_process';




export default async function sum(search) {
    const process = spawn.spawn('python',['./lyrics.py', search]);
    var response ='';
    process.stdout.on('data', data =>{
        
        response += data.toString();
        console.log(response)
        
    });
     
    setTimeout(() => {return response;}, 3000);
    
  };
