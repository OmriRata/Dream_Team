# Dream Team League Web App

This project is a web application for managing a Dream Team League in soccer. It allows users to create, view, and manage their dream teams using a React-based frontend, a Flask backend, and MongoDB as the database.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Running the Application](#running-the-application)
7. [API Endpoints](#api-endpoints)
8. [Usage](#usage)
9. [Contributing](#contributing)
10. [License](#license)

## Introduction

The Dream Team League Web App allows soccer enthusiasts to create their own dream teams and compete against others. Users can select players, manage team line-ups, and track their performance over the league season. The application is built using React for the user interface, Flask for backend API services, and MongoDB for data storage.

## Features

- User registration and authentication
- Create, update, and delete dream teams
- Select players and manage team line-ups
- View league standings and team statistics
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend:** React (JSX)
- **Backend:** Flask (Python)
- **Database:** MongoDB
- **Styling:** CSS (Bootstrap)
- **API Testing:** Postman

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.x and pip
-  Vite and npm
- MongoDB installed and running locally or on a cloud service
- A web browser (Google Chrome, Firefox, etc.)

## Installation

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/yourusername/dream-team-league.git](https://github.com/OmriRata/Dream_Team.git)
   cd dream-team-league
2. **Setup the Backend (Flask):**
* Navigate to the backend directory:
cd Backend
* Create a virtual environment and activate it:
python Server.py
* Set up environment variables:
Create a .env file in the backend directory with the following content:
FLASK_APP=app.py
FLASK_ENV=development
MONGO_URI=mongodb://localhost:27017/dreamteamdb
SECRET_KEY=your_secret_key
