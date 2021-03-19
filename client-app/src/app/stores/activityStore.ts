import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';

export default class ActivityStore{
    //activities : Activity[] = [];
    activityRegistry = new Map<string, Activity>();
    selectedActivity : Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadingActivities = async () =>{        
        try{
            const activities = await agent.Activies.list();            
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activityRegistry.set(activity.id, activity);
            }) 
            this.setLoadingInitial(false);           
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);           
        }
    }

    setLoadingInitial = (state : boolean) =>{
        this.loadingInitial = state;
    }

    selectActivity = (id : string) =>{
        this.selectedActivity = this.activityRegistry.get(id);// this.activities.find(x => x.id === id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id? : string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity : Activity) =>{
        this.loading = true;
        activity.id = uuid();
        try{
            await agent.Activies.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                //this.activities.push(activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity : Activity) => {
        this.loading = true;
        try{
            await agent.Activies.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                //this.activities = [...this.activities.filter(x => x.id !== activity.id),activity];
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });

        }catch(error){
            console.log(error);
            runInAction(() =>{
                this.loading = false;
            })
        }

    }

    deleteActivity = async (id : string) => {
        this.loading = true;
        try{
            await agent.Activies.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                //this.activities = [...this.activities.filter(x => x.id !== id)];
                if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false;
            })

        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}