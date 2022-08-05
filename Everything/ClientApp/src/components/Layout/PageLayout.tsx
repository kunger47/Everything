import React, { PropsWithChildren } from 'react';
import TitleBar from 'components/Layout/TitleBar';
import { Container, Row } from 'react-bootstrap';
import './PageLayout.scss';

interface Props extends PropsWithChildren<any> {
    classNameExtension: string;

    title?: string | null;
    titlePlaceholder?: string;
    saveUpdate?: (newValue: string) => void;
}

const Page = (props: Props) => {
    return (
        <Container className={`e-page-container e-page-${props.classNameExtension.replaceAll(' ', '-').toLowerCase()}`}>
            <TitleBar title={props.title} titlePlaceholder={props.titlePlaceholder} saveUpdate={props.saveUpdate} />
            <Row className="e-page-content">
                {props.children}
            </Row>
        </Container>
    )
}

export default Page;