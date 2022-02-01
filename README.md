## Steps To Run
1) Open a terminal session in the top-level package folder (`/marisa-aircraft-scheduling`)
2) Run `npm ci` to install the dependencies
3) Run `npm start` to start up the application

## Simplifications
The following are aspects of this project I purposely didn't go super far into for simplicity but
would have spent more time on in an enterprise project:
1) Error handling (I just did a basic error boundary and threw some errors where they occurred)
2) Testing (I just did some component tests and util/action tests to demonstrate my work)
3) Using tools like react-query for fetching data that won't often change (e.g. the list of flights
  and aircrafts)
4) Integrating with the given api. Due to the simplistic nature of this project, I didn't see the
  need to actually integrate with any kind of back-end, even just a simple API
