export default class Lift {
    id: number = 0;
    name: string | null = null;
    dateCreated: Date | null = null;
    description: string = '';
    videoLink: string = '';

    constructor(init?: Partial<Lift>) {
        Object.assign(this, init);
    }
}