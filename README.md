## Steps To Run
1) Open a terminal session in the top-level package folder (`/marisa-aircraft-scheduling`)
2) Run `npm ci` to install the dependencies
3) Run `npm start` to start up the application

## Simplifications
The following are aspects of this project I purposely ignored for simplicity but would have handled/
considered in an enterprise project:
1) Error handling
2) Testing in general
3) Using tools like react-query for fetching data that won't often change (e.g. the list of flights
  and aircrafts)
4) Integrating with the given api. Due to the simplistic nature of this project, I didn't see the
  need to actually integrate with any kind of back-end, even just a simple API
