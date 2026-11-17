const forma = document.querySelector('.contact form');
const laukai = forma.querySelectorAll('input');
const siustiMygtukas = forma.querySelector('button[type="submit"]');
const isvalytiMygtukas = forma.querySelector('.isvalyti');
const rezultatai = document.querySelector('.rezultatai');

const raidesTaisykle = /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/;
const pastoTaisykle = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telefonoTaisykle = /^\+370 6\d{2} \d{5}$/;

function rastiKlaida(laukas) {
  const reiksme = laukas.value.trim();

  if (reiksme === '') {
    return 'Šis laukas privalomas';
  }
  if ((laukas.name === 'vardas' || laukas.name === 'pavarde') && !raidesTaisykle.test(reiksme)) {
    return 'Galima naudoti tik raides';
  }
  if (laukas.name === 'email' && !pastoTaisykle.test(reiksme)) {
    return 'Neteisingas el. pašto formatas';
  }
  if (laukas.name === 'telefonas' && !telefonoTaisykle.test(reiksme)) {
    return 'Įveskite visą numerį: +370 6xx xxxxx';
  }
  if (laukas.name.startsWith('klausimas')) {
    const skaicius = Number(reiksme);
    if (!Number.isInteger(skaicius) || skaicius < 1 || skaicius > 10) {
      return 'Įveskite skaičių nuo 1 iki 10';
    }
  }
  return '';
}

function rodytiKlaida(laukas) {
  const klaida = rastiKlaida(laukas);
  laukas.classList.toggle('neteisingas', klaida !== '');
  laukas.nextElementSibling.textContent = klaida;
}

function atnaujintiMygtuka() {
  let visiTeisingi = true;
  laukai.forEach(function (laukas) {
    if (rastiKlaida(laukas) !== '') {
      visiTeisingi = false;
    }
  });
  siustiMygtukas.disabled = !visiTeisingi;
}

function formatuotiTelefona(laukas) {
  let skaitmenys = laukas.value.replace(/\D/g, '');
  if (skaitmenys.startsWith('370')) {
    skaitmenys = skaitmenys.slice(3);
  }
  skaitmenys = skaitmenys.slice(0, 8);

  if (skaitmenys === '') {
    laukas.value = '';
  } else if (skaitmenys.length <= 3) {
    laukas.value = '+370 ' + skaitmenys;
  } else {
    laukas.value = '+370 ' + skaitmenys.slice(0, 3) + ' ' + skaitmenys.slice(3);
  }
}

laukai.forEach(function (laukas) {
  laukas.addEventListener('input', function () {
    if (laukas.name === 'telefonas') {
      formatuotiTelefona(laukas);
    }
    rodytiKlaida(laukas);
    atnaujintiMygtuka();
  });

  laukas.addEventListener('blur', function () {
    rodytiKlaida(laukas);
  });
});

forma.addEventListener('submit', function (ivykis) {
  ivykis.preventDefault();

  const duomenys = {
    vardas: forma.elements.vardas.value.trim(),
    pavarde: forma.elements.pavarde.value.trim(),
    elPastas: forma.elements.email.value.trim(),
    telefonas: forma.elements.telefonas.value.trim(),
    adresas: forma.elements.adresas.value.trim(),
    klausimas1: Number(forma.elements.klausimas1.value),
    klausimas2: Number(forma.elements.klausimas2.value),
    klausimas3: Number(forma.elements.klausimas3.value)
  };

  console.log(duomenys);

  const vidurkis = (duomenys.klausimas1 + duomenys.klausimas2 + duomenys.klausimas3) / 3;

  const eilutes = [
    'Vardas: ' + duomenys.vardas,
    'Pavardė: ' + duomenys.pavarde,
    'El. paštas: ' + duomenys.elPastas,
    'Tel. Numeris: ' + duomenys.telefonas,
    'Adresas: ' + duomenys.adresas,
    'Dizaino įvertinimas: ' + duomenys.klausimas1,
    'Turinio įvertinimas: ' + duomenys.klausimas2,
    'Patogumo įvertinimas: ' + duomenys.klausimas3
  ];

  rezultatai.innerHTML = '';
  eilutes.forEach(function (eilute) {
    const p = document.createElement('p');
    p.textContent = eilute;
    rezultatai.appendChild(p);
  });

  const vidurkioEilute = document.createElement('p');
  vidurkioEilute.className = 'vidurkis';
  vidurkioEilute.textContent = duomenys.vardas + ' ' + duomenys.pavarde + ': ' + vidurkis.toFixed(1);
  rezultatai.appendChild(vidurkioEilute);
});

isvalytiMygtukas.addEventListener('click', function () {
  forma.reset();
  laukai.forEach(function (laukas) {
    laukas.classList.remove('neteisingas');
    laukas.nextElementSibling.textContent = '';
  });
  rezultatai.innerHTML = '';
  atnaujintiMygtuka();
});

atnaujintiMygtuka();
