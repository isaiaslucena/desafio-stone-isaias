import React from 'react';
import Row from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';

export default class LeftSideMenu extends React.Component {
    render() {
        return(
            <Row>
                <ButtonToolbar>
                    <Button variant="primary">Left Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="info">Info</Button>
                    <Button variant="light">Light</Button>
                    <Button variant="dark">Dark</Button>
                    <Button variant="link">Link</Button>
                </ButtonToolbar>
            </Row>
        );        
    }
}