# TODO back-end-basic

This is my back-end application on express
without some client and databases(using json file for save data localy :3)
and for more comfortable you can use `Postman`

> Before start use my application u need install PostgreSQL on your PC,
> Next you need create user with password and database for created user
> After you need create .env file with keys:
```
DB_NAME
USER_NAME
USER_PASSWORD
HOST
TOKEN_KEY
PORT
```
> Finally just run this comands for migrate you database and run application
```
npm i
npx sequelize db:migrate
npm start
```
`npm start` this script run comand `nodemon index.js`, `nodemon` used to simplify development
If you wanna deploy this, you need create script with:
>
`node index.js` command

> If you wanna use other port, althow i wrote `3000` by default, if this env is not defined, you can create `.env` file in root folder(back-end-basic)
> and write `PORT=YOUR_PORT_NUMBER` or just hardcode the `const PORT` in `index.js` :)
