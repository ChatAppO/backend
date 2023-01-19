
## Upustvo za pokretanje

Za pokretanje projekta potrebno je sve repozitorije iz organizacije [ChatAppO](https://github.com/ChatAppO) klonirati u isti direktorij.
Nakon ovoga se treba pozicionirati u direktorij frontend. Unutar ovoga direktorija je potrebno izvršiti sljedeću komandu: 

```bash
$ ./run.sh 
```
Ona će uraditi build svih aplikacija i pokrenuti sve aplikacije unutar docker containera.
Kada su se uspješno pokrenuli frontend i backend možemo otvoriti frontend na http://localhost:3000/

## Opis aplikacije

Prilikom otvaranja frontenda na http://localhost:3000/ dobit ćemo generisano ime koje će biti prikazano **boldirano** u listi aktivnih korisnika.
Unutar ove liste **aktivnih korisnika** možemo vidjeti sve osobe koje trenutno koriste aplikaciju. Klikom na nekog od aktivnih korisnika otvara nam se chat sa tom osobom i imamo mogućnost slanja poruka.
Sa lijeve strane imamo prozor **messages** u kojem vidimo osobe sa kojima smo komunicirali kao i globalni chat. 
Također klikom na osobu ili globalni chat iz prozora messages otvara nam se taj chat kao što se otvara i klikom na aktivnog korisnika iz liste aktivnih korisnika. 
Unutar prozora messages aktivni korisnici imaju **zeleni krug**, dok neaktivni korisnici imaju **crveni krug**.
Također, unutar prozora messages se prikazuje samo zadnja poruka vezana za određeni chat, a ukoliko želimo vidjeti sve poruke onda moramo otvoriti taj chat klikom na njega.
Imamo mogućnost pregleda svih globalnih poruka bez obzira kad smo prijavljeni, a također imamo mogućnost gledanja **historije poruka** i sa aktivnim i sa neaktivnim korisnicima.

## Način izrade aplikacije

- Čitanje postavljenih zahtjeva te razmišljanje o rješenju
- Istraživanje komunikacije u realnom vremenu
- Učenje o websocketima
- Smišljanje plana za izradu, osmišljen način komunikacije
- Traženje ideja za izgled frontenda na figmi. Iskorištena ideja sa modifikacijama prema potrebi zadatka : https://www.figma.com/community/file/1106649794153342244
- Postavljanje backenda
- Postavljanje frontenda
- Sređivanje servera uz testiranje komunikacije sa websocketima putem postmana
- Postavljanje defaultnih elemenata na frontendu(prikaz imena, input za poruke, dugme za slanje...) i spajanje sa backendom
- Nakon uspješno uspostavljene komunikacije prelazak na dizajn
- Ručno testiranje frontenda i backenda 
- Priprema docker containera
- Testiranje kompletne aplikacije pokrenute preko navedene komande u upustvu za pokretanje.

## Autor

- Autor - Belmin Selimović



