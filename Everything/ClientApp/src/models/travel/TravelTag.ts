export default class TravelTag {
    id: number = 0;
    name: string | null = null;
    description: string = '';
    isActive: boolean = false;
    // sequence: number = 0;

    constructor(init?: Partial<TravelTag>) {
        Object.assign(this, init);
    }
}