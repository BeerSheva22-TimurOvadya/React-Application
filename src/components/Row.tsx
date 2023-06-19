import { ReactNode } from 'react';
import lifeConfig from '../config/life-game-config.json';

const { dimension } = lifeConfig;
const cellSize = 400 / dimension;  

const Row: React.FC<{ row: number[] }> = ({ row }) => {

    function getDivs(): ReactNode {
        return row.map((num, index) => (
            <div
                key={index}
                style={{ 
                    width: cellSize, 
                    height: cellSize, 
                    backgroundColor: num ? 'black' : 'white', 
                    border: 'solid 1px gray'
                }}
            ></div>
        ));
    }
    return <section style={{ display: 'flex' }}> {getDivs()} </section>;
};

export default Row;
