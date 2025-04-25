import { tableData } from "./table"

/**
 * Look up a Hanja character and return its 훈음 (Hun-eum) information.
 *
 * @param c A single Hanja character to look up
 * @returns The 훈음 (Hun-eum) information as a string if found,
 *          typically in the format "훈 음" (meaning pronunciation).
 *          Returns null if the character is not found.
 *
 * @example
 * lookup("雪") // returns '눈 설'
 * lookup("山") // returns '메 산'
 * lookup("xyz") // returns null
 */
export function lookup(c: string): string | null {
  return tableData[c] || null
}

/**
 * Check if a character is a Hanja (Chinese character used in Korean).
 *
 * @param c A single character to check
 * @returns True if the character is a Hanja in the dictionary, false otherwise
 *
 * @example
 * isHanja("雪") // returns true
 * isHanja("한") // returns false
 */
export function isHanja(c: string): boolean {
  return c in tableData
}

/**
 * Extract the Sino-Korean pronunciation (음/音) part from the 훈음 information.
 *
 * This function handles various formats in the dictionary:
 * - Normal format: "눈 설" -> returns "설"
 * - Comma-separated: "샘솟을 집, 샘솟을 설" -> returns "집"
 * - Slash-separated: "제비 연/잔치 연" -> returns "연"
 * - Parentheses: "영양 령(영)" -> returns "령"
 *
 * @param c A single Hanja character
 * @returns The Sino-Korean pronunciation (음/音) if found, null otherwise
 *
 * @example
 * pronunciation("雪") // returns '설'
 * pronunciation("燕") // returns '연'
 */
export function pronunciation(c: string): string | null {
  let hunEum = lookup(c)
  if (hunEum === null) {
    return null
  }

  // First check for entries with commas: "샘솟을 집, 샘솟을 설" -> "집"
  if (hunEum.includes(",")) {
    hunEum = hunEum.split(",")[0].trim()
  }

  // For entries with slash: "제비 연/잔치 연" -> "연"
  if (hunEum.includes("/")) {
    hunEum = hunEum.split("/")[0].trim()
  }

  // For entries with parentheses: "영양 령(영)" -> "령"
  if (hunEum.includes("(")) {
    hunEum = hunEum.split("(")[0].trim()
  }

  return hunEum ? hunEum.charAt(hunEum.length - 1) : null
}
