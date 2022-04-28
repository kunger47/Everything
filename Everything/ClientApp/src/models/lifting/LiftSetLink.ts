import Lift from "./Lift";
import LiftSet from "./LiftSet";

export default class LiftSetLink {
    id: number = 0;
    notes: string | null = null;
    sets: LiftSet[] = [];
    lift: Lift | null = null;

    constructor(init?: Partial<LiftSetLink>) {
        Object.assign(this, init);
    }
}