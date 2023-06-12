# Express Dynamic API: Phase 1

This lab focuses on building a basic Express server using best practices, including server modularization, middleware usage, and tests. In this phase, we will create an Express server with a single route for handling a person's name.

## Before You Begin

Please follow these instructions before starting the lab:

- Refer to the "Getting Started" guide in the lab submission instructions.
- Create a new repository called "basic-express-server."
- Work in a new branch called "dev," created from the "main" branch.
- After completing the assignment, create a Pull Request (PR) from "dev" to "main" and merge your code.
- Deploy your main branch to a new application on your chosen cloud service provider.
- Add a link to the merged PR in your README for grading purposes.

## Phase 1 Requirements

Problem Domain: Build a basic Express server with the following specifications:

### Person Route

- Method: GET
- Path: /person
- Expects a query string from the user with a "name" property.
- If the name is present in the query string, the server should respond with a JSON object of the form: `{ "name": "name provided" }`.
- If there is no name in the query string, the server should respond with a "500" error.

### Implementation Notes

- Create an `index.js` file at the root of your repository, which will act as the entry point for your server.
  - It should require `src/server.js`.
  - It should require `dotenv` and read the `PORT` from your `.env` file.
  - Call the `.start()` method from the server with the `PORT` set in your environment.
- Create a `src/server.js` file, which will serve as your server module containing all the necessary connections for the server.
  - It must export an object with a `start()` method and a reference to the Express app. The server should not start on its own.
- Create a `middleware` folder and add the following two middleware modules to it:
  - `logger.js`: Performs a `console.log` with the request method and path. Import this into your server and set it up to run at the application level for all routes.
  - `validator.js`: Checks the query string for a `name` property. It should allow the request to proceed if the query string is valid and force an error otherwise.
- Create an `error-handlers` folder and add the following two modules to it:
  - `404.js`: Sends a 404/Not-Found message as the response. Import this into your server and set it up to be used after your other routes.
  - `500.js`: Sends a 500/Server Error message as the response. Import this into your server and set it up to be used

## Deployment Link:
https://basic-express-server-xkqr.onrender.com

- [UML for Lab 2](/uml-lab-02.png)