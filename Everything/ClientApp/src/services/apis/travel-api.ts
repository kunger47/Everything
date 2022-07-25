import PackingItem from "models/travel/PackingItem";
import TravelTag from "models/travel/TravelTag";
import Api from "../api";

class TravelApi {
    //Folder
    // createFolder(data: TravelFolder, onSuccess: () => void) {
    //     return Api.post({ url: `https://localhost:44340/travelfolders`, body: data, onSuccess });
    // }

    // getFoldersForFolder(folderId: number | null, onSuccess: (result: TravelFolder[]) => void) {
    //     return Api.callApi({ url: `https://localhost:44340/travelfolders/forfolder/${folderId}`, onSuccess });
    // }

    // updateFolder(data: TravelFolder, onSuccess: () => void) {
    //     return Api.put({ url: `https://localhost:44340/travelfolders`, body: data, onSuccess });
    // }

    // removeFolder(folderId: number, onSuccess: () => void) {
    //     return Api.delete({ url: `https://localhost:44340/travelfolders/${folderId}`, onSuccess });
    // }

    //Trip
    // createTrip(data: Trip, onSuccess: () => void) {
    //     return Api.post({ url: `https://localhost:44340/trips`, body: data, onSuccess });
    // }

    // getTrips(onSuccess: (result: Trip[]) => void) {
    //     return Api.callApi({ url: `https://localhost:44340/trips`, onSuccess });
    // }

    // getTripsForFolder(folderId: number | null, onSuccess: (result: Trip[]) => void) {
    //     return Api.callApi({ url: `https://localhost:44340/trips/forfolder/${folderId}`, onSuccess });
    // }

    // updateTrip(data: Trip, onSuccess: () => void) {
    //     return Api.put({ url: `https://localhost:44340/trips`, body: data, onSuccess });
    // }

    // removeTrip(tripId: number, onSuccess: () => void) {
    //     return Api.delete({ url: `https://localhost:44340/trips/${tripId}`, onSuccess });
    // }

    //PackingItems
    createPackingItem(data: PackingItem, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/packingitems`, body: data, onSuccess });
    }

    getPackingItems(onSuccess: (result: PackingItem[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/packingitems/`, onSuccess });
    }

    updatePackingItem(data: PackingItem, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/packingitems`, body: data, onSuccess });
    }

    updateTagsForPackingItem(itemId: number, data: number[], onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/packingitems/tags/${itemId}`, body: data, onSuccess });
    }

    removePackingItem(id: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/packingitems/${id}`, onSuccess });
    }

    //Tags
    getTags(onSuccess: (result: TravelTag[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/traveltags`, onSuccess });
    }

    createTag(data: TravelTag, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/traveltags`, body: data, onSuccess });
    }

    updateTag(data: TravelTag, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/traveltags`, body: data, onSuccess });
    }

    removeTag(id: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/traveltags/${id}`, onSuccess });
    }
}

export default new TravelApi();