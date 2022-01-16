## NodeJS application

## Start application with all services running

In order to start the NodeJS application you will need to conduct the following steps:

```
yarn start-all
```

Running this command will start the MySql database server and the NodeJS server.
The database will be populated with an initial user admin/admin.

## Start application for development purpose

For development puropses only you can only start the database:

```
yarn start-dev
```

The NodeJS application can be started running:

```
yarn start
```

Server starts on port 3001 and requests can be conducted like:

Creating a user:
```
curl --request POST \
  --url http://localhost:3001/user \
  --header 'Content-Type: application/json' \
  --data '{
"username": "admin",
"password": "admin",
"visitorId": "abc"
}'
```

Fetching a user by user id:
```
curl --request GET \
  --url 'http://localhost:3001/user?id=1'
```

## Database:

The database contains following tables and the `users` table is prepopulated with the admin user for testing purposes.

1. `users`
   In this table username and password are stored for all registered users.

| id | username  | password 
| :-----: | :-: | :-: | 
| 1 | admin | admin | 

2. `user_session`
   In this table all user sessions are stored with username, timestamp and visitorId.


| id | username  | timestamp  | visitorId
| :-----: | :-: | :-: | :-: |
| 1 | admin | 2022-01-16 13:34:59 | iBN1BK30PPDCZthhhhhh

3. `blocked_user`
   In this table we store all data around blocked users which tried multiple failed login attemps over a period of 5 minutes and any further login attempt is blocked for 5 minutes.

| id | username  | noOfTries  | timestamp
| :-----: | :-: | :-: | :-: |
| 1 | admin | 5 | 2022-01-16 13:34:59

## Scope of the project

The scope of this project is to explain the importance of using FingerprintJS in order to prevent fraudulent API requests.

### Implementation

When the users perform the login requests a `visitorId` is generated using `FingerprintJS API` and the `visitorId` is persisted in the database with the timestamp of the login and the username in the `user_session` table.

This persisted `visitorId` allows the application to ensure that if there were any fraudulent requests involving this `visitorId` the owners of the appliation are notified and if the user owning that malicious `visitorId` tries to login again the malicius user is be blocked and the owners of the application are notified.

### Further implementation and proposed solution for detecting account accounts being hacked

As an extra level of security by calling the `ServerAPI` the details of the previous visits are detected and if some extraordinary activity is detected for that `visitorId` then if the user has `Two Factor Authentication` enabled in the app then the user will be allowed to lo login only if `Two Factor Authentication` is successfull and if the user is indeed the owner of the account then login will be performed and otherwise the user will be informed that the account has been hacked. Another proposal would be that the user receives an email indicating suspicious activity on the website and receives an email where the user confirms the login action.

Extraordinary activity represents tracking the IP and the region from which the user authenticated for the last 50 login attempts and if the IP or the region information is different an extra level of security such as `Two Factor Authentication` and email confirmation is provided to the user to ensure the account has not been hacked.

The intention of using `ServerAPI` for fetching the history of the users visits is to be able to compare the `ip` of the user, the `ipLocation` of the user and more specifically details of current visit with the most recent timestamp with previos timestamps and if some abnormal activity is detected like for example the user logged in at 8AM from Europe/London and at 9AM from USA/New York it means that the account has been hacked and then the user could use Two Factor Authentication for logging in and the user receives an email informing that a login is performed from a new region and a new IP and the user is asked to confirm the login details and if the user does not confirm then no login is performed. All this information is obtained from `ServerAPI` and from its response all these details including IP and refion informaation for all the visits are obtained.

