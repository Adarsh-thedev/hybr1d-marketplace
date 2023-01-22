# Instructions

## You need to have following things installed

- nodejs + npm
- nestjs
- mongoDB

## To run the project

- run npm i to install all dependencies
- create a .env file
- configure env if you want to use some particular mongoDB instance (optional, uses localhost of mongoDB by default)
- add a secret of your choice for passport in the env(key defined in .env.example)
- run command npm run start:dev or npm run start
- you are good to start
- by default, the project runs on localhost:8000, this can be changed by adding PORT variable in .env file
- go to http://localhost:8000/api to get the swagger documentation of all the APIs and required params and body of each request
