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
import PackingItems from "pages/Travel/PackingItems";

export type RouteItem = {
  name: string;
  route: string;
  component: () => JSX.Element;
  isMainMenuLink?: boolean;
  isExact?: boolean;
}

export const Routes: RouteItem[] =
  [
    { name: "Dashboard", route: "", component: Dashboard, isMainMenuLink: true, isExact: true },

    { name: "ToDo", route: "todo", component: ToDo, isMainMenuLink: true },
    { name: "ToDoBoard", route: "todoboard", component: ToDoBoard },

    { name: "Workout", route: "workout", component: Workout, isMainMenuLink: true },
    { name: "WorkingOut", route: "workoutplan", component: WorkingOut },

    { name: "Notes", route: "notes", component: Notes, isMainMenuLink: true },

    { name: "Recipes", route: "recipes", component: Recipes, isMainMenuLink: true },

    { name: "Calendar", route: "calendar", component: Calendar, isMainMenuLink: true },

    { name: "Budgeting", route: "budgeting", component: Budgeting, isMainMenuLink: true },
    { name: "Budget", route: "budget", component: Budget },

    { name: "Yoga", route: "yoga", component: Yoga, isMainMenuLink: true },

    { name: "Abs", route: "abs", component: Abs, isMainMenuLink: true },

    { name: "Foraging", route: "foraging", component: Foraging, isMainMenuLink: true },

    { name: "Spotify", route: "spotify", component: Spotify, isMainMenuLink: true },

    { name: "iNaturalist", route: "iNaturalist", component: INaturalist, isMainMenuLink: true },

    { name: "Travel", route: "travel", component: Travel, isMainMenuLink: true },
    { name: "Packing Items", route: "packingitems", component: PackingItems },

    { name: "Study", route: "study", component: Study, isMainMenuLink: true },
    { name: "Question Category", route: "questioncategory", component: QuestionCategoryPage },
    { name: "Game Board", route: "questiongame", component: GameBoard },
  ];