## Starting the project

This appliccation consists of 2 projects:

1. React application
2. NodeJS application

## React application

In order to start the React application locally you will need to conduct the following steps:

### `npm install`

Installs all the modules needed in order to run the project.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Runs the tests

## NodeJS application

In order to start the NodeJS application you will need to conduct the following steps:

### `docker-compose up`

Running this command will start the MySql database server and the NodeJS server.
The database will be populated with an initial user admin/admin.

For development puropses only:

### `npm install`

### `npm start`

Server starts on port 3001 and requests can be conducted like:

Creating a user:
curl --request POST \
  --url http://localhost:3001/user \
  --header 'Content-Type: application/json' \
  --data '{
"username": "admin",
"password": "admin",
"visitorId": "abc"
}'

Fetching a user by user id:
curl --request GET \
  --url 'http://localhost:3001/user?id=1'

### Database:

The database contains following tables:

1. `users`
   In this table username and password are stored for all registered users.
2. `userSession`
   In this table all user sessions are stored with username, timestamp and visitorId.
3. `blockedUser`
   In this table we store all data around blocked users which tried multiple failed login attemps over a period of 5 minutes and any further login attempt is blocked for 5 minutes.

### Scope of the project

The scope of this project is to explain the importance of using FingerprintJS in order to prevent fraudulous API requests.

### Implementation

When the users perform the login requests a `visitorId` is generated using `FingerprintJS API` and the `visitorId` is persisted in the database with the timestamp of the login and the username in the `userSession` table.

This persisted `visitorId` allows the application to ensure that if there were any fraudulous requests involving this `visitorId` the owners of the appliation are notified and if the user owning that malicious `visitorId` tries to login again the malicius user is be blocked and the owners of the application are notified.

### Further implementation and proposed solution for detecting account accounts being hacked

As an extra level of security by calling the `ServerAPI` the details of the previous visits are detected and if some extraordinary activity is detected for that `visitorId` then `Two Factor Authentication` will be provided to the user and if the user is indeed the owner of the account then login will be performed and otherwise the user will be informed that the account has been hacked.

Extraordinary activity represents tracking the IP, region from which the user authenticated for the last 50 login attempts and if the IP, region information is different an extra level of security such as `Two Factor Authentication` and email confirmation is provided to the user to ensure the account has not been hacked.

The intention of using `ServerAPI` for fetching the history of the users visits is to be able to compare the `ip` of the user, the `ipLocation` of the user and more specifically details of current visit with the most recent timestamp with previos timestamp and if some abnormal activity is deetected like for example the user loggeed in at 8AM from Europe/London and at 9AM from USA/New York it means that thee account has been hacked and then the user could use Two Factor Authentication when loggin in and login is not allowed and the user receives an email with the information to confirm the login details and including the information that the account has been hacked. This information is obtained from ServerAPI and from which details for all the visits are obtained.

