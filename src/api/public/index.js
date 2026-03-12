/**
 * src/api/public/index.js
 * Central export for all public API functions
 * Makes imports cleaner: import { fetchHeader, fetchHome } from "@/api/public"
 */

export { fetchHeader, updateHeader } from "./headerApi";
export {
  fetchHome,
  fetchHomeSection,
  updateHome,
  updateHomeSection,
} from "./homeApi";
export { fetchFooter, updateFooter } from "./footerApi";
