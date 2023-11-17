import {Box,Typography} from "@mui/material"
import { homepageStyles } from "../../styles/homepage-styles"


const Homepage = () => {
  return (
    <Box sx={homepageStyles.container}>
        <Box sx={homepageStyles.wrapper}>
            <Typography sx={homepageStyles.text}>Write and Share Your Blog With Millions Of People</Typography>
            <img width="50%" height="50%"
            //@ts-ignore
             style={homepageStyles.image}  
             src="/blog.png" alt="blog"/>
        </Box>
        <Box sx={homepageStyles.wrapper}>
            <img width="50%" height="50%" 
            //@ts-ignore
            style={homepageStyles.image} 
            src="/publish.png" alt="blog"/>
            <Typography sx={homepageStyles.text}>Write and Share Your Blog With Millions Of People</Typography>
        </Box>
        <Box sx={homepageStyles.wrapper}>
            <Typography sx={homepageStyles.text}>Write and Share Your Blog With Millions Of People</Typography>
            <img width="50%" height="50%" 
            //@ts-ignore
            style={homepageStyles.image} 
            src="/articles.png" alt="blog"/>
        </Box>
    </Box>
  )
}

export default Homepage