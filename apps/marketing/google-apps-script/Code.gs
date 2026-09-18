/**
 * Sibirsko Zdravlje — upit forma → Google Sheets + email obaveštenje.
 *
 * Ne menja se sa ostatkom projekta (živi van Next.js koda) — nalepi ovaj
 * fajl u script.google.com projekat vezan za tvoj Google Sheet, prati
 * SETUP.md za deploy korake.
 */

// TODO: promeni na email na koji želiš da stižu obaveštenja o upitima.
var NOTIFY_EMAIL = "zdravljeisibir@gmail.com";
var SHEET_NAME = "Upiti";

function doPost(e) {
  try {
    var params = (e && e.parameter) || {};
    var sheet = getOrCreateSheet();

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

    sendNotification(params);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
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
  }
  return sheet;
}

function sendNotification(params) {
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
