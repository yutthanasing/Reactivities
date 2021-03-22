import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';

export default observer(function ActivitiesDashboard(){

    const {activityStore} = useStore();
    const {loadingActivities, activityRegistry} = activityStore;

    useEffect(() => {
        if(activityRegistry.size <= 1) loadingActivities();
    }, [activityRegistry.size, loadingActivities]);

    if(activityStore.loadingInitial) return <LoadingComponent content = 'Loading app'/>

    return(
        <Grid>
            <Grid.Column width="10">
                <ActivityList />
            </Grid.Column>
            <Grid.Column width="6">
               <h2>Activity filtels</h2>
            </Grid.Column>
        </Grid>
    )
})