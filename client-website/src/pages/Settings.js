import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';




function Settings() {
  return (
    <Row> 
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="home" title="Home">
       have privacy settings toggled here 
      </Tab>
      <Tab eventKey="profile" title="Profile">
      Have email, name, notifications, email notifications allow to be edited here
      </Tab>
    
    </Tabs>
    </Row> 
  );
}


export default Settings; 