import { useEffect, useState } from "react";
import { useSelectorCount, useSelectorDirection } from "../redux/store";
import { useDispatch } from "react-redux";
import { countActions } from '../redux/slices/lifesCountSlice';
import LifeGame from "./LifeGame";
import Input from "./common/Input";
import InputResult from "../model/InputResult";

const Lifes: React.FC = () => {
    const [showFlag, setShowFlag] = useState<boolean>(false);

    function checkInput(input: string): InputResult {
        const inNum = parseInt(input);
        if (inNum < 1 || inNum > 5) return {status: "error", message: "Number should be in range 1..5"};
        dispatch(countActions.setCount(inNum));
        setShowFlag(true);
        return {status: "success"};
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(countActions.setCount(0));
    }, []);
    const flexDirection = useSelectorDirection();
    const count = useSelectorCount();

    return showFlag ? 
        <section style={{display: "flex", flexDirection, alignItems: "center", justifyContent: "space-around", height: "100vh"}}>
            {Array.from({length: count}).map(_ => <LifeGame/>)}
        </section> : 
        <Input placeholder="Enter number of games from 1 to 5" buttonTitle="Go!" type="number" submitFn={checkInput}/>
}
export default Lifes;



