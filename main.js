var names = ["Crypto [ICS412]", "Blockchain [IOE411]", "Big Anal. [CSE412]", "CG [CSE411]", "BTP-1", "Code", "Placement", "Seminar"];
var colors  = ["purple", "orange", "blue", "green", "black", "black", "red", "black"];
var tooltip = ["Cryptography & Network Security", "Blockchain Technology", "Huge info sodomy --tan(door)/cos(door)", "Computer Graphics", "Btech Project I", "Coding Club activities" , "Placement activities", "College seminar"];
var idcode = ["80","79","82","81","0","0","0","0"];
var times = ["9:40 - 10:35", "10:50 - 11:45", "12:00 - 12:55", "14:00 - 16:00", "16:15 - 18:15"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var schedule = {
    "Monday" : [0,2,3,2,5],
    "Tuesday" : [1,3,2,3,4],
    "Wednesday" : [2,4,0,7,4],
    "Thursday" : [0,4,1,0,4],
    "Friday" : [3,4,1,6,5]
};


var string = `
<table border='0' cellspacing='0' cellpadding='0'>
\t<tr class = 'days'>
\t\t<th></th>`
for(var key in schedule){
    string += "\n\t\t<th>"+key+"</th>";
}
string+="\n\t</tr>";
for(var time in times){
    string += "\n\t<tr>";
    string += "\n\t\t<td class = 'time'>"+times[time]+"</td>";
    for(var key in schedule){
        string += "\n\t\t<td class = 'time_slot "+colors[schedule[key][time]];
        string +="' data-tooltip ='"+tooltip[schedule[key][time]]+"'>";
        if(idcode[schedule[key][time]]!="0"){
            string+="<a href='https://lmsone.iiitkottayam.ac.in/course/view.php?id="+idcode[schedule[key][time]]+"' target='_blank'>";
        }
        string+=names[schedule[key][time]];
        if(idcode[schedule[key][time]]!="0"){
            string+="</a>";
        }
        string+="</td>";
    }
    string += "\n\t</tr>"
}
string+="\n</table>"

var currentdate = new Date();
var hour = currentdate.getHours();
var minute = currentdate.getMinutes();
var day = currentdate.getDay();

if(day!=0 && day!=7){

    var key = days[day];
    var time =-1;
    for(var i in times){
        var arr = times[i].split(/[:-]+/);
        var leftbound = parseInt(arr[0])*60 + parseInt(arr[1]);
        var rightbound = parseInt(arr[2])*60 + parseInt(arr[3]);
        var current = hour*60 + minute;
        if(current >= leftbound && current <= rightbound){
            time = i;
            break;
        }
    }

    if(time == -1) break;

    console.log(time);
    console.log(key);

    string+= `
    <br>
    <h1> Quick Access </h1>
    <br>
    <table border='0' cellspacing='0' cellpadding='0'>
    \t<tr class = 'days'>
    \t\t<th> Ongoing </th>
    \t</tr>
    \t<tr>
    `
    string += "\n\t\t<td class = 'time_slot "+colors[schedule[key][time]];
    string +="' data-tooltip ='"+tooltip[schedule[key][time]]+"'>";
    if(idcode[schedule[key][time]]!="0"){
        string+="<a href='https://lmsone.iiitkottayam.ac.in/course/view.php?id="+idcode[schedule[key][time]]+"' target='_blank'>";
    }
    string+=names[schedule[key][time]];
    if(idcode[schedule[key][time]]!="0"){
        string+="</a>";
    }
    string+="</td>\n\t</tr>\n</table>";

}


document.querySelector(".tab").innerHTML = string;

