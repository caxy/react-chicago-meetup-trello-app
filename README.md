# react-chicago-trello-app

This repository is a demo application that was built for a code walkthrough / working session for a React Chicago meetup event. It is a Trello clone, utilizing the [react-trello](https://github.com/rcdexta/react-trello) package as a way to bootstrap the UI with static data, that we then wired up to the backend.

Tech Stack:

- NestJS (node framework)
- React
- GraphQL (with Apollo Client and NestJS' Apollo Server module)
- mySQL database
- redis (for PubSub of real-time updates)
- websockets (using GraphQL subscriptions with NestJS)
- react-trello (trello-like component)

Watch the recording of the presentation for an explanation of how things are set up, and a walkthrough of wiring up Apollo Client on the frontend:

https://www.youtube.com/watch?v=SqnxEEL-B2g

If you want to start from the same point as I did in the video, start from the `starting-point` branch.

## Prerequisites

- MySQL
- Redis
- Node >= 18.x

## Setup

Create the database `react_chicago_trello_app` in mysql

```shell
sudo mysqladmin create react_chicago_trello_app
```

Setup your .env:

```shell
cp api/.env.dist api/.env
```

Modify the database creds in `api/.env` for your user/pass.

Install deps:

```shell
cd api && yarn install && cd ../
cd client && yarn install && cd ../
```

### Run Migrations

```shell
cd api
yarn migrate
```

### Start API server

```shell
cd api
yarn start:dev
```

### Start frontend

```shell
cd client
yarn start
```
