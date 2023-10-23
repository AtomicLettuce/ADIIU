// Create an XMLHttpRequest object
const xhttp = new XMLHttpRequest(); 
xhttp.onload = function() {
    console.log(xhttp.responseText);
    
  }

xhttp.open("GET", "data.php");
xhttp.send();