import React from "react";
import inputClasses from "./Input.module.css";
import classes from "./Textarea.module.css";

const Textarea = React.forwardRef((props:any, ref) => {
    return (
        // @ts-ignore
        <textarea value={props.value} defaultValue={props.defaultValue} type={props.type || "text"} ref={ref} onChange={props.onChange} maxLength={props.maxLength} placeholder={props.placeholder || "debiluZapomniałeśWpisać"} className={props.className === "alternate" ? classes.input + " " + inputClasses.alternate : classes.input + " " + inputClasses.default} />
    )
});

export default Textarea;