/*kviz*/

//Kérdések
const kerdesek = [
  {
    kerdes: "Melyik karakter kapott anális beültetést?",
    valaszok: ["Eric Cartman", "Stan Marsh", "Kyle Broflovski", "Kenny McCormick"],
    helyes: 0
  },
  {
    kerdes: "Hol kezdődik az 'Cartman anális beültetése' epizód?",
    valaszok: ["Iskolában", "Buszmegállóban", "Áruházban", "Kórházban"],
    helyes: 1
  },
  {
    kerdes: "Mit javasol Gerald, amikor meglátja Dr. Biber pólóját?",
    valaszok: ["Delfinplasztikát", "Negróplasztikát", "Fizioterápiát", "Semmit"],
    helyes: 0
  },
  {
    kerdes: "Miért lépett át Kenny Cartman csapatához az 'A tűz és segg dala' epizódban?",
    valaszok: ["Mert szerette volna a csapatot", "Mert nem akarta, hogy hercegnő legyen", "Mert voltak ígéretek", "Mert nyertek valamit"],
    helyes: 1
  },
  {
    kerdes: "Mit hoz Bill Gates a South Park Plázába az epizód szerint?",
    valaszok: ["Delfinplasztikát", "Fegyvereket", "Kosárlabdát", "Ajándékokat"],
    helyes: 1
  },
  {
    kerdes: "Mi történik, amikor a tehenek észreveszik az idegeneket az 'Cartman anális beültetése' epizódban?",
    valaszok: ["Megrohamozzák a buszt", "Ijedtükben a vasútállomásra menekülnek", "Segítenek Cartmannak", "Elbújnak a farmon"],
    helyes: 1
  },
  {
    kerdes: "Mit tesz Mrs. Garrison, amikor nem jön el a menstruáció az 'Mr. Garrison vadiúj vaginája' epizódban?",
    valaszok: ["Semmit", "Abortuszközpontba megy", "Új nemét fogad el", "Orvosi vizsgálatot kér"],
    helyes: 1
  },
  {
    kerdes: "Milyen változás történik a South Park Plázán a fekete pénteken az 'A tűz és segg dala' epizódban?",
    valaszok: ["Árengedmény 80%-ról 90%-ra", "Árengedmény 80%-ról 96%-ra", "Nincs változás", "Árak emelkednek"],
    helyes: 1
  }
];

let aktualisKerdes = 0;
const felhasznaloValaszok = new Array(kerdesek.length).fill(null);

//elemek
const tartalom = document.getElementById("quiz-tartalom");
const allapot = document.getElementById("kerdes-allapot");
const elozoGomb = document.getElementById("elozo-gomb");
const megerositGomb = document.getElementById("megerosit-gomb");
const kovetkezoGomb = document.getElementById("kovetkezo-gomb");
const bekuldesGomb = document.getElementById("bekuldes-gomb");
const eredmenyekDiv = document.getElementById("eredmenyek");
const ujrakezdGomb = document.getElementById("ujrakezd-gomb");

//Kérdés megjelenítése
function megjelenitKerdes(i) {
  const aktKerdes = kerdesek[i];
  let html = `<h3>${aktKerdes.kerdes}</h3>`;
  aktKerdes.valaszok.forEach((valasz, idx) => {
    const jelolt = (felhasznaloValaszok[i] === idx) ? "checked" : "";
    html += `<div class="valasz">
               <label>
                 <input type="radio" name="valasz" value="${idx}" ${jelolt}> ${valasz}
               </label>
             </div>`;
  });
  tartalom.innerHTML = html;
  allapot.textContent = `Kérdés ${i+1}/${kerdesek.length}`;
  elozoGomb.disabled = (i === 0);
  
  //Következő gomb rejtése, beküldés gomb megjelenítése
  if (i === kerdesek.length - 1) {
    kovetkezoGomb.style.display = "none";
    bekuldesGomb.style.display = "inline-block";
  } else {
    kovetkezoGomb.style.display = "inline-block";
    bekuldesGomb.style.display = "none";
  }
}

//Válasz megerősítése
megerositGomb.addEventListener("click", () => {
  const valaszokRadio = document.getElementsByName("valasz");
  for (let v of valaszokRadio) {
    if (v.checked) {
      felhasznaloValaszok[aktualisKerdes] = parseInt(v.value);
    }
  }
  if (aktualisKerdes < kerdesek.length - 1) {
    aktualisKerdes++;
    megjelenitKerdes(aktualisKerdes);
  }
});

//Következő gomb
kovetkezoGomb.addEventListener("click", () => {
  if (aktualisKerdes < kerdesek.length - 1) {
    aktualisKerdes++;
    megjelenitKerdes(aktualisKerdes);
  }
});

//Beküldés gomb
bekuldesGomb.addEventListener("click", () => {
  if (felhasznaloValaszok.includes(null)) {
    alert("Még van hiányzó kérdés!");
    return;
  }
  befejez();
});

//Előző gomb
elozoGomb.addEventListener("click", () => {
  if (aktualisKerdes > 0) {
    aktualisKerdes--;
    megjelenitKerdes(aktualisKerdes);
  }
});

//Kvíz befejezése és eredmények megjelenítése
function befejez() {
  document.getElementById("quiz-tartalom").style.display = "none";
  document.getElementById("kerdes-allapot").style.display = "none";
  document.getElementById("kerdes-sor").style.display = "none";
  
  let html = "<h3>Eredmények</h3>";
  kerdesek.forEach((k, i) => {
    const jo = (felhasznaloValaszok[i] === k.helyes);
    html += `<div>
               <strong>${i+1}. kérdés:</strong> ${k.kerdes}<br>
               <em>Te válaszod:</em> ${k.valaszok[felhasznaloValaszok[i]] || "Nincs válasz"}<br>
               <em>Helyes:</em> ${k.valaszok[k.helyes]} ${jo ? "(jó)" : "(rossz)"}
             </div><hr>`;
  });
  eredmenyekDiv.innerHTML = html;
  eredmenyekDiv.style.display = "block";
  ujrakezdGomb.style.display = "inline-block";
}

//Újrakezdés
ujrakezdGomb.addEventListener("click", () => {
  aktualisKerdes = 0;
  felhasznaloValaszok.fill(null);
  document.getElementById("quiz-tartalom").style.display = "block";
  document.getElementById("kerdes-allapot").style.display = "block";
  document.getElementById("kerdes-sor").style.display = "block";
  eredmenyekDiv.style.display = "none";
  ujrakezdGomb.style.display = "none";
  megjelenitKerdes(aktualisKerdes);
});

//az első kérdés megjelenítése, amikor az oldal betöltődik
document.addEventListener("DOMContentLoaded", () => {
  megjelenitKerdes(aktualisKerdes);
});
