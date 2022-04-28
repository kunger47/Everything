export default class LiftingWorkout {
    id: number = 0;
    name: string | null = null;
    date: Date | null = null;
    notes: string = '';
    liftSetLinks: SimpleLiftSetLink[] = [];

    constructor(init?: Partial<LiftingWorkout>) {
        Object.assign(this, init);
    }
}

export class SimpleLiftSetLink {
    id: number = 0;
    name: string | null = null;

    constructor(init?: Partial<SimpleLiftSetLink>) {
        Object.assign(this, init);
    }
}