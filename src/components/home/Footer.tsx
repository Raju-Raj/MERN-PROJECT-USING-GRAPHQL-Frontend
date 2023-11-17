import {Box,Button,Typography} from "@mui/material";
import { homepageStyles } from "../../styles/homepage-styles";

const Footer = () => {
  return (
    <Box sx={homepageStyles.footerContainer}>
        <Button variant="contained" sx={homepageStyles.footerBtn}>View Articles</Button>
        <Typography sx={homepageStyles.footerText}>Made With &#x1F498; By Rajubojja</Typography>
        <Button variant="contained" sx={homepageStyles.footerBtn}>Published One</Button>
    </Box>
  )
}

export default Footer