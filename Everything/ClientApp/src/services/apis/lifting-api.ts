import Lift from "models/lifting/Lift";
import LiftSet from "models/lifting/LiftSet";
import LiftDayPlan from "models/lifting/LiftDayPlan";
import MuscleGroup from "models/lifting/MuscleGroup";
import Api from "../api";
import { getDateURLFormat } from "../date";

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
}

export default new LiftingApi();