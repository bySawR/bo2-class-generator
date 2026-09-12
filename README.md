# BO2 Class Generator — shopbysawr

Åpne index.html direkte i nettleseren. Ingen installasjon nødvendig.

- 39 flerspillervåpen, inkludert Peacekeeper. Kampanje- og zombievåpen er ikke del av Create a Class.
- Trickshot er standard: sniper-primary, pistol/assault-secondary og opprinnelige trickshot-perks.
- Regular Guns bruker hele våpenutvalget og alle perks.
- 10 / 17 er en maksimal poenggrense. Generatoren trenger ikke fylle alle poengene.
- Wildcards som kreves av oppsettet regnes automatisk med. Åpne Point breakdown for detaljer.
- Lethal og tactical kan være tomme uavhengig av hverandre. Utstyret velges bare av generatoren. Lås et generert valg hvis du vil beholde det.
- Låsing gjelder bare neste randomisering. Hele seksjonen får oransje kant.
- Låste valg blir aldri slettet for å passe til ny grense eller modus. Generatoren gir en melding ved konflikt.
- Klassenavn, fem klasser, valgt klasse, modus, poenggrense og låser lagres i samme nettleser/domene.
- Ugyldig eller utilgjengelig nettleserlagring stopper ikke generatoren. Originale v1-data beholdes ved migrering.
- Primary og secondary er begge 300 px høye. Attachment- og camofelt er like brede og alltid 110 px høye.
- Mobil har én kolonne, klassenavigasjon med sidelengs rulling og store trykkflater.

## GitHub og Payhip

1. Opprett et PUBLIC repository som heter **bo2-class-generator** på **bySawR**.
2. Bruk branchen **main**.
3. Pakk ut GITHUB-UPLOAD.zip. Last opp INNHOLDET til roten av repoet, ikke som en ekstra mappe.
4. Kontroller at assets-mappen ligger direkte i repoets rot.
5. Kopier hele PAYHIP-EMBED.txt inn i Payhip sin Embed Code-seksjon.

Bildebasen er:
https://raw.githubusercontent.com/bySawR/bo2-class-generator/main/assets/

Payhip-filen inneholder HTML, CSS og JavaScript. Bilder og skrifter hentes fra GitHub.
Lenkene blir ikke tilgjengelige før du har lastet opp filene. Repoet er ikke opprettet eller publisert av assistenten.
Payhip krever eget domene for HTML/JavaScript:
https://help.payhip.com/article/268-embed-code-on-your-payhip-store

Lokalfilen og Payhip bruker separat localStorage. Ingen synkronisering mellom enheter.
Payhip-innbyggingen er testet med de forventede GitHub-adressene servert fra lokale filer, ikke på din live-butikk.

## Prosjektfiler

index.html — grensesnitt
bo2.css — styling og mobiloppsett
data.js — våpen, bilder, tillatte attachments, perks og utstyr
engine.js — kombinasjonsregler, generering og poeng
app.js — interaksjon og lagring
assets/ — lokale bilder og skrifter
RULES.md — regler og kilder
_work/ — lokale arbeidsfiler; skal ikke lastes opp

Ved endringer kjøres node _work/build-payhip.cjs for å bygge Payhip-blokken på nytt.

