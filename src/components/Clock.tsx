type Props = {
    time: Date;
    timeZone: string;
};

export const Clock: React.FC<Props> = ({ time, timeZone }) => {
    const timeStr = time.toLocaleTimeString(undefined, { timeZone });

    return (
        <div>
            <header>Time in {timeZone}</header>
            <p>{timeStr}</p>
        </div>
    );
};
