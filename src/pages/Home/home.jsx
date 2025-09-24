import { Button } from "../../components";
import HorseRace from "../HorseRace/HorseRace";

function Home(){
    return (
        <div style={{ padding: 16 }}>
            <HorseRace initialHorses={5} />
            <div style={{ marginTop: 20 }}>
                <Button />
            </div>
        </div>
    )
}

export default Home;