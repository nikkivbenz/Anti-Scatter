import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const BlockSchedule = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [schedules, setSchedules] = useState([]);
    const [newSchedule, setNewSchedule] = useState({
        website: '',
        days: [],
        startTime: '',
        endTime: '',
    });
    const [isCreatingSchedule, setIsCreatingSchedule] = useState(false);

    useEffect(() => {
        // Fetch schedule data from MongoDB or your API and set it in the 'schedules' state
        // You can use libraries like Axios or fetch to make API requests
        // Example: fetchScheduleData().then(data => setSchedules(data));
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
            }
            
            const { data } = await axios.post(
                "http://localhost:4000/",
                {},
                { withCredentials: true }
            );
            
            const { status, user } = data;
            setUsername(user);
            return status
                ? toast(`Hello ${user}`, {
                    position: "top-right",
                })
                : (removeCookie("token"), navigate("/login"));
            };
            verifyCookie();

        if (username) {
            const fetchSchedules = async () => {
                try {
                    const response = await axios.get("http://localhost:4000/blockschedule?userId=${username._id}");
                    const schedulesArray = Object.values(response.data);
                    setSchedules(schedulesArray);
                    console.log(schedulesArray);
                } catch (error) {
                    console.log('Error fetching schedules:', error);
                }
            };

            fetchSchedules();
        }
    }, [cookies, navigate, username, removeCookie]); // Trigger the fetch when the component mounts

    const saveSchedule = async (newSchedule) => {
        try {
            setNewSchedule({
                ...newSchedule,
                userId: username._id,
            });

            const { data } = await axios.post(
                "http://localhost:4000/blockschedule",
                {
                    ...newSchedule,
                },
                { withCredentials: true }
            );
            console.log(data);
            const { success, message } = data;
            if (success) {
                toast.success(message, {
                    position: "bottom-left",
                });
            } else {
                toast.error(message, {
                    position: "bottom-left",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateSchedule = () => {
        setIsCreatingSchedule(true);
    };

    const handleSaveSchedule = () => {
        // Send the new schedule data to the server and update the 'schedules' state
        // Example: createSchedule(newSchedule).then(updatedSchedules => setSchedules(updatedSchedules));
        saveSchedule(newSchedule).then(updatedSchedules => setSchedules(updatedSchedules));
        
        // After saving, reset the 'newSchedule' state and exit the creation mode
        setNewSchedule({ userId: '', website: '', days: [], startTime: '', endTime: ''});
        setIsCreatingSchedule(false);
    };

    return (
        <div>
            <h1>Schedule</h1>
            
            {schedules.length === 0 ? (
                <p>You currently have no study schedule.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Website</th>
                            <th>Days</th>
                            <th>Time Frame</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule) => (
                            <tr key={schedule._id}>
                                <td>{schedule.website}</td>
                                <td>{schedule.days.join(", ")}</td>
                                <td>{schedule.startTime} - {schedule.endTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {isCreatingSchedule ? (
                <div>
                    <input
                        type="text"
                        placeholder="Website"
                        value={newSchedule.website}
                        onChange={(e) => setNewSchedule({ ...newSchedule, website: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Days (e.g., M, T, W)"
                        value={newSchedule.days}
                        onChange={(e) => setNewSchedule({ ...newSchedule, days: e.target.value.split(", ") })}
                    />
                    <input
                        type="time"
                        value={newSchedule.startTime}
                        onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                    />
                    <input
                        type="time"
                        value={newSchedule.endTime}
                        onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
                    />
                    <button onClick={handleSaveSchedule}>Save</button>
                </div>
            ) : (
                <button onClick={handleCreateSchedule}>Create New Schedule</button>
            )}
        </div>
    );
};

export default BlockSchedule;
