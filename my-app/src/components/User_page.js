import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "../styles/user_page.css";

const User_page = () => {
// All coastal cities in Israel
const [cities, setCities] = useState([
"Tell aviv",
"ashdod",
"Ashkelon",
"bat-yam",
"herzliya",
"hadera",
"haifa",
"tiberias",
"tirat-Carmel",
"nahariya",
"netanya",
"akko",
"atlit",
"kiryat-Yam",
"rishon-lezion",
"eilat",
]);
const [chosenCity, setChosenCity] = useState("tell aviv");
const [day1, setDay1] = useState([]);
const [day2, setDay2] = useState([]);
const [day3, setDay3] = useState([]);

const [avg_speed_day1, setAvg_speed_day1] = useState(0);
const [avg_gust_day1, setAvg_gust_day1] = useState(0);
const [avg_speed_day2, setAvg_speed_day2] = useState(0);
const [avg_gust_day2, setAvg_gust_day2] = useState(0);
const [avg_speed_day3, setAvg_speed_day3] = useState(0);
const [avg_gust_day3, setAvg_gust_day3] = useState(0);

useEffect(() => {
//api by city name (address) get lon and lat + name
axios
.get(
`https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${chosenCity}`
)
.then((res) => {
const result = res.data;
//  console.log(result)

//api weather for tree days, gets lon and lat
let api_key = "05ecf94b536aa4b53ddae55921760b63";
axios
.get(
`https://api.openweathermap.org/data/2.5/forecast?lat=${result[0].lat}&lon=${result[0].lon}&appid=${api_key}`
)
.then((res) => {
const forcast = res.data;
// console.log(forcast.list);
setDay1(forcast.list.splice(0, 13));
setDay2(forcast.list.splice(0, 13));
setDay3(forcast.list.splice(0, 13));
});
});
}, [chosenCity]);

//build select list of cities and inject them into the render
let select = (
<select onChange={(e) => setChosenCity(e.target.value)}>
{cities.map((city) => {
return (
<option key={city} value={city}>
{city}
</option>
);
})}
</select>
);

//avg wind speed
useEffect(() => {
let avg_speed_day1 = 0;
let avg_gust_day1 = 0;
let avg_speed_day2 = 0;
let avg_gust_day2 = 0;
let avg_speed_day3 = 0;
let avg_gust_day3 = 0;
day1.map((three_hrs) => {
avg_speed_day1 += three_hrs.wind["speed"];
avg_gust_day1 += three_hrs.wind["gust"];
setAvg_speed_day1(avg_speed_day1);
setAvg_gust_day1(avg_gust_day1);
});
day2.map((three_hrs) => {
avg_speed_day2 += three_hrs.wind["speed"];
avg_gust_day2 += three_hrs.wind["gust"];
setAvg_speed_day2(avg_speed_day2);
setAvg_gust_day2(avg_gust_day2);
});
day3.map((three_hrs) => {
avg_speed_day3 += three_hrs.wind["speed"];
avg_gust_day3 += three_hrs.wind["gust"];
setAvg_speed_day3(avg_speed_day3);
setAvg_gust_day3(avg_gust_day3);
});
});

//day 1 forcast
let div_day1 = (
<div >
<h4>avg_s: {(avg_speed_day1 / day1.length).toFixed(2)}</h4>
<h4>avg_g: {(avg_gust_day1 / day1.length).toFixed(2)}</h4>

<div className="day_wrapper">
{day1.map((three_hrs,i) => {
return (
<div  className="three_hr_section"  style={{background:`linear-gradient(white ${three_hrs.wind["speed"]<30?three_hrs.wind["speed"]*5:three_hrs.wind["speed"]}%, #00ff00  )`}}   key={three_hrs.dt_txt}>
<p>{i==0 && <p > speed:  </p> }<p>{three_hrs.wind["speed"]}</p><br/></p>
<p>{i==0 && <p > guest:  </p> }<p>{three_hrs.wind["gust"]}</p><br/></p>
<p>{i==0 && <p > hour:</p> } <p>{three_hrs.dt_txt.split(' ')[1].split(':')[0]}:00</p></p>
</div>
);
})}
</div>
<hr />
</div>
);
//day 2 forcast
let div_day2 = (
<div >
<h4>avg_s: {(avg_speed_day2 / day2.length).toFixed(2)}</h4>
<h4>avg_g: {(avg_gust_day2 / day2.length).toFixed(2)}</h4>

<div className="day_wrapper">
{day2.map((three_hrs,i) => {
return (
<div  className="three_hr_section"  style={{background:`linear-gradient(white ${three_hrs.wind["speed"]<30?three_hrs.wind["speed"]*5:three_hrs.wind["speed"]}%, #00ff00  )`}}  key={three_hrs.dt_txt}>
<p>{i==0 && <p > speed:  </p> }<p>{three_hrs.wind["speed"]}</p><br/></p>
<p>{i==0 && <p > guest:  </p> }<p>{three_hrs.wind["gust"]}</p><br/></p>
<p>{i==0 && <p > hour:</p> } <p>{three_hrs.dt_txt.split(' ')[1].split(':')[0]}:00</p></p>
</div>
);
})}
</div>
<hr />
</div>
);
//day 1 forcast
let div_day3 = (
<div >
<h4>avg_s: {(avg_speed_day3 / day3.length).toFixed(2)}</h4>
<h4>avg_g: {(avg_gust_day3 / day3.length).toFixed(2)}</h4>

<div className="day_wrapper">
{day3.map((three_hrs,i) => {
return (
<div  className="three_hr_section"  style={{background:`linear-gradient(white ${three_hrs.wind["speed"]<30?three_hrs.wind["speed"]*5:three_hrs.wind["speed"]}%, #00ff00  )`}}   key={three_hrs.dt_txt}>
<p>{i==0 && <p > speed:  </p> }<p>{three_hrs.wind["speed"]}</p><br/></p>
<p>{i==0 && <p > guest:  </p> }<p>{three_hrs.wind["gust"]}</p><br/></p>
<p>{i==0 && <p > hour:</p> } <p>{three_hrs.dt_txt.split(' ')[1].split(':')[0]}:00</p></p>
</div>
);
})}
</div>
<hr />
</div>
);

return (
<div >
{select}
<div className="days_column">
{div_day1}
{div_day2}
{div_day3}
</div>

</div>
);
};

export default User_page;
