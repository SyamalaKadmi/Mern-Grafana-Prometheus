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
4. Backend application accessible at http://localhost:3001
   ![Images/backend.png](Images/backend.png)
5. Navigate to the frontend folder and create `.env`:
   ```bash
   cd TravelMemory/frontend
   sudo vi .env
   ```
   Add the backend URL:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:3001/
   ```
6. Install dependencies and start the frontend:
   ```bash
   npm install
   npm start &
   ```
7. Access the frontend: `http://localhost:3000`.
   ![Frontend](Images/frontend.png)

## 3. Integrate Prometheus
1. Install Prometheus
   ```
   sudo useradd --no-create-home --shell /bin/false prometheus
   wget https://github.com/prometheus/prometheus/releases/download/v2.48.0/prometheus-         2.48.0.linux-amd64.tar.gz
   tar xvf prometheus*.tar.gz
   cd prometheus*/
   ```
2. Create prometheus config [prometheus.yml](prometheus.yml)
3. Expose custom metrics in Node.js
   ``` bash
   cd backend
   npm install prom-client
   ```
4. Edit index.js to view metrics
5. Imstall mongodb exporter to scrape MongoDB metrics at localhost:9216
   ```
   docker run -d -p 9216:9216 --name mongodb_exporter \
   -e MONGODB_URI=mongodb://localhost:27017 \
   percona/mongodb_exporter:latest
   ```

## 4. Setup Grafana and Dashboards
1. Install Grafana
   ```
   sudo apt-get install -y apt-transport-https software-properties-common wget
   wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
   echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee          /etc/apt/sources.list.d/grafana.list
   sudo apt-get update
   sudo apt-get install grafana
   sudo systemctl enable grafana-server
   sudo systemctl start grafana-server
   ```
2. Configure Grafana
   - Access Grafana: http://localhost:3000 (user:admin/admin)
   - Add Prometheus as a data source
   - Import dashboards (Node.js, MongoDB)

## 5. Log Aggregration with Loki
1. Install Loki + Promtail (for log shipping)
   ```bash
   # Loki
   docker run -d --name=loki -p 3100:3100 grafana/loki:2.8.2

   # Promtail
   docker run -d --name=promtail \
     -v /var/log:/var/log \
     -v /etc/promtail:/etc/promtail \
     -p 9080:9080 grafana/promtail:2.8.2 \
     -config.file=/etc/promtail/promtail.yaml
   ```
2. Create promtail.yaml [promtail.yaml](promtail/promtail.yaml)
3. Connect Loki as a datasource in Grafana -> Explore Logs

## 6. Distributed Tracing with Jaeger
1. Run Jaeger
   ```bash
   docker run -d --name jaeger \
     -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \
     -p 5775:5775/udp -p 6831:6831/udp -p 6832:6832/udp \
     -p 5778:5778 -p 16686:16686 -p 14268:14268 \
     -p 14250:14250 -p 9411:9411 jaegertracing/all-in-one:1.48
   ```
   Jaeger UI: http://localhost:16686
2. Add tracing in Node.js backend
   - Install packages
     ```bash
     npm install jaeger-client opentracing
     ```
   - Add in index.js:
     ```
     const initTracer = require('jaeger-client').initTracer;

     const config = {
     serviceName: 'mern-backend',
     reporter: { logSpans: true },
     sampler: { type: 'const', param: 1 },
      };

      const tracer = initTracer(config, {});
      ```
## 7. Alerts & Anamoly detection
1. Set alerts in Grafana
   - Go to Alerts -> Create alert rules
   - Set conditions
        - API response time > 1s
        - Error count > 5 in 1 min
2. Enable Anamoly Detection plugin


