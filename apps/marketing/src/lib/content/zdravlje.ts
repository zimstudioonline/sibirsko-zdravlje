import type { TopicPage } from "./types";

export const ZDRAVLJE_PATH = "/zdravlje";

export const zdravljeTeme: TopicPage[] = [
  {
    slug: "imunitet",
    label: "Imunitet",
    title: "Imunitet — kako ga podržati svakodnevnim navikama",
    description:
      "Šta je imunski sistem, koje navike ga podržavaju i koji nutrijenti doprinose njegovoj normalnoj funkciji — pregled bez preterivanja.",
    teaser: "Navike i nutrijenti koji doprinose normalnoj funkciji imunskog sistema.",
    intro:
      "Imunski sistem je mreža ćelija, tkiva i organa koja svakodnevno razlikuje „svoje“ od „stranog“. Na njegov rad ne utiče jedan čudotvorni sastojak, već zbir navika: san, ishrana, kretanje i način na koji se nosimo sa stresom.",
    sections: [
      {
        heading: "Temelji: san, kretanje i stres",
        paragraphs: [
          "Tokom sna organizam obavlja veliki deo svog „održavanja“, pa je redovan san od sedam do devet sati za odrasle jedna od najjednostavnijih investicija u zdravlje. Umerena fizička aktivnost i vreme provedeno napolju deo su zdravog ritma, dok hroničan stres i neispavanost dugoročno iscrpljuju organizam.",
        ],
      },
      {
        heading: "Nutrijenti sa odobrenim izjavama",
        paragraphs: [
          "U Evropskoj uniji postoji spisak odobrenih zdravstvenih izjava, a slična pravila primenjuju se i u Srbiji. Prema tom spisku, vitamin C, vitamin D, cink i selen doprinose normalnoj funkciji imunskog sistema.",
          "Najbolji izvor ovih nutrijenata je raznovrsna ishrana — voće, povrće, riba, jaja, orašasti plodovi i integralne žitarice. Vitamin D se najvećim delom stvara u koži pod uticajem sunca, pa je tokom zime vredno proveriti njegov nivo kod lekara.",
        ],
      },
      {
        heading: "Sibirska tradicija",
        paragraphs: [
          "Na severu su se tokom duge zime oslanjali na ono što priroda daje: bobice pasjeg trna i brusnice, kedrove oraščiće, čajeve od šumskog bilja i fermentisanu hranu. Mnogo toga se lako uklapa i u našu kuhinju.",
        ],
      },
      {
        heading: "Kada se obratiti lekaru",
        paragraphs: [
          "Česte, dugotrajne ili neuobičajeno teške infekcije razlog su za pregled kod lekara. Nijedan dodatak ishrani ne zamenjuje dijagnostiku i terapiju.",
        ],
      },
    ],
  },
  {
    slug: "energija-i-vitalnost",
    label: "Energija i vitalnost",
    title: "Energija i vitalnost — odakle dolazi i zašto nestaje",
    description:
      "Zašto se osećamo umorno i koje navike vraćaju energiju: san, ritam dana, ishrana, kretanje i nutrijenti koji doprinose smanjenju umora.",
    teaser: "San, ritam dana i nutrijenti koji doprinose smanjenju umora.",
    intro:
      "Osećaj energije retko zavisi od jedne stvari. On je rezultat kvalitetnog sna, ujednačenog ritma obroka, dovoljno tečnosti, kretanja i načina na koji prolazimo kroz stresne dane. Zato se trajna vitalnost gradi navikama, a ne brzim rešenjima.",
    sections: [
      {
        heading: "Unutrašnji sat",
        paragraphs: [
          "Organizam funkcioniše po cirkadijalnom ritmu od oko 24 sata. Jutarnja dnevna svetlost, redovno vreme odlaska na spavanje i buđenja i manje ekrana uveče pomažu da taj sat radi usklađeno — a to se oseća tokom celog dana.",
        ],
      },
      {
        heading: "Hrana i tečnost",
        paragraphs: [
          "Obroci sa dovoljno proteina, vlakana i složenih ugljenih hidrata daju ravnomerniju energiju od brzih šećera, posle kojih često sledi pad. I blaga dehidratacija može da se oseti kao umor, pa je čaša vode najjednostavniji prvi korak.",
        ],
      },
      {
        heading: "Nutrijenti sa odobrenim izjavama",
        paragraphs: [
          "Prema listi odobrenih zdravstvenih izjava, vitamini B2, B6, B12 i C, kao i gvožđe i magnezijum, doprinose smanjenju umora i iscrpljenosti. Dugotrajan, neobjašnjiv umor ipak zahteva pregled i analize krvi, jer može imati različite uzroke.",
        ],
      },
      {
        heading: "Gde su tu adaptogeni",
        paragraphs: [
          "Biljke poput rodiole, eleuterokoka i šisandre decenijama se proučavaju u kontekstu otpornosti organizma na napor. One nisu stimulansi poput kofeina i ne zamenjuju san i odmor. Više o tome pročitajte na stranici o adaptogenima.",
        ],
      },
    ],
  },
  {
    slug: "ishrana",
    label: "Ishrana",
    title: "Ishrana — jednostavna pravila za svaki dan",
    description:
      "Osnove uravnotežene ishrane: tanjir sa povrćem, proteinima i celovitim žitaricama, dovoljno vlakana, zdrave masti i sezonske namirnice.",
    teaser: "Uravnotežen tanjir, vlakna, zdrave masti i sezonska hrana.",
    intro:
      "Dobra ishrana nije dijeta, već obrazac koji se ponavlja iz dana u dan. Umesto strogih zabrana, korisnije je nekoliko jednostavnih pravila koja se lako uklapaju u domaću kuhinju.",
    sections: [
      {
        heading: "Model tanjira",
        paragraphs: [
          "Praktično pravilo: polovina tanjira povrće i voće, četvrtina izvor proteina (riba, jaja, meso, mahunarke), četvrtina celovite žitarice ili krompir. Uz to malo kvalitetne masti — maslinovo ulje, orašasti plodovi, semenke.",
        ],
      },
      {
        heading: "Vlakna i raznolikost",
        paragraphs: [
          "Vlakna iz povrća, voća, mahunarki i integralnih žitarica hrana su za korisne bakterije u crevima. Što je jelovnik raznovrsniji — više boja i više različitih biljaka tokom nedelje — to je šira i paleta vitamina, minerala i polifenola.",
        ],
      },
      {
        heading: "Zdrave masti",
        paragraphs: [
          "Omega-3 masne kiseline nalaze se u masnoj ribi (skuša, sardina, losos), lanenom semenu i orasima. EPA i DHA doprinose normalnoj funkciji srca, uz dnevni unos od najmanje 250 mg.",
        ],
      },
      {
        heading: "Severnjački tanjir",
        paragraphs: [
          "Tradicionalna ishrana severa oslanja se na ribu, divlje bobice, gljive, kiselu i fermentisanu hranu, kedrove oraščiće i biljne čajeve. Dobar deo toga lako se prevodi u našu kuhinju: kiseli kupus, sezonsko bobičasto voće i domaći čajevi od šumskog bilja.",
        ],
      },
    ],
  },
  {
    slug: "wellness",
    label: "Wellness",
    title: "Wellness — ravnoteža tela, uma i okruženja",
    description:
      "Wellness kao svakodnevna praksa: boravak u prirodi, disanje, odmor od ekrana, sauna i rituali koji vraćaju ravnotežu.",
    teaser: "Priroda, disanje, odmor od ekrana i rituali ravnoteže.",
    intro:
      "Wellness nije luksuz niti spa vikend, već svakodnevna briga o sebi: o telu, mislima, odnosima i okruženju u kome živimo. Male, redovne prakse često donose više od povremenih velikih promena.",
    sections: [
      {
        heading: "Vreme u prirodi",
        paragraphs: [
          "Japanska praksa šinrin-joku — „kupanje u šumi“ — podrazumeva laganu, svesnu šetnju kroz šumu. Istraživanja ovakvog boravka u prirodi prate raspoloženje, osećaj stresa i kvalitet odmora. Za početak je dovoljno dvadesetak minuta u parku ili šumi, bez žurbe i bez telefona.",
        ],
      },
      {
        heading: "Disanje i pauze",
        paragraphs: [
          "Nekoliko minuta sporog disanja — na primer udah na četiri i izdah na šest brojeva — jednostavan je način da se napravi pauza usred dana. Isto važi i za kratke šetnje između sati provedenih za računarom.",
        ],
      },
      {
        heading: "Ruska banja",
        paragraphs: [
          "Na severu je banja — parno kupatilo sa vrelim kamenjem i metlicama od brezovih grančica — vekovima bila deo nedeljnog ritma i druženja. Smena toplote i hlađenja i danas je omiljen ritual opuštanja. Osobe sa srčanim ili drugim hroničnim tegobama treba da se o sauni prethodno posavetuju sa lekarom.",
        ],
      },
      {
        heading: "Digitalni odmor",
        paragraphs: [
          "Sat vremena bez ekrana pre spavanja, obroci bez telefona i jedan dan u nedelji sa manje obaveštenja — male granice koje vraćaju pažnju i prostor za pravi odmor.",
        ],
      },
    ],
  },
  {
    slug: "zdrav-zivotni-stil",
    label: "Zdrav životni stil",
    title: "Zdrav životni stil — male navike koje se sabiraju",
    description:
      "Kako graditi zdrav životni stil korak po korak: kretanje, san, male promene navika, nepušenje i redovni preventivni pregledi.",
    teaser: "Kretanje, san i navike koje traju duže od prve nedelje.",
    intro:
      "Zdrav život nije savršenstvo, već niz malih odluka koje se ponavljaju. Najbolje navike su one koje možete da zadržite i kada prođe prva nedelja entuzijazma.",
    sections: [
      {
        heading: "Kretanje",
        paragraphs: [
          "Svetska zdravstvena organizacija odraslima preporučuje najmanje 150 minuta umerene fizičke aktivnosti nedeljno — to je pola sata brzog hoda pet dana u nedelji — uz vežbe snage bar dva puta nedeljno.",
        ],
      },
      {
        heading: "San",
        paragraphs: [
          "Odraslima je potrebno sedam do devet sati sna. Redovno vreme spavanja, tamna i provetrena soba i manje kofeina posle podneva jednostavni su koraci ka boljem snu.",
        ],
      },
      {
        heading: "Male promene, veliki efekat",
        paragraphs: [
          "Umesto da sve menjate odjednom, izaberite jednu naviku: čaša vode ujutru, šetnja posle ručka, porcija povrća više svakog dana. Kada nova navika postane automatska, dodajte sledeću.",
        ],
      },
      {
        heading: "Prevencija",
        paragraphs: [
          "Nepušenje, umereno ili nikakvo konzumiranje alkohola i redovni preventivni pregledi i dalje su među najvažnijim odlukama za dugoročno zdravlje.",
        ],
      },
    ],
  },
];

export function getZdravljeTema(slug: string): TopicPage | undefined {
  return zdravljeTeme.find((item) => item.slug === slug);
}
