## Steps To Run
1) Open a terminal session in the top-level package folder (`/marisa-aircraft-scheduling`)
2) Run `npm ci` to install the dependencies
3) Run `npm start` to start up the application
4) Run `npm test` to run all tests

## Simplifications
The following are aspects of this project I purposely simplified but would have given much more
attention to ordinarily:
1) Error handling
  - I just did a basic error boundary
  - I threw some errors in functions where the given data wasn't expected
2) Testing
  - normally, I would want to do integration testing as well w/ a tool like Cypress.io
  - I wrote a couple component tests (app, root index, and reusable components)
  - I tested all utils and provider actions
