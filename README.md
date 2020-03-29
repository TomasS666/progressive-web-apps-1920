This product uses the TMDb API but is not endorsed or certified by TMDb.

### Demo: https://pwa-tomas.herokuapp.com/

![WAFS - Movies](https://user-images.githubusercontent.com/49723502/74514641-4b9d7180-4f0d-11ea-894b-5f32e328dcfc.png)

## Table of contents
* [Description](#description)

## Questions for feedback 20-03-2020 (NL)
1. Ik weet dat we het maandag over TTFB gaan hebben, maar ik was er zelf al mee bezig geweest.
Ik ging kijken naar het verschil tussen de performance van een "at-runtime" gerenderde pagina en een statische pagina. Maar verder dan dat keek ik of er een verschil zou zitten in express sendFile() en het weghalen van de route en om te zorgen dat static map de overview.html zou pakken. 

Het verschil in perfomance is groot tussen een prerendered pagina en een pagina die nog moet renderen. Een laatste test op mijn localhost wijst het volgende uit:**

Render at-runtime (die nog met res.render() gerendered moet worden bij binnenkomst gebruike:

```ttfb: 165ms```

Serving static file: 

```ttfb: 1.40ms```

**Vraag:** Heroku is geen dedicated server en valt af en toe in slaap en heeft over het algemeen überhaupt al heel veel invloed op de ttfb tijd. **Hoe kan ik dit verbeteren op Heroku? Zijn er alternatieven die aan te raden zijn? Ik kreeg al een tip van Robin over een persoon online, die om het half uur een sneaky request doet naar Heroku.**

2. Ik ben trots op het feit dat ik mijn pagina's statisch kan renderen. Ik wilde eerst alle pagina's statisch renderen maar er zijn zo'n 150.000 films geloof ik. Dus Declan vertelde dat ik het principe snap en dat ik als voorbeeld maar lekker mijn overview pagina moet prerenderen. Ook ben ik trots op de share button (die ik nog goed moet implementeren, maar het werkt) en de beforeinstallprompt om de enige kans voor een install popup later in te zetten voor een mogelijk grotere kans tot actie van de gebruiker.

3. Ik ben bezig met het onderzoeken hoe ik een soort cronjob kan draaien voor het builden van mijn home pagina. Maar ik kom er nog niet helemaal uit. **Heeft iemand daar tips over? Ik heb naar de Heroku Scheduler gekeken.** Maar ik ben een beetje terughoudend als ik kijk pricing. Zijn er alternatieven?


# Description


## How to install
To install this webapp, you only have to clone this repository by entering the following command in your terminal:

```git clone https://github.com/TomasS666/progressive-web-apps-1920.git```

or this command if you want to clone the repo into your current folder:

```git clone https://github.com/TomasS666/progressive-web-apps-1920.git ./```

or you can download the zip file or something similar by clicking on the green button on the top-right position of every repo.


## Concept


## API TheMovieDB
Update on new data will follow soon!
I'm fetching data on the following endpoints:

To get a list of movies of a certain genre:
```
/discover/movie/with_genre={id}
/movie/{id}
```

### Used data
I'm fetching movies by genre. Within the render of the genres with movies I apply a ```#movie/{id}``` to anchors around the movie wrapper. When the user clicks on a movie, my router takes the id param and uses it to fetch the movie data itself on the server. With that data I render a detail-page.

## Data manipulation
I made a cleanup pattern which takes the data and an array with the desired fields with the help of Guido and Kris. Right now I'm commented out for development purposes.

### Limit
The rate limit has been removed. Yet after some time I retrieved the data of a genre and I saved it locally temporarily so I wouldn't overload the server of such a nice company. 

## Features
Searching movies
Overview page of movie genres
Single page detail page
Search results view

## Micro features / interactions
* Custom scrollbar
* Grid horizontal scroll on smaller devices
* Preload skeleton layout for images is kinda introduced right now, but needs to be refactored.

## Wishlist
* Keeping track of history enable the user to pick up where they left of.
* Pagination ( Will soon arrive )
* Better flow of data
* ~Less cascading functional code, more human readable code ( export functions in a covering parent object )~

## Known bugs
* Layout breaks a bit sometimes on mobile. That's because of some design choices which I have to review right now.
* Missing navigation

## Future features
I've gotten in to the shadow dom way too late, but better late than never. I was very eager to apply this system with actual webcomponents into my web-app, but due time I have to keep my hands of it and finish the foundation I've been working on.

## Acknowledgements
Robin Stut for feedback, help and tips in general and resources for keeping Heroku alive and not sleeping.
Declan Dek for giving me great feedback, helping me with with a better understanding of performance and what I will achieve using a partial static generated application. Also with helping Ramon and me out with the service worker. Disclaimer: example of Declan is used for now (testing and getting a better understanding), but since I probably need another caching strategy and now I understand it better, I'm gonna update that code to a flavour for my own.

## Used dependencies

### Transpiling to ES5
@babel/core: 7.9.0  
@babel/preset-env: 7.9.0  
babel-loader": 8.1.0"

### CSS within Webpack
css-loader: 3.4.2  
mini-css-extract-plugin: 0.9.0

### For updating updated cached assets
serviceworker-webpack-plugin: 1.0.1

### For minifying and building and using the other plugin
webpack: 4.42.0  
webpack-cli: 3.3.10

### For hot reload
webpack-dev-server: 3.9.0

### For a mapping of hashed assets
webpack-manifest-plugin: 2.2.0



## Proces

### srcset
Kom er uit, het werkt, maar sizes kunnen beter, begrijp dat nog niet helemaal

Heb geprobeert webp te retrieven van tmdb, maar dat dat lijkt niet te kunnen, na veel zoeken. Webp gaat in moderne browsers efficiënter om met bandbreedte als het goed is.


### Heb css en js geminified met webpack plugins,

Html zou nog mooi zijn, build het al wel
Check of het al geminified is

Gzippen doe ik ook, ik serveer het alleen nog niet, kan ik nog even naar kijken


### SW

#### skipWaiting
Sw self.skipwait lukt wel met button, maar niet met showNotifcation en de afhandeling daarvan, vermoedelijk omdat ik met de verkeerde sw communiceer.

Als ux overweging kan ik misschien sws beter als popup of knop laten zien en als enhancement een notificatie als daar consent voor is gegeven.

### Navigator share API
Als navigator share, feature detection, show share knop die de native share api gebruikt van de os zodat je films kunt delen

### Install before prompt PWA
Installbeforeprompt, werkt lekker! Zolang de gebruiker de app niet geïnstalleerd heeft blijft de prompt triggeren als een gebruiker op de knop drukt op een detailpagina. 

### Features in dept

#### Genres
Iets over async await van alle genres, wat ik heb gedaan, hoe Kris vond dat het beter kon, die aanpak pakte in mijn use case niet lekker uit en misschien was mijn oplossing dus wel geschikt, maar het zou wss beter kunnen

#### Movie Collection
Hoe films collectie erbij kwam kijken. Dat ik dat wilde laten doorlinken. Dat het uiteindelijk is gelukt. 

#### Movie Cast
Cast kwam nog om de hoek kijken. 

## Lighthouse Audits
Audit scores
Hoe Heroku fucked, dat ik niet de hobby dyno wilde want creditcard. 

Hoe ik die andere performance website heb ingeschakeld. 

SendFile vs laten vallen op static map, geen verschil uiteindelijk. 

Content age in express, headers

Hoe ik de render functie heb aangepakt, hoe ik dat voor alles wilde maar dat Declan zei dat ik het al laat zien als ik de overzichtpagina prerender.
Dat ik heb gekeken of ik het meer generiek kon maken. Wat mijn idee daarover was.

Hoe ik een mogelijke filter wilde toepassen maar dat niet meer is gelukt


## License

[MIT License Copyright (c) 2020 Tomas S](https://github.com/TomasS666/web-app-from-scratch-1920/blob/master/LICENSE)
