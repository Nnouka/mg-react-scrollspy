import React, {useEffect, useRef, useState} from "react";
export const TriggerMode = {
    IN: 'in',
    OUT: 'out',
    BOTH: 'both'
}
export const ScrollMode = {
    UP: 'up',
    DOWN: 'down'
}
export function Spy({render, triggerMode = 'in', thresholdDown = 15, thresholdUp = 15}) {
    const ref = useRef();
    const [triggerIn, setTriggerIn] = useState(false);
    const [triggerOut, setTriggerOut] = useState(false);
    const [axisLength, setAxisLength] = useState(window.innerHeight);
    const [scrollMode, setScrollMode] = useState('down');
    let scrollTop = 0;
    const getScrollMode = (prev, curr) => {
        return prev > curr ? ScrollMode.UP : ScrollMode.DOWN;
    }
    const spy = (event) => {
        const rec = ref.current.getBoundingClientRect();
        let isInside = rec.top <= axisLength - thresholdDown;
        let isOutSide = rec.bottom >= axisLength - thresholdUp;
        if(event) {
            const topH = event.target.documentElement.scrollTop;
            setScrollMode(getScrollMode(scrollTop, topH));
            scrollTop  = topH;
        }
        // scroll down scrollTop increases
        // scroll up scrollTop decreases
        // reveal in , scrolling down and rec.top <= axisLength - threshold
        // reveal out, scrolling up and rec.top >= axisLength - threshold
        if (triggerMode === TriggerMode.IN || triggerMode === TriggerMode.BOTH) {
            setTriggerIn(isInside);
        }
        if (triggerMode === TriggerMode.OUT || triggerMode === TriggerMode.BOTH) {
            setTriggerOut(isOutSide);
        }
    }
    const resize = () => {
        setAxisLength(window.innerHeight);
    }
    useEffect(
        () => {
            setAxisLength(window.innerHeight);
            spy();
            window.addEventListener("scroll", spy);
            window.addEventListener("resize", resize);
            return () => {
                window.removeEventListener("scroll", spy);
                window.removeEventListener("resize", resize);
            }
        }, [triggerIn, triggerOut, axisLength]
    );

    return (
        <div ref={ref} >
            {
                render ? render({triggerIn, triggerOut, scrollMode}) : ''
            }
        </div>
    );
}

