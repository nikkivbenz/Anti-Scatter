import React  from 'react'; 
import axios from 'axios'; 

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie, 
  Cell
} from 'recharts';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function TotalStudyTime() {
  return (
    <Card >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Total Study Time
        </Typography>
        <Typography variant="body2">
          157 minutes 
        </Typography>
      </CardContent>
    </Card>
  );
}

function StudyStreak() {
  return (
    <Card >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Study Streak
        </Typography>
        <Typography variant="body2">
          7 days
        </Typography>
      </CardContent>
    </Card>
  );
}

function ProductivityScore() {
  return (
    <Card >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Productivity Score
        </Typography>
        <Typography variant="body2">
          8.5 out of 10
        </Typography>
      </CardContent>
    </Card>
  );
}


const bargraph_data = [
    { name: 'Mon', studytime: 14 },
    { name: 'Tue', studytime: 30 },
    { name: 'Wed', studytime: 15},
    { name: 'Thur', studytime: 27},
    { name: 'Fri', studytime: 18},
    { name: 'Sat', studytime: 23 },
    { name: 'Sun', studytime: 34 },
  ];
  
  function BarGraph() {
    return (
      <div className="bargraph"> 
        <h3> Weekly Study Report! </h3>
      <ResponsiveContainer width="100%" height={200} >
        <BarChart
          width={500}
          height={200}
          data={bargraph_data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="studytime" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      </div> 
    );
  }
  


  const piechart_data = [
    { name: '327', value: 40 },
    { name: '491B', value: 30 },
    { name: '429', value: 30 },
    { name: '456', value: 57 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  function PieChart1() {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={piechart_data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={(entry) => entry.name}
          >
            {
              piechart_data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))
            }
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ScoreCards() {
    return (
        <Box class = "container" sx={{ flexGrow: 1, maxWidth: 900}} id="scorecards"> {/* Changed flexGrow to 1 */}
        <Grid container spacing={2} columns={12}> {/* Changed columns to 12 */}
          <Grid item xs={4}> {/* Changed xs to 4 */}
            <Item>
              <TotalStudyTime /> 
            </Item>
          </Grid>
          <Grid item xs={4}> {/* Added another Grid item */}
            <Item>
              <StudyStreak/> 
            </Item>
          </Grid>
          <Grid item xs={4}> {/* Added another Grid item */}
            <Item>
              <ProductivityScore/> 
            </Item>
          </Grid>
        </Grid>
      </Box>
    );
  }

  const Dashboard = () => {
    // const [data, setData] = useState([]);
    const navigate = useNavigate();

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

                // Fetch dashboard data if token is valid
                navigate('/dashboard')
            } catch (error) {
                console.error("Error verifying cookie:", error);
                navigate("/login");
            }
        };

        verifyCookie();
    }, [navigate]);

    // const fetchData = () => {
    //     axios.get('http://localhost:4000/api/hello')
    //         .then(response => {
    //             setData(response.data.message);
    //         })
    //         .catch(error => {
    //             console.error('Error: ', error);
    //         });
    // };   
    return (
      <>
          <div className="container p-0" id="content">
              <ScoreCards />
              <div className="body-text">
                  <br />
                  <Row>
                      <Col xs={6}> <BarGraph /></Col>
                      <Col xs={6}> <PieChart1 /> </Col>
                  </Row>
              </div>
          </div>
      </>
  );
}

export default Dashboard;