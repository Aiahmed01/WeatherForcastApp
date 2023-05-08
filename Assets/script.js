var searchHistory = [];




function getWeather1() {
    
    var city = document.getElementById("city").value;
    

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=a5e2291c59ec9d3242568370244a5d4a`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);



        var forecast = document.getElementById("todayForcast");
        todayForcast.innerHTML = "";
        data.list.slice(0, 1).forEach((item) => {
          var date = new Date(item.dt_txt);
          var options = { weekday: "long", hour: "numeric" };
          var dateString = date.toLocaleDateString("en-US", options);
          var temp = Math.round(item.main.temp);
          var description = item.weather[0].description;
          var icon = `https://openweathermap.org/img/w/04d.png`;
          var html = `
          <br>
            <div class = card border border-5 bg-white>
              <div>${dateString}</div>
              <div>${temp}&deg;F</div>
              <div>${description}</div>
              <img src="${icon}" alt="${description}">
            </div>
          `;
          todayForcast.innerHTML += html;
        });
      })
      .catch((error) => console.error(error));
      searchHistory.push(city);
      renderSearchHistory();
   }



function getWeather() {
    getWeather1()

    var city = document.getElementById("city").value;
    

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=a5e2291c59ec9d3242568370244a5d4a`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
  
        var forecast = document.getElementById("forecast");
        forecast.innerHTML = "";
        var days = {};
        data.list.slice(8).forEach((item) => {
          var date = new Date(item.dt_txt);
          var options = { weekday: "long" };
          var dayString = date.toLocaleDateString("en-US", options);
          if (!days[dayString]) {
            var temp = Math.round(item.main.temp);
            var description = item.weather[0].description;
            var icon = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
            var html = `
            <br>
              <div  class=" border bg-white rounded-1">
                <div class="card ">${dayString}</div>
                <div class="card ">${temp}&deg;F</div>
                <div class="card ">${description}</div>
                <img src="${icon}" alt="${description}">
              </div>
            `;
            forecast.innerHTML += html;
            days[dayString] = true;
          }
        });
      })
      
      .catch((error) => console.error(error));
      
  }
  
  function renderSearchHistory() {
    var historyList = document.getElementById("searchHistory");
    historyList.innerHTML = "";
    searchHistory.forEach((city) => {
      var listItem = document.createElement("li");
      listItem.textContent = city;
      listItem.addEventListener("click", function() {
  
        document.getElementById("city").value = city;
        
        getWeather();
      });
      historyList.appendChild(listItem);
      
    });
  }