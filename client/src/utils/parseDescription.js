export const parseDescription = str =>
  str
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
    .replace(/{/g, "&lcub;")
    .replace(/}/g, "&rcub;")
    .replace(/~/g, "&tilde;");
