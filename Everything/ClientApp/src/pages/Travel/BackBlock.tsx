import React, { useState } from 'react';
import { Col } from 'react-bootstrap';

interface Props {
    previousFolder: () => void;
}

const BackBlock = (props: Props) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    return (
        <Col sm={3} className='e-travel-page-block e-back-block'
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={props.previousFolder}>
            <span>
                <p className="e-board-name">{"<-"}</p>
            </span>
        </Col>
    )
}

export default BackBlock;