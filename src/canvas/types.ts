import type { ComponentType } from "react";

/* ============================================================
   The declarative wireframe model.
   A page is data, not JSX — so wireframes stay consistent and
   can be authored / parallelized easily. The renderer in
   src/wireframe/* turns this data into the visual wireframe and
   draws leader lines from each note to the section it annotates.
   ============================================================ */

/** Which "variable family" a note line refers to. Drives the dot color. */
export type WfSystem = "color" | "brand" | "product" | "seo" | "layout";

export interface WfNoteLine {
  sys: WfSystem;
  /** Plain text; wrap variable names in backticks to render them as code, e.g. "bg: `--color-sand`". */
  text: string;
}

export interface WfNote {
  id: string;
  /** id of the WfSection this note points at. */
  anchor: string;
  side: "left" | "right";
  title: string;
  lines: WfNoteLine[];
}

export type WfSectionKind =
  | "header"
  | "breadcrumb"
  | "hero"
  | "trustbar"
  | "cards"
  | "split"
  | "grid"
  | "list"
  | "gallery"
  | "reviews"
  | "faq"
  | "form"
  | "map"
  | "cta"
  | "footer"
  | "text"
  | "modal"
  | "tabs"
  | "logos"
  | "stat"
  | "locationcard"
  | "pressquote"
  | "actioncards"
  | "featured"
  | "instagram";

export interface WfSection {
  id: string;
  kind: WfSectionKind;
  /** faint mono caption above the block — the component name in the real site */
  label?: string;
  eyebrow?: string;
  heading?: string;
  sub?: string;
  /** number of muted body text bars to render */
  body?: number;
  buttons?: string[];
  /** repeat count for cards / list rows / grid cells / gallery tiles */
  items?: number;
  itemLabel?: string;
  image?: boolean;
  /** grid columns (for kind: grid / cards / gallery) */
  cols?: number;
  /** chip labels (cities, topics, tags…) */
  chips?: string[];
  chipStyle?: "city" | "gold" | "plain";
  /** secondary lines paired with chips (trustbar sub-labels, action-card sublines) */
  subs?: string[];
  /** override the default header alignment for a section */
  align?: "center" | "left";
  /** show a "fetched from <data file>" ribbon under a product block */
  source?: string;
  accent?: "primary" | "gold" | "sand" | "plain" | "dark";
  /** freeform variant hook for special-case rendering */
  variant?: string;
}

export interface WireframePage {
  id: string;
  /** short human title, e.g. "Home" */
  title: string;
  /** url pattern shown in the browser chrome, e.g. "/near/[city]/" */
  route: string;
  /** cluster name used to group frames on the canvas */
  group: string;
  /** one-line description shown under the page tag */
  blurb?: string;
  /** frame width in px (default 380) */
  width?: number;
  sections: WfSection[];
  notes: WfNote[];
}

/** Where each page frame sits in canvas/world coordinates. */
export interface CanvasPlacement {
  id: string;
  x: number;
  y: number;
}

/** A floating cluster heading on the canvas. */
export interface ClusterLabel {
  kicker: string;
  title: string;
  desc?: string;
  x: number;
  y: number;
}

/**
 * A wireframe page = the REAL Al-Baghdady page (composed from the real
 * components) plus its side annotations. `Page` renders the actual markup;
 * images are boxed via the wireframe SmartImage.
 */
export interface WirePage {
  id: string;
  title: string;
  route: string;
  group: string;
  notes: WfNote[];
  Page: ComponentType;
}
