import Game from "models/study/Game";
import GameQuestionCategory, { GameQuestion } from "models/study/GameQuestionCategory";
import Player from "models/study/Player";
import Question from "models/study/Question";
import QuestionAnswer from "models/study/QuestionAnswer";
import QuestionCategory from "models/study/QuestionCategory";
import Api from "../api";

class Study {
    //Question
    createQuestion(data: Question, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/questions`, body: data, onSuccess });
    }

    getQuestionsForCategory(catId: number, onSuccess: (result: Question[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/questions/forCategory/${catId}`, onSuccess });
    }

    updateQuestion(data: Question, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/questions`, body: data, onSuccess });
    }

    removeQuestion(id: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/questions/${id}`, onSuccess });
    }

    //QuestionCategories
    createQuestionCategory(data: QuestionCategory, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/questioncategories`, body: data, onSuccess });
    }

    getQuestionCategory(catId: number, onSuccess: (result: QuestionCategory) => void) {
        return Api.callApi({ url: `https://localhost:44340/questioncategories/${catId}`, onSuccess });
    }

    getQuestionCategories(onSuccess: (result: QuestionCategory[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/questioncategories`, onSuccess });
    }

    updateQuestionCategory(data: QuestionCategory, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/questioncategories`, body: data, onSuccess });
    }

    removeQuestionCategory(id: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/questioncategories/${id}`, onSuccess });
    }

    //Players
    getPlayersForGame(gameId: number, onSuccess: (result: Player[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/players/forGame/${gameId}`, onSuccess });
    }

    createPlayer(data: Player, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/players`, body: data, onSuccess });
    }

    updatePlayer(data: Player, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/players`, body: data, onSuccess });
    }

    removePlayer(id: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/players/${id}`, onSuccess });
    }

    //Games
    getGame(gameId: number, onSuccess: (result: Game) => void) {
        return Api.callApi({ url: `https://localhost:44340/games/${gameId}`, onSuccess });
    }

    getGames(onSuccess: (result: Game[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/games`, onSuccess });
    }

    createGame(data: Game, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/games`, body: data, onSuccess });
    }

    updateGame(data: Game, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/games`, body: data, onSuccess });
    }

    removeGame(id: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/games/${id}`, onSuccess });
    }

    //Game Question Categories
    getGameQuestionCategories(gameId: number, onSuccess: (result: GameQuestionCategory[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/gamequestioncategories/forGame/${gameId}`, onSuccess });
    }

    //Game Questions
    updateGameQuestion(data: GameQuestion, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/gameQuestions`, body: data, onSuccess });
    }

    //Game Answers
    getAnswersForGameQuestion(gameQId: number, onSuccess: (result: QuestionAnswer[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/questionanswers/forGameQuestion/${gameQId}`, onSuccess });
    }

    createGuessForQuestion(data: QuestionAnswer, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/questionanswers`, body: data, onSuccess });
    }

    submitGuessForQuestion(data: QuestionAnswer, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/questionanswers`, body: data, onSuccess });
    }

    removeGuessForQuestion(data: QuestionAnswer, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/questionanswers/${data.id}`, body: data, onSuccess });
    }
}

export default new Study();