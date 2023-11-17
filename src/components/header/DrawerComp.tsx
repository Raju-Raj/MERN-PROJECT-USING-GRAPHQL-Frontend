import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useState } from "react"
import { AiFillProfile, AiOutlineLogin, AiOutlinePlus } from "react-icons/ai";
import { BiHomeAlt2, BiLogOut } from "react-icons/bi";
import { BsListColumns } from "react-icons/bs";
import { FaHamburger } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";

type Props = {
  isLoggedIn:boolean,
}

type ListItem = {
  name:string;
  url:string;
  icon:JSX.Element;
  cb?:() => void | null;
}

const DrawerComp = (props:Props) => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
      dispatch(authActions.logout())
    };

    const authLinks = [
        {name:"Home",url:"/",icon:<BiHomeAlt2/>},
        {name:"Blogs",url:"/blogs",icon:<BsListColumns/>},
        {name:"Add Blog",url:"/add",icon:<AiOutlinePlus/>},
        {name:"Profile",url:"/profile",icon:<AiFillProfile/>},
        {name:"Logout",url:"/",icon:<BiLogOut/>,cb:handleLogout}
    ];
    const nonAuthLinkss = [
        {name:"Home",url:"/",icon:<BiHomeAlt2/>},
        {name:"Blogs",url:"/blogs",icon:<BsListColumns/>},
        {name:"Auth",url:"/auth",icon:<AiOutlineLogin/>}
    ]

    const [open,setOpen] = useState(false);

    const handleNavigate = (url:string,cb:(()=>void | null)) => {
      navigate(url)
      setOpen(false)
      cb && cb()
    }
  return (
    <div style={{
      display:"flex",
      width:"100%"
    }}>
        <Drawer open={open} onClose={()=>setOpen(false)}>
          <List>
            {
              (props.isLoggedIn ? authLinks : nonAuthLinkss).map((item:ListItem)=>(
                // @ts-ignore
                <ListItemButton key={item.name} onClick={()=>handleNavigate(item.url,item.cb ? item.cb : null)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.name}</ListItemText>
                </ListItemButton>
              ))
            }
          </List>
        </Drawer>
        <IconButton color="inherit" sx={{ml:"auto"}} onClick={()=>setOpen(true)}>
          <FaHamburger/>
        </IconButton>
    </div>
  )
}

export default DrawerComp