## Project Overview

Board-it is a app that helps students with ADHD to get the feeling of urgency to start tasks earlier. This is achieved
with peer pressure and making progression visual.

## Key Features

- Devide tasks in to smaller tasks with AI or make them yourself.
- Get the urge to work by peer pressure with your friends.
- Add deadlines to your subtasks.
- Progression is visual.

## Tech Stack

| Part      | Technologie  |
|-----------|--------------|
| Front-end | React        |
| Front-end | React Router |
| Front-end | React Icons  |
| Front-end | Shadcn       |
| Front-end | Tailwind     |
| Back-end  | Laravel      |
| Back-end  | Breeze       |
| AI        | Laravel AI   |
| AI        | GPT-4        |

## Installation & Setup

## Project Structure

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
    users ||--o{ user_main_tasks: has
    main_tasks ||--o{ user_main_tasks: has
    users ||--o{ sub_tasks: has
    users ||--o{ user_settings: has
    users ||--o{ user_groups: has
    theme ||--o{ user_settings: has
    groups ||--o{ user_main_tasks: has
    user_main_tasks ||--o{ sub_tasks: has
    groups ||--o{ user_groups: has


```

## API Endpoints

### Authentication & Login/register

- `POST /user/register` ~ User register
- `POST /user/login` ~ User login (Returns JWT token)

### Users

- `GET /user/` ~ Get all the users
- `GET /user/{id}` ~ Get user details (Requires AUTH)
- `PUT /user/edit/{id}` ~ Edit user details (Requires AUTH)

### Groups

- `GET /group/` ~ Get all groups associated to the logged in user (Requires AUTH)
- `GET /group/{id}` ~ Get group details (Requires AUTH)
- `POST /group/create` ~ Create a group (Requires AUTH) ~ Required fields: name & role (WIP)
- `PUT /group/edit/{id}` ~ Edit group details (Requires AUTH) ~ Required fields: name & role (WIP)
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

## Deployment

## AI Integration

## Edge Cases

