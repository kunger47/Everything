import React from "react";
import ToDo from 'pages/ToDoList/ToDo';
import ToDoBoard from 'pages/ToDoList/ToDoBoard';
import Dashboard from 'pages/Home/Dashboard';
import Workout from 'pages/Lifting/Workout';
import WorkingOut from 'pages/Lifting/WorkingOut';
import Notes from "pages/Notes";
import Recipes from "pages/Recipes";
import Calendar from "pages/Calendar";
import Budget from "pages/Budget/Budget";
import Yoga from "pages/Yoga";
import Foraging from "pages/Foraging/Foraging";
import Spotify from "pages/Spotify/Spotify";
import INaturalist from "pages/INaturalist/INaturalist";
import Abs from "pages/Abs/Abs";
import Travel from "pages/Travel/Travel";
import Budgeting from "pages/Budget/Budgeting";
import Study from "pages/Study/Study";
import QuestionCategoryPage from "pages/Study/QuestionCategoryPage";
import GameBoard from "pages/Study/Game";
import TravelLists from "pages/Travel/TravelLists";
import TripPage from "pages/Travel/TripPage";

export type RouteItem = {
  name: string;
  abrev: string;
  route: string;
  component: () => JSX.Element;
  isMainMenuLink?: boolean;
  isExact?: boolean;
}

export const Routes: RouteItem[] =
  [
    { abrev: 'Db', name: "Dashboard", route: "", component: Dashboard, isMainMenuLink: true, isExact: true },

    { abrev: 'Td', name: "ToDo", route: "todo", component: ToDo, isMainMenuLink: true },
    { abrev: 'Tb', name: "ToDoBoard", route: "todoboard", component: ToDoBoard },

    { abrev: 'Wo', name: "Workout", route: "workout", component: Workout, isMainMenuLink: true },
    { abrev: 'Wg', name: "WorkingOut", route: "workoutplan", component: WorkingOut },

    { abrev: 'N', name: "Notes", route: "notes", component: Notes, isMainMenuLink: true },

    { abrev: 'Rp', name: "Recipes", route: "recipes", component: Recipes, isMainMenuLink: true },

    { abrev: 'Ca', name: "Calendar", route: "calendar", component: Calendar, isMainMenuLink: true },

    { abrev: 'Bu', name: "Budgeting", route: "budgeting", component: Budgeting, isMainMenuLink: true },
    { abrev: 'Bg', name: "Budget", route: "budget", component: Budget },

    { abrev: 'Yg', name: "Yoga", route: "yoga", component: Yoga, isMainMenuLink: true },

    { abrev: 'Ab', name: "Abs", route: "abs", component: Abs, isMainMenuLink: true },

    { abrev: 'Fo', name: "Foraging", route: "foraging", component: Foraging, isMainMenuLink: true },

    { abrev: 'Sp', name: "Spotify", route: "spotify", component: Spotify, isMainMenuLink: true },

    { abrev: 'In', name: "iNaturalist", route: "iNaturalist", component: INaturalist, isMainMenuLink: true },

    { abrev: 'Tr', name: "Travel", route: "travel", component: Travel, isMainMenuLink: true },
    { abrev: 'Tl', name: "Travel Lists", route: "travellists", component: TravelLists },
    { abrev: 'Tp', name: "Trip", route: "trip", component: TripPage },

    { abrev: 'St', name: "Study", route: "study", component: Study, isMainMenuLink: true },
    { abrev: 'Qc', name: "Question Category", route: "questioncategory", component: QuestionCategoryPage },
    { abrev: 'Gb', name: "Game Board", route: "questiongame", component: GameBoard },
  ];