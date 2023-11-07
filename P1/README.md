# Data Dashboard ADIIU
## Autors:
-Marc Melià Flexas
-Xavier Vives Marcus

## Introducció
S'ha realitzat una aplicació web que consulta a una base de dades local i mostra diferents informacions de manera visual emprant els gràfics de la llibreria Highcharts. La temàtica escollida per l'aplicació web és un Data Dashboard amb temàtica Pokémon

## Server-side
S'ha emprat XAMPP per la part del servidor i s'ha escollit muntar el servidor emprant Node.js que que ens permet gestionar tota la part del servidor emprant JavaScript

### Base de Dades
S'ha creat una base de dades SQL simple per poder realitzar l'exercici. La base de dades compta amb una sola taula que compté els valors que defineixen un Pokémon. L'script de creació de la base de dades es pot consultar a adiiu_p1_pokemon.sql.

Per gestionar les peticions de clients a la base de dades, s'han definit les consultes que els clients poden fer al fitxer index.js (fitxer executat en el Server side) i s'especifica el que haurà de retornar el servidor. Per exemple, si volem consultar quants Pokémon hi ha de cada tipus, podem fer una petició al servidor emprant fetch('/tipus') i ens retorna el resultat de realitzar aquesta consulta.

[WIP][WIP][WIP]
[WIP][WIP][WIP]
[WIP][WIP][WIP]
