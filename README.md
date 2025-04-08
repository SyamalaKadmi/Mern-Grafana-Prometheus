# Mern-Grafana-Prometheus
Develop an advanced monitoring solution for a MERN application using Grafana and Prometheus.

The Travel Memory application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It consists of a backend connected to a MongoDB database and a React-based frontend.
## 1. MongoDB Configuration
1. Create a MongoDB account and cluster.
2. Save the database user password.
3. Open MongoDB Compass:
   - Add a new connection using the connection string (replace `<password>` with your password).
   - Copy the connection string for backend configuration.

## 2. Run TravelMemory Application
1. Clone the application
   ```
     git clone https://github.com/SyamalaKadmi/TravelMemory.git
     cd TravelMemory
   ```
2. Create `.env` file in the backend directory:
   ```
   cd backend/
   ```
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/travelmemory
   PORT=3001
   ```
3. Start the backend:
   ```bash
   node index.js &
   ```
