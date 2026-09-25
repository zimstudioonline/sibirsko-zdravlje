/**
 * Sibirska Priroda — forme sa sajta → Google Sheets + email obaveštenje.
 *
 * Ne menja se sa ostatkom projekta (živi van Next.js koda) — nalepi ovaj
 * fajl u script.google.com projekat vezan za tvoj Google Sheet, prati
 * SETUP.md za deploy korake.
 */

// TODO: promeni na email na koji želiš da stižu obaveštenja.
var NOTIFY_EMAIL = "zdravljeisibir@gmail.com";
var SHEET_NAME_UPITI = "Upiti";
var SHEET_NAME_KONTAKT = "Kontakt";
var SHEET_NAME_SAVETI = "Saveti";

/**
 * Isti Web App opslužuje više formi sa sajta — razlikuju se po `tip` polju
 * (`kontakt-form.tsx` šalje "kontakt", `saveti-form.tsx` šalje "saveti").
 * Bez `tip` polja (stariji zahtevi) tretira se kao upit, radi unazadne
 * kompatibilnosti.
 */
function doPost(e) {
  try {
    var params = (e && e.parameter) || {};

    if (params.tip === "kontakt") {
      handleKontakt(params);
    } else if (params.tip === "saveti") {
      handleSaveti(params);
    } else {
      handleUpit(params);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleUpit(params) {
  var sheet = getOrCreateSheet(SHEET_NAME_UPITI, [
    "Datum",
    "Ime i prezime",
    "Telefon",
    "Ulica i broj",
    "Grad/Mesto",
    "Poštanski broj",
    "Proizvod",
    "Količina",
    "E-mail",
  ]);

  sheet.appendRow([
    new Date(),
    params.ime || "",
    params.telefon || "",
    params.adresa || "",
    params.grad || "",
    params.postanskiBroj || "",
    params.proizvod || "",
    params.kolicina || "",
    params.email || "",
  ]);

  var subject = "Novi upit sa sajta — " + (params.ime || "nepoznato ime");
  var body = [
    "Ime i prezime: " + (params.ime || ""),
    "Telefon: " + (params.telefon || ""),
    "Adresa: " + (params.adresa || "") + ", " + (params.grad || "") + " " +
      (params.postanskiBroj || ""),
    "Proizvod: " + (params.proizvod || ""),
    "Količina: " + (params.kolicina || ""),
    "E-mail: " + (params.email || ""),
  ].join("\n");

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

function handleKontakt(params) {
  var sheet = getOrCreateSheet(SHEET_NAME_KONTAKT, ["Datum", "Ime i prezime", "E-mail", "Poruka"]);

  sheet.appendRow([new Date(), params.ime || "", params.email || "", params.poruka || ""]);

  var subject = "Nova poruka sa kontakt forme — " + (params.ime || "nepoznato ime");
  var body = [
    "Ime i prezime: " + (params.ime || ""),
    "E-mail: " + (params.email || ""),
    "",
    "Poruka:",
    params.poruka || "",
  ].join("\n");

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body, { replyTo: params.email || NOTIFY_EMAIL });
}

/** Prijava za besplatne savete (stranica /besplatni-saveti): ime + email. */
function handleSaveti(params) {
  var sheet = getOrCreateSheet(SHEET_NAME_SAVETI, ["Datum", "Ime", "E-mail"]);

  sheet.appendRow([new Date(), params.ime || "", params.email || ""]);

  var subject = "Nova prijava za besplatne savete — " + (params.ime || "nepoznato ime");
  var body = ["Ime: " + (params.ime || ""), "E-mail: " + (params.email || "")].join("\n");

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body, { replyTo: params.email || NOTIFY_EMAIL });
}

function getOrCreateSheet(name, headerRow) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
    sheet.appendRow(headerRow);
  }
  return sheet;
}
