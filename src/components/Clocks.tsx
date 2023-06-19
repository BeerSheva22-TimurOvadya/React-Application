import { useState, useEffect } from "react";
import { Clock } from "./Clock"
import internal from "stream";

const Clocks:React.FC = () => {
    const [time, setTime] = useState<Date>(new Date())
    useEffect(() => {
        console.log("mouting of Clocks")
        const intervalId = setInterval(() => {
       setTime(new Date());
      console.log("interval")
   }, 1000 );
   return () => { console.log("unmouting of Clocks")
    clearInterval(intervalId)
}
   }, [])
    return <div style={{display: 'flex',
     flexDirection: 'row', justifyContent: 'space-around'}}>
       <Clock time={time} cityCountry="London" />
       <Clock time={time} cityCountry="Toronto"/>
    </div>
}
export default Clocks