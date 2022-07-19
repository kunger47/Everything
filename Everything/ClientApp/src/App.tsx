import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './global.scss';
import { RouteItem, Routes } from 'resources/routes';

const App = () => {
  const [hideNavigation, setHideNavigation] = useState<boolean>(false);
  const [navRoutes, setNavRoutes] = useState<RouteItem[]>([]);
  const [routeComponents, setRouteComponents] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setNavRoutes(Routes.filter(r => !!r.isMainMenuLink));
    setRouteComponents(buildRouteList);
  }, [Routes])

  const buildRouteList = () => {
    return Routes.map((r, key) => {
      let Component = r.component;
      return <Route key={key} path={`/${r.route}`} exact={!!r.isExact}>
        <Component />
      </Route>
    })
  }

  return (
    <React.StrictMode>
      <Router>
        {!hideNavigation ?
          <>
            <Navbar collapseOnSelect expand="lg" >
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav defaultActiveKey="/">
                  {!!(navRoutes.length > 0) && navRoutes.map(r =>
                    <Nav.Link as={Link} to={`/${r.route}`}>
                      {r.name}
                    </Nav.Link>
                  )}
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
            {!!routeComponents && !!(routeComponents.length > 0)
              && routeComponents.map(route => route)
            }
          </Switch>
        </main>
      </Router>
    </React.StrictMode>
  );
}

export default App;