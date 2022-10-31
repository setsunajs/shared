import "@testing-library/jest-dom"
import { identityComponent, resolveEventName } from "../element"

describe("element.ts", () => {
  it("resolveEventName()", () => {
    // success
    const eventStr1 = "onClick"
    const eventStr2 = "onclick"

    // fail
    const eventStr3 = "ONCLICK"

    expect(resolveEventName(eventStr1)).toBe("click")
    expect(resolveEventName(eventStr2)).toBe("click")
    expect(resolveEventName(eventStr3)).not.toBe("click")
  })

  it("identityComponent()", () => {
    expect(identityComponent("1233")).toThrowError("1233")
  })
})