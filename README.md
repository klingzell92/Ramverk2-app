[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/klingzell92/Ramverk2-app/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/klingzell92/Ramverk2-app/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/klingzell92/Ramverk2-app/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/klingzell92/Ramverk2-app/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/klingzell92/Ramverk2-app/badges/build.png?b=master)](https://scrutinizer-ci.com/g/klingzell92/Ramverk2-app/build-status/master)

Ramverk2 app
=================================

Kravbild
------------
Applikationen som jag valde att göra var ett luffarschack där två personer spelar mot varandra från olika datorer. Om man vinner så sparas det resultatet till en highscore som sorteras efter antal drag och tid det tog för spelet. För att gå med i ett spel så anger man ett smeknamn vid start och när det finns 2 spelare så startar ett nytt spel.

Sådant som inte finns med i appen är inloggning mestadels för att jag hade tänkt ha med en highscore och då hade redan kravet för att spara till en databas redan uppfyllts. Någon chatt finns det inte heller då realtidsaspekten finns med i hur jag updaterar speöbrädet efter varje omgång.
En till sak som saknas är  att appen inte kan hantera att flera matcher spelas på samma gång.

Tekniker
------------
Jag har använt mig utav express som server och sedan för vyerna har jag använt pug. Det är samma som jag har använt mig utav tidigare under kursen och jag tycker framför allt att express har varit väldigt smidigt att använda. Det går väldigt snabbt att komma igång med just Express då det snabbt går att scaffolda fram en fungerande version som man kan utgå ifrån. Om det var något som jag skulle bytta ut var det kanske pug då jag hade föredragit att kunna köra vanlig html. Men jag har ändå vant mig vid syntaxen nu och tycker att det fungerar helt okej. Jag upplevde inga begränsningar eller så p.g.a teknikerna jag valde för appen utan det har fungerat bra.




Installera
--------------
Börja med att clona repot härifrån Github genom att köra

```shell
git clone https://github.com/klingzell92/Ramverk2-app.git
```
Och för att sedan installera allting så kör man:
```shell
npm install
```

För att starta servern utan MongoDB så kör man:
```shell
npm start
```
För att starta MongoDB  så kör man:

```shell
npm run start-db
```

Och för att starta tictactoe servern så kör man:

```shell
 npm run start-tictactoe
```

För att starta servern inklusive MongoDB i docker så kör man:

```shell
 npm run start-docker
```
Äver här behöver du köra igång tictactoe servern separat med
```shell
 npm run start-tictactoe
```


Portar
----------
Man kan använda sig utav följande systemvariabler för att ändra porten som servern lyssnar på DBWEBB_PORT, PORT och LOCAL_DEV_PORT.
Om inget värde har satts för någon av systemvariablerna så används port 1337 som default.

TicTacToe servern använder sig utav port 1338

MongoDB kan använda sig utav systemvariabeln DBWEBB_DSN fast default är mongodb://localhost:27017

Tester
----------
För testerna så använder jag mocha. Anledningen till att det blev mocha istället för t.ex. Jasmine var för att jag jag gillade deras guide om hur man använder det bättre. Jag använder assert för att skriva mina asserts. För att testa mina routes så använder jag supertest som fungerar väldigt bra.

Det enda som jag inte har skrivit några tester för är klienten jag inte kunde testa den på något bra sätt.

Jag har inte särskilt bra kodtäckning då jag hade stora problem med att testa tictactoe servern då den är byggd med websockets. Det enda som jag lyckades testa var när man ansluter till servern. Jag lyckades testa mer än så lokalt men testerna mislyckades i scrutinizer. I mitt fall så behöver jag två websockets anslutna till servern för att kunna testa de flesta funktionerna och det var det som gav mig problem.

I övrigt hade jag inte så mycket att testa mer än mina routes fast jag har bara två så det var inga större problem att få nästan 100% kodtäckning för just dem. Sedan så har jag 100% kodtäckning för min modul också.

För att köra testerna utan docker:

```shell
 npm test
```

För att köra testerna i olika versioner utav node i docker så kör man:

```shell
 npm run test-docker

 npm run test-docker2

 npm run test-docker3
```
För att se kodtäckningen i webbläsaren så kan man gå till coverage/index.html

CI-kedja
----------
Den tjänsten som jag använder för min CI-kedja är Scrutinizer. Jag tycker att Scrutinizer är väldigt bra då man får tjänster för byggstatus, kodkvalité samt kodtäckning. Anledningen till att jag valde Scrutinizer är just för att att man får med alla delarna. En annan sak som jag tycker är bra med Scrutinizer är att man får tips om hur man kan förbättra sin kod.

I stort så tycker jag att det är bra med en CI-kedja då man får ett bevis på hur bra ens kod är. Det blir också ett sätt för andra som skall använda ens kod att se att koden håller en viss kvalité.

Det enda betyget som jag är missnöjd med är det för kodtäckning som är för lågt. Godkänt för mig skulle vara om jag kunde få upp det till 70%. Annars så är jag nöjd.

Realtid
----------
I min applikation så finns realtidsaspekten i hur jag uppdaterar spelbrädet efter att en spelare har gjort ett drag.
Detta gör jag genom att använda WebSockets där man ansluter sig till WebSocketservern när man går med i ett spel och efter det uppdateras spelbrädet vartefter man klickar på en ruta.
Jag använder ws, jag kollade även lite på socket.io men då jag har använt ws tidigare i kursen så var det lättare att fortsätta med det.
Det är väldigt lätt att använda samt att det finns bra instruktioner på Github om man behöver kolla upp någonting.

Databas
----------
NoSQL databasen som jag valde var MongoDB precis som många andra tekniker för att jag har använt det tidigare under kursen och nu har blivit bekant med det.
Det är väldigt lätt att jobba mot då jag i mitt fall bara kan skapa ett JSON objekt och sedan sparar det till databasen. Och sedan kan hämta ett resultat med hjälp av ett id för objektet.

Den stora fördelen med NoSQL jämfört med relationsdatabaser är ju att de är snabbare, sen tycker jag att det är bra att kunna jobba med JSON-objekt.
Men det beror nog lite på vilka behova man har och vad man ska spara i databasen om det är sånt som lätt kan sparas till tabeller så kan man nog köra med vanliga relationsdatabaser då de kanske är lite säkrare och stabilare. Men jag tycker ändå om NoSQL databaser så mycket att jag kommer överväga att använda det vid kommande projekt.

Modul på npm
----------
Min modul på npm är [mongodb-crud-phkl16](https://www.npmjs.com/package/mongodb-crud-phkl16)

Modulen används för att ansluta till databasen MongoDB samt utföra de olika crud delarna. När jag gjorde den tidigare i kursen så gjorde jag den så gjorde jag modulen så generell som jag kunde så den var lätt att implementera i appen.

Fördelen med just NPM som paketverktyg är nog dess storhet då man nog utan problem kan hitta den modulen man söker. Sedan är det väldigt lätt att använda också både för att hämta och publisera moduler.
