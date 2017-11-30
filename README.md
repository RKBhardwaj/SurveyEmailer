#React application used which is using Node express

**Description** - App is using Express server at the backend and ReactJS as the front end. For the Front along the ReactJS, app is also using Redux.


**Technology Stack used**

1. Backend
    1. Express - For creating the server enviornment
    1. PassportJS - For authenticate the User with Google, Facebook, Linkedin etc.
        1. Google - console.developers.google.com
        1. Facebook - developers.facebook.com
        1. Linkedin - developers.linkedin.com
    1. Mongoose - For handing the database connection with MongoDB.
    1. Cookie Session - For handling cookie and session within the app. Cookie session will be used 
    1. Concurrently - As we have two server, first running on node (express) and second server is used for React Front end. We use Concurrenlty node package to run both the server concurrently.
    1. Body Parser - Body parser module is used to parse the incoming request to json object in the server.
    
2. Frontend
    2. axios - For handing ajax request on the front end side.
    2. materializeCSS - for giving the style
    2. Redux - Redux is framework which is using react with flux concept.
        2. In Flux concept data flows only in one direction until it is visible to screen. Traditional flow is Action -> Dispatcher -> Store -> View 
    2. react stripe checkout - For handling the billing activity on the app.
    
    
**Deploying the client and Server code on the heroku / git environment**

**steps**

1. move to client directory
2. run the command npm run build -  all the files which are required will be compiled and bundles up in the build folder under client directory.






