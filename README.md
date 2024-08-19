# Rishika Portfolio Website

Client-side Repository is present at <a href="https://github.com/mr-kingshuk/rishi-portfolio-client" target="_blank" rel="noopener noreferrer">rishi-portfolio-client</a>

![Project Showcase - Website Screenshot](public/Website-Preview.JPG)

## Table of Contents
1. [Introduction](#introduction)
2. [Running Loaclly](#running-locally)
3. [Dependencies](#dependencies)
4. [Environment Variables](#environment-variables)
5. [API Reference](#api-reference)
    - [Project API](#project-api)
    - [General API](#general-api)
    - [Users API](#users-api)
    - [Password API](#password-api)
6. [Contributing](#contributing)    
7. [License](#license)

## Introduction

<a href="https://www.linkedin.com/in/rishisdesign/" target="_blank" rel="noopener noreferrer">Rishika Garg</a>, a **3rd-year Communication Design student from Nirma University**, approached me to develop her portfolio website, which she had carefully designed herself. She provided a detailed brief outlining the specific **animations and interactions** she wanted to showcase her work creatively. I accepted this challenge and built a **responsive website** that brought her vision to life, incorporating **seamless animations** and optimizing the **user experience across all devices**. The platform includes:

- <ins>**Advanced Content Management System (CMS)**</ins> with a modern drag-and-drop interface, enabling easy addition and update of projects by the client.
- <ins>**Optimized media uploads to Firebase Storage**</ins>, with strict file type and size restrictions for efficient storage management and reduced upload times.
- <ins>**Smooth image rendering through lazy loading**</ins>, implemented via the Blurhash library to enhance user experience.
- <ins>**Unique animations and user experience**</ins>, powered by the FramerMotion library, which contributed to the client's success in securing internships at leading design firms.
- <ins>**Responsive design**</ins>, ensuring a seamless experience across devices, whether on desktop, tablet, or mobile.
- <ins>**Secure login and password reset functionality**</ins>, ensuring client access and management.
- </ins>**Routing using React Router DOM**</ins>, allowing for efficient navigation between pages.

## Running Locally

## Running Locally

To set up the project locally, follow these steps:

1. **Clone the repositories**:
   - For the server: 
     ```
     git clone https://github.com/mr-kingshuk/rishi-portfolio-server.git
     ```
   - For the client: 
     ```
     git clone https://github.com/mr-kingshuk/rishi-portfolio-client.git
     ```

2. **Fill the `.env` file**: 
   - Use the `template.env` file as a reference to configure your environment variables.

3. **Set up the database connection in the server**:
   - Add the database connection string of MongoDB from the MongoDB Atlas.

4. **Install dependencies and run the server and client**:
   - Navigate to the server folder:
     ```bash
     cd rishi-portfolio-server
     npm install
     npm run dev
     ```
   - Then, navigate to the client folder:
     ```bash
     cd ../rishi-portfolio-client
     npm install
     npm run dev
     ```

5. **Add Admin User**:
   - Call the POST endpoint to add admin, with request body having the `email` and the `password`:
     ```
     POST http://localhost:3000/api/users/signup
     ```

## Dependencies

```json
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.3",
    "morgan": "^1.10.0",
    "nodemailer": "^6.9.13",
    "validator": "^13.11.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `PORT`: The port number on which the server will run.
- `MONGO_URI`: The connection string for your MongoDB database.
- `SECRET`: The secret key for JWT authentication.
- `BASE_URL_SERVER`: The base URL of the server.
- `BASE_URL_CLIENT`: The base URL of the client application.
- `EMAIL`: The email address from which emails are sent.
- `PASSWORD_APP_EMAIL`: The less secure password for the email account used to send emails.

## API Reference

### Project API

<details open>
<summary><ins>1. Add New Project</ins></summary><br>

**Description:** Adds a new project with associated media, footer, and hyperlinks. It also assigns an order number to the project based on the current sequence.

```bash
POST /api/project
```

**Middleware:** `requireAuth`

**Parameters:**

| Parameter  | Type    | Description                                                | Required |
| :--------- | :------ | :--------------------------------------------------------- | :------- |
| `data`     | `object` | Contains project details including `heroImage` and other project data | Yes      |
| `media`    | `array`  | Array of media objects associated with the project          | Yes      |
| `footer`   | `object` | Contains footer information, including hyperlinks           | Yes      |

**Response Summary:**

- **200:** Returns the newly created project object.
- **400:** Returns an error object if there is an issue with creating the project.

</details>

<details>
<summary><ins>2. Reorder Projects</ins></summary><br>

**Description:** Updates the order of projects based on the provided list and adjusts the sequence value accordingly.

```bash
PUT /api/project/reorder
```

**Middleware:** `requireAuth`

**Parameters:**

| Parameter | Type   | Description                              | Required |
| :-------- | :----- | :--------------------------------------- | :------- |
| `project` | `array` | Array of projects with their new order    | Yes      |

**Response Summary:**

- **200:** Order updated successfully.
- **500:** Server Error if there is an issue with the server.

</details>

<details>
<summary><ins>3. Update Project</ins></summary><br>

**Description:** Updates the details of an existing project. The project can include a hero image, associated media, and footer information including hyperlinks.

```bash
PUT /api/projects/:id
```

**Middleware:** `requireAuth`

**Parameters:**

| Parameter | Type   | Description                                                | Required |
| :-------- | :----- | :--------------------------------------------------------- | :------- |
| `data`    | `object` | Contains updated project details including `heroImage` and other project data | Yes      |
| `media`   | `array`  | Array of media objects associated with the project          | Yes      |
| `footer`  | `object` | Contains updated footer information, including hyperlinks  | Yes      |
| `id`      | `string` | The ID of the project to be updated                         | Yes      |

**Response Summary:**

- **200:** Returns the updated project object.
- **404:** Project not found with the provided ID.
- **500:** Server Error if there is an issue with updating the project.

</details>

<details>
<summary><ins>4. Get Top 3 Projects</ins></summary><br>

**Description:** Retrieves the top 3 projects sorted by their order field. Each project includes fields for `heroImage`, `order`, `heading`, and `subHeading`.

```bash
GET /api/projects/top3Proj
```

**Response Summary:**

- **200:** Returns an object containing an array of the top 3 projects, each with `heroImage`, `order`, `heading`, and `subHeading` fields.
- **404:** No Projects Found if there are no projects available in the database.
- **500:** Server Error if there is an issue with retrieving the projects from the server.

</details>

<details>
<summary><ins>5. Get All Projects</ins></summary><br>

**Description:** Retrieves all projects from the database, including `heroImage`, `order`, `heading`, and `subHeading` fields, sorted by order.

```bash
GET /api/projects/allProj
```

**Response Summary:**

- **200:** Returns an object containing an array of all projects, each with `heroImage`, `order`, `heading`, and `subHeading` fields.
- **404:** No Projects Found if there are no projects available in the database.
- **500:** Server Error if there is an issue with retrieving the projects from the server.

</details>

<details>
<summary><ins>6. Get Project Headers</ins></summary><br>

**Description:** Retrieves all project headers including their order and heading.

```bash
GET /api/projects/projectHeaders
```

**Response Summary:**

- **200:** Returns an object containing an array of all projects with `order` and `heading` fields.
- **404:** No Projects Found if there are no projects available in the database.
- **500:** Server Error if there is an issue with retrieving the projects from the server.

</details>

<details>
<summary><ins>7. Get Project by ID</ins></summary><br>

**Description:** Retrieves a project by its ID from the database, including populated `heroImage`, `media`, and `hyperlinks` fields.

```bash
GET /api/projects/:id
```

**Parameters:**

| Parameter | Type   | Description                         | Required |
| :-------- | :----- | :---------------------------------- | :------- |
| `id`      | `string` | The ID of the project to retrieve    | Yes      |

**Response Summary:**

- **200:** Returns the project object including `heroImage`, `media`, and `hyperlinks` fields.
- **400:** Not Valid OrderId if the provided ID is not a valid MongoDB ObjectId.
- **404:** Project not found if there is no project with the specified ID.
- **500:** Server Error if there is an issue with retrieving the project from the server.

</details>

<details>
<summary><ins>8. Delete Project by ID</ins></summary><br>

**Description:** Deletes a project from the database by its ID. This includes removing associated media files (e.g., hero image and other media) from the MediaModel.

```bash
DELETE /api/projects/:id
```

**Middleware:** `requireAuth`

**Parameters:**

| Parameter | Type   | Description                          | Required |
| :-------- | :----- | :----------------------------------- | :------- |
| `id`      | `string` | The ID of the project to delete       | Yes      |

**Response Summary:**

- **200:** Project Deleted Successfully if the project is successfully deleted.
- **404:** Project Not Found if there is no project with the specified ID.
- **500:** Server Error if there is an issue with deleting the project from the server.

</details>

### General API

<details open>
<summary><ins>1. Update General Information</ins></summary><br>

**Description:** Updates the brief and resume fields in the general information.

```bash
PUT /api/general
```

**Middleware:** `requireAuth`

**Parameters:**

| Parameter | Type    | Description                     | Required |
| :-------- | :------ | :------------------------------ | :------- |
| `brief`   | `string` | Brief description or summary    | No       |
| `resume`  | `string` | Link or content for the resume  | No       |

**Response Summary:**

- **200:** Info updated successfully, returns the updated `brief` and `resume` fields.
- **400:** Update failed, possibly due to a validation error.
- **404:** Empty fields detected if both `brief` and `resume` are null.
- **500:** Server Error if there is an issue with the server.

</details>

<details>
<summary><ins>2. Get General Information</ins></summary><br>

**Description:** Retrieves general information such as a brief summary and resume details.

```bash
GET /api/general
```

**Response Summary:**

- **200:** Returns an object containing the `brief` and `resume` fields.
- **500:** Server Error if there is an issue with retrieving the data from the server.
</details>

### Users API

<details open>
<summary><ins>1. User Login</ins></summary><br>

**Description:** Authenticates a user by email and password, returning a JWT token and user details upon successful login.

```bash
POST /api/users/login
```
**Parameters:**

| Parameter | Type   | Description                  | Required |
|-----------|--------|------------------------------|----------|
| email     | string | Email of the user            | Yes      |
| password  | string | Password of the user         | Yes      |

**Response Summary:**

- **200:** Returns user object with email and token, along with user details (name, rollNo, phoneNo, hostel).
- **400:** Error if any fields are missing, if the email doesn't exist, or if the password doesn't match.
</details>

<details>
<summary><ins>2. Signup User</ins></summary><br>

**Description:** Creates a new user account  in the Database and returns a JWT token for authentication.

```bash
POST /api/users/signup
```
**Parameters:**

| Parameter         | Type    | Description                          | Required |
|-------------------|---------|--------------------------------------|----------|
| email             | string  | Email of the user                    | Yes      |
| password          | string  | Password of the user                 | Yes      |

**Response Summary:**

- **200:** Returns user object with email and token, along with user details (name).
- **400:** Error if any fields are missing or if the signup validation fails.
</details>


### Password API

<details open>
<summary><ins>1. Send Reset Password Link</ins></summary><br>

**Description:** Sends a reset password link to the specified email if it exists in the database.

```bash
POST /api/password/forget-password
```
**Parameters:** 

| Parameter | Type   | Description                        | Required |
| :-------- | :----- | :--------------------------------- | :------- |
| `email`   | `string` | Email of the user for password reset | Yes      |

**Response Summary:**

- **200:** Reset Mail sent.
- **404:** Email is not found if the specified email does not exist in the database.
- **500:** Server Error if there is an issue with the server.
</details>

<details>
<summary><ins>2. Verify Reset Password Link</ins></summary><br>

**Description:** Verifies the reset password link and redirects the user to the reset password form.

```bash
GET /api/password/reset-password/:id/:token
```

**Parameters:**

| Parameter | Type   | Description                                     | Required |
| :-------- | :----- | :---------------------------------------------- | :------- |
| `id`      | `string` | ID of the user requesting password reset        | Yes      |
| `token`   | `string` | JWT token for verification                       | Yes      |

**Response Summary:**

- **200:** Redirects to the client reset password page.
- **404:** User is not found if the specified user ID does not exist, or Invalid Link if the token verification fails.
- **500:** Server Error if there is an issue with the server.
</details>

<details>
<summary><ins>3. Reset Password</ins></summary><br>

**Description:** Resets the user's password if the provided token is valid and matches the user's email.

```bash
POST /api/password/reset-password/:id/:token
```
**Parameters:**

| Parameter      | Type   | Description                                       | Required |
| :------------- | :----- | :------------------------------------------------ | :------- |
| `id`           | `string` | ID of the user                                   | Yes      |
| `token`        | `string` | JWT token for verification                        | Yes      |
| `password`     | `string` | New password for the user                        | Yes      |
| `passwordAgain`| `string` | Confirmation of the new password                | Yes      |

**Response Summary:**

- **200:** Returns the updated user object after password reset.
- **400:** Reset Email Link has expired if the ID is not valid, or All fields must be filled if required fields are missing.
- **404:** User is not found if the specified user ID does not exist, or Passwords don't match if the new password and confirmation do not match, or Password must meet complexity requirements if the new password is not strong enough.
- **500:** Server Error if there is an issue with the server.

</details>

## Contributing 

This project is currently open-sourced for review purposes, particularly for recruiters and potential collaborators. While contributions are not actively sought, if you find any issues or have suggestions for improvement, feel free to fork the repository and submit a pull request. Your insights are always welcome.

## License

**Copyright (c) 2024 Kingshuk Ghosh** — Licensed under the MIT License. [MIT License Link](https://opensource.org/license/mit)
