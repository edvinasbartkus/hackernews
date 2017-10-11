
## About

* I have used create-react-app to simplify init of the react project
* Since HackerNews API is provided via Firebase I have used Firebase npm package. It uses websockets to retrieve data
* Separately I have implemented few changes replacing Firebase module with more native simple web requests: https://github.com/edvinasbartkus/hackernews/pull/1/files
* I have used redux to store and persist data for offline usage
* Once the page is loaded it takes data from localStorage. If the browser is online it will reset the data and will start loading data from HackerNews API. Data is being persisted with every change in reducer
* I have used react-infinite-scroller module to detect scrolling and load up additional data
* It has been tricky with pagination for Firebase as /newest only provides 500 latest posts; I have relied on documentation tip that once done with the latest posts I have to iterate through each item starting from maxitem and check if the item has not parent element
* I have added tests to check if react components render without any errors; also more in depth tests for reducer and it’s actions

## Folder Structure

```
hackernews/
  __tests__/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    reducers/
    components/
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

