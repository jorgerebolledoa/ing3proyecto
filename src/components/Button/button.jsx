import { useNavigate } from 'react-router-dom';

function Button(props){
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();

        if(props.navigate != "") navigate(props.navigate); 
    };

    if(props.navigate) {
        return (
            <form onSubmit={handleSubmit}>
                <button disabled={props.disabled} type={props.type} className="border border-transparent rounded-lg px-8 py-4 font-medium bg-[#1a1a1a] w-96 hover:border-[#646cff]">{props.text}</button>
            </form>
        )
    } else {
        return (
            <button disabled={props.disabled} type={props.type} className="border border-transparent w-96 rounded-lg px-8 py-4 font-medium bg-[#1a1a1a] hover:border-[#646cff]">{props.text}</button>
        )
    }

    
}

export default Button;