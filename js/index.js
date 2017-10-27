$(document).ready(function() {
  var workMins = 25,
    breakMins = 5;
  
    var running = false;
    //declare cycle to switch bettwen work and break
  var cycle = 1;
  
  var tempTime, time, countdown;

  $("#workTimeUp").click(function() {
    if (running==false){
    workMins++;
    tempTime = null;
    document.getElementById("workTime").innerHTML = workMins;
    document.getElementById("timer").innerHTML = workMins;
    }
  });
  $("#workTimeDown").click(function() {
    if (running==false && workMins>0){
    workMins--;
    tempTime=null;
    document.getElementById("workTime").innerHTML = workMins;
    document.getElementById("timer").innerHTML = workMins;
  }
  });
  $("#breakTimeUp").click(function() {
    if (running==false){
    breakMins++;
      tempTime=null;
    document.getElementById("breakTime").innerHTML = breakMins;
    }
  });
  $("#breakTimeDown").click(function() {
    if (running==false){
    breakMins--;
      tempTime=null;
    document.getElementById("breakTime").innerHTML = breakMins;
    }
  });
  
  
  $("#timer").on("click", function() {
    if (running == false && tempTime) {
      running = true;
      counter(tempTime);
    } else if (running == false){
      running = true;
      counter(workMins);
    } else if (running == true){
        tempTime = time/60/1000;
        clearInterval(countdown);
        running = false;
    }
  });
  
  function counter(val) {

    var timeOnClick = new Date().getTime(),
      valMS = val * 60 * 1000;
    //sets timepoint in future
    var futureTime = new Date(timeOnClick + valMS).getTime();

      countdown = setInterval(function() {
      var now = new Date().getTime();
      time = futureTime - now;

      //translate miliseconds into seconds/mins/hours
      var days = Math.floor(time / (1000 * 60 * 60 * 24));
      var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      var sec = Math.floor((time % (1000 * 60)) / 1000);

      document.getElementById("timer").innerHTML = mins + "m " + sec + "s ";

      if (time < 0 && cycle % 2 !== 0) {
        cycle++;
        clearInterval(countdown);
        counter(breakMins);
      } else if (time < 0 && cycle % 2 == 0) {
        cycle++;
        clearInterval(countdown);
        counter(workMins);
      }
    }, 1000);
  }
});