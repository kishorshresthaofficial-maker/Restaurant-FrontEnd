import axios from "axios"
import { Input } from "postcss"
import { useState } from "react"
import { Link, useNavigate } from "react-router"

const Login = () => {
  const [user, setUser]= useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

 const handleChange = (e)=> {
  setUser({
    ...user,
    [e.target.name]: e.target.value,
  });
 }

const handleSubmit = async (e) => {
  e.preventDefault(); // 👈 VERY IMPORTANT

  try {
    const res = await axios.post("http://localhost:3000/auth/login",user);
    // console.log(res.data)
    localStorage.setItem("token", res.data.token)
    localStorage.setItem("user", JSON.stringify(res.data.user))
    setUser({
      email: "",
      password:""
    })
    alert("Login Successful")
    navigate('/dashboard')
    // console.log(res.data);
  } catch (error) {
    alert("Invalid Username or Password")
    console.error(error.response?.data || error.message);
  }
};



  return (
    <div className="absolute bg-[url('/bg.png')] h-dvh w-dvw -z-20 bg-black">
      <div className="absolute h-full w-full -z-10 bg-white/60"></div>


           <div data-aos="flip-left" className="bg-white w-100 mt-30 m-auto rounded-2xl flex flex-col justify-center align-middle opacity-100">
                    <h2 className="text-center font-medium text-[30px] text-amber-900 py-3">Log In</h2>
                    <form className="px-3 flex justify-around" onSubmit={handleSubmit}>
                       <div className="flex flex-col py-5">

                            <label htmlFor="fname" className="formTitle">Email</label>
                             <input type="email" value={user.email} name="email" onChange={(e)=>handleChange(e)} placeholder="Your email address" />

                             <label htmlFor="password" className="formTitle">Password</label>
                             <input type="password" value={user.password} name="password" onChange={(e)=>handleChange(e)} placeholder="Your password here" />

                             {/* <label htmlFor="confirm_password" className="formTitle">Confirm Password</label>
                             <input type="password" placeholder="Confirm Password" /> */}

                             <button type="submit" className="bg bg-amber-500 text-center font-medium text-black cursor-pointer p-3 rounded-xl">Log In</button>

                             <div className="flex gap-2 mt-3">
                                <label>Don't have an account? </label><Link to='/user' className="links text-amber-900 font-medium">Create Account</Link>
                             </div>
                       </div>

                    </form>
           </div>
    </div>
  )
}

export default Login
