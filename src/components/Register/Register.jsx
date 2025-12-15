import { useForm } from "react-hook-form"
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Zod schema
const schemaForm = zod.object({
  name: zod.string(" must be string Zod").min(2, "name must be at least 2 characters-zod"),
  email: zod.email(),
  password: zod.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    "Password must be 8+ chars- zod"),
  rePassword: zod.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    "Password must be 8+ chars-zod"),
  dateOfBirth: zod.coerce.date("Invalid Date-zod").refine(function (value) {
    return new Date().getFullYear() - value.getFullYear() >= 10 ? true : false;
  }, "Age is not must be more than 10"),
  gender: zod.enum(["male", "female"], "gender is required-zod"),
}).refine(function (value) {

  if (value.password !== value.rePassword) {
    return false
  }
  return true
}, {
  // CRITICAL Tip: Specify the path to attach the error
  message: "Passwords do not match-zod",
  path: ["rePassword"]
})


export default function Register() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [succeedMessage, setSucceedMessage] = useState(false)

  const { register, handleSubmit, formState, setError } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",

    },
    mode: "onBlur",
    resolver: zodResolver(schemaForm)
  })

  // handleSunmit get data from form and store the data in myhandleSubmit function
  // register send the data to form
  // add axios in the myhandleSubmit function
  function myhandleSubmit(data) {
    // if (data.password == data.rePassword) {
    //   return true
    // } else {
    //   setError('rePassword', {
    //     message: 'Passwords do not match'
    //   })
    // }
      setLoading(true)
    axios.post("https://linked-posts.routemisr.com/users/signup", data)
      .then((res) => {
       
        console.log(res.data.message)
        setSucceedMessage(true)
      
        setTimeout(() => {
          setSucceedMessage(false)
          navigate("/login")
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
      <h1 className="max-w-sm mx-auto text-5xl font-bold mb-5 text-blue" >Sign Up</h1>

      <form onSubmit={handleSubmit(myhandleSubmit)} className="max-w-sm mx-auto">

        <div className="mb-5">
          <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">User Name</label>
          <input {...register("name")} type="text" id="name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body" placeholder="Eslam_Gomaa" required />
        </div>
        {formState.errors.name && formState.touchedFields.name && <p className="text-red-500"> {formState.errors.name?.message}</p>
        }

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

        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2.5 text-sm font-medium text-heading">Confirmation Password</label>
          <input {...register("rePassword")} type="password" id="rePassword" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body" placeholder="••••" required />
        </div>

        {formState.errors.rePassword && formState.touchedFields.rePassword && <p className="text-red-500"> {formState.errors.rePassword?.message}</p>}

        {/* // Date of Birth input */}
        <div className="mb-5">
          <label htmlFor="dateOfBirth" className="block mb-2.5 text-sm font-medium text-heading">Date of birth</label>
          <input {...register("dateOfBirth")} type="date" id="dateOfBirth" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body" />
        </div>

        {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth && <p className="text-red-500"> {formState.errors.dateOfBirth?.message}</p>}

        {/* // Gender input */}
        <div className="mb-5 flex items-end">
          <div className="mb-5 flex items-end">
            <label htmlFor="male" className="">Male</label>
            <input {...register("gender")} value="male" id="male" type="radio" name="gender" className="ms-2"></input>
          </div>
          <div className="mb-5 flex items-end ms-10">
            <label htmlFor="female" className="">Female</label>
            <input {...register("gender")} value="female" id="female" type="radio" name="gender" className="ms-2"></input> {/* Changed id from "male" to "female" */}
          </div>
        </div>

        {formState.errors.gender && formState.touchedFields.gender && <p className="text-red-500"> {formState.errors.gender?.message}</p>}

        {/* // Submit button */}
        <button type="submit"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
           {loading ? <BeatLoader /> : "Submit"}
        </button>
      </form>
      {/* { <BeatLoader />} */}

      {succeedMessage && <p className="bg-blue-500"> User registered successfully</p>}
      {errorMessage && <p className="bg-red-500"> User already exists </p>}
    </>
  )
}

