import { useState, useEffect } from 'react';
import { Clock } from './Clock';

type Props = {
    cities: string[];
}

const Clocks: React.FC<Props> = ({ cities }) => {
    const [time, setTime] = useState<Date>(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            {cities.map((city) => (
                <Clock key={city} time={time} cityCountry={city} />
            ))}
        </div>
    );
};
export default Clocks;
