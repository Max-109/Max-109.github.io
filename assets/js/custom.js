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

const igudziai = [
  { pavadinimas: 'HTML ir CSS', busena: 'Atlikta', xp: 40 },
  { pavadinimas: 'Bootstrap', busena: 'Atlikta', xp: 30 },
  { pavadinimas: 'Git ir GitHub', busena: 'Atlikta', xp: 35 },
  { pavadinimas: 'JavaScript', busena: 'Mokomasi', xp: 70 },
  { pavadinimas: 'MATLAB', busena: 'Mokomasi', xp: 50 },
  { pavadinimas: 'SQL duomenų bazės', busena: 'Planuojama', xp: 60 },
  { pavadinimas: 'React', busena: 'Planuojama', xp: 80 }
];

const busenos = ['Planuojama', 'Mokomasi', 'Atlikta'];

const stulpeliai = {
  Planuojama: document.getElementById('planuojama'),
  Mokomasi: document.getElementById('mokomasi'),
  Atlikta: document.getElementById('atlikta')
};

const pasiekimai = [
  { pavadinimas: 'Įgūdžių atradėjas', aprasymas: 'Atlik bent 1 įgūdį', salyga: function (atlikta, lygis) { return atlikta >= 1; } },
  { pavadinimas: 'Įgūdžių meistras', aprasymas: 'Atlik bent 4 įgūdžius', salyga: function (atlikta, lygis) { return atlikta >= 4; } },
  { pavadinimas: 'Įgūdžių ekspertas', aprasymas: 'Pasiek 4 lygį', salyga: function (atlikta, lygis) { return lygis === 4; } }
];

function uzkrautiBusenas() {
  const issaugota = localStorage.getItem('igudziuBusenos');
  if (issaugota === null) {
    return;
  }
  const issaugotosBusenos = JSON.parse(issaugota);
  igudziai.forEach(function (igudis) {
    if (busenos.includes(issaugotosBusenos[igudis.pavadinimas])) {
      igudis.busena = issaugotosBusenos[igudis.pavadinimas];
    }
  });
}

function issaugotiBusenas() {
  const busenuObjektas = {};
  igudziai.forEach(function (igudis) {
    busenuObjektas[igudis.pavadinimas] = igudis.busena;
  });
  localStorage.setItem('igudziuBusenos', JSON.stringify(busenuObjektas));
}

function rodytiKorteles() {
  busenos.forEach(function (busena) {
    stulpeliai[busena].innerHTML = '';
  });

  igudziai.forEach(function (igudis) {
    const kortele = document.createElement('div');
    kortele.className = 'igudzio-kortele';

    const pavadinimas = document.createElement('h4');
    pavadinimas.textContent = igudis.pavadinimas;

    const xp = document.createElement('span');
    xp.className = 'igudzio-xp';
    xp.textContent = igudis.xp + ' XP';

    const pasirinkimas = document.createElement('select');
    busenos.forEach(function (busena) {
      const variantas = document.createElement('option');
      variantas.value = busena;
      variantas.textContent = busena;
      pasirinkimas.appendChild(variantas);
    });
    pasirinkimas.value = igudis.busena;
    pasirinkimas.addEventListener('change', function () {
      igudis.busena = pasirinkimas.value;
      atnaujintiModuli();
    });

    kortele.appendChild(pavadinimas);
    kortele.appendChild(xp);
    kortele.appendChild(pasirinkimas);
    stulpeliai[igudis.busena].appendChild(kortele);
  });
}

function skaiciuotiXP() {
  let suma = 0;
  igudziai.forEach(function (igudis) {
    if (igudis.busena === 'Atlikta') {
      suma += igudis.xp;
    }
  });
  return suma;
}

function rastiLygi(xp) {
  if (xp >= 300) {
    return { lygis: 4, rangas: 'Profesionalas', nuo: 300, iki: null };
  } else if (xp >= 150) {
    return { lygis: 3, rangas: 'Specialistas', nuo: 150, iki: 300 };
  } else if (xp >= 50) {
    return { lygis: 2, rangas: 'Praktikantas', nuo: 50, iki: 150 };
  } else {
    return { lygis: 1, rangas: 'Pradedantysis', nuo: 0, iki: 50 };
  }
}

function atnaujintiProgresa(xp, lygis) {
  document.getElementById('lygis-rangas').textContent = lygis.lygis + ' lygis: ' + lygis.rangas;
  document.getElementById('xp-kiekis').textContent = 'Surinkta: ' + xp + ' XP';

  let procentai;
  if (lygis.lygis === 4) {
    procentai = 100;
    document.getElementById('xp-iki-lygio').textContent = 'Pasiektas aukščiausias lygis';
  } else {
    procentai = (xp - lygis.nuo) / (lygis.iki - lygis.nuo) * 100;
    document.getElementById('xp-iki-lygio').textContent =
      (xp - lygis.nuo) + ' / ' + (lygis.iki - lygis.nuo) + ' XP iki ' + (lygis.lygis + 1) + ' lygio';
  }
  document.getElementById('xp-progresas').style.width = procentai + '%';
}

function atnaujintiStatistika(atlikta) {
  const procentas = Math.round(atlikta / igudziai.length * 100);
  document.getElementById('igudziu-skaicius').textContent = igudziai.length;
  document.getElementById('atliktu-skaicius').textContent = atlikta;
  document.getElementById('atliktu-procentas').textContent = procentas + '%';
}

function atnaujintiAvatara(lygis) {
  const avataras = document.getElementById('avataras');
  if (lygis === 1) {
    avataras.src = 'assets/img/avataras-1.svg';
  } else if (lygis === 2) {
    avataras.src = 'assets/img/avataras-2.svg';
  } else if (lygis === 3) {
    avataras.src = 'assets/img/avataras-3.svg';
  } else {
    avataras.src = 'assets/img/avataras-4.svg';
  }
}

function rodytiPasiekimus(atlikta, lygis) {
  const konteineris = document.getElementById('pasiekimai');
  konteineris.innerHTML = '';

  pasiekimai.forEach(function (pasiekimas) {
    const atrakintas = pasiekimas.salyga(atlikta, lygis);

    const stulpelis = document.createElement('div');
    stulpelis.className = 'col-md-4';

    const kortele = document.createElement('div');
    kortele.className = atrakintas ? 'pasiekimas atrakintas' : 'pasiekimas';

    const ikona = document.createElement('i');
    ikona.className = atrakintas ? 'bi bi-trophy-fill' : 'bi bi-lock-fill';

    const pavadinimas = document.createElement('h4');
    pavadinimas.textContent = pasiekimas.pavadinimas;

    const aprasymas = document.createElement('p');
    aprasymas.textContent = atrakintas ? 'Atrakinta' : pasiekimas.aprasymas;

    kortele.appendChild(ikona);
    kortele.appendChild(pavadinimas);
    kortele.appendChild(aprasymas);
    stulpelis.appendChild(kortele);
    konteineris.appendChild(stulpelis);
  });
}

function atnaujintiModuli() {
  const xp = skaiciuotiXP();
  const lygis = rastiLygi(xp);
  const atlikta = igudziai.filter(function (igudis) {
    return igudis.busena === 'Atlikta';
  }).length;

  rodytiKorteles();
  atnaujintiProgresa(xp, lygis);
  atnaujintiStatistika(atlikta);
  atnaujintiAvatara(lygis.lygis);
  rodytiPasiekimus(atlikta, lygis.lygis);
  issaugotiBusenas();
}

uzkrautiBusenas();
atnaujintiModuli();
