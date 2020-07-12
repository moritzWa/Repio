# Repio

a simple spaced repetition reminder app

<div align="center">

[![Spectrum](./client/src/components/pages/Macbookwhite.png)](https://spectrum.chat)

### The simplest spaced repetition reminder app.

</div>

This is the main monorepo codebase of [Repio](https://repio.app). Every single line of code that's not packaged into a reusable library is in this repository.

## What is Repio?

Repio is he most simple spaced repetition App you have ever seen. Completely detatched from the lessons, notes, videos and other forms of knowledge you want to learn.

### Why and what to learn?

Spaced repetition is typically studied through the use of memorizing facts. Traditionally speaking, it has not been applied to fields that required some manipulation or thought beyond simple factual/semantic information. A more recent study has shown that spaced repetition can benefit tasks such as solving math problems.

## Thinks to fix/investigate

- [ ] login removes token

token is removen in authReducer after this case is triggered

```javascript
case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT
```

## Installation instructions

### Install dependencies

```bash
npm install
npm client-install
```

### Create config.env

```
MONGO_URI='...'
SECRET_KEY='...'
```

### Run Server

```bash
npm run dev     # Express & React :3000 & :5000
npm run server  # Express API Only :5000
npm run client  # React Client Only :3000
```

### Codebase

#### Technologies and used Libraries

With the ground rules out of the way, let's talk about the coarse architecture of this mono repo:

- **Full-stack JavaScript**: We use Node.js to power our servers, and React to power our frontend apps. Almost all of the code you'll touch in this codebase will be JavaScript.

Here is a list of all the big technologies we use:

# Frontend

- **React**: Frontend Framework
- **material-ui**: Frontend UI Libraries

others: **react-swipeable-views**, **react-transition-group**, **axios**, **uuid** (Alert management)

# Backend/Globally

- **Express**: Backend Framework
- **MongoDB**: Data storage

- **jsonwebtoken**: Authentication
- **bcryptjs**: Authentication

#### Client Folder structure

```
-- src
    |       |-- App.css
    |       |-- App.js
    |       |-- index.js
    |       |-- components
    |       |   |-- auth
    |       |   |   |-- Login.js
    |       |   |   |-- Register.js
    |       |   |-- items
    |       |   |   |-- AllList.js
    |       |   |   |-- ItemFilter.js
    |       |   |   |-- ItemForm.js
    |       |   |   |-- Items.js
    |       |   |   |-- ToReviewList.js
    |       |   |-- layout
    |       |   |   |-- Alerts.js
    |       |   |   |-- Navbar.js
    |       |   |   |-- Spinner.js
    |       |   |   |-- spinner.gif
    |       |   |-- pages
    |       |   |   |-- About.js
    |       |   |   |-- Home.js
    |       |   |   |-- LandingPage.js
    |       |   |   |-- Macbookwhite.png
    |       |   |   |-- Settings.js
    |       |   |   |-- repioexplaination.png
    |       |   |-- routing
    |       |       |-- PrivateRoute.js
    |       |-- context
    |       |   |-- types.js
    |       |   |-- alert
    |       |   |   |-- AlertState.js
    |       |   |   |-- alertContext.js
    |       |   |   |-- alertReducer.js
    |       |   |-- auth
    |       |   |   |-- AuthState.js
    |       |   |   |-- authContext.js
    |       |   |   |-- authReducer.js
    |       |   |-- interval
    |       |   |   |-- IntervalState.js
    |       |   |   |-- intervalContext.js
    |       |   |   |-- intervalReducer.js
    |       |   |-- item
    |       |       |-- ItemState.js
    |       |       |-- itemContext.js
    |       |       |-- itemReducer.js
    |       |-- utils
    |           |-- setAuthToken.js
```
