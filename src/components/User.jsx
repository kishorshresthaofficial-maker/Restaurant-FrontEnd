import axios from "axios"
import { Input } from "postcss"
import { useState } from "react"
import { Link } from "react-router"

const User = () => {
  const [user, setUser]= useState({
    name: "",
    email: "",
    password: ""
  })

 const handleChange = (e)=> {
  setUser({
    ...user,
    [e.target.name]: e.target.value,
  });
 }

//  console.log(user)

// const handleSubmit = async()=>{
//     const res = await axios.post("http://localhost:3000/auth/register", user)
//     console.log(res)
// }

const handleSubmit = async (e) => {
  e.preventDefault(); // 👈 VERY IMPORTANT

  try {
    const res = await axios.post("http://localhost:3000/auth/register",user);
    setUser({
      name: "",
      email: "",
      password:""
    })
    // console.log(res.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};



  return (
    <div className="absolute bg-[url('/bg.png')] h-dvh w-dvw -z-20 bg-black">
      <div className="absolute h-full w-full -z-10 bg-white/60"></div>


           <div data-aos="flip-left" className="bg-white w-100 mt-30 m-auto rounded-2xl flex flex-col justify-center align-middle opacity-100">
                    <h2 className="text-center font-medium text-[30px] text-amber-900 py-3">Register</h2>
                    <form className="px-3 flex justify-around" onSubmit={handleSubmit}>
                       <div className="flex flex-col py-5">
                             <label htmlFor="fname" className="formTitle">Full Name</label>
                             <input type="text" name="name" value={user.name} onChange={(e)=>handleChange(e)} placeholder="Your first  full name" />

                            <label htmlFor="fname" className="formTitle">Email</label>
                             <input type="email" value={user.email} name="email" onChange={(e)=>handleChange(e)} placeholder="Your email address" />

                             <label htmlFor="password" className="formTitle">Password</label>
                             <input type="password" value={user.password} name="password" onChange={(e)=>handleChange(e)} placeholder="Your password here" />

                             {/* <label htmlFor="confirm_password" className="formTitle">Confirm Password</label>
                             <input type="password" placeholder="Confirm Password" /> */}

                             <button type="submit" className="bg bg-amber-500 text-center font-medium text-black cursor-pointer p-3 rounded-xl">Create Account</button>

                             <div className="flex gap-2 mt-3">
                                <label>Already have an account? </label><Link to='/login' className="links text-amber-900 font-medium">Log In</Link>
                             </div>
                       </div>

                    </form>
           </div>
    </div>
  )
}

export default User
