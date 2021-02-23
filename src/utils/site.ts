import { Site } from "../types/data";

export function getSiteIcon(site: Site) {
  return site.icon.startsWith('http') ? site.icon : `${new URL(site.url).origin}/${site.icon.replace(/\/^/, '')}`
}