import {AppBar,Toolbar,Box,Tabs,Tab,Button, Typography, IconButton, useMediaQuery, useTheme} from "@mui/material";
import {ImBlogger} from "react-icons/im";
import { headerStyles } from "../../styles/header-styles";
import { useState } from "react";
import {BiLogInCircle} from "react-icons/bi";
import {Link, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "./user/UserMenu";
import DrawerComp from "./DrawerComp";

const Header = () => {
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const [value,setValue] = useState(0);
    const isLoggedIn = useSelector((state:any)=> state.isLoggedIn);
    const handleAddBlog = () => {
        navigate("/add")
    }
  return (
    <AppBar sx={headerStyles.appBar}>
        <Toolbar>
            <ImBlogger size="30px" style={{borderRadius:"50%",padding:"10px",background:"#6c5252"}}/>
          {
            isBelowMd ? <DrawerComp isLoggedIn={isLoggedIn}/> :
            <>
              <Typography 
            ml="8px" 
            fontWeight="500"
            fontSize={{lg:18,md:16,sm:12,xs:10}}
            fontFamily="Work Sans"
            sx={{textShadow:"4px 1px 20px #d5d5d5"}}
            >
                devBlog
            </Typography>
            {
                isLoggedIn && (
                    <Box onClick={handleAddBlog} sx={headerStyles.addLink}>
                <Typography fontSize={20} fontFamily="Work Sans">Post New Blog</Typography>
                <IconButton color="inherit">
                    <ImBlogger/>
                </IconButton>
            </Box>
                )
            }
            <Box sx={headerStyles.tabContainer}>
                <Tabs textColor="inherit" TabIndicatorProps={{style:{background:"white"}}} indicatorColor="secondary" value={value} onChange={(e,val)=>setValue(val)}>
                    {/* @ts-ignore */}
                    <Tab LinkComponent={Link} to="/" label="Home"/>
                    {/* @ts-ignore */}
                    <Tab LinkComponent={Link} to="/blogs" label="Blogs"/>
                </Tabs>
                {
                    isLoggedIn ? <UserMenu/> :
                    <>
                    {/* @ts-ignore */}
                    <Button LinkComponent={Link} to="/auth"  endIcon={<BiLogInCircle/>} sx={headerStyles.authBtn}>Auth</Button>
                    </>
                }
            </Box>
            </>
          }
        </Toolbar>
    </AppBar>
  )
}

export default Header