import * as React from 'react';
//import { scaleTime } from 'd3-scale';
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { TooltipRail, Handle, Track } from './components';
import { startOfToday, startOfYesterday, isValid } from "date-fns";

type TimeSliderProps = {
    txnDateLB: Date
};

export default function TimeSlider({ txnDateLB } : TimeSliderProps){
    const today = startOfToday();
    const [selected, setSelected] = React.useState(today);
    const [updated, setUpdated] = React.useState(today);

    const [min, setMin] = React.useState(startOfYesterday());
    const [railHover, setRailHover] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);

    const oneDay = 1000 * 86400;

    const onUpdate = (([newTime]: readonly number[]) => {
        var newDate = new Date(newTime)
        setUpdated(newDate)
    });

    const onChange = (([newTime]: readonly number[]) => {
        var newDate = new Date(newTime)
        setSelected(newDate)
    });

    // Passing this function down to the TooltipRail as a prop so I can keep track of the non-active 
    // hover state because I do not want to display above the Handle when the user is 
    // freely hovering over the slider.
    // This is so I can render the date above the Handle when the user is not 
    // interacting with the slider, but not when they are free-hovering.
    // That way the user can view the date selected on the slider without interacting with it.
    const passRailHover = ((hoverState: boolean) => {
        setRailHover(hoverState)
    });

    //const dateTicks = scaleTime()
    //    .domain([min, max])
    //    .ticks(8)

    // Passing in txnDateLB, then calculating min and disabled state based off that.
    // I need to set a min even if disabled because Slider does not accept 
    // domain with min >= max. That is why min is being kept inside this component 
    // and separated from txnDateLB so it will not affect anything outside the disabled slider.
    React.useEffect(() => {
        if(isValid(txnDateLB)) {
            console.log("This will be the new min: " + txnDateLB)
            console.log("setting disabled to false!")
            setMin(txnDateLB)
            setDisabled(false)
        } else{
            console.log("Invalid txnDateLB!")
            console.log("setting disabled to true!")
            setMin(startOfYesterday())
            setDisabled(true)
        }
    }, [txnDateLB]);

    const sliderStyle = {
        position: 'relative',
        width: '100%',
    };

    // React Compound Slider uses FaCC (Function as a Child Component) pattern 
    // <Rail></Rail> extends from the RailProps interface which defines the children
    // prop as a function that takes in a RailObject and returns a ReactNode element. 
    // In regular JS, without types, you would add a propType to children and require
    // it to be a function.

    // I use shorthand for addressing RailProps since I don't need to interact directly
    // with the props passed into TooltipRail unlike with Handle where I need to use 
    // activeHandleID
    return (
        <div className="flex flex-row w-5/6 items-center z-20">
            <Slider
                mode={1}
                step={oneDay}
                domain={[+min, +today]}
                rootStyle={sliderStyle}
                onUpdate={onUpdate}
                onChange={onChange}
                values={[+selected]}
                disabled={disabled}
            >
                <Rail>
                    {(railProps) => (
                        <TooltipRail
                            {...railProps}
                            passRailHover={passRailHover}
                            disabled={disabled}
                        />
                    )}
                </Rail>
                <Handles>
                    {({ handles, activeHandleID, getHandleProps }) => (
                    <div className="slider-handles">
                        {handles.map(handle => (
                            <Handle
                                key={handle.id}
                                handle={handle}
                                domain={[+min, +today]}
                                isActive={handle.id === activeHandleID}
                                railHover={railHover}
                                disabled={disabled}
                                getHandleProps={getHandleProps}
                            />
                        ))}
                    </div>
                    )}
                </Handles>
            </Slider>
        </div>
    )
};