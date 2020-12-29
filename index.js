const isCity = document.getElementById('isCity')
isCity.innerHTML = `Loading...`
const weatherEl = document.getElementById('weatherEl')
const iconWind ='<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABoElEQVQ4jeXUPUgCYRgH8Kch15Ygt5oamoKIgrujIRqKmuTOM2iIRKIlKGgIotaCanIw73yv04LeBiGUsEwLk6Agl0jaWjQogj60Oz/yaQhatLLLpv7jA++PPzy8D8BfBB0d9TmBs6C9q6kmYE7gLJrAoiZyak3A09mJ9qvJkeeT+alFAAB/MLQQjVKzYVCSpGaJKCiteycVn48JHcRSj/ZBXbdyl4UNZ6J0Fj9/jexs6lamX7eyrcjzpqpBt6Ks7h/FLh/GBlETWCwGKSIiYjaDmsC+zwJbJby/K5SSiVtdZF0vQs8M8r1tZaBMvE6iqsN70eOLL8EKs5zIzJWBHqLGKaUmI2Dexi2XgURVZQAAQw2tnOcDJIS0SERBWVb8RkFd4NbKGro961uEkG5DDW3MUsUty4pCjC2lZ7YiSAjpDh3EUp+BusBmi9vudCmZSBfj4ZO8yI0XeKbvyTbUWBEEANiNHN1cT48mNZHdyEsr3tdIYC0foI4MP2BGgLof/RQAgPBhvNPno23fvasa/HX+IYiIdS6Xq4FS+vVZqiJv5Xsagl08jgIAAAAASUVORK5CYII=" /> '
async function getCityName() {
    const url="https://api.sypexgeo.net/"
    const response = await fetch(url)
    const data = await response.json()
    return data.city.name_en
}

async function getWeatherUrl (city='Kyiv'){
   const getCity = await getCityName();
   const url=`https://api.openweathermap.org/data/2.5/forecast?q=${getCity}&units=metric&appid=2f2d7377b2b08d3342a276cb291408d2`
   const response = await fetch(url)
   const data = await response.json()
   isCity.innerHTML = `Your city is ${getCity}*` 
   let [date, day, info, iconUrl, temp, mainInfo, description, icon, windSpeed] = '';
   let i = 0;
   let r = 0;
   row = document.createElement("div");
   row.classList.add(`rows-${r}`);
   data.list.forEach(element => {
        [dt, temp, mainInfo, description, icon, windSpeed] = [element.dt, element.main.temp, element.weather[0].main, element.weather[0].description, element.weather[0].icon, element.wind.speed];
        dt = new Date(dt * 1000 - 1);
        date = dt.getDate();
        iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        let clear = false;
        if (i==0) {clear=true}
        if (i % 2 ){
        info = document.createElement("div");
        info.classList.add('infoDate');
        info.innerHTML='';
        if (day!==date && i!=0) {
            info.classList.add('clear'); 
            r++; 
            row = document.createElement("div");
            row.classList.add(`rows`);
            clear=true;  
            info.innerHTML += '<div id="date">' + element.dt_txt.slice(5, -9) + '</div>';
        }
        info.innerHTML += '<img src=' + iconUrl + ' /> </br>';
        info.innerHTML += Math.round(temp) + '℃ </br>';
        info.innerHTML += iconWind + Math.round(windSpeed) + '</br>';
        clear ? info.innerHTML += element.dt_txt.slice(11, -3) : info.innerHTML += element.dt_txt.slice(10, -3);
        row.append(info)
        weatherEl.appendChild(row)
        day=date;
        }
        i++;
   });
   weatherEl.innerHTML +='<small>* determined based on your IP</small>';
   const today = document.getElementById('date');
    today.innerHTML = 'today';
}

const data = getWeatherUrl();