# Stooq api
The purpose of this project is querying stock quotes from https://stooq.com. For that, you need to run the following two projects:
## Stock-service
Api for querying stock quotes from https://stooq.com
### Instructions:
Install dependencies:  
`cd stock-service; npm install`;  
Start the stock-service:  
`node stock-service`;  
For testing:  
`cd stock-service; npx jest`.  
## Api-service
Api for controlling the interactions between users and Stock-service api
### Instructions:
Install dependencies:
  `cd api-service; npm install`;  
Provide .env data. For that, create .env file on api-service root dir and add following lines:  
```
SECRET=<secret for generating token. Eg.: mysecret>
STOCK_SERVICE_URI=<uri for stock services. Eg.: http://127.0.0.1:3002>
TOKEN_EXPIRES_IN=<Expiration time for tokens. Eg.: 1h>
```
Start the stock-service;  
Start the api-service:  
`cd api-service` (if not in this dir already); `npm start`;  
For testing:  
`cd api-service`(if not in this dir already);  
`npx jest` **stock-service must be running**  
#### Swagger
You can access Swagger interface by accessing the host followed by /docs route. Eg.: 
`http://127.0.0.1:3001/docs`
# Accessing quotes
It should be done in Api-service.  
Register a valid email using /register route. Use the given token to access the following routes:  
/stock  
/history  
/stats  
Bearer token must be provided on Authentication header  
[Bearer example](auth.jpg?raw=true)  
**After registering an user and getting a token, there is no need to inform user on those 3 routes. User will stay linked to the token until it expires. After that, you should register again to retrieve a new one**
