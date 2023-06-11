# Frontend-MovieRama-AnastasiosTsarouchas

live demo: https://frontend-movierama-tsarouchas.netlify.app

This project was created with:

- TypeScript
- SASS
- Webpack
- Jest
- Cypress
- Github actions 

## Instructions

### Running the application locally:
1. Create a .env file and add your movie db api key as following:

```
MOVIE_DB_API_KEY=your_api_key
```

2. Run `npm install` to install dependencies
3. Run `npm start` or `npm run start:docker` if you have docker installed and running on your machine 
4. Open your browser to http://localhost:3000

### Running tests:

1. Run `npm test` to run unit tests
2. Run `npm run test:coverage` to run unit tests and see a coverage report
3. Run `npm run e2e` to run end to end cypress tests

## Structure

- **src**
  - **libraries**
    - **data-cache**  *-a class for handling cache for requests*  
    - **dom**  *-a class for creating new DOM elements and manipulating them. Also utils for toggling classes for dom elements*
    - **state**  *-a class for holding the application state and the actions that change it*
  - **services**  *- the functions used for http requests*
  - **ui-components** *- the functions used for rendering of the application*
    - **ui-effects** *- functions that handle ui effecs, such as infinite scrolling*   
  - **utils** *- utility helpers*
