I have used Postgresql as backend database and prisma.io ORM which connects to postgresql through DATABASE_URL from .env file

![image](https://user-images.githubusercontent.com/67574741/195686483-ff230a09-957c-40f9-9496-3c5f973c0542.png)

I made a successful connection to mysql database using dbConnection.js but then later on due to short time period eventually used Postgresql. 
But the database connection can be found in below image:

![image](https://user-images.githubusercontent.com/67574741/195687734-8c15c6e9-8e59-49c1-9f2a-2c139327162f.png)

- Controllers.js only handles fields-validation coming from the frontend and no database connectivity is there in controllers.

- business-rules contains all the database touching things.

- verifyToken.js handles token data and validate the access/refresh token but for the sake of simplicity,
   I have just passed userId to get the value for each API's created_by column.

![image](https://user-images.githubusercontent.com/67574741/195689250-6838844d-fb45-4821-8279-f52da0877533.png)


- route.js where all the rest api routes are defined.

- zocket.postman_collection.json contains postman APIs. 
