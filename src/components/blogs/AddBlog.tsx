import { Box, Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { addStyles, htmlEleStyles } from '../../styles/add-blog-styles'
import { useMutation } from '@apollo/client';
import { ADD_BLOG } from '../graphql/mutations';

const AddBlog = () => {
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const contentRef = useRef<HTMLParagraphElement | null>(null);
    const [addBlog] = useMutation(ADD_BLOG)
    const handleSubmit = async () => {
        if(
            headingRef.current && 
            headingRef.current?.innerText.trim().length > 0 &&  
            contentRef.current && 
            contentRef.current?.innerText.trim().length > 0
            ){
                const title = headingRef.current?.innerText;
                const content = contentRef.current?.innerText;
                const date = new Date();
                const user =JSON.parse(localStorage.getItem("userData") as string).id;
                try{
                    const res = await addBlog({
                        variables:{
                            title,
                            content,
                            date,
                            user,
                        }
                    })
                    const data = await res.data
                    console.log(data)
                }catch(error:any){
                    console.log(error)
                }
            }
    }
    const user :string = JSON.parse(localStorage.getItem("userDate") as string)?.name;
  return (
    <Box sx={addStyles.container}>
        <Box sx={addStyles.blogHeader}>
            <Typography fontFamily={"Arvo"}>Authored By: {user}</Typography>
            <Button onClick={handleSubmit} 
            color="success" 
            variant='contained'
            sx={{borderRadius:10}}
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

export default AddBlog