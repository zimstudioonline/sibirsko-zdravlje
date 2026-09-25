/**
 * Edukativne stranice portala (sibirske biljke, zdravlje) su statički
 * podaci — jedna šema, jedan šablon za prikaz (`TopicArticle`).
 *
 * Pravilo za tekst: bez tvrdnji da biljka ili sastojak leči, sprečava ili
 * ublažava bolest. Dozvoljeno je: poreklo, tradicija, sastav, šta se
 * istražuje i odobrene zdravstvene izjave za nutrijente (EU/RS lista).
 */

export interface ContentSection {
  heading: string;
  paragraphs: string[];
}

export interface TopicPage {
  slug: string;
  /** Naslov stranice (H1 i <title>). */
  title: string;
  /** Kratak naziv za meni, kartice i breadcrumb. */
  label: string;
  /** Latinski naziv (samo za biljke). */
  latinName?: string;
  /** Meta description, do ~155 karaktera. */
  description: string;
  /** Uvodni pasus ispod naslova. */
  intro: string;
  /** Jedna rečenica za kartice na hub stranicama. */
  teaser: string;
  sections: ContentSection[];
}
