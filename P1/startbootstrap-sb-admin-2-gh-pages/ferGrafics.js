async function pingala(){
// Fetch data from the PHP script
const response = await fetch('data.php');
const data = await response.json();
console.log("hola");
}
pingala();