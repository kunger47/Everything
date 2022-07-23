import ToDoBoard from "models/todo/ToDoBoard";
import ToDoBoardFolder from "models/todo/ToDoBoardFolder";
import ToDoColumn from "models/todo/ToDoColumn";
import ToDoItem from "models/todo/ToDoItem";
import ToDoItemTask from "models/todo/ToDoItemTask";
import Api from "../api";

class ToDoApi {
    //Folder
    createFolder(data: ToDoBoardFolder, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/todoboardfolders`, body: data, onSuccess });
    }

    getFoldersForFolder(folderId: number | null, onSuccess: (result: ToDoBoardFolder[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/todoboardfolders/forfolder/${folderId}`, onSuccess });
    }

    updateFolder(data: ToDoBoardFolder, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/todoboardfolders`, body: data, onSuccess });
    }

    removeFolder(folderId: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/todoboardfolders/${folderId}`, onSuccess });
    }

    //Board
    createBoard(data: ToDoBoard, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/todoboards`, body: data, onSuccess });
    }

    getBoards(onSuccess: (result: ToDoBoard[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/todoboards`, onSuccess });
    }

    getBoardsForFolder(folderId: number | null, onSuccess: (result: ToDoBoard[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/todoboards/forfolder/${folderId}`, onSuccess });
    }

    updateBoard(data: ToDoBoard, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/todoboards`, body: data, onSuccess });
    }

    removeBoard(boardId: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/todoboards/${boardId}`, onSuccess });
    }

    //Columns
    createColumn(data: ToDoColumn, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/todocolumns`, body: data, onSuccess });
    }

    getColumns(boardId: number, onSuccess: (result: ToDoColumn[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/todocolumns/forboard/${boardId}`, onSuccess });
    }

    updateColumn(data: ToDoColumn, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/todocolumns`, body: data, onSuccess });
    }

    removeColumn(id: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/todocolumns/${id}`, onSuccess });
    }

    //Items
    getItemsForColumns(columnId: number, onSuccess: (result: ToDoItem[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/todocolumns/items/${columnId}`, onSuccess });
    }

    createItem(data: ToDoItem, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/todoitems`, body: data, onSuccess });
    }

    updateItem(data: ToDoItem, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/todoitems`, body: data, onSuccess });
    }

    removeItem(id: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/todoitems/${id}`, onSuccess });
    }

    //ItemTasks
    getTasksForItem(itemId: number, onSuccess: (result: ToDoItemTask[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/todoitemtasks/foritem/${itemId}`, onSuccess });
    }

    createTask(data: ToDoItemTask, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/todoitemtasks`, body: data, onSuccess });
    }

    removeTask(id: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/todoitemtasks/${id}`, onSuccess });
    }
}

export default new ToDoApi();