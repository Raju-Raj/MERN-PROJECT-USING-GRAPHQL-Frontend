import { Styles } from "./homepage-styles";

const colors = [
    "#FF9800",
    "#FF5722",
    "#607D88",
    "#4CAF50",
    "#88C34A",
    "#40C4FF",
    "#0277BD",
    "#4D86AC",
    "#009688",
    "#448AFF",
    "#42A5F5",
    "#7E57C2",
    "#D32F2F",
    "#AB47BC",
];

export function randomBgColor(){
    return colors[Math.floor(Math.random()*colors.length)]
}

export const blogStyles:Styles = {
    container:{
        display:"flex",
        justifyContent:"flex-start",
        gap:10,
        flexWrap:"wrap",
        m:2,
    },
    card:{
        width:"400px",
        display:"flex",
        flexDirection:"column",
        height:"60vh",
        transition:"transform 1s",
        ":hover":{
            transform:"scale(1.02)",
            boxShadow:"10px 10px 20px #ccc",
        }
    },
    cardHeader:{
        fontFamily:"Work Sans",
        fontSize:"72px",
        height:"auto",
        minHeight:"40px",
        padding:1,
        ":hover":{
            cursor:"pointer",
        }
    },
    dateContainer:{
        display:"flex",
        alignItems:"center",
        gap:2,
    },
    cardContent:{
        width:"100%",
        height:"100%",
        fontSize:"20px",
        fontWeight:"500",
    },
    title:{
        fontWeight:"600",
        m:1,
        color:"white",
        textTransform:"uppercase",
        fontFamily:"Arvo",
        textShadow:"2px 7px 20px #000",
        fontSize:{lg:32,md:28,sm:22,xs:18},
        ":hover":{
            textDecoration:"underline",
            textUnderlineOffset:"5px",
        }
    },
    contentText:{
        padding:2,
        fontSize:"20px",
        fontWeight:"500",
        fontFamily:"Work Sans",
    },
    author:{
        display:"flex",
        alignItems:"center",
        gap:1,
        fontFamily:"Work Sans",
        padding:2,
        fontWeight:"bold",
        color:"white",
    },
}