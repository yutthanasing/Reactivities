import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Header as='h1' inverted>
                <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginButtom: 12 }} />
                Reactivities
            </Header>
            {userStore.isLogedIn ? (         
                <div>
                <Header as='h2' inverted content='Welcome to Reactivities'  />
                    <Button as={Link} to='/activities' size='huge' inverted >
                        Go to activities!
                    </Button>
                </div>
            ) : (
                <div>
                    <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                            Login!
                    </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                            Register!
                    </Button>
                </div>
               
            )}
        </Segment>
    )
})