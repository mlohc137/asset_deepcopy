import * as React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { ExtendedDataEntry } from 'react-minimal-pie-chart/types/commonTypes';
import ChartLabel from '../ChartLabel';

// Not using am4charts since not very well integrated into NextJS
// NextJS does server side rendering and I would have to make a separate 
// component and deactivate SSR since amCharts code is not run on the server.
// Will try to do it with react-vis library.

type FolioChartProps = {
    data: React.ComponentProps<typeof PieChart>['data'];
};

type LabelProps = {
    title: string,
    value: number,
    color: string,
    units: number,
    href: string,
    fiat: number
}

export default function FolioChart({ data }: FolioChartProps ) {
    const [subData, setSubData] = React.useState([]);
    const [labelProps, setLabelProps] = React.useState<LabelProps>({title: "N/A", value: 0, color: "", units: 0, href: "/information.png", fiat: 0});
    //const [selected, setSelected] = React.useState<number | undefined>(0);
    const [hovered, setHovered] = React.useState<number | undefined>(undefined);

    const currData = data.map((entry, i) => {
        if (hovered === i) {
            return {
                ...entry,
                color: 'grey',
            };
        }
        return entry;
    });

    const hoverHelper = (index: number | undefined) => {
        setHovered(index)
        if (typeof index === "number") {
            setLabelProps({
                title: String(data[index].title), 
                value: Number(data[index].value),
                color: String(data[index].color),
                units: Number(data[index].units),
                href: String(data[index].href),
                fiat: Number(data[index].fiat)
            })
        } 
    }
    /*
    const labelBuilder = (dataEntry: ExtendedDataEntry) => {
        return (
            <foreignObject>
                <div className="grid grid-rows-4 grid-cols-6">
                    <div className="row-span-2 col-span-3 text-white">100</div>
                    <div className="row-span-1 col-span-1 text-white">0/100</div>
                    <div className="row-span-1 col-span-1 text-white">%</div>
                    <div className="row-span-1 col-span-2 text-white">1</div>
                    <div className="row-span-1 col-span-2 text-white">BTC</div>
                    <div className="row-span-2 col-span-6 text-white">$39000</div>
                </div>
            </foreignObject>
        )
    }
    */
    return (
        <React.Fragment>
            <PieChart
                data={currData}
                lineWidth={15} 
                //rounded
                radius={PieChart.defaultProps.radius}
                segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                paddingAngle={4}
                /*
                onClick={(event, index) => {
                    console.log('CLICK', { event, index });
                    setSelected(index === selected ? undefined : index);
                }}
                */
                /*
                label={({ dataEntry }) => {
                    return labelBuilder(dataEntry)
                }}
                labelPosition={0}
                */
                onMouseOver={(_, index) => {
                    hoverHelper(index);
                }}
                onMouseOut={() => {
                    hoverHelper(undefined);
                }}
            >
            </PieChart>
            <ChartLabel {...labelProps}></ChartLabel>
        </React.Fragment>
    );
}
