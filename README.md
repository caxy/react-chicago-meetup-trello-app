# react-chicago-trello-app

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
