export default class TravelTag {
    id: number = 0;
    name: string = '';
    description: string = '';
    isActive: boolean = false;
    colorHexCode: string | null = null;

    constructor(init?: Partial<TravelTag>) {
        Object.assign(this, init);
    }
}