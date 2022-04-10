import React, { PropsWithChildren } from 'react';
import TitleBar from 'components/Layout/TitleBar';
import { Container, Row } from 'react-bootstrap';

interface Props extends PropsWithChildren<any> {
    title?: string;
    classNameExtension: string;
    saveUpdate?: (newValue: string) => void;
}

const Page = (props: Props) => {
    return (
        <Container className={`e-page-${props.classNameExtension.replaceAll(' ', '-').toLowerCase()}`}>
            {/* TODO: Sticky header */}
            <TitleBar title={props.title} saveUpdate={props.saveUpdate} />
            <Row className="e-page-content">
                {props.children}
            </Row>
        </Container>
    )
}

export default Page;