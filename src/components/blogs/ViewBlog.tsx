import { Avatar, Box, Dialog, DialogContent, IconButton, LinearProgress, TextField, Typography } from '@mui/material';
import { blogPageStyles } from '../../styles/View-styles'
import { FaComments } from 'react-icons/fa'
import { BiSend } from 'react-icons/bi'
import { ImMail } from 'react-icons/im'
import { useMutation, useQuery } from '@apollo/client';
import { GET_BLOG_BY_ID } from '../graphql/queries';
import { useParams } from 'react-router-dom';
import {BsCalendar2DateFill} from "react-icons/bs";
import { useForm } from 'react-hook-form';
import { ADD_COMMENT, DELETE_COMMENT } from '../graphql/mutations';
import {AiOutlineDelete} from "react-icons/ai";
import {toast} from "react-hot-toast";
import { useSelector } from 'react-redux';

const ViewBlog = () => {
    const isLoggedIn = useSelector((state:any)=>state.isLoggedIns);
    const user:string = JSON.parse(localStorage.getItem("userData") as string)?.id;
    const id = useParams().id;
    const {register,handleSubmit} = useForm();
    const [addCommentToBlog,addCommentResponse] = useMutation(ADD_COMMENT);
    const {data,error,loading,refetch} = useQuery(GET_BLOG_BY_ID,{
        variables:{
            id,
        },
    });
    const [deleteComment] = useMutation(DELETE_COMMENT);
    const commentHandler = async (data:any) => {
        if(isLoggedIn){
            const text = data.comment;
        const date = new Date();
        try{
            await addCommentToBlog({
                variables:{
                    text,
                    date,
                    blog:id,
                    user,
                }
            });
            toast.promise(refetch(),{
                error:"Unexpected Error",
                success:"Fetching Complete",
                loading:"Hold On!"
            })
        }catch(error:any){
            return console.log(error.message)
        }
        }else{
            toast.error("You Need To Login First!")
        }
    }
    if(loading){
        return <LinearProgress/>;
    }
    if(error){
        return (
            <Dialog open={true}>
              <DialogContent>Error Fetching Blog</DialogContent>
          </Dialog>
        )
    }
    const getInitials=(name:string)=>{
        const nameArr = name.split(" ")
        if(nameArr.length > 1){
            return `${nameArr[0][0].toUpperCase()}${nameArr[1][0].toUpperCase()}`
        }
        return `${nameArr[0][0].toUpperCase()}`
    }
    const handleCommentDelete = async (id:string) => {
        try{
            await deleteComment({
                variables:{
                    id,
                },
            });
            toast.promise(refetch(),{
                error:"Unexpected Error",
                success:"Fetching Complete",
                loading:"Hold On!"
            })
        }catch(error:any){
            console.log(error.message)
        }
    }
  return data && (
    <Box sx={blogPageStyles.container}>
        <Box sx={blogPageStyles.profileHeader}>
            <Typography sx={blogPageStyles.headerText}>
                {data.blog.user.name}
            </Typography>
            <Box sx={blogPageStyles.profileHeaderItems}>
                {/*  */}
                <ImMail size="20"/>
                <Typography sx={blogPageStyles.profileHeader}>
                {data.blog.user.email}
                </Typography>
                <Box sx={{ml:"auto",display:"flex",gap:3,alignItems:"center"}}>
                    <BsCalendar2DateFill/>
                    <Typography fontFamily="Work Sans" fontWeight="500">{new Date(Number(data.blog.date)).toDateString()}</Typography>
                </Box>
            </Box>
        </Box>
        <Typography sx={blogPageStyles.blogTitle}>{data.blog.title}</Typography>
        <Typography sx={blogPageStyles.blogContent}>{data.blog.content}</Typography>
        <Box sx={blogPageStyles.commentBox}>
            Comments:{"  "}
            <IconButton><FaComments size={"30"}/></IconButton>
        </Box>
        <Box sx={blogPageStyles.commentInputContainer}>
            <Typography sx={{margin:2}} fontFamily={"Arvo"}>Add Your Comment...</Typography>
            <Box sx={blogPageStyles.inputLayout}>
                <TextField {...register("comment")} sx={blogPageStyles.textField} InputProps={{style:{
                    width:"60vw",
                    borderRadius:"20px",
                    fontFamily:"Work Sans"
                },
                endAdornment:(
                    <IconButton onClick={handleSubmit(commentHandler)}>
                      <BiSend size={"25"}/>
                     </IconButton>
                )
                }}
                placeholder='HBXUBIKBIYBE'
                />
            </Box>
        </Box>
        {
            data.blog.comments.length > 0 && (
                <Box sx={blogPageStyles.comments}>
            {
                data.blog.comments.map((comment:any)=>(
                    <Box sx={blogPageStyles.commentItem} key={comment.id}>
                        <Avatar sx={{padding:1,color:"red",bgcolor:"transparent"}}>
                            {getInitials(comment.user.name)}
                        </Avatar>
                        <Typography sx={blogPageStyles.commentText}>
                            {comment.text}
                        </Typography>
                        {
                            user===comment.user.id && <IconButton onClick={async ()=>await handleCommentDelete(comment.id)} sx={{ml:"auto"}} color='error'><AiOutlineDelete/></IconButton>
                        }
                    </Box>
                ))
            }{" "}
        </Box>
            )
        }
    </Box>
  )
}

export default ViewBlog