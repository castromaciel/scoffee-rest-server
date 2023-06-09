<h1 align="center">
  Super Coffee
</h1>

<div align="center">

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

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
  Users : String username
  Users : String email
  Users : String - crypt password 
  Users : Boolean isGoogleAuthent
  Users : String role
  Users : String img
  Users : Boolean status

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

## Development

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

- [bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme) to hash and salt passwords securely.
- [cors](https://github.com/expressjs/cors#readme) for providing a Connect/Express middleware.
- [dotenv](https://github.com/motdotla/dotenv#readme) loads environment variables from a .env file into process.env.
- [express](https://expressjs.com/) framework for Node.js.
- [express-validator](https://express-validator.github.io/docs) to validate fields.
- [google-auth-library](https://github.com/googleapis/google-auth-library-nodejs#readme) Google's officially supported node.js client library for using OAuth 2.0 authorization.
- [jsonwebtoken](https://jwt.io/) to establish a transmission of information between two or more fields. 
- [mongoose](https://mongoosejs.com/) mongodb object modeling for node.js.

