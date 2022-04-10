import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDo from 'pages/ToDoList/ToDo';
import ToDoBoard from 'pages/ToDoList/ToDoBoard';
import Dashboard from 'pages/Home/Dashboard';
import Workout from 'pages/Lifting/Workout';
import WorkingOut from 'pages/Lifting/WorkingOut';
import Notes from "pages/Notes";
import Recipes from "pages/Recipes";
import Calendar from "pages/Calendar";
import Budget from "pages/Budget/Budget";
import './global.scss';
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

const App = () => {
  const [hideNavigation, setHideNavigation] = useState<boolean>(false);

  return (
    <React.StrictMode>
      <Router>
        {!hideNavigation ?
          <>
            <Navbar collapseOnSelect expand="lg" >
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav defaultActiveKey="/">
                  <Nav.Link as={Link} to="/">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/todo">
                    ToDo
                  </Nav.Link>
                  <Nav.Link as={Link} to="/workout">
                    Workout
                  </Nav.Link>
                  <Nav.Link as={Link} to="/notes">
                    Notes
                  </Nav.Link>
                  <Nav.Link as={Link} to="/recipes">
                    Recipes
                  </Nav.Link>
                  <Nav.Link as={Link} to="/calendar">
                    Calendar
                  </Nav.Link>
                  <Nav.Link as={Link} to="/budgeting">
                    Budget
                  </Nav.Link>
                  <Nav.Link as={Link} to="/yoga">
                    Yoga
                  </Nav.Link>
                  <Nav.Link as={Link} to="/abs">
                    Abs
                  </Nav.Link>
                  <Nav.Link as={Link} to="/foraging">
                    Foraging
                  </Nav.Link>
                  <Nav.Link as={Link} to="/spotify">
                    Spotify
                  </Nav.Link>
                  <Nav.Link as={Link} to="/iNaturalist">
                    iNaturalist
                  </Nav.Link>
                  <Nav.Link as={Link} to="/travel">
                    Travel
                  </Nav.Link>
                  <Nav.Link as={Link} to="/study">
                    Study
                  </Nav.Link>
                </Nav>
                <div className="e-hide-navbar">
                  <Button className={"e-pull-right"} onClick={() => setHideNavigation(true)}>Hide</Button>
                </div>
              </Navbar.Collapse>
            </Navbar>
          </>
          : <>
            <div className="e-hidden-navbar">
              <span className="e-pull-right" onClick={() => setHideNavigation(false)}>
                ^
              </span>
            </div>
          </>}
        <main>
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/todo">
              <ToDo />
            </Route>
            <Route path="/todoboard">
              <ToDoBoard />
            </Route>
            <Route path="/workoutplan">
              <WorkingOut />
            </Route>
            <Route path="/workout">
              <Workout />
            </Route>
            <Route path="/notes">
              <Notes />
            </Route>
            <Route path="/recipes">
              <Recipes />
            </Route>
            <Route path="/calendar">
              <Calendar />
            </Route>
            <Route path="/budgeting">
              <Budgeting />
            </Route>
            <Route path="/budget">
              <Budget />
            </Route>
            <Route path="/yoga">
              <Yoga />
            </Route>
            <Route path="/abs">
              <Abs />
            </Route>
            <Route path="/foraging">
              <Foraging />
            </Route>
            <Route path="/spotify">
              <Spotify />
            </Route>
            <Route path="/iNaturalist">
              <INaturalist />
            </Route>
            <Route path="/travel">
              <Travel />
            </Route>
            <Route path="/study">
              <Study />
            </Route>
            <Route path="/questioncategory">
              <QuestionCategoryPage />
            </Route>
            <Route path="/questiongame">
              <GameBoard />
            </Route>
          </Switch>
        </main>
      </Router>
    </React.StrictMode>
  );
}

export default App;