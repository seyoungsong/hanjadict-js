import { isHanja, lookup, pronunciation } from "../src"

describe("hanjadict", () => {
  test("lookup function", () => {
    expect(lookup("雪")).toBe("눈 설")
    expect(lookup("山")).toBe("메 산")
    expect(lookup("xyz")).toBeNull()
    expect(lookup("")).toBeNull()
  })

  test("isHanja function", () => {
    expect(isHanja("雪")).toBe(true)
    expect(isHanja("한글")).toBe(false)
    expect(isHanja("")).toBe(false)
  })

  test("pronunciation formats", () => {
    // Normal format
    expect(pronunciation("雪")).toBe("설") // 눈 설

    // With parentheses
    expect(pronunciation("䴫")).toBe("령") // 영양 령(영)

    // With slash
    expect(pronunciation("燕")).toBe("연") // 제비 연/잔치 연

    // With comma
    expect(pronunciation("㴕")).toBe("집") // 샘솟을 집, 샘솟을 설

    // Invalid input
    expect(pronunciation("xyz")).toBeNull()
    expect(pronunciation("")).toBeNull()
  })
})
