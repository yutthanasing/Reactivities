import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Segment } from 'semantic-ui-react';

export default function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Header as='h1' inverted>
                <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginButtom: 12 }} />
                Reactivities
            </Header>
            <Header as='h2' inverted content='Welcome to Reactivities' />
            <Button as={Link} to='/activities' size='huge' inverted >
                Take me to the Activities!
            </Button>
        </Segment>
    )
}