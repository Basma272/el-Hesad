// utils/translate.js
export function translate(obj, lang) {
  if (obj && typeof obj === "object") {
    // ✅ لو ObjectId أو Date أو Buffer --> رجّعه زي ما هو
    if (obj.constructor?.name === "ObjectId" || obj instanceof Date || Buffer.isBuffer(obj)) {
      return obj;
    }

    // ✅ لو {ar, en}
    if (typeof obj.ar === "string" || typeof obj.en === "string") {
      return obj[lang] || obj.en;
    }

    // ✅ لو Array
    if (Array.isArray(obj)) {
      return obj.map((item) => translate(item, lang));
    }

    // ✅ غير كدا: object عادي
    const newObj = {};
    for (const key in obj) {
      newObj[key] = translate(obj[key], lang);
    }
    return newObj;
  }

  return obj; // primitive (string, number, etc.)
}