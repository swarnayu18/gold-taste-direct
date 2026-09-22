//#region node_modules/.nitro/vite/services/ssr/assets/order-draft-6w9zsJjG.js
var DRAFT_KEY = "goldtaste.orderDraft.v1";
var PLACED_KEY = "goldtaste.placedOrder.v1";
function read(key) {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(key);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function write(key, value) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch {}
}
var loadDraft = () => read(DRAFT_KEY);
var saveDraft = (draft) => write(DRAFT_KEY, draft);
var clearDraft = () => {
	if (typeof window !== "undefined") window.localStorage.removeItem(DRAFT_KEY);
};
var loadPlacedOrder = () => read(PLACED_KEY);
var savePlacedOrder = (order) => write(PLACED_KEY, order);
//#endregion
export { savePlacedOrder as a, saveDraft as i, loadDraft as n, loadPlacedOrder as r, clearDraft as t };
