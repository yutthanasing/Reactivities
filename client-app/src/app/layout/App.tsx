import React,{useEffect} from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {
  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadingActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial) return <LoadingComponent content = 'Loading app'/>

  return (
    <div>
      <NavBar/> 

      <Container style={{marginTop:"7em"}}>      
        <ActivitiesDashboard />
      </Container>        
        
    </div>
  );
}

export default observer(App);
