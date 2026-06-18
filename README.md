## Project Overview

Board-it is a app that helps students with ADHD to get the feeling of urgency to start tasks earlier. This is achieved
with peer pressure (working together), deviding tasks and making progression visual.

## Key Features

- Devide tasks in to smaller tasks with AI or make them yourself.
- Get the urge to work by studing together with your friends.
- Add deadlines to your subtasks.
- Progression is visual.

## Tech Stack

| Part of application | Technology     | Parts of technology |
|---------------------|----------------|---------------------|
| Front-end           | React          | Router, Icons       |
| Front-end           | Shadcn         | -                   |
| Front-end           | Tailwind CSS   | -                   |
| Back-end            | Laravel        | Breeze, MySQL       |
| Back-end            | Tymon          | JWT                 |
| Back-end            | Smalot         | PDF Parcer          |
| AI                  | Laravel AI SDK | -                   |
| AI                  | GPT-4          | -                   |

## Installation & Setup

### rerequisites

- Node.js
- Npm
- Composer
- MySQL
- Git

### Clone repository

```bash
git clone 
```

### Install Dependencies

```bash
cd front-end
composer install
```

```bash
cd back-end
npm install
```

### Set up database

```bash
php artisan migrate:fresh 
```

Drag database.sqlite in database slot in PHPStorm.

- Copy the env.example file and remove the example and add:
    - AI_KEY=
    - JWT_SECRET=

### Run the application

```bash
cd front-end
npm run dev
```

```bash
cd back-end
php artisan serve
```

## Project Structure

In this repository we have worked with front-end and back-end in the same repository. The structure of our repository
looks like this because of it:

````

board-it/
├── back-end/
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
├── routes/
├── storage/
├── stubs/
├── tests/
├── .env
├── .gitignore
├── composer.json
├── composer.lock
├── package.json
├── package-lock.json
├── front-end/
├── public/
├── src/
├── assets/
├── components/
├── context/
├── lib/
├── pages/
├── app.jsx
├── index.css
├── layout.jsx
├── main.jsx
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md

````

## ERD

```mermaid
erDiagram
    users {
        BIGINT id
        VARCHAR name
        VARCHAR user_name
        VARCHAR email
        VARCHAR password
        VARCHAR profile_image
        BOOLEAN is_admin
    }
    user_settings {
        BIGINT id
        BIGINT theme_id
        BOOLEAN written_font
    }
    theme {
        BIGINT id
        VARCHAR name
    }
    user_main_tasks {
        BIGINT id
        BIGINT user_id
        BIGINT main_task_id
        TINYINT progres
        VARCHAR level
        BIGINT score
        BOOLEAN completed
    }
    main_tasks {
        BIGINT id
        BIGINT group_id
        VARCHAR title
        TEXT description
        DATETIME deadline
        VARCHAR ai_file
    }

    groups {
        BIGINT id
        VARCHAR name
        TEXT description
        VARCHAR image
    }
    user_groups {
        BIGINT id
        BIGINT user_id
        BIGINT group_id
        VARCHAR role
    }
    sub_tasks {
        BIGINT id
        BIGINT user_id
        BIGINT main_task_id
        VARCHAR title
        TEXT description
        BOOLEAN completed
        DATETIME deadline
        DATETIME datetime
    }
    moments {
        BIGINT id
        BIGINT group_id
    }

    users ||--o{ user_main_tasks: has
    main_tasks ||--o{ user_main_tasks: has
    users ||--o{ sub_tasks: has
    users ||--o{ user_settings: has
    users ||--o{ user_groups: has
    theme ||--o{ user_settings: has
    groups ||--o{ user_main_tasks: has
    user_main_tasks ||--o{ sub_tasks: has
    groups ||--o{ user_groups: has
    groups ||--o{ moments: has

```

## API Endpoints

### Authentication & Login/register

- `POST /user/register` ~ User register
- `POST /user/login` ~ User login (Returns JWT token)

### Users

- `GET /user/` ~ Get all the users only user_name and id (Requires AUTH)
- `GET /user/{id}` ~ Get user details (Requires AUTH)
- `PUT /user/edit/{id}` ~ Edit user details (Requires AUTH)

### Groups

- `GET /group/` ~ Get all groups associated to the logged in user (Requires AUTH)
- `GET /group/{id}` ~ Get group details (Requires AUTH)
- `POST /group/create` ~ Create a group (Requires AUTH)
- `PUT /group/edit/{id}` ~ Edit group details (Requires AUTH)
- `DELETE /group/delete/{id}` ~ Delete the group (Requires AUTH)

### Maintasks

- `GET /main/` ~ Get maintasks associated to the logged in user (Requires AUTH)
- `GET /main/details/{id}` ~ Get details of a maintask (Requires AUTH)
- `POST /main/create` ~ Create a maintask (Requires AUTH)
- `PUT /main/edit/{id}` ~ Edit maintask details (Requires AUTH)
- `DELETE /main/delete/{id}` ~ Delete the maintask (Requires AUTH)

### Subtasks

- `GET /sub/{id}` ~ Get details of a subtask (Requires AUTH)
- `POST /sub/create` ~ Create subtask (Requires AUTH)
- `PUT /sub/edit/{id}` ~ Edit subtask details (Requires AUTH)
- `PATCH /sub/complete/{id}` ~ Complete a subtask (Requires AUTH)
- `DELETE /sub/delete/{id}` ~ Delete the subtask (Requires AUTH)

### AI routes

- `POST /main-tasks/{id}/generate-subtasks` ~ Generate subtasks with AI (Requires AUTH)

### Theme routes

- `GET /theme/` ~ Get the themes that exists (Requires AUTH)
- `GET /theme/details` ~ Get the theme settings of the user (Requires AUTH)
- `PUT /theme/edit` ~ Update de theme settings of the user (Requires AUTH)

## Deployment (christa)

## AI Integration (skye)

## AI Integration

In this project, we integrated AI to support users in breaking down larger tasks into smaller, more manageable subtasks. The AI is used as a planning assistant that helps generate structured subtasks based on the information provided by the user and the linked document that belongs to the main task.

The AI integration was planned to be handled through the backend using the Laravel AI SDK, but it didn't seem to work properly in our region. Instead of using Laravel AI SDK to it's full potential, we used a try/catch method to get it to work properly. The frontend sends the user input, such as the context and the selected difficulty level, to the backend. The backend then retrieves the linked AI file from the main task and combines this document content with the form input. This information is sent to the AI model with a clear prompt that explains how the subtasks should be generated.

The AI is instructed to only use the information from the form and the linked document. It does not use the title or description of the main task, and it does not add external information or make assumptions. This makes the generated subtasks more relevant to the actual assignment and keeps the output focused on the provided material. The generated output consists of multiple subtasks (between 8 and 20), each containing a title and a description. These subtasks are returned as structured JSON, so they can be processed by the backend and saved in the database. This allows the application to display the generated subtasks to the user in a clear and organized way.

We use AI in this project to make planning easier, especially for users who struggle with turning a large assignment into smaller steps. Instead of creating all subtasks manually, the AI gives users a useful starting point that they can follow, adjust, or expand if needed.

## Edge Cases

### Authentication:

- Multiple login attempts what triggers rate limit.
- Token becomes invalid when logged in.
- User has no username or email what is required when logged in.
- Email or username is the same for multiple users.

### Task:

- User has no head-task but has sub-tasks.
- User has no group but has head-tasks.
- Head and sub-tasks has no title.
- Head-task has no deadline.
- Head-task is deleted but sub-tasks still exist.
- Group is deleted but head-tasks or sub-tasks still exist.

### AI:

- AI formats response incorrectly (incorrect formating)
- AI adds not needed tasks (dubble tasks, irrelevant tasks).
- AI has an internal error.
- AI tokens are gone, or AI server is down.
- AI rate limit is exceeded
- AI security policy stops the AI
- AI response is cut off due to token limit.

## front-end integration:

- Protected routes require JSON Web Tokens for authentication.
- Front-end routes have wrong route names, or wrong variable names causing failed requests.
