document.addEventListener('DOMContentLoaded', function () {
    fetch('/tipus')
        .then(response => response.json())
        .then(data => {
            // COLORS PER POSAR ALS TIPUS
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

            Highcharts.chart('contenidorAtac', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Atac de Pokémon'
                },
                xAxis: {
                    categories: pokemonNames // Nombres de los Pokémon
                },
                yAxis: {
                    title: {
                        text: 'Atac'
                    }
                },
                series: [{
                    name: 'Pokémon',
                    data: attackValues // Valores de ataque de los Pokémon
                }]
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos de la consulta 2:', error);
        });


    // Establir els manejadors d'events dels menús dropdown
    const radioForm = document.getElementById("radioForm");
    const radioForm2 = document.getElementById("radioForm2");

    // Establir manejador d'events del menú dropdown top pokemon stat
    radioForm.addEventListener("change", function (event) {
        if (event.target && event.target.type === "radio") {
            const selectedOption = event.target.value;
            ferGraficTop(selectedOption);
        }
    });
    // Establir manejador d'events del menú dropdown quanitat pokemon stat
    radioForm2.addEventListener("change", function (event) {
        if (event.target && event.target.type === "radio") {
            const selectedOption = event.target.value;
            ferGraficQuantitat(selectedOption);
        }
    })


    // Zona pokémon destacat
    fetch('/randomPokemon')
        .then(response => response.json())
        .then(data => {
            const img = data;
            var container = document.getElementById('pokemonRandom');
            const imgHTML = document.createElement('img');
            imgHTML.src = img.link;
            imgHTML.alt = img.nom;
            imgHTML.style.width = 'auto';
            imgHTML.style.height = '100%';
            container.style.display = 'flex';
            container.style.justifyContent = 'center';
            container.style.alignItems = 'center';
            container.appendChild(imgHTML);
        })
    
    // Fer gràfic quantitat de pokémon per stat (atac)
    fetch('/quantitatAtac')
        .then(response => response.json())
        .then(data => {
            const names = [];
            const types = [];
            
            // Formatar dades
            data.forEach((item) => {
                names.push(item.attack_interval);
                types.push(item.number_of_pokemon);
            });

            Highcharts.chart('quantitatStat', {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: 'Quantitat de Pokémon agrupat per Atac'
                },
                xAxis: {
                    categories: names,
                    title: {
                        text: 'Atac'
                    },
                    accessibility: {
                        description: 'Months of the year'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Quantitat'
                    },
                    labels: {
                        format: '{value}'
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },
                series: [{
                    name: 'Quantitat',
                    marker: {
                        symbol: 'square'
                    },
                    data: types

                }]
            });


        });
});

// Fer gràfic en de quantitat prokémon per stat en funció de la stat que s'ha escollit
async function ferGraficQuantitat(opcio) {
    fetch(opcio)
        .then(response => response.json())
        .then(data => {
            const names = [];
            const types = [];
            // formatar dades
            data.forEach((item) => {
                names.push(item.attack_interval);
                types.push(item.number_of_pokemon);
            });
            // refer el gràfic i sobreescriure'l
            Highcharts.chart('quantitatStat', {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: 'Quantitat de Pokémon agrupat per ' + opcio.slice(10)
                },
                xAxis: {
                    categories: names,
                    title: {
                        text: opcio.slice(10)
                    },
                    accessibility: {
                        description: 'Months of the year'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Quantitat'
                    },
                    labels: {
                        format: '{value}'
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },
                series: [{
                    name: 'Quantitat',
                    marker: {
                        symbol: 'square'
                    },
                    data: types

                }]
            });


        })
        .catch(error => {
            console.error('Error al obtener los datos de la consulta 2:', error);
        });
}

// Fer gràfic en de top pokémon per stat en funció de la stat que s'ha escollit
async function ferGraficTop(opcio) {
    fetch(opcio)
        .then(response => response.json())
        .then(data => {
            const pokemonData = data; // Los datos obtenidos de tu API
            // Formatar dadee
            const pokemonNames = pokemonData.map(pokemon => pokemon.name); // Nombres de los Pokémon
            const statValues = pokemonData.map(pokemon => pokemon.y); // Valores de ataque de los Pokémon
            // refer el gràfic i sobreescriure'l
            Highcharts.chart('contenidorAtac', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: opcio.slice(4) + ' de Pokémon'
                },
                xAxis: {
                    categories: pokemonNames // Nombres de los Pokémon
                },
                yAxis: {
                    title: {
                        text: opcio.slice(4)
                    }
                },
                series: [{
                    name: 'Pokemon',
                    data: statValues // Valores de ataque de los Pokémon
                }]
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos de la consulta 2:', error);
        });
}