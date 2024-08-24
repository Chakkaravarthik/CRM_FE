import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checktokenforfeedback, updatefeedback } from "../../../apis/auth.js";

const Feedback = () =>{

    const [feedback,setfeedback]= useState('')
    const [validtoken,setvalidtoken]=useState(false);
    const [searchparams]= useSearchParams();
    const token = searchparams.get('token');
    const Navigate = useNavigate();
    const [msg,setmsg]=useState('');

    // check validitity
    useEffect(()=>{
        const verifytokenforfeedback = async () =>{
            if(token){
                try{
                    const data = await checktokenforfeedback({token});
                    if(data.code==1){
                        setvalidtoken(true)
                    }else{
                        setmsg(`invalid token`)
                    }
                }catch(e){
                    console.log(e)
                    setmsg('some error')
                }
            }else{
                setmsg(`token missing`);
            }
        }

        verifytokenforfeedback();
    },[token])

    const handlechange = (e)=>{
        setfeedback(e.target.value)
    }

    const handlesubmit = async (e)=>{
        e.preventDefault();
        try{
            const res = await updatefeedback({token,feedback});
            if(res.code==1){
                console.log('feedback submitted')
            }else{
                console.log('feed not')
            }
        }catch(e){
            console.log(e)
        }
    }
    return(
        <>
        <div className="container mt-5">
         <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center" style={{ backgroundColor: 'orange', color: 'white' }}>
              Customer Feedback
            </div>
            <div className="card-body">
              {validtoken ? (
                <>
                  <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Feedback</label>
                      <input
                        type="text"
                        className="form-control"
                        id="password"
                        value={feedback}
                        onChange={handlechange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'orange', borderColor: 'orange' }}>Submit</button>
                  </form>
                </>
              ) : (
                <p>{msg}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>   
        </>
    )
}

export default Feedback;