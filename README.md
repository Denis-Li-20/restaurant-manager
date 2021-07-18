
## **Restaurant Manager Project**
### *Node.js / React application for managing the restaurant*

---

### Link to live application (please do not overload the server ✌):
https://restaurant-manager-front-end.herokuapp.com/

---

### Dependencies (packages utilized in the project)
```diff
+ Back-end
```
Main tools: Node.js, Express, Dotenv, CORS

Test data generators: Faker, Nanoid

CLI tool to run multiple scripts: npm-run-all

PostgreSQL client: pg

Logging and formatting: pino, pino-http, pino-pretty
```diff
+ Front-end
```
Main tools: React, React-dom, React-router, React-router-dom, React-scripts, Axios

End to end testing: @testing-library/jest-dom, @testing-library/react, @testing-library/user-event


---

### Application Features

```diff
+ Reservations
```
Create new reservations using the web-form
Form will auto-validate the inputs and let you know if the data is missing or incorrect
```diff
+ Tables
```
Create new tables which could be used to seat the reservations
Form will auto-validate the inputs and let you know if the data is missing or incorrect
```diff
+ Search
```
Search reservations by full mobile number 
Search reservations by partial mobile number
```diff
+ Dashboard
```
Get the list of reservations and tables for the selected date
Switch the date by using the navigation buttons
Manage reservations: seat reservation by selecting the table, edit the reservation, or cancel the reservation
Manage tables: seat reservation, finish reservation

---

### Installation Instructions

**MacOS**

1. Download / Fork-Pull the repository
2. Terminal: npm install
3. Create Postgresql database (for instance, using free ElephantSQL.com instance)
4. Update ./back-end/knexfile.js and ./back-end/.env database URLs
5. Terminal: npm run start


## Database setup

1. Set up four new ElephantSQL database instances - development, test, preview, and production - by following the instructions in the "PostgreSQL: Creating & Deleting Databases" checkpoint.
1. After setting up your database instances, connect DBeaver to your new database instances by following the instructions in the "PostgreSQL: Installing DBeaver" checkpoint.

**Windows**
1. Download / Fork-Pull the repository
2. Remove package.json and rename package_windows.json to package.json
3. Command line: npm install
4. Create Postgresql database (for instance, using free ElephantSQL.com instance)
5. Update ./back-end/knexfile.js and ./back-end/.env database URLs
6. Commad line: npm run start

**If you want to seed a more extensive testing dataset:**
```diff
- The tests are meant for the original dataset, some of them will fail if you seed the extended dataset
```
Reservations
1. Open ./back-end/src/db/seeds/00-reservations.js
2. Uncomment lines 1 - 79
3. Comment lines 82 - 140
4. The script will automatically generate test dataset, line 54 controls the number of records created by the script

Tables
1. Open /back-end/src/db/seeds/01-teables.js
2. Uncomment lines 1 - 29
3. Comment lines 31 - 44
4. The script will generate 18 tables instead of 4

---

### API Documentation

The table below describes the folders in this repository:

| Folder/file path | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `./back-end`     | The backend project, which runs on `localhost:5000` by default.  |
| `./front-end`    | The frontend project, which runs on `localhost:3000` by default. |

### Backend Existing files

The `./back-end` folder contains all the code for the backend project.

The table below describes the existing files in the `./back-end` folder:

| Folder/file path                                         | Description                                                                  |
| ---------------------------------------------------------|----------------------------------------------------------------------------- | 
| `./back-end/knexfile.js`                                 | The Knex configuration file. You will not need to make changes to this file. |
| `./back-end/src/app.js`                                  | Defines the Express application and connects routers.                        |
| `./back-end/src/db/connection.js`                        | The Knex connection file. You will not need to make changes to this file.    |
| `./back-end/src/db/migrations`                           | The Knex migrations folder.                                                  |
| `./back-end/src/db/seeds/`                               | The Knex seeds folder.                                                       |
| `./back-end/src/errors/errorHandler.js`                  | Defined an Express API error handler.                                        |
| `./back-end/src/errors/notFound.js`                      | Defined an Express API "not found" handler.                                  |
| `./back-end/src/reservations/reservations.controller.js` | A controller for the reservations resource.                                  |
| `./back-end/src/reservations/reservations.router.js`     | A router for the reservations resource.                                      |
| `./back-end/src/reservations/reservations.service.js`    | Database services for the reservations resource.                             |
| `./back-end/src/tables/tables.controller.js`             | A controller for the tables resource.                                        |
| `./back-end/src/tables/tables.router.js`                 | A router for the tables resource.                                            |
| `./back-end/src/tables/tables.service.js`                | Database services for the tables resource.                                   |
| `./back-end/src/server.js`                               | Defines the node server.                                                     |
| `./back-end/test`                                        | A folder that contains all of the integration tests.                         |
| `./back-end/vercel.json`                                 | A vercel deployment configuration file.                                      |

### Frontend Existing files

The `./front-end` folder contains all the code for the frontend project.

The table below describes the existing files in the `./front-end` folder:

| Folder/file path                                   | Description                                                                                            |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `./front-end/e2e`                                  | Contains all of the end-to-end tests. You will not need to make changes to the files in this folder.   |
| `./front-end/jest-puppeteer.config.js`             | A configuration file used by the end-to-end tests. You will not need to make changes to this file.     |
| `./front-end/src/App.js`                           | Defines the root application component. You will not need to make changes to this file.                |
| `./front-end/src/App.test.js`                      | Contains the tests for the root application component. You will not need to make changes to this file. |
| `./front-end/src/dashboard/Dashboard.js`           | Defines the Dashboard page.                                                                            |
| `./front-end/src/reservations/Reservations.js`     | Defines the New Reservation page.                                                                      |
| `./front-end/src/reservations/EditReservation.js`  | Defines the Edit Reservations page.                                                                    |
| `./front-end/src/reservations/EditReservation.js`  | Defines the Seat Reservations page.                                                                    |
| `./front-end/src/search/Search.js`                 | Defines the Search page.                                                                               |
| `./front-end/src/tables/Tables.js`                 | Defines the Tables page.                                                                               |
| `./front-end/src/index.js`                         | The main entry point for the React application.                                                        |
| `./front-end/src/layout/ErrorAlert.js`             | Defines an error alert component that display only when an error is specified.                         |
| `./front-end/src/layout/Layout.css`                | !!! The css for ALL components !!!                                                                     |
| `./front-end/src/layout/Layout.js`                 | Defines the main layout of the application.                                                            |
| `./front-end/src/layout/NavigationBar.js`          | Defines the Navigation Bar for the application.                                                        |
| `./front-end/src/layout/NavigationBar.css`         | !!! CSS for the Navigation Bar !!!                                                                     |
| `./front-end/src/layout/NotFound.js`               | Defines the "Not found" component that is displayed when no route matches.                             |
| `./front-end/src/layout/Routes.js`                 | Defines all the routes for the application.                                                            |
| `./front-end/src/utils/api.js`                     | Defines the functions used to access the backend API                                                   |
| `./front-end/src/utils/date-time.js`               | Defines functions to format date and time strings.                                                     |
| `./front-end/src/utils/format-reservation-date.js` | Defines a function to format the date on a single reservation or an array of reservations.             |
| `./front-end/src/utils/format-reservation-time.js` | Defines a function to format the time on a single reservation or an array of reservations.             |
| `./front-end/src/utils/useQuery.js`                | Defines a custom hook to parse the query parameters from the URL.                                      |
| `./front-end/src/utils/dateReformat.js`            | Reformats the date to YYYY-MM-DD                                                                       |
| `./front-end/src/utils/dateValidation.js`          | Performs validation of the reservation form and returns object containing errors for each input field  |
| `./front-end/src/utils/timeReformat.js`            | Reformats time from 12 hours to 24 hours format                                                        |
| `./front-end/src/utils/timeValidation.js`          | Performs time validation (checks opening / close time). Takes into account the date for edge cases     |

## Running tests

This project has unit, integration, and end-to-end (e2e) tests.
End-to-end tests use browser automation to interact with the application just like the user does.

Test are split up by user story. You can run the tests for a given user story by running:

`npm run test:X` where `X` is the user story number.

Have a look at the following examples:

- `npm run test:1` runs all the tests for user story 1 (both frontend and backend).
- `npm run test:3:backend` runs only the backend tests for user story 3.
- `npm run test:3:frontend` runs only the frontend tests for user story 3.

Whenever possible, frontend tests will run before backend tests to help you follow outside-in development.

> **Note** When running `npm run test:X` If the frontend tests fail, the tests will stop before running the backend tests. Remember, you can always run `npm run test:X:backend` or `npm run test:X:frontend` to target a specific part of the application.

Since tests take time to run, you might want to consider running only the tests fyou're working on at any given time.

You can run all the tests using the following commands:

- `npm test` runs _all_ tests.
- `npm run test:backend` runs _all_ backend tests.
- `npm run test:frontend` runs _all_ frontend tests.
- `npm run test:e2e` runs only the end-to-end tests.

If you would like a reminder of which npm scripts are available, run `npm run` to see a list of available commands.

#### Screenshots

To help you better understand what might be happening during the end-to-end tests, screenshots are taken at various points in the test.

The screenshots are saved in `front-end/.screenshots` and you can review them after running the end-to-end tests.

You can use the screenshots to debug your code by rendering additional information on the screen.

## User stories (used for this project)

### US-01 Create and list reservations

As a restaurant manager<br/>
I want to create a new reservation when a customer calls<br/>
so that I know how many customers will arrive at the restaurant on a given day.

#### Implementation

1. The `/reservations/new` page
   - has the following required and not-nullable fields:
     - First name: `<input name="first_name" />`
     - Last name: `<input name="last_name" />`
     - Mobile number: `<input name="mobile_number" />`
     - Date of reservation: `<input name="reservation_date" />`
     - Time of reservation: `<input name="reservation_time" />`
     - Number of people in the party, which must be at least 1 person. `<input name="people" />`
   - displays a `Submit` button that, when clicked, saves the new reservation, then displays the `/dashboard` page for the date of the new reservation
   - displays a `Cancel` button that, when clicked, returns the user to the previous page
   - displays any error messages returned from the API
1. The `/dashboard` page
   - lists all reservations for one date only. (E.g. if the URL is `/dashboard?date=2035-12-30` then send a GET to `/reservations?date=2035-12-30` to list the reservations for that date). The date is defaulted to today, and the reservations are sorted by time.
   - displays next, previous, and today buttons that allow the user to see reservations on other dates
   - displays any error messages returned from the API
1. The `/reservations` API has the same validations as above and will return 400, along with an informative error message, when a validation error happens.
   - seed the reservations table with the data contained in `./back-end/src/db/seeds/00-reservations.json`

### US-02 Create reservation on a future, working date

As a restaurant manager<br/>
I only want to allow reservations to be created on a day when we are open<br/>
so that users do not accidentally create a reservation for days when we are closed.<br/>

#### Implementation

1. The `/reservations/new` page displays an error message with `className="alert alert-danger"` if any of the following constraints are violated:
   - The reservation date is a Tuesday as the restaurant is closed on Tuesdays.
   - The reservation date is in the past. Only future reservations are allowed.
1. The `/reservations` API has the same validations as above and returns 400, along with an informative error message, when a validation error happens.

### US-03 Create reservation within eligible timeframe

As a restaurant manager<br/>
I only want to allow reservations to be created during business hours, up to 60 minutes before closing<br/>
so that users do not accidentally create a reservation for a time we cannot accommodate.

#### Implementation

1. The `/reservations/new` page displays an error message with `className="alert alert-danger"`, if any of the following additional constraints are violated:
   - The reservation time is before 10:30 AM.
   - The reservation time is after 9:30 PM, because the restaurant closes at 10:30 PM and the customer needs to have time to enjoy their meal.
   - The reservation date and time combination is in the past. Only future reservations are allowed. E.g., if it is noon, only allow reservations starting _after_ noon today.
1. The `/reservations` API has the same validations as above and will return 400, along with an informative error message, when a validation error happens.

### US-04 Seat reservation

As a restaurant manager, <br/>
When a customer with an existing reservation arrives at the restaurant<br/>
I want to seat (assign) their reservation to a specific table<br/>
so that I know which tables are occupied and free.

#### Implementation

1. The `/tables/new` page
   - has the following required and not-nullable fields:
     - Table name: `<input name="table_name" />`, which must be at least 2 characters long.
     - Capacity: `<input name="capacity" />`, this is the number of people that can be seated at the table, which must be at least 1 person.
   - displays a `Submit` button that, when clicked, saves the new table then displays the `/dashboard` page
   - displays a `Cancel` button that, when clicked, returns the user to the previous page
1. The `/dashboard` page will:

   - displays a list of all reservations in one area.
   - each reservation in the list will:
     - Displays a "Seat" button on each reservation.
     - The "Seat" button is a link with an `href` attribute that equals `/reservations/${reservation_id}/seat`, so it can be found by the tests.
   - displays a list of all tables, sorted by `table_name`, in another area of the dashboard
     - Each table displays "Free" or "Occupied" depending on whether a reservation is seated at the table.
     - The "Free" or "Occupied" text has a `data-table-id-status=${table.table_id}` attribute, so it can be found by the tests.

1. The `/reservations/:reservation_id/seat` page will
   - have the following required and not-nullable fields:
     - Table number: `<select name="table_id" />`. The text of each option must be `{table.table_name} - {table.capacity}` so the tests can find the options.
   - do not seat a reservation with more people than the capacity of the table
   - display a `Submit` button that, when clicked, assigns the table to the reservation then displays the `/dashboard` page
   - PUT to `/tables/:table_id/seat/` in order to save the table assignment. The body of the request must be `{ data: { reservation_id: x } }` where X is the reservation_id of the reservation being seated. The tests do not check the body returned by this request.
   - display a `Cancel` button that, when clicked, returns the user to the previous page
1. The `tables` table must be seeded with the following data:
   - `Bar #1` & `Bar #2`, each with a capacity of 1.
   - `#1` & `#2`, each with a capacity of 6.
1. The `/tables` API will have the same validations as above and will return 400, along with an informative error message, when a validation error happens.

- if the table capacity is less than the number of people in the reservation, return 400 with an error message.
- if the table is occupied, return 400 with an error message.

### US-05 Finish an occupied table

As a restaurant manager<br/>
I want to free up an occupied table when the guests leave<br/>
so that I can seat new guests at that table.<br/>

#### Implementation

1. The `/dashboard` page
   - Displays a "Finish" button on each _occupied_ table.
   - the "Finish" button has a `data-table-id-finish={table.table_id}` attribute, so it can be found by the tests.
   - Clicking the "Finish" button displays the following confirmation: "Is this table ready to seat new guests? This cannot be undone." If the user selects "Ok" the system: - Sends a `DELETE` request to `/tables/:table_id/seat` in order to remove the table assignment. The tests do not check the body returned by this request. - The server returns 400 if the table is not occupied. - Refreshes the list of tables to show that the table is now available.
   - Clicking the "Cancel" makes no changes.

> **Hint** The end-to-end test waits for the tables list to be refreshed before checking the free/occupied status of the table, so be sure to send a GET request to `/tables` to refresh the tables list.

### US-06 Reservation Status

As a restaurant manager<br/>
I want a reservation to have a status of either booked, seated, or finished<br/>
so that I can see which reservation parties are seated, and finished reservations are hidden from the dashboard.

#### Implementation

1. The `/dashboard` page
   - displays the status of the reservation. The default status is "booked"
     - the status text has a `data-reservation-id-status={reservation.reservation_id}` attribute, so it can be found by the tests.
   - displays the Seat button only when the reservation status is "booked".
   - clicking the Seat button changes the status to "seated" and hides the Seat button.
   - clicking the Finish button associated with the table changes the reservation status to "finished" and removes the reservation from the dashboard.
   - the status is set by this request: PUT to `/reservations/:reservation_id/status` with a body of `{data: { status: "<new-status>" } }` where `<new-status>` is one of booked, seated, or finished

### US-07 Search for a reservation by phone number

As a restaurant manager<br/>
I want to search for a reservation by phone number (partial or complete)<br/>
so that I can quickly access a customer's reservation when they call about their reservation.<br/>

#### Implementation

1. The `/search` page
   - Displays a search box `<input name="mobile_number" />` that displays the placeholder text: "Enter a customer's phone number"
   - Displays a "Find" button next to the search box.
   - Clicking on the "Find" button submits a request to the server (e.g. GET `/reservations?mobile_phone=555-1212`).
     - then the system looks for the reservation(s) in the database and displays all matched records on the `/search` page using the same reservations list component as the `/dashboard` page.
     - the search page displays all reservations matching the phone number, regardless of status.
   - displays `No reservations found` if there are no records found after clicking the Find button.

### US-08 Change an existing reservation

As a restaurant manager<br/>
I want to be able to modify a reservation if a customer calls to change or cancel their reservation<br/>
so that reservations are accurate and current.

#### Implementation

1. The `/dashboard` and the `/search` page:
   - Display an "Edit" button next to each reservation
     - Clicking the "Edit" button navigates the user to the `/reservations/:reservation_id/edit` page
   - the "Edit" button is a link with an `href` attribute that equals `/reservations/${reservation_id}/edit`, so it can be found by the tests.
   - Displays a "Cancel" button next to each reservation
   - The Cancel button has a `data-reservation-id-cancel={reservation.reservation_id}` attribute, so it can be found by the tests.
   - Clicking the "Cancel" button displays the following confirmation: "Do you want to cancel this reservation? This cannot be undone."
     - Clicking "Ok" on the confirmation dialog, sets the reservation status to `cancelled`, and the results on the page are refreshed.
       - sets the status of the reservation to `cancelled` using a PUT to `/reservations/:reservation_id/status` with a body of `{data: { status: "cancelled" } }`.
     - Clicking "Cancel" on the confirmation dialog makes no changes.
1. The `/reservations/:reservation_id/edit` page displays the reservation form with the existing reservation data filled in
   - Only reservations with a status of "booked" can be edited.
   - Clicking the "Submit" button saves the reservation, then displays the previous page.
   - Clicking "Cancel" makes no changes, then displays the previous page.
