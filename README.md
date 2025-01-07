This project is no longer under active development and was archived on 2025-01-07.

# Facility Location Optimization Demo

## Overview

This app is built with [Create React App](https://github.com/facebook/create-react-app "Create React App"). It uses [Material UI](https://material-ui.com/ "Material UI") for themes and styling and [ReactBootstrapTable](http://allenfang.github.io/react-bootstrap-table/index.html "ReactBootstrapTable") for displaying tables.<br>
It uses [restaf-server](https://www.npmjs.com/package/@sassoftware/restaf-server "restaf-server") for its app server and [restaf](https://www.npmjs.com/package/@sassoftware/restaf "restaf") to make REST API calls to a SAS Viya Server. <br>
The optimization code is submitted using the ['runOptmodel'](https://go.documentation.sas.com/?docsetId=casactmopt&docsetTarget=casactmopt_optimization_details03.htm&docsetVersion=8.3&locale=en "runOptmodel") and executed using Cloud Analytic Services (CAS).
The Visual Analytics Report have now been upgraded to using the new ['VASDK'](https://communities.sas.com/t5/SAS-Communities-Library/Embedded-Insights-with-SAS-Visual-Analytics-SDK/ta-p/581481)

## Installation
- Obtain the code and sample data in this directory.
- Upload and promote the datasets as castables to your SAS Viya server in the 'Public' caslib (or whatever you ultimately set as your INPUTLIBNAME).
- Install node.js and Node Package Manager (npm) from this [website](https://www.npmjs.com/ "Download node.js and npm"), then perform the following steps on Windows Command Prompt:

```
  cd .\Facility_Location
  npm install
```
- Install a linter package into your favorite editor, like [Atom](https://atom.io/ "Download Atom") or [Visual Studio](https://visualstudio.microsoft.com/downloads/ "Download Visual Studio").

## Getting Started

### Configurations

#### Register App Client
Register a ClientID for your app using the [Resgiterclient](https://github.com/sassoftware/restaf/wiki/Managing-clientids/ "Register Client") package.

#### App.env File
Before starting the app, enter custom app environment variables in the app.env files as per instructions provided in the comments.
Note - if you change the names of these environment variables, step into appenv.js and set them accordingly.

### Running
Currently this app does not support Hot Reload.

After making a change issue the following to build and start the app.
```
  npm run app
```

## Organization

The directory structure is:
- src - where all the app code should be. I have used the following organization in the src directory
  - components - for all the react components
  - css - for all the css
  - helpers - use this for helper functions and components
  - providers - this is components for wrapping the components for react context

Until you get familiar with the app do not change anything outside of src directory

### React Context and BrowserHistory

The store and appEnv are available throughout the app as a react context named **AppContext**. The context has the following object:
  { store: store, appEnv: appEnv}

See TestStuff for an example of coding for access to the context.

It is also a good example of using withRouter to get access to the history object. You will need the history object to programmatically route the application.

The schema for the context is as follows:
```
  context = {
    store: <value of store>.
    viya: {
      session: <cas session>,
      services: {
        reports: <report restaf object>,
        reportTransform: <reporttransform restaf object>
      }
    }
  }
```

### Accessing the context

In your component import the AppContext
```
 import {AppContext} from '../providers';
 ```

 To access the contex object use the following syntax:

 ```
 let context - this.context;
 ```

### Advanced

Suggest not modifying this until you are comfortable with the flow of the application.

- index.js - this initializes restaf and invokes app.js
- app.js - this is where you will start your app. Currently it calls SideBar.js - This can be changed as needed.
- index.html - this is in the public directory.


## Custom Apps
The code is commented sufficiently to guide coders with intermediate level knowledge of javascript, React and SAS.
- Define App specific environment variables in the app.env and appenv.js files
- Step into the 'SideBar' component under the src/components directory
- Follow the instructions in the comments to make this app more customizable

## Contributing
We welcome your contributions! Please read CONTRIBUTING.md for details on how to submit contributions to this project.

## License
This project is licensed under the Apache 2.0 License.

## Additional Sources
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started "create-react-app").

To learn React, check out the [React documentation](https://reactjs.org/ "Learn React").
