/*kviz*/

//kérdések
const kerdesek = [
  {
    kerdes: "Mi South Park városa?",
    valaszok: ["Denver", "South Park", "Los Angeles", "Chicago"],
    helyes: 1
  },
  {
    kerdes: "Ki a sorozat főszereplője?",
    valaszok: ["Stan Marsh", "Harry Potter", "Ron Weasley", "Hermione Granger"],
    helyes: 0
  },
  {
    kerdes: "Milyen animációs technikát használnak a sorozatban?",
    valaszok: ["Stop motion", "3D modell", "2D vágás", "Papír animáció"],
    helyes: 3
  },
  {
    kerdes: "Melyik évben indult a sorozat?",
    valaszok: ["1995", "1997", "1999", "2001"],
    helyes: 2
  },
  {
    kerdes: "Ki a kritikus karakter?",
    valaszok: ["Eric Cartman", "Kyle Broflovski", "Stan Marsh", "Kenny McCormick"],
    helyes: 0
  },
  {
    kerdes: "Melyik témát nem érintik gyakran?",
    valaszok: ["Politika", "Sport", "Kultúra", "Gasztronómia"],
    helyes: 3
  },
  {
    kerdes: "Milyen humor jellemzi a sorozatot?",
    valaszok: ["Szituációs", "Absurd", "Romantikus", "Tragikus"],
    helyes: 1
  },
  {
    kerdes: "Melyik évben készült az első epizód?",
    valaszok: ["1992", "1995", "1997", "2000"],
    helyes: 1
  }
];

let aktualisKerdes = 0;
const felhasznaloValaszok = new Array(kerdesek.length).fill(null);

//DOM elemek
const tartalom = document.getElementById("quiz-tartalom");
const allapot = document.getElementById("kerdes-allapot");
const elozoGomb = document.getElementById("elozo-gomb");
const megerositGomb = document.getElementById("megerosit-gomb");
const kovetkezoGomb = document.getElementById("kovetkezo-gomb");
const bekuldesGomb = document.getElementById("bekuldes-gomb");
const eredmenyekDiv = document.getElementById("eredmenyek");
const ujrakezdGomb = document.getElementById("ujrakezd-gomb");

// Kérdés megjelenítése
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
  
  // Beküld gomb megjelenítése, következő eltűnik
  if (i === kerdesek.length - 1) {
    kovetkezoGomb.style.display = "none";
    bekuldesGomb.style.display = "inline-block";
  } else {
    kovetkezoGomb.style.display = "inline-block";
    bekuldesGomb.style.display = "none";
  }
}

// Válasz megerősítése
megerositGomb.addEventListener("click", () => {
  const valaszokRadio = document.getElementsByName("valasz");
  for (let v of valaszokRadio) {
    if (v.checked) {
      felhasznaloValaszok[aktualisKerdes] = parseInt(v.value);
    }
  }
  // Ha nem az utolsó kérdés, lépés a következőre
  if (aktualisKerdes < kerdesek.length - 1) {
    aktualisKerdes++;
    megjelenitKerdes(aktualisKerdes);
  }
});

// Következő gomb
kovetkezoGomb.addEventListener("click", () => {
  if (aktualisKerdes < kerdesek.length - 1) {
    aktualisKerdes++;
    megjelenitKerdes(aktualisKerdes);
  }
});

// Beküldés gomb
bekuldesGomb.addEventListener("click", () => {
  if (felhasznaloValaszok.includes(null)) {
    alert("Még van hiányzó kérdés!");
    return;
  }
  befejez();
});

// Előző gomb
elozoGomb.addEventListener("click", () => {
  if (aktualisKerdes > 0) {
    aktualisKerdes--;
    megjelenitKerdes(aktualisKerdes);
  }
});

// Kvíz befejezése és eredmények megjelenítése
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

// Újrakezdés
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

// Indítás
document.addEventListener("DOMContentLoaded", () => {
  megjelenitKerdes(aktualisKerdes);
});
