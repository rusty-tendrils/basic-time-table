// Table data
var names = ["IoT [ICS423]", "Appl.Pred.Anal. [ICS422]", "Deep Lrng. [IOE421]","BTP-2","Honors-2","Code", "Placement", "Seminar"];
var colors  = ["purple", "orange", "blue", "black", "black","black", "red", "black"];
var tooltip = ["Internet of Things", "Applied Predictive Analytics", "Deep Learning", "Btech Project Phase II","Honors Project Phase II", "Coding Club activities" , "Placement activities", "College seminar"];
var idcode = ["95","97","96","0","0","0","-1","0"];
var times = ["9:40 - 10:35", "10:50 - 11:45", "12:00 - 12:55", "14:00 - 16:00", "16:15 - 17:15"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var schedule = { "Monday" : [1,3,2,4,4], "Tuesday" : [2,3,0,4,4], "Wednesday" : [0,3,2,4,7], "Thursday" : [3,3,1,0,6], "Friday" : [0,3,1,5,6]};



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// function to add table data
function addTD(time,key){
    temp = "\n\t\t<td class = 'time_slot "+colors[schedule[key][time]];
    temp +="' data-tooltip ='"+tooltip[schedule[key][time]]+"'>";
    if(idcode[schedule[key][time]]!="0"){
        if(idcode[schedule[key][time]]=="-1") temp+="<a href='https://docs.google.com/spreadsheets/d/1TMBpwPnJrhOiyk2AZstg_CN55mvBVqxRRyXSAKhfJPY/edit?pli=1#gid=0' target='_blank'>";
        else temp+="<a href='https://lmsone.iiitkottayam.ac.in/course/view.php?id="+idcode[schedule[key][time]]+"' target='_blank'>";
    }
    temp+=names[schedule[key][time]];
    if(idcode[schedule[key][time]]!="0") temp+="</a>";
    temp+="</td>";
    return temp;
}

async function addTimeTable(){

    // deletepreviouscontents
    document.querySelector(".tab").innerHTML = "<h2> IF you see this , you're either in developer console, viewing the code, or you are the FLASH </h2>";
    await sleep(1);


    // Main time table
    var string = "\n<table border='0' cellspacing='0' cellpadding='0'>\n\t<tr class = 'days'>\n\t\t<th></th>";
    for(var key in schedule) string += "\n\t\t<th>"+key+"</th>";
    string+="\n\t</tr>";
    for(var time in times){
        time = parseInt(time);
        string += "\n\t<tr>";
        string += "\n\t\t<td class = 'time'>"+times[time]+"</td>";
        for(var key in schedule) string += addTD(time,key);
        string += "\n\t</tr>"
    }
    string+="\n</table>"

    var currentdate = new Date();
    var hour = currentdate.getHours(), minute = currentdate.getMinutes(), day = currentdate.getDay();

    if(day!=0 && day!=6){
        var key = days[day], time =-1, lastclass = -1;
        for(var i in times){
            var arr = times[i].split(/[:-]+/);
            var leftbound = parseInt(arr[0])*60 + parseInt(arr[1]), rightbound = parseInt(arr[2])*60 + parseInt(arr[3]);
            var current = hour*60 + minute;
            if(current >= leftbound) lastclass = parseInt(i);
            if(current >= leftbound && current <= rightbound){
                time = parseInt(i);
                break;
            }
        }

        // For debugging
        console.log(currentdate);console.log(time);console.log(lastclass);console.log(key);

        if(time == -1 && lastclass == 4) string += "\n<br>\n<h1> No more classes today </h1>\n";
        else{
            string+= "\n<br>\n<h1> Quick Access </h1>\n<br>\n<table border='0' cellspacing='0' cellpadding='0'>\n\t<tr class = 'days'>";
            if(time!=-1) string+="\n\t\t<th> Ongoing </th>";
            if(lastclass<4) string+="\n\t\t<th> Next Class </th>";
            string+="\n\t</tr>\n\t<tr>";
            if(time!=-1) string += addTD(time,key);
            if(lastclass<4) string += addTD(lastclass+1,key);
            string+="\n\t</tr>\n</table>";
        }
    }
    else string += "\n<br>\n<h1> No more classes today </h1>";
    document.querySelector(".tab").innerHTML = string;
}

async function refresher(){
    while(1){
        addTimeTable();
        await sleep(60000);
    }
}

refresher();