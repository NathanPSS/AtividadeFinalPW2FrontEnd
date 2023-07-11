


interface IProps {
    bgColor: string
    childreen: React.ReactNode
}


export default function Layout(props :IProps){
    return(
        <div style={{
            position:'absolute',
            backgroundColor:props.bgColor,
            display:'flex',
            width:'100%',
            height:'100%'
           }}
           >{props.childreen}</div>
       )
}