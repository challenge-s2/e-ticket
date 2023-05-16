import React from 'react';
import styles from "./BlockText.module.scss";


const BlockText = ({title, text, align}) => {
    return (
        <>
           <div className={styles.container} data-align={align}>
            <h1>{title}</h1>
            <p>{text}</p>
           </div>
        </>
    )
}

export default BlockText;
