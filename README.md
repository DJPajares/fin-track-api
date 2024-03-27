
# BASIC API USING EXPRESS AND MONGOOSE

This is a basic API app to showcase api designing skills using express and mongoose.

## Features

- typescript
- basic CRUD
- mongoose
    - models
    - schemas
    - interfaces
- rest API best practices
    - error handling
    - zod validation
    - folder structuring
        - services, routes, etc.
    - naming convention
- bonus:
    - project-specific vscode settings
## Installation

- node v21 or later
- install mongoDB compass (or mongo atlas)
  - https://www.mongodb.com/docs/manual/administration/install-community/
- postman
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
  GET /api/types/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

