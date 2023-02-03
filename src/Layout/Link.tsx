import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Link.module.css';

const LinkSection = (props: {elements: {destination: string, label: string, icon: any}[]}) => {
    return (
        <>
        <ul className={classes.linkList}>
        {
            props.elements.map((item) => {
                return (
                <li>
                    <NavLink to={item.destination} className={classes.link} style={({ isActive }) => isActive ? {color: 'red'} : {color: 'var(--add2-500)'}}>
                        <span className={classes.linkIcon}>{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                </li>)
            })
        }
        </ul>
        </>
    )
}

export default LinkSection;