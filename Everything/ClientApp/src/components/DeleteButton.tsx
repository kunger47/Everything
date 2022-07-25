import React from 'react';

interface Props {
    onClick: () => void;

    className?: string;
}

const DeleteButton = (props: Props) => {
    return (
        <span className={`${props.className ?? ''} e-delete-icon`} onClick={props.onClick}>X</span>
    )
};

export default DeleteButton;