# DevTinder-Web

 - Created a Vite + React application
 - Remove unnecessary code
 - Install Tailwind css, DaisyUI
 - Add NavBar component to App.jsx

 - Create a NavBar.jsx separate Component file
 - Install react-router-dom
 - Create BrowserRouter > Routes > Route=/ Body > RouteChildren
 - Create an Outlet in yiur Body Component
 - Create a footer, Login page
 - Install axios
 - CORS - install in backedn => add middleware to add with configuration: origin, credentials: true
 - Whenever you're making API call so pass axios =>{ withCredentials: true }
 - Install @reduxjs/toolki + react-redux https://redux-toolkit.js.org/tutorials/quick-start
 -  => configureStore => Provider => createSlice => add reducer to store
 
 - Add redux devtools in chrome
 - Login and see if your data is coming properly in the store
 - NavBar should update as soon as user logs in
 
 - You shouldn't be access other routes without login
 - If Token is not present redirect to user to login page
 - Logout feacture
 - Get feed and add the feed in the store
 - build the userCard on feed
 - Edit profile Feature
 - show Toast Message on save of profile
 - New page - See all my connections
 - New page - See all my requests

 Body
     NavBar
     Router=/ => Feed
     Route=/login => Login
     Route=/connections => Connections
     Route=/profile => Profile