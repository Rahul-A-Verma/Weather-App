let Apikey = "072aa7db1c79c02c07d80ec393db1e1f";
let userInput = document.querySelector(".search");
let button = document.querySelector(".btn")
let temperatur = document.querySelector(".temp")
let humidity = document.querySelector(".humidity")
let wind = document.querySelector(".wind")
let cityName = document.querySelector(".cityName")
let description = document.querySelector(".description")
let currentDate = document.querySelector(".date")
let image = document.querySelector(".image")
let weather = document.querySelector(".weather")
let errorMessage = document.querySelector(".errorMessage")

currentDate.innerHTML=new Date().toDateString()

function wheatherApi(city) {
    try{
     let api = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Apikey}`
  )
  api.then(function (raw) {
    if(raw.status===404){
        displayMsg("Invalid City")
    //    console.log("invalid")
    errorMessage.style.display="block"
    weather.style.display="none"
    throw new Error("Invalid city can't found!");
    }
    else{
        // console.log("valid")
        errorMessage.style.display="none"
    }
    // console.log(raw.status)
    return raw.json();
  }).then(function(data){
    console.log(data);
    temperatur.innerHTML=`${Math.round(data.main.temp)+"°C"}`
    humidity.innerHTML=`${data.main.humidity +"%"}`
    wind.innerHTML=`${Math.round(data.wind.speed)+" km/h"}`
    cityName.innerHTML=`${data.name}`
    description.innerHTML=`${data.weather[0].description}`
    // userInput.value=''

    if(data.weather[0].main=="Haze"){
        image.src='img/haze.png'
    }else if(data.weather[0].main=="Clouds"){
        image.src='img/clouds.png'
    }else if(data.weather[0].main=="Drizzle"){
        image.src='img/drizzle.png'
    }else if(data.weather[0].main=="Clear"){
        image.src='img/clear.png'
    }else if(data.weather[0].main=="Mist"){
        image.src='img/mist.png'
    }else if(data.weather[0].main=="Rain"){
        image.src='img/rain.png'
    }else if(data.weather[0].main=="Snow"){
        image.src='img/snow.png'
    }
    weather.style.display="block"

  })
    }
    catch(error){
        console.log("Error:" + error.message)
    }
  
}
// wheatherApi();
button.addEventListener('click',function(){
    let city = userInput.value
    console.log(city)
    if(city!==""){
    displayMsg("Please Wait...")
    wheatherApi(city)
    userInput.value=''
    errorMessage.style.display="block"
    weather.style.display="none"
    }
    else{
        displayMsg("Enter City name for weather information")
        errorMessage.style.display="block"
        weather.style.display="none"
        
        
    }
})


userInput.addEventListener("keydown", function(event){
    if(event.keyCode === 13){
        let city = userInput.value
        console.log(city)
        if(city!==""){
        displayMsg("Please Wait...")
        wheatherApi(city)
        userInput.value=''
        errorMessage.style.display="block"
        weather.style.display="none"
        }
        else{
            displayMsg("Enter City name for weather information")
            errorMessage.style.display="block"
            weather.style.display="none"
            
            
        }
        console.log("enter")
    }
   
})



function displayMsg(msg){
    errorMessage.innerHTML=`${msg}`
}