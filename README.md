# REST API WITH EXPRESS AND MONGOOSE

a restful api app to showcase designing skills using express and mongoose.

## Features

- typescript
- basic crud
- mongoose
  - models
  - schemas
  - interfaces
  - validation
- restful api best practices
  - global error handling
  - middleware
  - folder structuring
    - services, routes, etc.
  - handling versioning
  - naming convention
  - pagination, filtering and sorting
- bonus:
  - project-specific vscode settings

## Requirements

- node v21 or later
- mongoDB compass (or mongo atlas)
  - https://www.mongodb.com/docs/manual/administration/install-community/
- postman or curl

## Run Locally

- clone the project

  ```bash
    git clone https://github.com/DJPajares/fin-track-api.git
  ```

- go to the project directory

  ```bash
    cd fin-track-api
  ```

- install dependencies

  ```bash
    npm i
  ```

- add `.env` file

  ```bash
    touch .env
  ```

  - add below based on your mongodb config
    ```bash
      PORT=3001
      DATABASE_URL=mongodb://localhost:27017/fintrack
    ```

- run the server

```bash
  npm start
```

- run api on postman

## API Reference

#### Get item

```http
  GET /api/v1/types/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

Sample response:

```bash
  {
    _id: '6123as235c',
    name: 'Income'
  }
```
