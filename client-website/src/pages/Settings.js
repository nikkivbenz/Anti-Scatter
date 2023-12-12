
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import React, { useContext, useEffect } from 'react'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext
import ToggleButton from './ToggleButton'; // Import ToggleButton


function Settings() {

  // const [data, setData] = useState([]);
  let navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Use the theme from the context

  useEffect(() => {
      const verifyCookie = async () => {
          try {
              const storedToken = localStorage.getItem("token");
              if (!storedToken) {
                  navigate("/login");
                  return;
              }

              const { data } = await axios.post(
                  "https://anti-scatter-36f9c5f65c17.herokuapp.com/",
                  { token: storedToken }
              );

              if (!data.status) {
                  localStorage.removeItem("token");
                  navigate("/login");
              }

              navigate('/settings')
          } catch (error) {
              console.error("Error verifying cookie:", error);
              navigate("/login");
          }
      };

      verifyCookie();
  }, [navigate]);

  
  return (
    <Row> 
        <Tabs defaultActiveKey="apperance" id="justify-tab-example" className="mb-3" justify>
            <Tab eventKey="appearance" title="Appearance">
                <div>
                    <h3>Current Theme: {theme === 'dark' ? 'Dark' : 'Light'}</h3>
                    <ToggleButton /> {/* Dark mode toggle */}
                </div>
            </Tab>
            {/* Additional tabs can be added here */}
        </Tabs>
    </Row> 
  );
}


export default Settings; 