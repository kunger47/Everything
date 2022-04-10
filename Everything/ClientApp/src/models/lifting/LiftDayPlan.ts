export default class LiftDayPlan {
    id: number = 0;
    name: string | null = null;
    dateCreated: Date | null = null;

    constructor(init?: Partial<LiftDayPlan>) {
        Object.assign(this, init);
    }
}