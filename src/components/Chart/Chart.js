import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { getUserPhotosByUId } from '../../services/services';
import useUser from '../../hooks/useUser';

Chart.register(CategoryScale);

const BarChart = () => {
    function getWeek(userPhotos) {
        var dataArray = [];
        var dateArray = [];
        var likesArray = [];
        var date = new Date();
        date.setHours(0,0,0,0);
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();
    
        var time = date.getTime();
        var likes = 0;
        if (userPhotos != null) {
            let length = Object.keys(userPhotos).length;
            if (length > 0)
                for (let i = 0; i < length; i++){
                    if (userPhotos[i].dateCreated>=time && userPhotos[i].dateCreated < (time + 86400 * 1000))
                        likes += Object.keys(userPhotos[i].likes).length;
                }
            }
        likesArray.push(likes);
    
        dateArray.push(dd + '/' + mm + '/' + yyyy);
        for (let i = 0; i < 6; i++) {
            date.setDate(date.getDate() - 1);
            dd = String(date.getDate()).padStart(2, '0');
            mm = String(date.getMonth() + 1).padStart(2, '0');
            yyyy = date.getFullYear();
            dateArray.push(dd + '/' + mm + '/' + yyyy);

            time = date.getTime();
            likes = 0;
            if (userPhotos != null) {
                let length = Object.keys(userPhotos).length;
                if (length > 0)
                    for (let i = 0; i < length; i++){
                        if (userPhotos[i].dateCreated>=time && userPhotos[i].dateCreated < (time + 86400 * 1000))
                            likes += Object.keys(userPhotos[i].likes).length;
                    }
                }
            likesArray.push(likes);
        }
    
        dataArray.push(dateArray.reverse());
        dataArray.push(likesArray.reverse());
        return dataArray;
    }
    
    function getMonth(userPhotos) {
        var dataArray = [];
        var likesArray = [];
        var dateArray = [];
        var date = new Date();
        date.setHours(0,0,0,0);
        date.setDate(1);
        var endOfMonthDate = new Date(date.getTime());
        endOfMonthDate.setMonth(date.getMonth() + 1);
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();
        
        dateArray.push(mm + '/' + yyyy);
    
        var time = date.getTime();
        var endOfMonthTime = endOfMonthDate.getTime();
        var likes = 0;
        if (userPhotos != null) {
            let length = Object.keys(userPhotos).length;
            if (length > 0)
                for (let i = 0; i < length; i++){
                    if (userPhotos[i].dateCreated >= time && userPhotos[i].dateCreated < endOfMonthTime)
                        likes += Object.keys(userPhotos[i].likes).length;
                }
            }
        likesArray.push(likes);
    
        for (let i = 0; i < 6; i++) {
            date.setMonth(date.getMonth() - 1);
            mm = String(date.getMonth() + 1).padStart(2, '0');
            yyyy = date.getFullYear();
            dateArray.push(mm + '/' + yyyy);
            
            endOfMonthDate.setMonth(date.getMonth() + 1);
            time = date.getTime();
            endOfMonthTime = endOfMonthDate.getTime();
            likes = 0;
            if (userPhotos != null) {
                let length = Object.keys(userPhotos).length;
                if (length > 0)
                    for (let i = 0; i < length; i++){
                        if (userPhotos[i].dateCreated >= time && userPhotos[i].dateCreated < endOfMonthTime)
                        likes += Object.keys(userPhotos[i].likes).length;
                    }
                }
            likesArray.push(likes);
        }
    
        dataArray.push(dateArray.reverse());
        dataArray.push(likesArray.reverse());
        return dataArray;
    }
    function handleChange(value, selectOptionSetter) {
        selectOptionSetter(value);
        if (value == "Daily")
            setDataArray(getWeek(userPhotos));
        else 
            setDataArray(getMonth(userPhotos));
    }

    const options = ["Daily", "Monthly"];
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const user = useUser();
    const [userPhotos, setUserPhotos] = useState(null);

    useEffect(() => {
        const getAllUserPhotos = async () => {
            const result = await getUserPhotosByUId(user.user.uid);
            setUserPhotos(result);
        };
        if (user.user.uid != null){
            getAllUserPhotos();
        }
    }, [user]);

    // useEffect(() => {
    //     setDataArray(getWeek(userPhotos));
    // }, [userPhotos]);

    const [dataArray, setDataArray] = useState(getWeek(userPhotos));
    
    return (
        <div className="container mx-auto md:max-w-screen-md  lg:max-w-screen-lg flex flex-col-reverse sm:flex-row my-12 mt-24 space-x-0 px-4 sm:space-x-8 justify-center space-y-8 sm:space-y-0">
            <div className="row">
                <select onChange={e => handleChange(e.target.value, setSelectedOption)}>
                    <option disabled selected value> -- select an option -- </option>
                    <option value="Daily">Daily</option>
                    <option value="Monthly">Monthly</option>
                </select>
            </div>
            <div className="row">
                <Bar
                    data={{
                        labels: [...dataArray[0]],
                        datasets: [
                            {
                                label: 'Number of likes',
                                data: [...dataArray[1]],
                                backgroundColor: ["#9400D3", "#4B0082", "#0000FF", "#00FF00", "#FFFF00", "#FF7F00", "#FF0000"]
                            }
                        ]
                    }}
                    height={400}
                    width={600}
                    options={{
                        maintainAspectRatio: false,
                        animation: false,
                        scales: {
                            y: {
                                ticks: {
                                    precision: 0
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default BarChart;