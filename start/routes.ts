/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.group(()=>{
  Route.post('/',()=>{
    return 'Hello world'
  });
  Route.post('/register','AuthController.register');
  Route.post('/login','AuthController.login');
  Route.post('/logout','AuthController.logout');
  Route.post('/check-email','AuthController.checkAndSendMail')
  Route.post('/confirm-password-change','AuthController.confirmPassword').as('confirm-password-change');
})

Route.group(()=>{
  // SIGN IN ROUTES
  Route.get('/github-sign-in', 'AuthController.redirect')
//OAuth CALLBACK
  Route.get('/github-sign-in-callback', 'AuthController.handleCallback');
})

Route.group(()=>{
  Route.resource('/users', 'UsersController').apiOnly();
}).middleware(['auth','isAdmin'])



