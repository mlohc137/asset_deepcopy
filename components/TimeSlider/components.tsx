import React from "react";
import { format } from "date-fns";
import { SliderItem, GetEventData, GetRailProps, GetTrackProps, GetHandleProps } from 'react-compound-slider';

// *******************************************************
// TOOLTIP RAIL
// *******************************************************
const railStyle = {
    position: 'absolute' as 'absolute',
    width: '100%',
    transform: 'translate(0%, -50%)',
    height: 40,
    cursor: 'pointer',
    zIndex: 20,
};

const railCenterStyle = {
    position: 'absolute' as 'absolute',
    width: '100%',
    transform: 'translate(0%, -50%)',
    height: 14,
    borderRadius: 7,
    cursor: 'pointer',
    pointerEvents: 'none' as 'none',
    backgroundColor: 'rgb(14, 116, 144)',
};


interface TooltipRailProps {
    activeHandleID: string;
    getRailProps: GetRailProps;
    getEventData: GetEventData;
    passRailHover: (hoverState: boolean) => void;
    disabled?: boolean;
  }
  

export class TooltipRail extends React.Component<TooltipRailProps> {
    state = {
      value: 0,
      percent: 0,
    };

    onMouseEnter = () => {
      document.addEventListener('mousemove', this.onMouseMove);
    };
  
    onMouseLeave = () => {
      this.setState({ value: 0, percent: 0 });
      const { passRailHover } = this.props;
      passRailHover(false)
      document.removeEventListener('mousemove', this.onMouseMove);
    };
    
    // getEventData returns the value and percent of the rail location
    // activeHandleID to determine if handle is currently active
    // If slider is disabled, do not display free-roam tooltip
    onMouseMove = (e: MouseEvent) => {
      const { activeHandleID, getEventData, passRailHover, disabled } = this.props;
      if (activeHandleID) {
        passRailHover(false)
        this.setState({ value: 0, percent: 0 });
      } 
      else {
        if(!disabled) {
            passRailHover(true)
            this.setState(getEventData(e));
        }
      }
    };
  
    render() {
      const { value, percent } = this.state;
      const { activeHandleID, getRailProps, disabled } = this.props;
      return (
        <React.Fragment>
          {!activeHandleID && value && !disabled ? (
            <div
              style={{
                left: `${percent}%`,
                position: 'absolute',
                marginLeft: '-53px',
                marginTop: '-35px',
              }}
            >
                <div className="relative shadow-md">
                    <div className="bg-black -mt-2 text-white truncate text-xs rounded py-1 px-4">{format(value, "MMM dd yyyy")}</div>
                    <svg className="absolute text-black w-full h-2 left-0 top-100" x="0px" y="0px" viewBox="0 0 255 255">
                        <polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon>
                    </svg>
                </div>
            </div>
          ) : null}
          <div
            style={railStyle}
            {...getRailProps({
              onMouseEnter: this.onMouseEnter,
              onMouseLeave: this.onMouseLeave,
            })}
          />
          <div style={railCenterStyle} />
        </React.Fragment>
      );
    }
  }
  
  // *******************************************************
  // HANDLE COMPONENT
  // *******************************************************
  interface HandleProps {
    isActive: boolean;
    domain: number[];
    handle: SliderItem;
    getHandleProps: GetHandleProps;
    railHover: boolean;
    disabled?: boolean;
  }
  
  export class Handle extends React.Component<HandleProps> {
  
    render() {
      const {
        domain: [min, max],
        handle: { id, value, percent },
        isActive,
        disabled,
        railHover,
        getHandleProps,
      } = this.props;
      
      return (
        <React.Fragment>
          {!railHover ? (
            <div
              style={{
                left: `${percent}%`,
                position: 'absolute',
                marginLeft: '-53px',
                marginTop: '-35px',
              }}
            >
              <div className="relative shadow-md">
                <div className="bg-cyan-800 -mt-2 text-white truncate text-xs rounded py-1 px-4">{format(value, "MMM dd yyyy")}</div>
                <svg className="absolute text-black w-full h-2 left-0 top-100" x="0px" y="0px" viewBox="0 0 255 255">
                    <polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon>
                </svg>
              </div>
            </div>
          ) : null}
          <div
            style={{
              left: `${percent}%`,
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              WebkitTapHighlightColor: 'rgba(0,0,0,0)',
              zIndex: 40,
              width: 26,
              height: 42,
              cursor: 'pointer',
              backgroundColor: 'none',
            }}
            {...getHandleProps(id)}
          />
          <div
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            style={{
              left: `${percent}%`,
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              WebkitTapHighlightColor: 'rgba(0,0,0,0)',
              zIndex: 30,
              width: 24,
              height: 24,
              border: 0,
              borderRadius: '50%',
              boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
              backgroundColor: disabled ? '#666' : '#009688',
            }}
          />
        </React.Fragment>
      );
    }
  }

  // *******************************************************
  // TRACK COMPONENT
  // *******************************************************
  interface TrackProps {
    source: SliderItem;
    target: SliderItem;
    getTrackProps: GetTrackProps;
    disabled?: boolean;
  }
  
  export const Track: React.FC<TrackProps> = ({
    source,
    target,
    getTrackProps,
    disabled,
  }) => {
    return (
      <div
        style={{
          position: 'absolute',
          transform: 'translate(0%, -50%)',
          height: 14,
          zIndex: 1,
          backgroundColor: disabled ? '#999' : '#6d4b51',
          borderRadius: 7,
          cursor: 'pointer',
          left: `${source.percent}%`,
          width: `${target.percent - source.percent}%`,
        }}
        {...getTrackProps()}
      />
    );
  };
  
  // *******************************************************
  // TICK COMPONENT
  // *******************************************************
  interface TickProps {
    tick: SliderItem;
    count: number;
    format?: (val: number) => string;
  }
  
  export const Tick: React.FC<TickProps> = ({ tick, count, format = d => d }) => {
    return (
      <div>
        <div
          style={{
            position: 'absolute',
            marginTop: 17,
            width: 1,
            height: 5,
            backgroundColor: 'rgb(200,200,200)',
            left: `${tick.percent}%`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            marginTop: 25,
            fontSize: 10,
            textAlign: 'center',
            marginLeft: `${-(100 / count) / 2}%`,
            width: `${100 / count}%`,
            left: `${tick.percent}%`,
          }}
        >
          {format(tick.value)}
        </div>
      </div>
    );
  };

