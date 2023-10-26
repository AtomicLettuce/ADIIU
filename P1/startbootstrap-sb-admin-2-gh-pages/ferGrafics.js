document.addEventListener('DOMContentLoaded', function () {


    console.log("hola");
    fetch('/consultaLegendarios7')
        .then(response => response.json())
        .then(data => {
            // Manejar y mostrar los resultados de la primera consulta
            console.log(data);
        })
        .catch(error => {
            console.error('Error al obtener los datos de la consulta 1:', error);
        });


});