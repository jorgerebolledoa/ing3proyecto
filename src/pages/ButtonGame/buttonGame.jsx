import { TrollButton, Button } from "../../components";

function ButtonGame(props) {

    return (
        <div className="flex flex-col gap-10">
            <TrollButton path={props.path}></TrollButton>
            <Button type="submit" text="Menu" navigate="/" />
        </div>
    )
}

export default ButtonGame;

