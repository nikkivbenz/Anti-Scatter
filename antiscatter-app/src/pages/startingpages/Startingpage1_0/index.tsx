// Importing the CSS file to apply styles to this component
import "./style.css";

// Importing various components from different files
import { Vector as Vector_0 } from "assets/Vector_0"; // Importing Vector component from "assets/Vector_0"
import { SigninButton as SigninButton_0 } from "./SigninButton_0"; // Importing SigninButton_0 component from the current directory
import { ToRegisterText as ToRegisterText_0 } from "./ToRegisterText_0"; // Importing ToRegisterText_0 component from the current directory
import { AntiScatterLogo as AntiScatterLogo_0 } from "./AntiScatterLogo_0"; // Importing AntiScatterLogo_0 component from the current directory

// Defining a React functional component named Startingpage1
export const Startingpage1 = () => {
  return (
    // This component renders a div element with a specific class name
    <div className="Startingpage1_1_112">
      {/* Rendering various imported components within this div */}
      <Vector_0 />                  {/* Render the Vector_0 component */}
      <SigninButton_0 />            {/* Render the SigninButton_0 component */}
      <ToRegisterText_0 />          {/* Render the ToRegisterText_0 component */}
      <AntiScatterLogo_0 />         {/* Render the AntiScatterLogo_0 component */}
    </div>
  );
};
