/**
 * Gating layer for the city × dish mesh.
 *
 * `MATRIX_ALLOWLIST` is the single source of truth for which (dish, city) leaf pages get
 * pre-rendered by `/(matrix)/[meshSlug]/`. Start empty. Add entries as copy + photography
 * land per leaf, not before.
 *
 * URL format: `/baklava-in-plano-tx/` — single dynamic segment, dish slug first, city slug
 * (with `-tx` suffix preserved for disambiguation) second, joined by `-in-`.
 *
 * If the URL format changes Tuesday, update `meshSlug` / `parseMeshSlug` together with
 * the diagram at docs/mesh-diagram-2026-05-18.md.
 */

import { DISHES, type Dish } from "./dishes";
import { NEIGHBORHOODS, type Neighborhood } from "./neighborhoods";

export type MatrixEntry = {
  dishSlug: string;
  citySlug: string;
};

/**
 * Pre-rendered (dish, city) combinations. Empty until Tuesday 2026-05-19 confirmation of:
 *   1. Dish axis (the 7 candidates in DISHES)
 *   2. ACS-driven city ranking (docs/density-research-2026-05-18.md, pending)
 *   3. Copy rollout order
 *
 * Once populated, `npm run build` will pre-render one HTML file per entry.
 *
 * ⚠️  HOW TO WIRE THE ROUTE WHEN THIS LIST GETS ITS FIRST ENTRY:
 *
 * Next 15 + `output: "export"` requires `generateStaticParams()` to return at least one
 * path. While this list is empty, the dynamic route file is INTENTIONALLY NOT PRESENT —
 * adding it with an empty allowlist breaks `npm run build`. The moment the first entry
 * lands here, create `src/app/(matrix)/[meshSlug]/page.tsx` with this shape:
 *
 *   import { notFound } from "next/navigation";
 *   import type { Metadata } from "next";
 *   import Link from "next/link";
 *   import { MATRIX_ALLOWLIST, meshSlug, resolveMeshEntry } from "@/data/matrix";
 *
 *   export const dynamic = "error";
 *   export const dynamicParams = false;
 *
 *   export function generateStaticParams() {
 *     return MATRIX_ALLOWLIST.map((e) => ({ meshSlug: meshSlug(e.dishSlug, e.citySlug) }));
 *   }
 *
 *   export async function generateMetadata(
 *     { params }: { params: Promise<{ meshSlug: string }> }
 *   ): Promise<Metadata> {
 *     const { meshSlug: slug } = await params;
 *     const entry = resolveMeshEntry(slug);
 *     if (!entry) return { robots: { index: false, follow: false } };
 *     // While leaves are still "being prepared" copy-wise, keep robots noindex.
 *     // Once the dish has populated `intro`/`body`/`keywords`, switch to createMetadata().
 *     return {
 *       title: `${entry.dish.name} in ${entry.neighborhood.city}, ${entry.neighborhood.state}`,
 *       robots: { index: false, follow: false },
 *     };
 *   }
 *
 *   export default async function MeshLeafPage(
 *     { params }: { params: Promise<{ meshSlug: string }> }
 *   ) {
 *     const { meshSlug: slug } = await params;
 *     const entry = resolveMeshEntry(slug);
 *     if (!entry) notFound();
 *     return (
 *       <main className="container-pad section-pad">
 *         <h1>{entry.dish.name} in {entry.neighborhood.city}, {entry.neighborhood.state}</h1>
 *         <p>This page is being prepared. <Link href={`/specialties/${entry.dish.relatedSpecialtySlug}/`}>Read more about {entry.dish.name}</Link></p>
 *       </main>
 *     );
 *   }
 */
export const MATRIX_ALLOWLIST: MatrixEntry[] = [];

/** Join a (dish, city) pair into the URL segment used by `/(matrix)/[meshSlug]/`. */
export function meshSlug(dishSlug: string, citySlug: string): string {
  return `${dishSlug}-in-${citySlug}`;
}

/** Inverse of `meshSlug`. Returns null if the slug doesn't parse or doesn't resolve. */
export function parseMeshSlug(slug: string): MatrixEntry | null {
  const marker = "-in-";
  const idx = slug.indexOf(marker);
  if (idx <= 0) return null;
  const dishSlug = slug.slice(0, idx);
  const citySlug = slug.slice(idx + marker.length);
  if (!dishSlug || !citySlug) return null;
  return { dishSlug, citySlug };
}

export type ResolvedMeshEntry = {
  dish: Dish;
  neighborhood: Neighborhood;
};

/** Look up the underlying data records for a mesh slug. Returns null if either side is unknown. */
export function resolveMeshEntry(slug: string): ResolvedMeshEntry | null {
  const parsed = parseMeshSlug(slug);
  if (!parsed) return null;
  const dish = DISHES.find((d) => d.slug === parsed.dishSlug);
  const neighborhood = NEIGHBORHOODS.find((n) => n.slug === parsed.citySlug);
  if (!dish || !neighborhood) return null;
  return { dish, neighborhood };
}
