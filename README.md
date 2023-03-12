<h1 align="center">
  Course NodeJs
</h1>

<div align="center">

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

</div>

API Rest Server about coffee shop.

## Diagram 

```mermaid
---
title: Database Super-coffee
---
classDiagram
  class Users
  Users : String _id
  Users : String name
  Users : String email
  Users : String - crypt password 
  Users : Boolean isGoogleAuthent
  Users : String role
  Users : String img
  Users : String status

  class Categories
  Categories : String _id
  Categories : String name
  Categories : ObjectId user


  class Products
  Products : String _id
  Products : String name
  Products : Number price
  Products : ObjectId category
  Products : Boolean isAvailable
  Products : ObjectId user

  direction LR
  Users --o Categories
  Categories --o Products
  Users --o Products
```
### Install dependencies:

```
yarn install
or
npm install 
```

### Available Scripts

In this project, you can run the following scripts:

| Script        | Description                                         |
| ------------- | --------------------------------------------------- |
| yarn build    | Builds the app for production to the `dist` folder. |
| yarn start    | Runs the app at prod mode.                          |
| yarn dev      | Runs the app in the development mode.               |
| yarn lint:fix  | Format code                                         |

## Base Dependencies

- [cors](https://github.com/expressjs/cors#readme) for providing a Connect/Express middleware.
- [dotenv](https://github.com/motdotla/dotenv#readme) loads environment variables from a .env file into process.env.
- [express](https://expressjs.com/) framework for Node.js.

