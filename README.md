## Project Overview
Board-it is a app that helps students with ADHD to get the feeling of urgency to start tasks earlier. This is achieved with competition and making progression visual.

## Key Features
- Devide tasks in to smaller tasks with AI or make them yourself.
- Competition with your friends.
- Add deadlines to your subtasks.
- Progression is visual.

## Tech Stack
### Front-end:
- React
- React Router
- React Icons
- Shadcn
- Tailwind

### Back-end:
- Laravel
- Laravel AI
- Breeze

## Installation & Setup


## Project Structure


## ERD


## API Endpoints

### Authentication & Login/register
- POST /user/register ~ User register
- POST /user/login ~ User login (Returns JWT token)

### Users
- GET /user/ ~ Get all the users
- GET /user/{id} ~ Get user details (Requires AUTH)
- PUT /user/edit/{id} ~ Edit user details (Requires AUTH)

### Groups
- GET /group/ ~ Get all groups associated to the logged in user (Requires AUTH)
- GET /group/{id} ~ Get group details (Requires AUTH) 
- POST /group/create ~ Create a group (Requires AUTH) ~ Required fields: name & role (WIP)
- PUT /group/edit/{id} ~ Edit group details (Requires AUTH) ~ Required fields: name & role (WIP)
- DELETE /group/delete/{id} ~ Delete the group (Requires AUTH)

### Maintasks
- GET /main/ ~ Get maintasks associated to the logged in user (Requires AUTH)
- GET /main/details/{id} ~ Get details of a maintask (Requires AUTH)
- POST /main/create ~ Create a maintask (Requires AUTH)
- PUT /main/edit/{id} ~ Edit maintask details (Requires AUTH)
- DELETE /main/delete/{id} ~ Delete the maintask (Requires AUTH)

### Subtasks
- GET /sub/{id} ~ Get details of a subtask (Requires AUTH)
- POST /sub/create ~ Create subtask (Requires AUTH)
- PUT /sub/edit/{id} ~ Edit subtask details (Requires AUTH)
- PATCH /sub/complete/{id} ~ Complete a subtask (Requires AUTH)
- DELETE /sub/delete/{id} ~ Delete the subtask (Requires AUTH)

## Deployment


## AI Integration


## Edge Cases

