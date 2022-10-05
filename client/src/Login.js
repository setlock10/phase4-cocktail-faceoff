import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
//import {Form} from '../styled/Form'
function Login() {

    const [loginFormVisible,setLoginFormVisible] =useState("hidden")
    const [signupFormVisible,setSignupFormVisible] =useState("hidden")


    const [formData, setFormData] = useState({
        username:'',
        // email:'',
        password:''
    })
    const [errors, setErrors] = useState([])
    const history = useHistory()

    const {username, password} = formData

    function onSubmit(e){
        e.preventDefault()
        const user = {
            username,
            password
        }
        // Logs in user
        fetch(`/login`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => {

                    history.push(`/users/${user.id}`)
                })
            }else {
                res.json().then(json => setErrors(json.errors))
            }
        })
       
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
      }

      function showLogin()
      {
        setLoginFormVisible("visible")
        setSignupFormVisible("hidden")
      }
 
      function showSignup()
      {
        setSignupFormVisible("visible")
        setLoginFormVisible("hidden")
      }
 

    return (

        <> 
        <button onClick={()=>showLogin()}>Login</button><button onClick={()=>showSignup()}>Sign Up</button>
        <form style={{visibility:loginFormVisible}} className="Login" onSubmit={onSubmit}>
        <label>
          Username
          </label>
        <input type='text' name='username' value={username} onChange={handleChange} />
      
        <label>
         Password
         </label>
        <input type='password' name='password' value={password} onChange={handleChange} />
       
       
        <input type='submit' value='Log in!' />
        </form>
        <form style={{visibility:signupFormVisible}} className="Signup" onSubmit={onSubmit}>
        <label>
          Username
          </label>
        <input type='text' name='username' value={username} onChange={handleChange} />
      
        <label>
         Password
         </label>
        <input type='password' name='password' value={password} onChange={handleChange} />
       
       
        <input type='submit' value='Sign Up!' />
        </form>
        
        {errors? <div>{errors}</div>:null}
        </>

    )

}

export default Login