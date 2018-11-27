import React from 'react'
import classes from './LeftMenu.css'

const LeftMenu = props => {
    const cls = [
        classes.LeftMenu
    ];

    if(props.isOpen){
        cls.push(classes.green);
    }

    return(
        <div>
            <button className={cls.join(' ')} role='button' onClick={props.onToggle}>
                Click Here
            </button>
        </div>
         )
};

export default LeftMenu