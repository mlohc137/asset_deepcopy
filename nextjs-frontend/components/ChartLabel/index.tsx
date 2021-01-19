import numeral from 'numeral';
import React, {useRef, useState, useEffect} from 'react'

type LabelProps = {
    title: string,
    value: number,
    color: string,
    units: number,
    href: string,
    fiat: number
}

export default function ChartLabel({ title, value, color, units, href, fiat }: LabelProps ) {
    const [intLabel, setIntLabel] = useState(100);
    const [decLabel, setDecLabel] = useState("0");
    const [unitLabel, setUnitLabel] = useState("0")
    const [fiatLabel, setFiatLabel] = useState("0")

    useEffect(() => {
        let decPlace = value % 1
        decPlace = decPlace * 100
        setDecLabel(decPlace.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}))
        setIntLabel(Math.floor(value))
    }, [value]);

    useEffect(() => {
        let number = numeral(units)
        setUnitLabel(number.format('0[.]00a'))
    }, [units]);

    useEffect(() => {
        let number = numeral(fiat)
        setFiatLabel(number.format('0[.]00a'))
    }, [fiat]);
    
    return (
        <div className="absolute top-1/3 bottom-1/3 left-1/4 w-1/2 h-1/3">
            <div className="grid grid-cols-2 grid-rows-3 gap-y-0 justify-center bg-cyan-700 shadow-lg rounded-lg w-full h-full">
                <div className="col-span-1 row-span-3 p-4">
                    <div className="grid grid-flow-row-dense w-full h-full">
                        <div className="row-span-1 h-5"></div>
                        <div className="row-span-4 my-auto">
                            <img className="border-white border-2 rounded-full" src={href}/>
                        </div>
                        <div className="row-span-1 h-5"></div>
                    </div>
                </div>
                <div className="col-span-1 row-span-1 p-4 items-center">
                    <span className="grid grid-cols-3">
                        <h3 className="col-span-2 justify-self-end font-bold">{unitLabel}</h3>
                        <h4 className="col-span-1 justify-self-end font-mono">{title}</h4>
                    </span>
                </div>
                <div className="col-span-1 row-span-1 p-4 items-center min-w-max justify-self-end">
                    <span className="grid grid-cols-2">
                        <h1 className="col-span-1 -mt-2 -mr-2 font-bold tabular-nums text-5xl">{intLabel}</h1>
                        <div className="col-span-1 grid grid-rows-2">
                            <h4 className="row-span-1 -mt-3 mr-2 justify-self-end font-bold tabular-nums">.{decLabel}</h4>
                            <h1 className="row-span-1 -mt-4 mr-2 justify-self-end font-bold">%</h1>
                        </div>
                    </span>
                </div>
                <div className="col-span-1 row-span-1 p-4 justify-self-end">
                    <h3 className="font-bold">~${fiatLabel}</h3>
                </div>
            </div>
        </div>
    )
}