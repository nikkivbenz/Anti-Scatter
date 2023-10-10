//Katherine Hernandez 

// Importing the CSS file to apply styles to this component
import "./style.css";

// Importing various components from different files
import { Vector as Vector_0 } from "assets/Vector_0"; // Importing Vector component from "assets/Vector_0"
import { SigninButton as SigninButton_0 } from "./SigninButton_0"; // Importing SigninButton_0 component from the current directory
import { EnteryourEmailAddress as EnteryourEmailAddress_0 } from "./EnteryourEmailAddress_0"; // Importing EnteryourEmailAddress_0 component from the current directory
import { EnterPassword as EnterPassword_0 } from "./EnterPassword_0"; // Importing EnterPassword_0 component from the current directory
import { EmailText as EmailText_0 } from "./EmailText_0"; // Importing EmailText_0 component from the current directory
import { PasswordText as PasswordText_0 } from "./PasswordText_0"; // Importing PasswordText_0 component from the current directory
import { Logo as Logo_0 } from "./Logo_0"; // Importing Logo_0 component from the current directory
import { Welcome as Welcome_0 } from "./Welcome_0"; // Importing Welcome_0 component from the current directory

// Defining a React functional component named SigninPage1
export const SigninPage1 = () => {
  return (
    // This component renders a div element with a specific class name
    <div className="SigninPage1_1_93">
      {/* Rendering various imported components within this div */}
      <Vector_0 />                     {/* Render the Vector_0 component */}
      <SigninButton_0 />               {/* Render the SigninButton_0 component */}
      <EnteryourEmailAddress_0 />      {/* Render the EnteryourEmailAddress_0 component */}
      <EnterPassword_0 />             {/* Render the EnterPassword_0 component */}
      <EmailText_0 />                 {/* Render the EmailText_0 component */}
      <PasswordText_0 />              {/* Render the PasswordText_0 component */}
      <Logo_0 />                      {/* Render the Logo_0 component */}
      <Welcome_0 />                   {/* Render the Welcome_0 component */}
    </div>
  );
};
