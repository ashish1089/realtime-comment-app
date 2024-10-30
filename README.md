# Realtime Comment App

**Description:**  
A web application that allows users to post and view comments in real-time, making conversations seamless and interactive.
1. [Tech Stack](#tech-stack)
2. [Installation](#installation)
3. [Usage](#usage)

## Tech Stack
- **Frontend**: NextJs, MUI
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Real-time Communication**: WebSockets (Socket.IO)

## Installation

To run this project locally, follow these steps:

1. **Set up MySQL**:
   - Ensure MySQL is installed and running on your system.
   - Use the schema file located in the `backend` folder to create the necessary database and tables. You can do this by logging into MySQL and running:
     ```sql
     SOURCE /path/to/backend/schema.sql;
     ```
     
2. **Configure Environment Variables**:
   - Create a `.env` file in the `backend` folder to store environment variables. The `.env` file should include the following variables:
     ```plaintext
     MYSQL_HOST=localhost
     MYSQL_USER=your_database_username
     MYSQL_PASSWORD=your_database_password
     MYSQL_DATABASE=comments_app
     ```
   - Replace `your_database_username`, `your_database_password` with your actual MySQL database credentials.

3. **Install Dependencies**:
   - Navigate to both `backend` and `frontend` folders and install dependencies:
     ```bash
     # In backend folder
     npm install
     # In frontend folder
     npm install
     ```

4. **Run the Project**:
   - Start the backend server:
     ```bash
     npm run start
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

## Usage

- **Post a Comment**: Enter a comment in the text field and submit.
- **View Live Comments**: Watch new comments appear in real-time.

