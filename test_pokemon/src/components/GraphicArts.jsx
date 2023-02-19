import React, {useState, useEffect, useMemo} from 'react';
import { Line } from '@ant-design/plots';


const GraphicArts = ({pokemons}) => {


    const data = useMemo(() => {
        return pokemons.map(({order, id},index) => ({index, order}) )
    },[pokemons]);
    const config = {
        data,
        xField: 'index',
        yField: 'order',
        label: {},
        point: {
            size: 5,
            shape: 'diamond',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
        tooltip: {
            showMarkers: false,
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'marker-active',
            },
        ],
    };
    return <Line {...config} />;
};

export default GraphicArts;