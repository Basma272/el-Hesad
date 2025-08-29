// function pickLanguage(obj, lang, seen = new WeakSet()) {
//   if (obj && typeof obj === "object") {
//     if (seen.has(obj)) return obj;
//     seen.add(obj);

//     // لو الحقل عبارة عن {ar, en}
//     if (
//       typeof obj.ar === "string" ||
//       typeof obj.en === "string"
//     ) {
//       return obj[lang] || obj.en;
//     }

//     // Array
//     if (Array.isArray(obj)) {
//       return obj.map((item) => pickLanguage(item, lang, seen));
//     }

//     // Object عادي
//     const newObj = {};
//     for (const key in obj) {
//       newObj[key] = pickLanguage(obj[key], lang, seen);
//     }
//     return newObj;
//   }
//   return obj;
// }

// export function localizeResponse(req, res, next) {
//   const langHeader = req.headers["accept-language"];
//   const lang = langHeader?.split(",")[0]?.toLowerCase().startsWith("ar") ? "ar" : "en";
//   req.lang = lang;

//   const oldJson = res.json;
//   res.json = function (data) {
//     let cleanData;

//     if (Array.isArray(data)) {
//       cleanData = data.map((d) => (d?.toObject ? d.toObject() : d));
//     } else if (data?.toObject) {
//       cleanData = data.toObject();
//     } else {
//       cleanData = data;
//     }

//     const localizedData = pickLanguage(cleanData, req.lang);
//     return oldJson.call(this, localizedData);
//   };

//   next();
// }