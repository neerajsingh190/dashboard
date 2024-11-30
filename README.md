1. Download the Repository
Clone the repository to your local machine using the following command:
git clone <repo-url>
2. Backend Setup
1. Navigate to the 'backend' folder:
cd backend
2. Install the dependencies:
npm install
3. Create a .env file in the 'backend' folder and add the following details:
MONGO_URI=your_mongo_database_url
JWT_SECRET=your_jwt_secret_key
PORT=your_preferred_port
4. Start the backend server:
npm start
The backend server will now run on the port you specified.
3. Frontend Setup
1. Navigate to the 'frontend' folder:
cd frontend
2. Install the dependencies:
npm install
3. Create a .env file in the 'frontend' folder and add the following:
REACT_APP_API_URL=http://localhost:3000/api
Replace 'http://localhost:3000/api' with your backend server address if different.
4. Start the frontend:
npm start
The frontend will now run and connect to the backend.
4. Access the Application
Once both the backend and frontend are running, you can access the application in your browser.
Features
Login: Log in to the system with your credentials.

Signup: Create a new account.
Dashboard: After logging in, you will be directed to the dashboard where you can:
- Create Employee: Add a new employee to the system.
- View Employee List: See a list of all employees.
- Search Employee: Find employees by searching their details.
- Edit Employee: Modify employee information.
- Delete Employee: Remove an employee from the system.
Enjoy using the application!
