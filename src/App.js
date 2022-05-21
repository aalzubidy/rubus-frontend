// import logo from './logo.svg';
// import './App.css';
import Router from './AppRouter';

// Supertokens Import
import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

// Supertokens setup
SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
    appName: "rubus",
    apiDomain: "http://localhost:3030",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init({
      palette: {
        primary: '#2da8ff'
      },
      style: {
        container: {
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
        }
      },
      signInAndUpFeature: {
        signUpForm: {
          formFields: [{
            id: "name",
            label: "Full Name",
            placeholder: "First name and last name"
          }, {
            id: "organization",
            label: "Organization",
            placeholder: "Organization",
          }]
        }
      },
      emailVerificationFeature: {
        mode: "REQUIRED"
      }
    }),
    Session.init()
  ]
});

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
