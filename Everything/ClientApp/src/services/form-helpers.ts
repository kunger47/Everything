export const handleRawInputChange = <T extends unknown>([objectToUpdate, setterForObject]: [T, React.Dispatch<React.SetStateAction<any>>], inputName: keyof T) => (newValue: any) => {
    let updates = JSON.parse(JSON.stringify(objectToUpdate));
    updates[inputName] = newValue;
    setterForObject(updates);
};

export const handleRawInputChangeInArray = <T extends unknown>(objectId: number, objects: T[], setterForArray: React.Dispatch<React.SetStateAction<any>>, inputName: keyof T) => (newValue: any) => {
    let indexOfChange = objects.findIndex(c => (c as any).id === objectId);
    if (indexOfChange > -1) {
        let updates = JSON.parse(JSON.stringify(objects));
        updates[indexOfChange][inputName] = newValue;
        setterForArray(updates);
    }
};

export const handleRawInputChangeInArrayGivenPath = <T extends unknown>(objectId: number, objectIdName: keyof T, objects: any, setterForArray: React.Dispatch<React.SetStateAction<any>>, inputPath: string[], inputName: keyof T) => (newValue: any) => {

    let updates = JSON.parse(JSON.stringify(objects));
    let toUpdate = updates;
    inputPath.forEach((property) => {
        toUpdate = toUpdate[property];
    });
    let indexOfChange = toUpdate.findIndex((c: any) => c[objectIdName] === objectId);
    if (indexOfChange > -1) {
        toUpdate[indexOfChange][inputName] = newValue;
        setterForArray(updates);
    }
};

export const handleRawInputChangeGivenPath = ([objectToUpdate, setterForObject]: [any, React.Dispatch<React.SetStateAction<any>>], inputPath: string[], inputName: string) => (newValue: any) => {
    let updates = JSON.parse(JSON.stringify(objectToUpdate));
    let toUpdate = updates;
    inputPath.forEach((property) => {
        toUpdate = toUpdate[property];
    });
    toUpdate[inputName] = newValue;
    setterForObject(updates);
};