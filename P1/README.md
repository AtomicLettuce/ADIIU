# Data Dashboard ADIIU

## Autors:
-Marc Melià Flexas
-Xavier Vives Marcus

## Vídeo explicatiu
Enllaç al vídeo explicatiu de la pràcitca: https://youtu.be/OSvtRXik0Bs

## Repositori GitHub
Ennlaç al repositori GitHub: https://github.com/AtomicLettuce/ADIIU/tree/main 

## Introducció
S'ha realitzat una aplicació web que consulta a una base de dades local i 
mostra diferents informacions de manera visual emprant els gràfics de la 
llibreria Highcharts. La temàtica escollida per l'aplicació web és un Data 
Dashboard amb temàtica Pokémon

## Server-side
S'ha emprat XAMPP per la part del servidor i s'ha escollit muntar el servidor 
emprant Node.js que que ens permet gestionar tota la part del servidor emprant 
JavaScript.

Per fer-ho s'ha fet el fitxer index.js que serà el que executarà el servidor.
El fitxer comença important llibreries per poder configurar el servidor
(llibreries express i path). També s'inclou la llibreria mysql per poder 
interactuar amb la base de dades i l'API de google per poder dotar l'aplicació 
d'algunes funcionalitats addicionals.

S'ha definit que el servidor escolti peticions a través del port 6900. Ara bé, 
s'hagués pogut escollir perfectament els ports 80 o 443 (ports que per defecte 
s'empren a l'hora d'emprar els protocols HTTP i HTTPS).

### Base de Dades
S'ha creat una base de dades SQL simple per poder realitzar l'exercici. La base
 de dades compta amb una sola taula que compté els valors que defineixen un 
Pokémon. L'script de creació de la base de dades es pot consultar a 
adiiu_p1_pokemon.sql.

Per gestionar les peticions de clients a la base de dades, s'han definit les 
consultes que els clients poden fer al fitxer index.js (fitxer executat en el 
Server side) i s'especifica el que haurà de retornar el servidor. Per exemple, 
si volem consultar quants Pokémon hi ha de cada tipus, podem fer una petició 
al servidor emprant fetch('/tipus') i el servidor ens retorna el resultat de 
realitzar aquesta consulta.

### Google API
L'API de Google s'ha emprat per proporcionar la imatge d'un Pokémon aleatori 
al Data Dashboard. Enlloc de tenir totes les fotografies de cada un dels
Pokémon guardades en el servidor, el que feim és fer una cerca a Google i 
mostrar la primera imatge trobada a Google. Però, el que perceb el client 
és que la té el servidor doncs el client no interactua mai amb Google sinó 
que fa una petició al servidor i aquest la fa a Google per llavor tornar el 
resultat al client.

El servidor interactua amb l'API de Google enlloc de fer-ho el client 
directament per motius de seguretat ja que d'aquesta manera podem controlar 
exactament el que s'envia a Google. Si ho fés el client de forma directa, 
podria haver algun usuari maliciós que empràs les nostres claus d'accés per 
causar-mos problemes.

## Client-side
El client executa el fitxer index.html que s'encarrega de generar tot el 
dashboard. El codi HTML i CSS s'ha fet emprant una plantilla Bootstrap.

### Data Dashboard
El Data Dashboard consta de: 

-Una barra de navegació lateral que compté enllaços 
a la UIB, al repositori GitHub (on es guarda el codi font), i a la font que 
s'ha emprat per crear la base de dades del servidor. 

-Una barra superior per simular un Data Dashboard real que compté informació 
com ID d'usuari, missatges entrants, notificacions, etc.

-Un panell de dades on es dibuixen els diferents gràfics emprant Highcharts.
Addicionalment, hi ha un apartat de Pokémon destacat que mostra una imatge d'un
 Pokémon generada aleatòriament. Això es fa emprant la Google API (explicat a 
l'apartat Server Side) però pel client és una simple petició al nostre 
servidor.

### Highcarts
S'han fet 3 gràfics diferents:

-Un "pie chart" que mostra la quantitat de Pokémon que hi ha per cada tipus.

-Un gràfic de barres que mostra els 5 Pokémon que tenen un valor més gros en 
diferents estadístiques (Atac, Defensa, Velocitat, HP i Total). L'usuari pot
canviar quina estadística vol veure en cada moment.

-Un "spline chart" que mostra la distribució que segueien els Pokémon en 
diferents estadístiques (Atac, Defensa, Velocitat, HP i Total). Per exemple, 
mostra quants Pokémon hi ha amb un valor d'Atac entre \[0, 20) quants entre 
\[20, 40) quants entre \[40, 60), etc. Igual que al gràfic de barres, l'usuari 
pot canviar quina estadística vol veure en cada moment.

### Bootstrap
S'ha emprat la plantilla sb-admin-2 de Bootstrap. l'enllaç és el següent:
https://startbootstrap.com/theme/sb-admin-2

### HTML Semàntic
S'han afegit tags semàntics com per exemple figure, main, form, etc. 
entre d'altres.

### Enllaços
Dins la barra de navegació, hi ha 3 enllaços:

-A la pàgina principal de la UIB
-A la font de dades que s'ha emprat per construir la base da dades.
-Al repositori GitHub que compté aquesta pràctica.

### Responsive
L'aplicació web s'adapta al tamany de la pantalla de l'usuari sense deformar 
la vista. És a dir, no importa si l'usuari accedeix des de un portàtil, tablet,
 telèfon, etc.
