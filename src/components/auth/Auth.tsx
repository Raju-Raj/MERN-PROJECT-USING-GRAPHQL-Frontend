import {Box,useMediaQuery, Button, InputLabel, TextField, Typography, useTheme} from "@mui/material";
import { authStyles } from "../../styles/auth-styles";
import {ImBlogger} from "react-icons/im";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { USER_LOGIN, USER_SIGNUP } from "../graphql/mutations";
import {useSelector,useDispatch} from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from 'react-router-dom';

 
type Inputs = {
  name:string,
  email:string,
  password:string
}

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state:any)=>state.isLoggedIn);
  const {register,handleSubmit,formState:{errors}} = useForm<Inputs>();
  const [login] = useMutation(USER_LOGIN)
  const [signup] = useMutation(USER_SIGNUP)
  const [isSignup,setIsSignup] = useState(false)
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  const onResReceived = (data:any)=>{
    console.log(data);
    if(data.signup){
      const {id,email,name} = data.signup;
      localStorage.setItem("userData",JSON.stringify({id,email,name}))
    }else{
      const {id,email,name} = data.login;
      localStorage.setItem("userData",JSON.stringify({id,email,name}))
    }
    dispatch(authActions.login());
    return navigate("/blogs")
  }
  console.log(isLoggedIn)
  const onSubmit =async ({name,email,password}:Inputs) => {
    if(isSignup){
      //Signup
      try{
        const res = await signup({variables:{name,email,password}})
        if(res.data){
          onResReceived(res.data)
        }
      }catch(error:any){
        console.log(error.message)
      }
    }else{
      //login
      try{
        const res = await login({variables:{email,password}})
        if(res.data){
          onResReceived(res.data)
        }
      }catch(error:any){
        console.log(error.message)
      }
    }
  }
  return (
    <Box sx={authStyles.container}>
      <Box sx={authStyles.logoTitle}>
      <ImBlogger size="30px" style={{borderRadius:"50%",padding:"10px",background:"#6c5252"}}/>
      <Typography sx={authStyles.logoText}>devBlog</Typography>
      </Box>
      <Box sx={{...authStyles.formContainer,width:isBelowMd?"50%":"200px"}}>
        <Typography sx={authStyles.logoText}>{isSignup ? "SignUp" : "Login"}</Typography>
        {/* @ts-ignore */}
        <form style={authStyles.form} onSubmit={handleSubmit(onSubmit)}>
          {
            isSignup && (
              <>
              <InputLabel aria-label="name"></InputLabel>
              {/* @ts-ignore */}
              <TextField type="text" error={!!errors.name} aria-label="name" label="Name" {...register("name",{required:"Name is Required"})} helperText={errors.name?.message} />
              </>
            )
          }
          <InputLabel aria-label="email"></InputLabel>
          {/* @ts-ignore */}
          <TextField type="email" error={!!errors.email}  aria-label="email" label="Email" {...register("email",{required:"Email is Required",pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:"email is not valid"}})} helperText={errors.email?.message} />
          <InputLabel aria-label="password"></InputLabel>
          {/* @ts-ignore */}
          <TextField type="password" error={!!errors.password}  aria-label="password" label="Password" {...register("password",{required:"Password is Required",minLength:{value:6,message:"Password Should minimum 6 char"}})} helperText={errors.password?.message} />
          <Button type="submit" variant="contained" sx={authStyles.submitButton}>Submit</Button>
          {/* @ts-ignore */}
          <Button sx={{...authStyles.submitButton,...authStyles.switchBtn}} onClick={()=>setIsSignup(prev => !prev)}>
            Switch to {isSignup ? "Login" : "SignUp"}
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default Auth