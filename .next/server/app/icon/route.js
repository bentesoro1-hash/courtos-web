const CHUNK_PUBLIC_PATH = "server/app/icon/route.js";
const runtime = require("../../chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/[externals]_next_dist_compiled_@vercel_og_index_node_a446db3c.js");
runtime.loadChunk("server/chunks/node_modules_next_620365ab._.js");
runtime.loadChunk("server/chunks/[root-of-the-server]__9f1fca84._.js");
runtime.getOrInstantiateRuntimeModule("[project]/.next-internal/server/app/icon/route/actions.js [app-rsc] (server actions loader, ecmascript)", CHUNK_PUBLIC_PATH);
runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \"[project]/app/icon--route-entry.js [app-rsc] (ecmascript)\" } [app-rsc] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \"[project]/app/icon--route-entry.js [app-rsc] (ecmascript)\" } [app-rsc] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
