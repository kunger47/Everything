import Lift from "models/lifting/Lift";
import LiftSet from "models/lifting/LiftSet";
import LiftDayPlan from "models/lifting/LiftDayPlan";
import MuscleGroup from "models/lifting/MuscleGroup";
import Api from "../api";
import { getDateURLFormat } from "../date";
import LiftingWorkout from "models/lifting/LiftingWorkout";
import LiftSetLink from "models/lifting/LiftSetLink";

class LiftingApi {
    //Lifts
    getLifts(onSuccess: (result: Lift[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/lifts`, onSuccess });
    }

    getLiftsForGroup(groupId: number, onSuccess: (result: Lift[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/lifts/musclegroup/${groupId}`, onSuccess });
    }

    getLiftsForPlan(planId: number, onSuccess: (result: Lift[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/lifts/plan/${planId}`, onSuccess });
    }

    updateLift(data: Lift, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/lifts`, body: data, onSuccess });
    }

    //Muscle Groups
    getAllMuscleGroups(onSuccess: (result: MuscleGroup[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/musclegroups`, onSuccess });
    }

    getMuscleGroupsForPlan(planId: number, onSuccess: (result: MuscleGroup[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/musclegroups/${planId}`, onSuccess });
    }

    //Day Plans
    getLiftDayPlans(onSuccess: (result: LiftDayPlan[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/liftdayplans`, onSuccess });
    }

    //Sets
    getLiftSetRecordsForDate(liftId: number, date: Date, onSuccess: (result: LiftSet[]) => void) {
        let dateForUrl = getDateURLFormat(date);
        return Api.callApi({ url: `https://localhost:44340/liftsets/${liftId}/${dateForUrl}`, onSuccess });
    }

    createLiftSetRecord(data: LiftSet, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/liftsets`, body: data, onSuccess });
    }

    updateLiftSetRecord(data: LiftSet, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/liftsets`, body: data, onSuccess });
    }

    deleteLiftSetRecord(setId: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/liftsets/${setId}`, onSuccess });
    }

    //LiftSetLinks
    getLiftSetLink(linkId: number, onSuccess: (result: LiftSetLink) => void) {
        return Api.callApi({ url: `https://localhost:44340/liftsetlinks/${linkId}`, onSuccess });
    }

    //Workouts
    getLiftingWorkoutsForDate(date: Date, onSuccess: (result: LiftingWorkout[]) => void) {
        let dateForUrl = getDateURLFormat(date);
        return Api.callApi({ url: `https://localhost:44340/liftingworkouts/${dateForUrl}`, onSuccess });
    }

    getLiftingWorkout(id: number, onSuccess: (result: LiftingWorkout) => void) {
        return Api.callApi({ url: `https://localhost:44340/liftingworkouts/${id}`, onSuccess });
    }

    createLiftingWorkout(liftDayPlanId: number, data: LiftingWorkout, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/liftingworkouts/${liftDayPlanId}`, body: data, onSuccess });
    }
}

export default new LiftingApi();