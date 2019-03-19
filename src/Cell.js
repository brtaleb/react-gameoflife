import React from 'react'

const Cell = ({size, x, y, isActive, onClick}) => {
    const styles = {
        width: size-1,
        height: size-1,
        position: 'absolute',
        top: y,
        left: x,
        backgroundColor: '#aaa',
        opacity: isActive ? 1 : 0
    }

    return (
        <div style={styles} onClick={onClick}>

        </div>
    )
};
export default Cell;