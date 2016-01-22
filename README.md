# DNA-Vis-2016

## [Demo](http://what-does-the-fox-say.github.io/)

## Allgemeines

Sagen wir mal man könnte eine Aufgabe haben wie diese (rein zufällig natürlich):

 > In the last exercise you have implemented a small multiple setting of bar charts. We will now
further improve on this visualization. In case you were not able to implement the visualization
you can use our code in ILIAS.
 > > __a)__ Implement a mouse-click event on each single bar chart.
 >
 > > __b)__ After clicking on a bar chart the data values of this bar chart should be the new baseline
for all other data points. Therefore, the data values for the selected bar chart are 0 and
the others adept automatically.
> 
> > __c)__ Comment on the results. Do you consider it useful? Why, why not?

Und sagen wir mal der ominöse Code aus diesem Ilias hat folgende Ordnerstruktur (nur die wichtigen Dateien werden mit eingefügt, natürlich könnte man z.B. komplett d3 einfügen, braucht man aber nicht, ist ja viel mehr):

```
├── d3/
│    └── d3.js
|
├── data.js
├── infoVis.html
└── infoVis.js
```

Angenommen, das alles kommt irgendwie zufälliger zusammen, dann könnte man vielleicht unter gewissen Umständen dies hier als Lösung verwenden.

## Kompatibilität

Man nehme an, es gäbe schon eine Vorlage des Codes und man möchte so wenig wie möglich an diesem Code ändern so soll diesen Leuten gesagt seien: Ihr müsst nur die infoVis.js übernehmen.

Besser gesagt: Ihr könnt die Dateien übernehen wie ihr wollt. Alle sind untereinander Kompatibel. Außer ein Fall:

 - Wenn von diesem Projekt die data.js übernommen wird, muss auch die infoVis.js übernommen werden.

Der Rest ist zu 100% untereinander kompatibel.

## Design-Entscheidungen

Nun man kann HTML und JavaScript schön schreiben und.. schöner. :)
Hier werden ein paar Design-Entscheidungen hervorgegriffen, was man hätte anders machen könnte und warum das hier nicht so gemacht wurde.

### infoVis.html

#### Was gemacht wurde:

Am Anfang der Datei wurde der Doctype wie folgt (HTML5) geschrieben:

```html
<!DOCTYPE html>
```

#### Was man noch hätte tun können:

Man hätte stattdessen auch den HTML4.01-Tag nehmen können:

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
       "http://www.w3.org/TR/html4/strict.dtd">
```

#### Warum wurde das erstere gewählt?

Warum sollte man auf alte Technologien setzen? Immerhin gibt es ein paar ganz nette Vorteile: [W3 HTML5-Diff](https://www.w3.org/TR/html5-diff/).

---

#### Was gemacht wurde:

Im `<head>`:

```html
<meta charset="UTF-8">
```

#### Was man noch hätte tun können:

Nichts dazuschreiben.

#### Warum wurde das erstere gewählt?

Auf Nummer sicher gehen, falls es der Browser nicht alleine erkennt.

---

#### Was gemacht wurde:

Kurz vor dem `</body>`-Tag:

```html
<script>start();</script>
```

#### Was man noch hätte tun können:

In den `<body>` tag das `onload`-Attribut hinzufügen:

```html
<body onload="start();">
```

#### Warum wurde das erstere gewählt?

[Sollte man wirklich JavaScript in einem HTML-Attribut ausführen?](http://stackoverflow.com/questions/2728922/why-not-use-javascript-handlers-on-the-body-element)

---

#### Was gemacht wurde:

Kurz vor dem ```<script>start();</script>```-Abschnitt:

```html
  <script type="text/javascript" src="infoVis.js"></script>
  <script type="text/javascript" src="data.js"></script>
  <script type="text/javascript" src="d3/d3.js"></script>
  <script>start();</script>
</body>
```

#### Was man noch hätte tun können:

In den `<head>` damit:
```html
<head>
<title>D3-Exercise-AnaVis-2015</title>
<script type="text/javascript" src="infoVis.js"></script>
<script type="text/javascript" src="data.js"></script>
<script type="text/javascript" src="d3/d3.js"></script>

</head>
```

#### Warum wurde das erstere?

Damit wird erst der HTML-Inhalt geladen, danach erst das JavaScript. Hier macht das keinen Unterschied, wenn man allerdings Inhalte im HTML hat wird erst die Website geladen und angezeigt und dann das JavaScript. So kann man schneller auf die Inhalte zugreifen.

---

### infoVis.js


#### Was gemacht wurde:

Pro Datenpunkt eine SVG-Datei erstellt.

#### Was man noch hätte tun können:

Alles in eine SVG-Datei.

#### Warum wurde ersteres gewählt?

So ist das ganze responsive und alle Statistiken sind unterteilt.

---

#### Was gemacht wurde:

Keine "globale" Variable wie so etwas wie ein `maxArray` deklarieren und über mehrere Dateien verwendet.

#### Was man noch hätte tun können:

Eine "globale" Variable wie so etwas wie einen `maxArray` __nicht deklarieren__ und trotzdem über __mehrere__ Dateien verwenden.

#### Warum wurde das erstere gewählt?

Weil man sowas nicht macht so lange es vermeidbar ist oder man nicht eine ganze Bibliothek danach benennt. 

---

### data.js

#### Was gemacht wurde:

Kein falscher Kommentar gesetzt.

#### Was man hätte tun können:

Einen falschen Kommentar wie z.B.

```js
//Result should be stored in this array
```

schreiben können, der etwas aussagt was nicht passiert.

#### Warum wurde das erstere gewählt?

Keine Ahnung. Sowas könnte sicher viel Spaß bringen. :)

---

#### Was gemacht wurde:

Ein Array verwendet und da Arrays eingefügt.

#### Was man hätte tun können:

Das ganze übermäßig kompliziert mit mehreren Arrays machen können.

Ach und so einer __globalen, nicht deklarierten__ Variable.

#### Warum wurde das erstere gewählt?

Es sei in diesem Fall:

```
Warum wurde das erstere gewählt? := Warum einfach wenns auch kompliziert geht?
```

---

#### Was man von Anfang an hätte tun können:

Auf Chrome, Firefox und IE11-Kompatibilität achten.

## Schlusswort

Also es gibt schönes und schöneres HTML+JS.

Das schöne an HTML+JS ist, dass es jeder lernen kann. Ob normaler Mensch oder Kurfürst. Daher ein Zitat aus Heinrich von Kleinsts "Michael Koolhaas":

 > "Ob nun wohl beide Kurfürsten, der Brandenburgische und Mentzische, Kohlhasen in ihren Schutz und Geleite genommen, haben sie doch endlich gewilliget, daß ihn der Sachse sollte suchen lassen, und wo er ihn betreten würde, wollten sie ihm Rechts zu ihm verstatten."

HTML+JS zu lernen ist auch durchaus einfach. In unseren heutigen Gesellschaft ist es fast so wichtig wie das korrekte Sitzen. Ob auf Pferd oder Stuhl:

 > "Man kann sehr verschieden zu Pferde sitzen - man kann auch sicher durch Absehen von anderen viel lernen, aber ebenso wie jede Abbildung eines korrekten Sitzes oder seine Beschreibung unwillkürlich jeden dazu verführen müssen, die äußere Form nachzuahmen, ist es auch falsch, wenn der Reitlehrer einen Reiter veranlaßt, sich irgendwie vorschriftsmäßig hinzusetzen."

 -- Reitlehre, Wilhelm Müseler
