//Written by Katherine Hernandez
import React, { useEffect } from 'react'; // Import useEffect
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';


function FAQ() {

  let navigate = useNavigate();
  
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

              navigate('/FAQ')
          } catch (error) {
              console.error("Error verifying cookie:", error);
              navigate("/login");
          }
        };
  
        verifyCookie();
    }, [navigate]);
      
  return (
    <> 
    <div id="content"> 
  
    <Accordion defaultActiveKey="1" id="main-content">
      <Accordion.Item eventKey="1">
        <Accordion.Header>Q: What is "My Blocklist" and how does it work?</Accordion.Header>
        <Accordion.Body>
        A: "My Blocklist" is a feature designed to help you focus better during your work or study sessions. In this mode, you can add the URLs of websites that you find distracting. These websites will be blocked, allowing you to concentrate without interruptions. To add a site to your Blocklist, simply enter its URL in the designated field. Remember, the Blocklist mode only allows access to websites that are not on this list. Additionally, you have the flexibility to switch between Blocklist, Allowlist, and Block by Theme modes when starting a session. 
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>Q: How does "My Allowlist" function?</Accordion.Header>
        <Accordion.Body>
        A: "My Allowlist" operates as the opposite of the Blocklist mode. Here, you can specify websites you wish to access exclusively during your sessions. By entering the URLs of these sites in the designated field, you ensure that only these selected websites are accessible, helping to maintain your focus. Like the Blocklist, you can switch between Blocklist, Allowlist, and Block by Theme modes depending on your needs.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>Q: Can you explain the Social feature?</Accordion.Header>
        <Accordion.Body>
        A: The Social feature is a great way to connect with friends and encourage collective studying. Users earn levels based on their study activity and can invite friends to join a session. When you create a session, your friends are invited, and your session settings are applied to them as well. It's a fantastic way to study together and stay motivated.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="4">
        <Accordion.Header>Q: How can I get Technical Support?</Accordion.Header>
        <Accordion.Body>
        A: For any technical support, please feel free to contact our team:

          Katherine Hernandez: katherine.hernandez01@student.csulb.edu
          Nikki Benitez: nikkivalerie.benitez@student.csulb.edu
          Joshua Anicete: joshua.anicete01@student.csulb.edu
          Kevin Nguyen: kevin.nguyen40@student.csulb.edu
          Raphael Burce: raphael.burce@student.csulb.edu
          We are here to help you with any issues or queries you may have!
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="5">
        <Accordion.Header>Q: How can I use the Anti-Scatter application on my mobile phone?</Accordion.Header>
        <Accordion.Body>
        A: On iOS, use Safari to navigate to our site, then tap the 'Share' button followed by 'Add to Home Screen.' For Android, use Chrome to open the site, tap the menu icon, and select 'Add to Home Screen.' This will create an icon on your home screen for quick access, just like a regular app.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="6">
        <Accordion.Header>Q: What is "Block by Theme" mode and how does it differ from Blocklist and Allowlist modes?</Accordion.Header>
        <Accordion.Body>
        A: "Block by Theme" mode is a unique feature of Anti-Scatter designed to enhance your focus based on specific themes or activities. Unlike Blocklist mode, which blocks designated distracting sites, or Allowlist mode, which allows only specified sites, "Block by Theme" mode restricts website access based on the theme of the session you choose. For instance, if you select a study theme, only educational and resourceful websites will be accessible. This mode helps to tailor your internet access according to the specific theme of your work or study session, ensuring a distraction-free environment.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
    </>
  );
}

export default FAQ;