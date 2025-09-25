import { Button, TrollButton } from "../../components";
import HorseRace from "../HorseRace/HorseRace";

function Home(){
    return (
        <div className="p-8">
            <div >
                <Button type="submit" text="Grafico" navigate="/graph" />
                <TrollButton />
            </div>
        </div>
    )
}

export default Home;