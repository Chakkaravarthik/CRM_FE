const URL =import.meta.env.VITE_LOCAL_URI



// function for regiseter user
const usersignup = async (userdata) =>{
    try{
        const res = await fetch(`${URL}/register`,{
            method:"post",
            body: JSON.stringify(userdata),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        return await res.json();
    }catch(e){
        console.log(e.message)
    }
}

// function for login user

const userlogin = async (userdata)=>{
    try{
        const res = await fetch(`${URL}/login`, {
            method: "post",
            body: JSON.stringify(userdata),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        return await res.json();
    }catch(e){
        console.log(e.message)
    }
}

// forget password email sending
 const forgetpassword = async (email) =>{
    try{
        const res = await fetch(`${URL}/forgetpassword`,{
            method:"post",
            body: JSON.stringify(email),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        return await res.json();
    }catch(e){
        console.log(e.message)
    }
 }
 
 // resetting password 

 const resetpassword = async ({token, password}) =>{
    try{
        const res = await fetch(`${URL}/resetpassword`,{
            method:"post",
            body: JSON.stringify({token,password}),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        return await res.json();
    }catch(e){
        console.log(e.message)
    }
 }

 //verify password 

 const verifypassword = async ({token})=>{
    try{
        const res = await fetch(`${URL}/verifypassword`,{
            method:"post",
            body: JSON.stringify({token}),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        return await res.json();
    }catch(e){
        console.log(e.message)
    }
 }

 // customer data api hit

 const customerget = async () =>{
    try{
        const res = await fetch(`${URL}/customer-list`)
        return await res.json();
        
    }catch(e){
        console.log(e.message)
    }
 }

 //customer particular

 const customerget1 = async (token) =>{
    try{
        const res = await fetch(`${URL}/customer-list`,{
            method:'post',
            body:JSON.stringify(token),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        return await res.json();
        
    }catch(e){
        console.log(e.message)
    }
 }


 //custoemr creation api

 const customercreation = async (customerdata) =>{
    try{
        const res = await fetch(`${URL}/customer-list`,{
            method: "POST",
            body: JSON.stringify(customerdata),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        return await res.json();
    }catch(e){
        console.log(e.message)
    }
 }

 const getitems= async()=>{
    try{
        const res = await fetch(`${URL}/itemlist`)
        return await res.json();
    }catch(e){
        console.log(e)
    }
 }

 const addpurchasedata = async(formdata)=>{
    try{
        const res = await fetch(`${URL}/purchase`,{
            method:'post',
            body:JSON.stringify(formdata),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        return await res.json();
    }catch(e){
        console.log(e)
     }
 }

 const getpurchase = async () =>{
    try{
        const res = await fetch(`${URL}/purchase`)
        return await res.json();
    }catch(e){
        console.log(e)
    }
 }

// api for purchase feedback

const checktokenforfeedback = async (token)=>{
    try{
        const res = await fetch(`${URL}/purchasefeedback`,{
            method:'post',
            body:JSON.stringify(token),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        return await res.json();
    }catch(e){
        console.log(e.message);
    }
}

//feedback update api

const updatefeedback = async (data)=>{
    try{
        const res = await fetch(`${URL}/purchasefeedbackupdate`,{
            method:'post',
            body:JSON.stringify(data),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        return await res.json();
    }catch(e){
        console.log(e.message);
    }
}

const offerzonedata= async (customerdata)=>{
    try{
        const res = await fetch(`${URL}/offerzone`,{
            method:"post",
            body:JSON.stringify(customerdata),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        return await res.json();
    }catch(e){
        console.log(e)
    }
}

const fetchEvents =async ()=>{
    try{
        const res = await fetch(`${URL}/offerzone`)
        return await res.json();
    }catch(e){
        console.log(e)
    }
}

const sendEmail = async (emaildata) =>{
    try{
        const res = await fetch(`${URL}/bulkemail`,{
            method:'post',
            body:JSON.stringify(emaildata),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        return await res.json();
    }catch(e){
        console.log(e)
    }
}

const feedbackget = async() =>{
    try{
        const res = await fetch(`${URL}/purchasefeedbackupdate`)
        return await res.json();
    }catch(e){
        console.log(e)
    }
}

export { customerget1, feedbackget, sendEmail, fetchEvents,offerzonedata , updatefeedback, checktokenforfeedback, usersignup, userlogin, forgetpassword, resetpassword, verifypassword , customerget, customercreation,getitems, addpurchasedata, getpurchase};