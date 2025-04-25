import * as fs from "fs"
import * as path from "path"

// Load the table from the JSON file
const dataPath = path.join(__dirname, "../data/table.json")
export const tableData: Record<string, string> = JSON.parse(
  fs.readFileSync(dataPath, "utf8"),
)
