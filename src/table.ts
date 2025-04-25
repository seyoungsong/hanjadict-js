// Import the data directly
// This will be bundled at build time by tools like webpack, rollup, etc.
import tableJson from "../data/table.json"

// For Node.js environments
let tableData: Record<string, string>

// Environment detection
const isBrowser = typeof window !== "undefined"

if (isBrowser) {
  // Browser environment - use the imported JSON directly
  tableData = tableJson
} else {
  // Node.js environment - can use the imported JSON directly as well
  tableData = tableJson
}

export { tableData }
