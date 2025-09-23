function Input(props){
    return (
        <input value={props.value} onChange={props.onChange} placeholder={props.placeholder}
        id={props.id} min={props.min} max={props.max} className="border bg-[#1a1a1a] border-transparent rounded-md focus:border-[#646cff] p-2" type={props.type ? props.type : "text"} />
    )
}

export default Input;