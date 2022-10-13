import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
//import {Form} from '../styled/Form'
function Login({ setUser, setIsAuthenticated, isAuthenticated}) {

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

    

    function onSignup(e){
        e.preventDefault()
        fetch(`/signup`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(formData)
          })
          .then(res => {
            if(res.ok){
              res.json()
              .then(user=>{
                setUser(user)
                setIsAuthenticated(true)
                setSignupFormVisible("hidden")
              })
              
            } else {
              res.json()
              .then(json => setErrors(json.errors))
            }
          })
  
    }
    function onLogin(e){
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
                    setLoginFormVisible('hidden')
                    setIsAuthenticated(true)
                    setUser(user)
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
      function logout()
      {
        fetch('/logout',{
            method:'DELETE'
        })
        .then(()=>{
            setIsAuthenticated(false)
            setUser(null)
        })
  
      }
 

    return (

        <> 
        <label className='hello' style={isAuthenticated?{visibility:'visible'}:{visibility:'hidden'}}>user {username} is logged in </label><button style={isAuthenticated?{visibility:'visible'}:{visibility:'hidden'}} onClick={()=>logout()}>Logout</button><button style={isAuthenticated?{visibility:'hidden'}:{visibility:'visible'}} onClick={()=>showLogin()}>Login</button><button style={isAuthenticated?{visibility:'hidden'}:{visibility:'visible'}} onClick={()=>showSignup()}>Sign Up</button>
        <form style={{visibility:loginFormVisible}} className="Login" onSubmit={onLogin}>
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
        <form style={{visibility:signupFormVisible}} className="Signup" onSubmit={onSignup}>
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