# poll
polling app get a random poll and generate poll distribution after submission.
technologies used: node, react, webpack, babel, scss, express, mongoose, es6, bootstrap, font-awesome, react-router-dom, etc

![poll question](https://github.com/imjeee/poll/blob/master/Screen%20Shot%202018-01-07%20at%2010.57.12%20PM.png)
![poll result](https://github.com/imjeee/poll/blob/master/Screen%20Shot%202018-01-07%20at%2010.57.01%20PM.png)

## Getting Started
this section will help you set it up

# Prerequisites

1. node

# installing and usage

```
1. git clone git@github.com:imjeee/poll.git # clone app
```
```
2. yarn start # to start react app
```
```
3. nodemon server.js # to start server app
```
```
4. open localhost:8080 # go to UI
```

## Architecture
this project contains 2 small apps, UI app built with react.js, middleware app build with express.js uses mongoose

![uml diagram](https://github.com/imjeee/poll/blob/master/diagram.png)

# UI
UI has 2 pages, home page contains a random poll question, after clicking submit, you'll be redirected to the second page to see the poll results, clicking back button will to go back to home page, with another random question (possibly the same question)

# service
service layer connects to mongodb (currently hosted by mlab) and exposes several interface for UI to consume.
1. /api/getQuestions (return all questions in db)
2. /api/getRandomQuestion (return a random question from db)
3. /api/updateAnswerInQuestion (takes question's id, and the answer's id, update db, returns updated question)
4. /api/addQuestion (takes a new question object and add to db)


