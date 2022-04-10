export default class MuscleGroup {
    id: number = 0;
    name: string | null = null;

    constructor(init?: Partial<MuscleGroup>) {
        Object.assign(this, init);
    }
}