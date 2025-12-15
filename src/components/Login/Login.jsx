import { useForm } from "react-hook-form"
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Zod schema
const schemaForm = zod.object({

  email: zod.email(),
  password: zod.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    "Password must be 8+ chars- zod"),

})


export default function Login() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [succeedMessage, setSucceedMessage] = useState(false)

  const { register, handleSubmit, formState, setError } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(schemaForm)
  })

  // handleSunmit get data from form and store the data in myhandleSubmit function
  // register send the data to form
  // add axios in the myhandleSubmit function
  function myhandleSubmit(data) {
 
      setLoading(true)
    axios.post("https://linked-posts.routemisr.com/users/signin", data)
      .then((res) => {
       
        console.log(res.data.message)
        setSucceedMessage(true)
      
        setTimeout(() => {
          setSucceedMessage(false)
          navigate("/home")
        }, 3000)

        

      })
      .catch((err) => {
        
        console.log("Axios message error", err.response.data.error)
        setErrorMessage(err.response.data.error)

        setTimeout(() => {
          setErrorMessage(false)
        }, 3000)
      }).finally(() => {
        setLoading(false)
      })
  }


  return (
    <>
      <h1 className="max-w-sm mx-auto text-5xl font-bold mb-5 text-blue" >Login</h1>

      <form onSubmit={handleSubmit(myhandleSubmit)} className="max-w-sm mx-auto">


        {/* // Email input */}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Email</label>
          <input {...register("email")} type="email" id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body" placeholder="eslam@gmail.com" required />
        </div>
        {formState.errors.email && formState.touchedFields.email && <p className="text-red-500"> {formState.errors.email?.message}</p>
        }

        {/* // Password & rePassword inputs */}
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
          <input {...register("password")} type="password" id="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body" placeholder="••••" required />
        </div>
        {formState.errors.password && formState.touchedFields.password && <p className="text-red-500"> {formState.errors.password?.message}</p>}

 


        {/* // Submit button */}
        <button type="submit"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
           {loading ? <BeatLoader /> : "Login"}
        </button>
      </form>
      {/* { <BeatLoader />} */}

      {succeedMessage && <p className="bg-blue-500"> User registered successfully</p>}
      {errorMessage && <p className="bg-red-500"> Email or Password are wrong </p>}
    </>
  )
}

