(function() {
    function getDate() {
        var date = new Date();
        var weekday = date.getDay();
        var month = date.getMonth();
        var day = date.getDate();
        var year = date.getFullYear();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if (hour < 10) hour = "0" + hour;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var monthday = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
        var monthColors = ["#1E90FF", "#FF69B4", "#00FFFF", "#7CFC00", "#00CED1", "#FF1493", "#00008B", "#FF7F50", "#C71585", "#FF4500", "#FFD700", "#800000"];
        var ampm = " PM ";
        if (hour < 12) ampm = " AM ";
        if (hour > 12) hour -= 12;
        var showDate = weekdayNames[weekday] + ", " + monthday[day-1] + " " + monthNames[month] + "," + year;
        var showTime = hour + ":" + minutes + ":" + seconds + ampm;
        var color = monthColors[month];
        document.getElementById('date').innerHTML = showDate;
        document.getElementById('time').innerHTML = showTime;
        //document.bgColor = color;
        requestAnimationFrame(getDate);
    }
    getDate();
}());


/*Refresh timer*/ 
// function checklength(i) {
//   'use strict';
//   if (i < 10) {
//     i = "0" + i;
//   }
//   return i;
// }
// var minutes, seconds, count, counter, timer;
// count = 901; //seconds
// counter = setInterval(timer, 1000);

// function timer() {
//   'use strict';
//   count = count - 1;
//   minutes = checklength(Math.floor(count / 60));
//   seconds = checklength(count - minutes * 60);
//   if (count < 0) {
//     clearInterval(counter);
//     return;
//   }
//   document.getElementById("timer").innerHTML = 'Next refresh in ' + minutes + ':' + seconds + ' ';
//   if (count === 0) {
//     cache_clear();
//   }
// }

// function cache_clear() {
//   window.location.reload(true);
//   // window.location.reload(); use this if you do not remove cache
// }