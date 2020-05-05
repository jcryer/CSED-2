//lookup tables for converting moods to abstract moods
//abstract mood = lookup[real mood]
//lookups are as follows
/*
    0) Happy
    0: Neutral
    1: Happy
    5: Exuberant
    7: Joyful
    
    1) Calm
    3: Calm
    8: Contentment
    9: Relaxing
    13: For Concentration
    14: Motivational
    
    2) Lively
    6: Lively
    10: Frantic
    4: Energetic

    3) Sad
    2: Sad
    11: Depressing
    12: Melancholic
*/
const ABS_MOOD_LOOKUP = [0, 0, 3, 2, 0, 2, 0, 1, 1, 2, 3, 3, 1, 1];

//Lookup which converts moods to their respective strings
//Laid out such that MOOD_LOOKUP[mood index] = mood name
const MOOD_LOOKUP = [
    "Neutral",
    "Happy",
    "Sad",
    "Calm",
    "Energetic",
    "Exuberance",
    "Lively",
    "Joyful",
    "Contentment",
    "Relaxing",
    "Frantic",
    "Depressing",
    "Melancholic",
    "For Concentration",
    "Motivational"]

//Used to track the total number of elements loaded in
var tableLoaded = 0;

$(document).ready(function() {

    //Loads google charts
    google.charts.load('current', {'packages':['corechart', 'table']});
    //Draws charts once charts api has loaded
    google.charts.setOnLoadCallback(function () {
        //drawYesterday();
        drawMonth();
        drawLibraryPie();
        drawLibraryList();
        populateRecentTable();
    })

    //Gets more data on scroll to bottom of div
    $("#recent-div").scroll(function () {
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            populateRecentTable();
        }
    })

    /*function drawYesterday() {
        //tmp for testin
        var datain = JSON.parse('[{"hour":10,"mood":0},{"hour":12,"mood":4},{"hour":9,"mood":2},{"hour":11,"mood":7},{"hour":9,"mood":0},{"hour":10,"mood":0},{"hour":11,"mood":10},{"hour":10,"mood":4},{"hour":5,"mood":10},{"hour":9,"mood":10},{"hour":11,"mood":10},{"hour":9,"mood":0},{"hour":11,"mood":0},{"hour":12,"mood":4},{"hour":10,"mood":10},{"hour":10,"mood":4},{"hour":11,"mood":1},{"hour":10,"mood":4},{"hour":11,"mood":4},{"hour":9,"mood":0},{"hour":12,"mood":0},{"hour":11,"mood":10},{"hour":12,"mood":2},{"hour":10,"mood":10},{"hour":9,"mood":4},{"hour":12,"mood":10},{"hour":10,"mood":4},{"hour":12,"mood":0},{"hour":14,"mood":4},{"hour":14,"mood":5},{"hour":18,"mood":4},{"hour":16,"mood":6},{"hour":16,"mood":0},{"hour":14,"mood":4},{"hour":15,"mood":0},{"hour":15,"mood":2},{"hour":15,"mood":0},{"hour":16,"mood":0},{"hour":14,"mood":4},{"hour":16,"mood":4},{"hour":20,"mood":5},{"hour":20,"mood":4},{"hour":20,"mood":10},{"hour":20,"mood":0},{"hour":20,"mood":4},{"hour":21,"mood":4}]');

        //Gets data from server
        //Does this have to be AJAX?
        //CHANGE THIS FOR PROD OR I WILL HURT YOU
        $.get("api/yesterdayMood", function(data, status) {
            //probably this
            //I'm not sure tbh
            //datain = JSON.parse(data);

                    //Creates array for data
        var data = new Array(25);
        data[0] = ['Time', 'Happy', 'Calm', 'Lively', 'Sad']
        //Iterate through hours, adding all to the array
        for (var i = 0; i < 25; i ++) {
            //Creates blank collum for each hour, and formats hour nicely
            data[i + 1] = [(i < 10 ? "0" + i.toString() : i.toString()) + ":00"
                , 0, 0, 0, 0];
        }

        //iterates over all songs
        datain.forEach(function(song) {
            //values have to be incremented as headers are in pos 0
            data[song.hour + 1][MOOD_LOOKUP[song.mood] + 1] ++;
        });

        var options = {
            title: 'Moods you listened to yesterday',
            hAxis: {titleTextStyle: {color: '#333'}, showTextEvery:2},
            //hides the v axis font
            vAxis: {minValue: 0, textStyle: {color: 'white', fontName: "monospace", fontSize: 0}},
            isStacked: true,
            enableInteractivity: false
        };

        //TODO
        //Jqueryise this???
        var chart = new google.visualization.AreaChart(document.getElementById('listening-yesterday'));
        chart.draw(google.visualization.arrayToDataTable(data), options);
        });


    }*/

    function drawMonth() {
       //tmp for testin
       var datain = JSON.parse('[{"day":10,"mood":0},{"day":12,"mood":4},{"day":9,"mood":2},{"day":11,"mood":7},{"day":9,"mood":0},{"day":10,"mood":0},{"day":11,"mood":10},{"day":10,"mood":4},{"day":5,"mood":10},{"day":9,"mood":10},{"day":11,"mood":10},{"day":9,"mood":0},{"day":11,"mood":0},{"day":12,"mood":4},{"day":10,"mood":10},{"day":10,"mood":4},{"day":11,"mood":1},{"day":10,"mood":4},{"day":11,"mood":4},{"day":9,"mood":0},{"day":12,"mood":0},{"day":11,"mood":10},{"day":12,"mood":2},{"day":10,"mood":10},{"day":9,"mood":4},{"day":12,"mood":10},{"day":10,"mood":4},{"day":12,"mood":0},{"day":14,"mood":4},{"day":14,"mood":5},{"day":18,"mood":4},{"day":16,"mood":6},{"day":16,"mood":0},{"day":14,"mood":4},{"day":15,"mood":0},{"day":15,"mood":2},{"day":15,"mood":0},{"day":16,"mood":0},{"day":14,"mood":4},{"day":16,"mood":4},{"day":20,"mood":5},{"day":20,"mood":4},{"day":20,"mood":10},{"day":20,"mood":0},{"day":20,"mood":4},{"day":21,"mood":4}]');

       //Gets data from server
       //Does this have to be AJAX?
       //CHANGE THIS FOR PROD OR I WILL HURT YOU
       //THIS will have to change for the month view as well
       //$.get("api/monthMood", function(data, status) {
       //    console.log(data);
       //})

       //Creates array for data
       var data = new Array(31);
       data[0] = ['Time', 'Happy', 'Calm', 'Lively', 'Sad']
       //Iterate through hours, adding all to the array
       for (var i = -30; i < 0; i ++) {
           //Creates blank collum for each hour, and formats hour nicely
           data[31 + i] = [i.toString(), 0, 0, 0, 0];
        }
        data[31] = ["Today", 0, 0, 0, 0];

       //iterates over all songs
       datain.forEach(function(song) {
           //values have to be incremented as headers are in pos 0
           data[/*obv this has to be changed*/ song.day + 1][ABS_MOOD_LOOKUP[song.mood] + 1] ++;
       });

       var options = {
           title: 'How your moods have changed over the last 30 days',
           hAxis: {titleTextStyle: {color: '#333'}, showTextEvery:2},
           //hides the v axis font
           vAxis: {minValue: 0, textStyle: {color: 'white', fontName: "monospace", fontSize: 0}},
           isStacked: "relative",
           enableInteractivity: false
       };

       var chart = new google.visualization.AreaChart(document.getElementById('listening-month'));
       chart.draw(google.visualization.arrayToDataTable(data), options);
    }

    /*
    Draws a piechart showing the genre makeup of the users library
     */
    function drawLibraryPie() {
        //Data is such that [genre index + 1] = Genre name
        var data = [
            ["Genre",   "Number of songs"],
            ["Neutral", 0],
            ["Happy", 0],
            ["Sad", 0],
            ["Calm", 0],
            ["Energetic", 0],
            ["Exuberance", 0],
            ["Lively", 0],
            ["Joyful", 0],
            ["Contentment", 0],
            ["Relaxing", 0],
            ["Frantic", 0],
            ["Depressing", 0],
            ["Melancholic", 0],
            ["For Concentration", 0],
            ["Motivational", 0]
        ];

        //Sample data
        //Generates a random array of 10000 objects: [{"mood" : 0 <= random <= 14 }] 
        var datain = Array(10000)
        
        //Populate the array with elements as such: [{"mood" : 0 <= random <= 14 }]
        for (var i = 0; i < 10000; i++) {
            datain[i] = {"mood" : Math.floor(Math.random() * 15)};
        }

        //End sample

        //Iterate through elements incrementing that songs mood number
        for (const song of datain) {data[song.mood + 1][1] ++;}

        var chart = new google.visualization.PieChart(document.getElementById("library-pie"));

        chart.draw(google.visualization.arrayToDataTable(data), {title : "Library"});
    }

    function drawLibraryList() {
        //Get data here (or fake it)
        var datain = JSON.parse(`[
            {"track" : "I Wanna Be Adored",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 0,
            "listens" : 420},
            
            {"track" : "She Bangs the Drums",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 1,
            "listens" : 42},
            
            {"track" : "Waterfall",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 2,
            "listens" : 420},
            
            {"track" : "Don't Stop",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 3,
            "listens" : 420},
            
            {"track" : "Bye Bye Bad Man",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 4,
            "listens" : 420},
            
            {"track" : "Elizabeth My Dear",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 5,
            "listens" : 420},
            
            {"track" : "Sugar Spun Sister",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 6,
            "listens" : 420},
            
            {"track" : "Made of Stone",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 7,
            "listens" : 420},
            
            {"track" : "Shoot You Down",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 8,
            "listens" : 420},
            
            {"track" : "This is the One",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 9,
            "listens" : 420},
            
            {"track" : "I am the Resurrection",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 10,
            "listens" : 420}
        ]`);

        //Create table
        var data = new google.visualization.DataTable();
        data.addColumn("string", "Song");
        data.addColumn("string", "Album");
        data.addColumn("string", "Artist");
        data.addColumn("string", "Mood");
        data.addColumn("number", "Listens");

    
        //Maps data into a format usable for dataTable then adds to table
        data.addRows(datain.map(x => [x.track, x.album, x.artist, MOOD_LOOKUP[x.mood], x.listens]));
        
        var table = new google.visualization.Table($("#library-table")[0])

        table.draw(data, {width:"100%", height:"100%"});
    }

    function populateRecentTable () {
        //Sample data
        var datain = JSON.parse(`[
            {"track" : "I Wanna Be Adored",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 0,
            "time" : "2020-05-04T14:28:30.779Z",
            "artwork": "https://www.clashmusic.com/sites/default/files/field/image/R-156092-1534078946-7723.jpeg.jpg"},
            
            {"track" : "She Bangs the Drums",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 1,
            "time" : "2020-05-04T14:29:34.989Z",
            "artwork": "https://www.clashmusic.com/sites/default/files/field/image/R-156092-1534078946-7723.jpeg.jpg"},
            
            {"track" : "Waterfall",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 2,
            "time" : "2020-05-04T14:30:34.989Z",
            "artwork": "https://www.clashmusic.com/sites/default/files/field/image/R-156092-1534078946-7723.jpeg.jpg"},
            
            {"track" : "Don't Stop",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 3,
            "time" : "2020-05-04T14:31:34.989Z",
            "artwork": "https://www.clashmusic.com/sites/default/files/field/image/R-156092-1534078946-7723.jpeg.jpg"},
            
            {"track" : "Bye Bye Bad Man",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 4,
            "time" : "2020-05-04T14:32:34.989Z",
            "artwork": "https://www.clashmusic.com/sites/default/files/field/image/R-156092-1534078946-7723.jpeg.jpg"},
            
            {"track" : "Elizabeth My Dear",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 5,
            "time" : "2020-05-04T14:33:34.989Z",
            "artwork": "https://www.clashmusic.com/sites/default/files/field/image/R-156092-1534078946-7723.jpeg.jpg"},
            
            {"track" : "Sugar Spun Sister",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 6,
            "time" : "2020-05-04T14:34:34.989Z",
            "artwork": "https://www.clashmusic.com/sites/default/files/field/image/R-156092-1534078946-7723.jpeg.jpg"},
            
            {"track" : "Made of Stone",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 7,
            "time" : "2020-05-04T14:35:34.989Z",
            "artwork": "https://www.clashmusic.com/sites/default/files/field/image/R-156092-1534078946-7723.jpeg.jpg"},
            
            {"track" : "Shoot You Down",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 8,
            "time" : "2020-05-04T14:36:34.989Z",
            "artwork": "https://www.clashmusic.com/sites/default/files/field/image/R-156092-1534078946-7723.jpeg.jpg"},
            
            {"track" : "This is the One",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 9,
            "time" : "2020-05-04T14:37:34.989Z",
            "artwork": "https://www.clashmusic.com/sites/default/files/field/image/R-156092-1534078946-7723.jpeg.jpg"},
            
            {"track" : "I am the Resurrection",
            "album" : "The Stone Roses",
            "artist" : "The Stone Roses",
            "mood" : 10,
            "time" : "2020-05-04T14:38:34.989Z",
            "artwork": "https://www.clashmusic.com/sites/default/files/field/image/R-156092-1534078946-7723.jpeg.jpg"}
        ]`);

        //Don't forget to send off loaded with get request
        //I would recommend send all of the last week or so
        //As the day headings will get recreated otherwise

        //Converts to format
        //{"date as string" : [["time as string", "album artwork path", "song info"], ["time 2 as string", "album artwork path", "song info"]]}
        var formatted = {};

        for (let song of datain) {
            let date = new Date(song.time);

            //Check if date already in formatted data
            if (! (date.toDateString() in formatted)) {
                formatted[date.toDateString()] = [];
            }

            let songObj = new Object();

            //Add song to formatted data
            formatted[date.toDateString()].push([date.toLocaleTimeString(), song.artwork,
                song.track + " - " + song.album + " - " + song.artist + " - " + MOOD_LOOKUP[song.mood]]);
        }

        //Add to table
        var table = $("#recent-table")

        for (let date in formatted) {
            //Add date header to table
            table.append("<tr><th colspan='3'>" + date);
            
            //Add each song to table
            for (let song of formatted[date]) {
                tableLoaded ++;
                table.append("<tr><td>" + song[0] + "</td><td><img src='" + song[1] + "' style=\"width:50px;\"></td><td>" + song[2]);
            }
        }
    }
})