/* eslint-disable @typescript-eslint/no-unused-vars */




import { useState, useEffect } from 'react';
import { Clock } from './Clock';
import timeZones from '../time-zones';

const Clocks: React.FC = () => {       
    const [time, setTime] = useState<string>(new Date().toLocaleTimeString('en-US', {timeZone: 'Asia/Jerusalem'}));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(() => new Date().toLocaleTimeString('en-US', {timeZone: 'Asia/Jerusalem'}));
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const requiredTimeZones = ['Asia/Dushanbe', 'Asia/Shanghai', 'Europe/Paris', 'Asia/Tokyo'];
    const selectedZones = requiredTimeZones.map(zone => {
        const found = timeZones.find(tz => tz.name === zone);
        return found ? found.name : 'Asia/Jerusalem';
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            {selectedZones.map((zone) => (
                <Clock  time={new Date()} timeZone={zone} />
            ))}
        </div>
    );
};

export default Clocks;
