export default class LiftSet {
    id?: number = 0;
    liftId?: number | null = null;
    date: Date | string = new Date();
    number: number | null = null;
    reps: number | null = null;
    weight: number | null = null;

    constructor(init?: Partial<LiftSet>) {
        Object.assign(this, init);
    }
}