import "@testing-library/jest-dom"
import { createElem, insertElem } from "src/dom"
import {
  BROWSER,
  def,
  excludes,
  humpToTransverse,
  humpToUnder,
  noop,
  noopError,
  resolveNextNodes,
  underToHump
} from "src/helper"

describe("helper.ts", () => {
  it("resolveNextNodes()", () => {
    const nodes = ["<!-- S -->", "div", "div", "<!-- /s -->"]
    nodes.forEach(k => {
      if (k !== "div") {
        insertElem(document.createComment(k), document.body)
      } else {
        document.body.appendChild(createElem(k))
      }
    })

    const res = resolveNextNodes(document.body.childNodes[0], "<!-- /s -->")
    expect(res).not.toBeUndefined()
    expect(res?.length).toBe(4)
    document.body.innerHTML = ""
  })

  it("excludes()", () => {
    const obj = { a: 1, b: 2, c: "a", d: "z" }
    expect(excludes(obj, key => ["b", "d"].includes(key))).toEqual({
      a: 1,
      c: "a"
    })
  })

  it("noop()", () => {
    expect(noop(123)).toBe(123)
  })

  it("noopError()", () => {
    expect(() => noopError("aaa")).toThrowError("aaa")
  })

  it("def()", () => {
    const obj = { b: 1 }
    def(obj, "a", 123)

    expect(Object.keys(obj).includes("a")).toBeFalsy()
    expect(Object.keys(obj).includes("b")).toBeTruthy()
  })

  it("BROWSER", () => {
    expect(BROWSER).toBeTruthy()
  })

  it("humpToUnder()", () => {
    expect(humpToUnder("textAlign")).toBe("text_align")
  })

  it("underToHump()", () => {
    expect(underToHump("text_align")).toBe("textAlign")
  })

  it("humpToTransverse()", () => {
    expect(humpToTransverse("textAlign")).toBe("text-align")
  })
})
