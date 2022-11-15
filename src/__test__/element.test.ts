import "@testing-library/jest-dom"
import { identityComponent, resolveJsxEventName } from "../element"

describe("element.ts", () => {
  it("resolveEventName()", () => {
    // success
    const eventStr1 = "onClick"
    const eventStr2 = "onclick"

    // fail
    const eventStr3 = "ONCLICK"

    expect(resolveJsxEventName(eventStr1)).toBe("click")
    expect(resolveJsxEventName(eventStr2)).toBe("click")
    expect(resolveJsxEventName(eventStr3)).not.toBe("click")
  })

  it("identityComponent()", () => {
    expect(identityComponent("1233")).toThrowError("1233")
  })
})