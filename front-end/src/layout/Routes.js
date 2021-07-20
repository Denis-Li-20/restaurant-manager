import React from "react";
import { Route, Switch } from "react-router-dom";
import Search from "../search/Search";
import Dashboard from "../dashboard/Dashboard";
import Reservations from "../reservations/Reservations";
import EditReservation from "../reservations/EditReservation";
import Tables from "../tables/Tables";
import Seat from "../reservations/Seat";
import SearchReservations from "../search/Search";
import NotFound from "./NotFound";

function Routes() {
  const backEndServerUrl = "http://localhost:5000";
  return (
    <Switch>

      <Route exact={true} path="/search">
        <Search backEndServerUrl={backEndServerUrl}/>
      </Route>

      <Route exact={true} path={["/", "/dashboard"]}>
        <Dashboard backEndServerUrl={backEndServerUrl}/>
      </Route>

      <Route exact={true} path="/reservations/new">
        <Reservations backEndServerUrl={backEndServerUrl}/>
      </Route>

      <Route exact={true} path="/reservations/:reservation_id/seat">
        <Seat backEndServerUrl={backEndServerUrl}/>
      </Route>

      <Route exact={true} path="/reservations/:reservation_id/edit">
        <EditReservation backEndServerUrl={backEndServerUrl}/>
      </Route>

      <Route exact={true} path="/tables/new">
        <Tables backEndServerUrl={backEndServerUrl}/>
      </Route>

      <Route exact={true} path="/search">
        <SearchReservations backEndServerUrl={backEndServerUrl}/>
      </Route>

      <Route>
        <NotFound />
      </Route>
      
    </Switch>
  );
}

export default Routes;
