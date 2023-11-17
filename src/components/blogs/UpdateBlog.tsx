import { Box, Button, Typography } from '@mui/material'
import React, { useRef,useEffect } from 'react'
import { addStyles, htmlEleStyles } from '../../styles/add-blog-styles'
import { useMutation, useQuery } from '@apollo/client';
import { GET_BLOG_BY_ID } from '../graphql/queries';
import { useParams } from 'react-router-dom';
import { UPDATE_BLOG } from '../graphql/mutations';
import {toast} from "react-hot-toast";

const UpdateBlog = () => {
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const contentRef = useRef<HTMLParagraphElement | null>(null);
    const id = useParams().id;
    const {data,error,loading,refetch} = useQuery(GET_BLOG_BY_ID,{
        variables:{
            id,
        },
    });
    const [updateBlog] = useMutation(UPDATE_BLOG)
    useEffect(() => {
        if(data && headingRef.current && contentRef.current){
            headingRef.current.innerHTML = data.blog.title;
            contentRef.current.innerHTML = data.blog.content;
        }
    }, [id,data])
    const handleSubmit = async () => {
        if(
            headingRef.current && 
            headingRef.current?.innerText.trim().length > 0 &&  
            contentRef.current && 
            contentRef.current?.innerText.trim().length > 0
            ){
                const title = headingRef.current?.innerText;
                const content = contentRef.current?.innerText;
                try{
                    const res = await updateBlog({
                        variables:{
                            id,
                            title,
                            content,
                        }
                    })
                    toast.promise(refetch(),{
                        error:"Unexpected Error",
                        success:"Fetching Complete",
                        loading:"Hold On!"
                    })
                    
                }catch(error:any){
                    console.log(error)
                }
            }
    }
  return data && (
    <Box sx={addStyles.container}>
        <Box sx={addStyles.blogHeader}>
            <Typography>Authored By: Raju</Typography>
            <Button  
            color="success" 
            variant='contained'
            onClick={handleSubmit}
            >
                PUBLISH
            </Button>
        </Box>
            <Box sx={addStyles.formContainer}>
                <h2 ref={headingRef} style={htmlEleStyles.h2} contentEditable>
                    Post Your Story Title
                </h2>
                <p ref={contentRef} style={htmlEleStyles.p} contentEditable>
                    Describe Your Story
                </p>
            </Box>
    </Box>
  )
}

export default UpdateBlog;