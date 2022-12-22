const timeDisplay = document.querySelector('.time');
const temp = document.querySelector('.temp');
const dateDisplay = document.querySelector('.date');
const nameDisplay = document.querySelector('.name');
const weatherIcon = document.querySelector('.weather-icon');
const conditionDisplay = document.querySelector('.condition');
const cloudDisplay = document.querySelector('.cloud');
const humidityDisplay = document.querySelector('.humidity');
const windDisplay = document.querySelector('.wind');
const search = document.querySelector('.search');
const form = document.getElementById('get-city');
const btn = document.querySelector('.submit');
const home = document.querySelector('.home');
const cities = document.querySelectorAll('.city');

let cityInput='London';
cities.forEach((city)=>{
    city.addEventListener('click',(e)=>{
        console.log(cityInput);
        cityInput=e.target.innerHTML;
        console.log(cityInput);
        fetchWeatherData();
        home.style.opacity='0';

    });
});

form.addEventListener('submit',(e)=>{
    console.log(search.value);
    if(search.value.length==0){
        alert("Please type a city name");
    }
    else{
        cityInput=search.value;
        fetchWeatherData();
        search.value='';
        home.style.opacity='0';
    }
    e.preventDefault();
});

function dayofWeek(day,month,year){
    const weekday=[
        'Sunday',
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        'Friday',
        "Saturday",
        
    ];
    let x =new Date(`${year}-${month}-${day}`).getDay();
    return weekday[x];   
};

function fetchWeatherData(){
    fetch(`https://api.weatherapi.com/v1/current.json?key=e00ceb505c7c48ebbda92341222112&q=${cityInput}&aqi=no`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        temp.innerHTML=data.current.temp_c + "&#176;";
        conditionDisplay.innerHTML=data.current.condition.text;
        const date = data.location.localtime;
        const  y = parseInt(date.substr(0,4));
        const  m = parseInt(date.substr(5,2));
        const  d = parseInt(date.substr(8,2));
        const time = date.substr(11);

        dateDisplay.innerHTML=`${dayofWeek(d,m,y)} ${d},${m},${y}`;
        timeDisplay.innerHTML=time;
        nameDisplay.innerHTML=data.location.name;
        const iconId = data.current.condition.icon.substr(
            "//cdn.weatherapi.com/weather/64x64/".length);
            weatherIcon.src="./icons/"+iconId;
            cloudDisplay.innerHTML=data.current.cloud+"%";
            humidityDisplay.innerHTML=data.current.humidity+"%";
            windDisplay.innerHTML=data.current.wind_kph+"km/hr";

            let timeOfDay='day';
            const code = data.current.condition.code;
            if(!data.current.is_day){
                timeOfDay='night';
            }
            if(code==1000){
                home.style.backgroundImage=`url(./icons/${timeOfDay}/clear.jpg)`;
                btn.style.background="#e5ba92";
                if(timeOfDay=='night'){
                    btn.style.background="#181e27";

                }
            }
            else if(code==1003||code==1006||code==1009||code==1030||code==1069||code==1087||code==1135||code==1273||code==1276||code==1279||code==1282){
                home.style.backgroundImage=`url(./icons/${timeOfDay}/cloudy.jpg)`;
                btn.style.background="#fa6d1b";
                if(timeOfDay=='night'){
                    btn.style.background="#181e27";

                }
            }
            else if(code==1063||code==1069||code==1072||code==1150||code==1153||code==1180||code==1183||code==1186||code==1189||code==1192||code==1195||code==1204||code==1207||code==1240||code==1243||code==1246||code==1249||code==1252){
                home.style.backgroundImage=`url(./icons/${timeOfDay}/rainy.jpg)`;
                btn.style.background="#647d75";
                if(timeOfDay=='night'){
                    btn.style.background="#325c80";

                }
            }
            else{
                
                home.style.backgroundImage=`url(./icons/${timeOfDay}/snowy.jpg)`;
                btn.style.background="#4d72aa";
                if(timeOfDay=='night'){
                    btn.style.background="#1b1b1b";
    
                }
            }


            home.style.opacity='1';

    })
    .catch(()=>{
        alert("City not found!!!");
        home.style.opacity='1';
    });
}
fetchWeatherData();
home.style.opacity='1';

