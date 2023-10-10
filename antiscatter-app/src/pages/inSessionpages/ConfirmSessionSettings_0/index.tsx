//Katherine Hernandez 

// Importing the CSS file to apply styles to this component
import "./style.css";

// Importing various components from different files
import { Vector as Vector_0 } from "assets/Vector_0"; // Importing Vector component from "assets/Vector_0"
import { CloseButton as CloseButton_0 } from "./CloseButton_0"; // Importing CloseButton_0 component from the current directory
import { CloseSession as CloseSession_0 } from "./CloseSession_0"; // Importing CloseSession_0 component from the current directory
import { KeepPageOpenMessag as KeepPageOpenMessag_0 } from "./KeepPageOpenMessag_0"; // Importing KeepPageOpenMessag_0 component from the current directory
import { SessionName as SessionName_0 } from "./SessionName_0"; // Importing SessionName_0 component from the current directory
import { TimeLimit as TimeLimit_0 } from "./TimeLimit_0"; // Importing TimeLimit_0 component from the current directory

// Defining a React functional component named ConfirmSessionSettings
export const ConfirmSessionSettings = () => {
  return (
    // This component renders a div element with a specific class name
    <div className="ConfirmSessionSettings_1_2">
      {/* Rendering various imported components within this div */}
      <Vector_0 />                   {/* Render the Vector_0 component */}
      <CloseButton_0 />              {/* Render the CloseButton_0 component */}
      <CloseSession_0 />             {/* Render the CloseSession_0 component */}
      <KeepPageOpenMessag_0 />       {/* Render the KeepPageOpenMessag_0 component */}
      <SessionName_0 />              {/* Render the SessionName_0 component */}
      <TimeLimit_0 />               {/* Render the TimeLimit_0 component */}
    </div>
  );
};
