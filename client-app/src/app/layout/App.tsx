import React from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/Form/ActivityForm';
import ActivityDetails from '../../features/activities/Detail/ActivityDetails';


function App() {  
  const location = useLocation();

  return (
    <>
      <Route exact path='/' component={HomePage}/>
      <Route 
        path ={'/(.+)'}
        render = {() => (
          <>
            <NavBar/> 
          <Container style={{marginTop:"7em"}}>  
            <Route exact path='/activities' component={ActivitiesDashboard}/>
            <Route path='/activities/:id' component={ActivityDetails}/>
            <Route key = {location.key} path={['/createActivity','/manage/:id']} component={ActivityForm}/>
          </Container>  
          </>
        )}
      />           
    </>
  );
}

export default observer(App);
