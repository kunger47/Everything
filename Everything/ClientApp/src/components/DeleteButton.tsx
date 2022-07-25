import React from 'react';

interface Props {
    onClick: () => void;
}

const DeleteButton = (props: Props) => {
    return (
        <span className="e-pull-right e-delete-icon" onClick={props.onClick}>X</span>
    )
};

export default DeleteButton;