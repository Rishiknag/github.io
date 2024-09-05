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
        var monthNames = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبنمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
        var weekdayNames = ["الأحد", "الأثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
        var monthday = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "١٠", "١١", "١٢", "١٣", "١٤", "١٥", "١٦", "١٧", "١٨", "١٩", "٢٠", "٢١", "٢٢", "٢٣", "٢٤", "٢٥", "٢٦", "٢٧", "٢٨", "٢٩", "٣٠", "٣١"];
        var monthColors = ["#1E90FF", "#FF69B4", "#00FFFF", "#7CFC00", "#00CED1", "#FF1493", "#00008B", "#FF7F50", "#C71585", "#FF4500", "#FFD700", "#800000"]
        var ampm = " م ";
        if (hour < 12) ampm = " ص ";
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