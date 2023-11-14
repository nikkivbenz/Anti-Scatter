import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const BlockSchedule = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [userId, setUserId] = useState("");
    const [schedules, setSchedules] = useState([]);
    const [newSchedule, setNewSchedule] = useState({
        userId: '',
        website: '',
        days: [],
        startTime: '',
        endTime: '',
    });
    const [isCreatingSchedule, setIsCreatingSchedule] = useState(false);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/blockschedule/${userId}`);
            const schedulesArray = Object.values(response.data.blockSchedule);
            setSchedules(schedulesArray);
        } catch (error) {
            console.log('Error fetching schedules:', error);
        }
    };

    useEffect(() => {
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
            setUserId(user._id);
            return status
                ? userId
                : (removeCookie("token"), navigate("/login"));
            };

        verifyCookie();

        if (userId) {
            fetchSchedules();
        }
    }, [cookies, navigate, removeCookie, userId, fetchSchedules]); // Trigger the fetch when the component mounts

    

    const saveSchedule = async (newSchedule) => {
        try {
            const schedule = {
                ...newSchedule,
                userId: userId,
            };

            const { data } = await axios.post(
                "http://localhost:4000/blockschedule",
                schedule,
                { withCredentials: true }
            );

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
        saveSchedule(newSchedule);

        fetchSchedules();

        // After saving, reset the 'newSchedule' state and exit the creation mode
        setNewSchedule({ userId: '', website: '', days: [], startTime: '', endTime: ''});
        setIsCreatingSchedule(false);
    };

    const handleDayChange = (e) => {
        const { value } = e.target;
        const { days } = newSchedule;
        
        if (days.includes(value)) {
            const newDays = days.filter((day) => day !== value);
            setNewSchedule({ ...newSchedule, days: newDays });
        } else {
            setNewSchedule({ ...newSchedule, days: [...days, value] });
            console.log(days)
        }
    };

    const handleDeleteSchedule = async (scheduleId) => {
        try {
            const { data } = await axios.delete(`http://localhost:4000/blockschedule/${scheduleId}`);
            const { success, message } = data;
            if (success) {
                toast.success(message, {
                    position: "bottom-left",
                });

                // After deleting the schedule, refetch the schedules
                fetchSchedules();
            } else {
                toast.error(message, {
                    position: "bottom-left",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <div>
            <h1>Block Schedule</h1>
            
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
                                <td>{schedule.timeFrame.startTime} - {schedule.timeFrame.endTime}</td>
                                <td>
                                    <button onClick={() => handleDeleteSchedule(schedule._id)}>Delete</button>
                                </td>
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
                    <div>
                        <p>Days:</p>
                        <label>
                            <input
                                type="checkbox"
                                value="MON"
                                checked={newSchedule.days.includes("MON")}
                                onChange={handleDayChange}
                            />
                            MON
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="TUE"
                                checked={newSchedule.days.includes("TUE")}
                                onChange={handleDayChange}
                            />
                            TUE
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="WED"
                                checked={newSchedule.days.includes("WED")}
                                onChange={handleDayChange}
                            />
                            WED
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="THU"
                                checked={newSchedule.days.includes("THU")}
                                onChange={handleDayChange}
                            />
                            THU
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="FRI"
                                checked={newSchedule.days.includes("FRI")}
                                onChange={handleDayChange}
                            />
                            FRI
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="SAT"
                                checked={newSchedule.days.includes("SAT")}
                                onChange={handleDayChange}
                            />
                            SAT
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="SUN"
                                checked={newSchedule.days.includes("SUN")}
                                onChange={handleDayChange}
                            />
                            SUN
                        </label>
                    </div>
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
        <div>
            <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
        <ToastContainer />
        </>
    );
};

export default BlockSchedule;
