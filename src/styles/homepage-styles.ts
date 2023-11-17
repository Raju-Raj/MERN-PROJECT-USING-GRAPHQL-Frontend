import { SxProps } from "@mui/material";

export type Styles={
    [key:string]:SxProps;
}

export const homepageStyles:Styles = {
    container:{
        display:"flex",
        flexDirection:"column",
        gap:10,
    },
    wrapper:{
        display:"flex",
        justifyContent:"center",
        gap:4,
        alignItems:"center",
        padding:6,
    },
    text:{
        fontFamily:"'Work Sans', sans-serif",
        fontSize:{lg:50,md:40,sm:35,xs:20},
        textShadow:"12px 10px 8px #ccc",
    },
    image:{
        boxShadow:"10px 10px 25px #000",
        borderRadius:20,
    },
    footerContainer:{
        bgcolor:"#404040",
        display:"flex",
        alignItems:"center",
        height:"20vh",
        width:"100%",
        justifyContent:"center",
        gap:"30px",
    },
    footerBtn:{
        borderRadius:10,
        bgcolor:"blueviolet",
        width:"15%",
        maxWidth:"200px",
        ":hover":{
            bgcolor:"#bd63fa",
        },
        fontSize:{lg:16,md:16,sm:12,xs:10}
    },
    footerText:{
        fontFamily:"Work Sans",
        fontWeight:"500",
        fontSize:{lg:20,md:18,sm:12,xs:10},
        color:"white",
    }
}