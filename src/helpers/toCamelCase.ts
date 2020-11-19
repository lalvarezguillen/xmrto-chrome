export default function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/[^\w\s]/g, "")
    .replace(/ (.)/g, ($1) => $1.toUpperCase())
    .replace(/ /g, "");
}
