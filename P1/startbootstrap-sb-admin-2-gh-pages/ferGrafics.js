document.addEventListener('DOMContentLoaded', function () {
    fetch('/tipus')
        .then(response => response.json())
        .then(data => {
            // Manejar y mostrar los resultados de la primera consulta
            console.log(data);
            // Data retrieved from https://netmarketshare.com
            colors = ['#5190d6', '#9098a1', '#8fa9dc', '#61bd5a', '#fb727a', '#91c12f', '#d97845', '#ab6ac8', '#fe9d56', '#c4b78b', '#f3d13c', '#cf4169', '#5c5366', '#5269ad', '#598ea3', '#0a70c5', '#6fcdc2', '#ec8fe3'];
            var total = 0;
            for (i = 0; i < data.length; i++) {
                total = total + data[i].quantitat;
                data[i].color = colors[i];
            }
            // Create the donut chart
            Highcharts.chart('chartContainer', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: '',
                    align: 'left'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y}'
                        },
                        innerSize: '30%', // Set the size of the hole (40% of the radius)
                    }
                },
                series: [{
                    name: 'Quantitat',
                    colorByPoint: true,
                    data: data
                }]
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos de la consulta 1:', error);
        });


    fetch('/topAtac')
        .then(response => response.json())
        .then(data => {

            const pokemonData = data; // Los datos obtenidos de tu API

            const pokemonNames = pokemonData.map(pokemon => pokemon.name); // Nombres de los Pokémon
            const attackValues = pokemonData.map(pokemon => pokemon.y); // Valores de ataque de los Pokémon
            console.log(pokemonNames)
            console.log(attackValues)

            Highcharts.chart('contenidorAtac', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Ataque de Pokémon'
                },
                xAxis: {
                    categories: pokemonNames // Nombres de los Pokémon
                },
                yAxis: {
                    title: {
                        text: 'Ataque'
                    }
                },
                series: [{
                    name: 'Pokemon',
                    data: attackValues // Valores de ataque de los Pokémon
                }]
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos de la consulta 2:', error);
        });
});
