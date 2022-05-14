# State

App Level and Component Level

- A call to a database would likely be App Level state

# Use NPM instead of yarn

```bash
npx create-react-app app-name --use-npm
```

# index.html

You can put CDNs in the head tag

# Basic minimum index.js and App.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

...

```javascript
function App() {
  return <h1>Hello from the app component</h1>;
}

export default App;
```

# CSS

Called in index.js above the App componenet import

```javascript
import './index.css';
```

# Ternary

You can use a `&&` instead of `?` if there is no else statment

```javascript
thing ? 'plop' : null;
```

is the same as

```javascript
thing && 'plop';
```

# propTypes and defaultProps

Call them just above the export inside the component

```javascript
Header.defaultProps = {
  text: 'Feedback',
};

Header.propTypes = {
  text: PropTypes.string,
};
```

# Brad Traversy's Card CSS

```css
.card {
  background-color: #fff;
  color: #333;
  border-radius: 15px;
  padding: 40px 50px;
  margin: 20px 0;
  position: relative;
}

.card.reverse {
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
}

.card h2 {
  font-size: 22px;
  font-weight: 600;
  text-align: center;
}

.rating {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 30px 0 40px;
}

.rating li,
.num-display {
  position: relative;
  background: #f4f4f4;
  width: 50px;
  height: 50px;
  padding: 10px;
  text-align: center;
  border-radius: 50%;
  font-size: 19px;
  border: 1px #eee solid;
  transition: 0.3s;
}

.rating li label {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.rating li:hover,
.num-display {
  background: #ff6a95;
  color: #fff;
}
```

# State

Import useState

```javascript
import { useState } from 'react';
```

- `imrs` will do this for you

Assign a const to `useState(defaultValue)` the const will destructure two values. One is the name of the piece of state and the other is the function to update this state.

```javascript
const [rating, setRating] = useState(7);
```

# Threeway state shuffle thingy

in App.js

```js
<>
  <Header />
  <div className='container'>
    <FeedbackList feedback={feedback} />
  </div>
</>
```

in FeedbackList.jsx

```js
import FeedbackItem from './FeedbackItem';

function FeedbackList({ feedback }) {
  if (!feedback | (feedback.length === 0)) {
    return <p>No Feedback Yet</p>;
  }
  return (
    <div className='feedback-list'>
      {feedback.map((item) => (
        <FeedbackItem key={item.id} item={item} />
      ))}
    </div>
  );
}
export default FeedbackList;
```

in FeedbackItem.jsx

```js
function FeedbackItem({ item }) {
  return (
    <div className='card'>
      <div className='num-display'>{item.rating}</div>
      <div className='text-display'>{item.text}</div>
    </div>
  );
}
export default FeedbackItem;
```

- In App.js `FeedbackList` is called and sends the `feedback` state as a prop.
- In FeedbackList.jsx the function that renders the JSX takes the prop `feedback` and destructures it. It then checks to be sure that `feedback` isn't empty; if it is, it displays a message. If it's not empty it maps the contents of `feedback` with the `FeedbackItem` component, using the `id` as the `key` and sends `item` as a prop,
- In FeedbackItem the function that renders the JSX is passed `item` which is destructured. Then the component is rendered, displaying `item.rating` and `item.text`

# Styled Components

You can use components as reusable styled components. We can create the component and reuse it just for styling by passing it `props.children` or `{children}`. the `children` are the information that the styled component will surround.

- It is a good idea to use a 'shared' folder in your 'components' folder to keep things tidy.

In this example a `Card` styled component is used instead of a `div` to display the data in FeedbackItem.jsx

```js
// Card.jsx
function Card({children}) {
  return (
    <div className="card">
        {children}
    </div>
  )
}
export default Card

//FeedbackItem.jsx
import Card from "./shared/Card"

function FeedbackItem({item}) {

  return (
    <Card>
        <div className="num-display">{item.rating}</div>
        <div className="text-display">{item.text}</div>
    </Card>
  )
}
export default FeedbackItem
```

# Quick string to number conversion

Just add a `+` sign

```js
setSelected(+e.currentTarget.value);
```

# Prevent default click behavior of a button in a form

```js
e.preventDefault();
```

# Shorthand for `text: text` is simply `text`

# Easy ids

- Install: `npm i uuid`
- Import: `import { v4 as uuidv4 } from 'uuid';`
- To assign the unique id: `newFeedback.id = uuidv4();`

# Spread operator

- Three dots will take in all of the existing items of an object
  ```js
  setFeedback([...feedback]);
  ```
- To add new items
  ```js
  setFeedback([newFeedback, ...feedback]);
  ```

# Framer Motion

- Install: `npm install framer-motion@4.1.17`
- Import: `import {motion, AnimatePresence} from 'framer-motion'`
- To apply animations, wrap in `<AnimatedPresence>` and add `<motion.div>`.
  ```js
  <AnimatePresence>
    {feedback.map((item) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
      </motion.div>
    ))}
  </AnimatePresence>
  ```

# Routes

- Install: `npm i react-router-dom`

- Import: `import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';`

- Use:
  ```js
  <Router>
    <Header />
    <div className='container'>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <>
              <FeedbackForm handleAdd={addFeedback} />
              <FeedbackStats feedback={feedback} />
              <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
            </>
          }
        ></Route>
        <Route path='/about' element=<AboutPage /> />
      </Routes>
    </div>
  </Router>
  ```
  - You wrap everthing in `<Router>` and then wrap the routes in `<Routes>`. Then individual elements are wrapped in `<Route>`.
  - Routes can use the `exact` property to make the route exactly match the `path`
  - The `path` determines what you type to get to the page. The page is declared in `element` as a JSX element ie: `element=<AboutPage />`

# Link

Rather than `<a>` tags, you'll want to use `<Link>` with react-router-dom.

- Import: `import { Link } from 'react-router-dom'`

- Use: `<Link to="/">Back to Home</Link>`

- Alternative Use: This will allow you to use search and/or hash params

  ```js
  <Link
    to={{
      pathname: "/",
      search: "?sort=name",
      hash: "#hello",
    }}>
  ```

# NavLink

An easy way to add a specific className to your active link

- Import: `import { NavLink } from 'react-router-dom';`
- Use: Wrap the elements in `<NavLink>` give it an `activeClassName` property.

```js
<NavLink to='/' activeClassName='active'>
  Home
</NavLink>
```

# `useParams`

- Import: `import {useParams} from 'react-router-dom'`
- Use:

  - In the Route
    ```js
    <Route path='/post/:id' element={<Post />} />
    ```
  - In the Component. In this example the Post component will display the `params.id` in the main `div`

    ```js
    import { useParams } from 'react-router-dom';

    function Post() {
      const params = useParams();

      return (
        <div>
          <h1>Post {params.id}</h1>
        </div>
      );
    }
    export default Post;
    ```

# `Navigate`

Allows you to redirect

- Import: `import {Navigate} from 'react-router-dom'`
- Use:

  ```js
  import { Navigate } from 'react-router-dom';

  function Post() {
    const status = 404;
    if (status === 404) {
      return <Navigate to='/notfound' />;
    }

    return (
      <div>
        <h1>Post</h1>
      </div>
    );
  }
  export default Post;
  ```

# `useNavigate`

- Import: `import {Navigate, useNavigate} from 'react-router-dom'`
- Use:

  ```js
  import { Navigate } from 'react-router-dom';

  function Post() {
    const status = 200;

    const navigate = useNavigate();

    const onClick = () => {
      console.log('Hello');
      navigate('/about');
    };

    if (status === 404) {
      return <Navigate to='/notfound' />;
    }

    return (
      <div>
        <h1>Post</h1>
        <button onClick={onClick}>Click</button>
      </div>
    );
  }
  export default Post;
  ```

# Context

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

- Import: `import {createContext, useState} from 'react'`
- Creating the Provider:

  - Create a const that holds `createContext()`: `const FeedbackContext = createContext()`.
  - Then create a const for the that holds a function which takes in `children`, destructures state, and returns the `Provider` method from the `createContext()` const

    ```js
    import { createContext, useState } from 'react';

    const FeedbackContext = createContext();

    export const FeedbackProvider = ({ children }) => {
      const [feedback, setFeedback] = useState([
        {
          id: 1,
          text: 'This item is from context',
          rating: 10,
        },
      ]);
      return (
        <FeedbackContext.Provider
          value={{
            feedback,
          }}
        >
          {children}
        </FeedbackContext.Provider>
      );
    };

    export default FeedbackContext;
    ```

- Wrapping the Provider around Components in App.js:

  ```js
  import { FeedbackProvider } from './context/FeedbackContext';

  <FeedbackProvider>
    <Router>
      <Header />
      ...
    </Router>
  </FeedbackProvider>;
  ```

- To actually use the context in a component, you'll need to `import useContext from 'react'` and create a const to hold the context. Then use that const where you need to

  ```js
    import useContext from 'react'
    ...
    function FeedbackItem({item}) {
      const {deleteFeedback} = useContext(FeedbackContext)
      ...
      return (
        <Card>
          <button
            onClick={() => deleteFeedback(item.id)}>
  ```

- If there is state in the component that you want to useContext in, create the const after the state is declared
  ```js
    function FeedbackForm() {
      const[text, setText] = useState('')
      const[rating, setRating] = useState(10)
      const[btnDisabled, setBtnDisabled] = useState(true)
      const[message, setMessage] = useState('')
      const {addFeedback} = useContext(FeedbackContext)
  ```

# `useEffect`

The Effect Hook lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.

- Import:
  ```js
  import { useEffect } from 'react';
  ```
- Use: Call it inside the function for the component, have it do a thing, add something as a dependency to make it run whenever that is affected.

  ```js
  const { addFeedback, feedbackEdit } = useContext(FeedbackContext);

  useEffect(() => {
    console.log('hello');
  }, [feedbackEdit]);
  ```

# Create a production build

```bash
npm run build
```

# Install `serve` Globally

```bash
npm i -g serve
```

- With `serve` you can serve what's in the build fold with

```bash
serve -s build
```

# `json-server` (a mock api)

install: `npm i json-server`

- Add to `script` in package.json

```javascript
  "server": "json-server --watch db.json --port 5000"
```

use: create a file named db.json in the root (not src). Store your data in json format. Then run the server.

```bash
npm run server
```

# `concurrently` allows you to run multiple scripts at the same time

Install:

```bash
npm i concurrently
```

- Add to scripts in package.json

```javascript
"dev": "concurrently \"npm run server\" \"npm start\""
```

# Access data from db

Create an async function that fetches the data. With json-server you can use `_sort` to sort. You can assign the order of the sort with `_order=desc`.

```javascript
const fetchFeedback = async () => {
  const response = await fetch(
    `http://localhost:5000/feedback?_sort=id&_order=desc`
  );
  const data = await response.json();
  setFeedback(data);
  setIsLoading(false);
};
```

This data can be pulled up on pageload with `useEffect`.

```javascript
useEffect(() => {
  fetchFeedback();
}, []);
```

# Making a spinner

Create `isLoading` state

```javascript
const [isLoading, setIsLoading] = useState(true);
```

Add to Context Provider

```javascript
<FeedbackContext.Provider
  value={{
    feedback,
    feedbackEdit,
    isLoading,
    deleteFeedback,
    addFeedback,
    editFeedback,

    updateFeedback,
  }}
>
  {children}
</FeedbackContext.Provider>
```

Create a spinner component that uses a spinner.gif, then call that component if isLoading is true

```javascript
...
return isLoading ? <Spinner /> : (<div className="feedback-list">
    <AnimatePresence>
    {feedback.map((item) => (
        <motion.div key={item.id} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity:0}}>
        <FeedbackItem
        key={item.id}
        item={item} />
        </motion.div>
    ))}
    </AnimatePresence>
```

# Add a proxy

In package.json add `"proxy": "http://whatwewant:port"`

```json
...
"name": "feedback",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:5000",
  "dependencies": {
...
```

# Convert to actual `fetch` with `json-server`

The function that `addFeedback` calls will need to be `async` and the `fetch` should be prepended with `await`. Since we're using a proxy now, we can just provide `fetch` with `'/feedback'` and a js object containing our `method`, `headers`, and the body, which we will be our `newFeedback` wrapped in `JSON.stringify()`. We then assign a const `data` to the response with `await response.json()`

```js
const addFeedback = async (newFeedback) => {
  const response = await fetch('/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFeedback),
  });
  const data = await response.json();

  setFeedback([data, ...feedback]);
};
```

# Convert the delete method

First we'll need to be sure that we're calling the function assigned to `deleteFeedback` as `async`. Then we can simply `await fetch` the `id` with the `method` set to `'DELETE'`.

```js
const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure?')) {
      await fetch(`/feedback/${id}`, {method:'DELETE'})
      ...
```
