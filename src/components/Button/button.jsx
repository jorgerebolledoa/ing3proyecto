function Button(props){
    return (
        <button disabled={props.disabled} type={props.type} className="border border-transparent rounded-lg px-8 py-4 font-medium bg-[#1a1a1a] hover:border-[#646cff]">{props.text}</button>
    )
}

export default Button;