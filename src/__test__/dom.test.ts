import "@testing-library/jest-dom"
import {
  createElem,
  createTextElem,
  getAttr,
  getNextSibling,
  insertElem,
  query,
  queryAll,
  removeAttr,
  removeElem,
  removeEvent,
  setAttr,
  setElemText,
  setEvent
} from "../dom"

describe("dom.ts", () => {
  it("createElem() -- basic html tag", async () => {
    const div = createElem("div")
    expect(!!div).toBeTruthy()

    document.body.appendChild(div)
    expect(div).toBeInTheDocument()

    div.remove()
  })

  it("createElem() -- svg", () => {
    const svg = createElem("svg")
    expect(!!svg).toBeTruthy()

    document.body.appendChild(svg)
    expect(svg).toBeInTheDocument()

    svg.remove()
  })

  it("createTextElem()", () => {
    const text = document.body.appendChild(createTextElem("123"))
    expect(!!text).toBeTruthy()

    document.body.appendChild(text)
    expect(document.body.textContent).toBe("123")

    text.remove()
  })

  it("insertElem()", () => {
    const div = createElem("div")
    insertElem(div, document.body, null)

    expect(div).toBeInTheDocument()
    expect(document.body.childNodes[0]).toBe(div)

    div.remove()
  })

  it("removeElem()", () => {
    const div = createElem("div")
    insertElem(div, document.body, null)
    removeElem(div)

    expect(div).not.toBeInTheDocument()
  })

  it("getNextSibling()", () => {
    const div1 = createElem("div")
    const div2 = createElem("div")
    document.body.appendChild(div1)
    document.body.appendChild(div2)

    expect(getNextSibling(div1)).toBe(div2)
    div1.remove()
    div2.remove()
  })

  it("setElemText()", () => {
    const div = createElem("div")
    const text = "hhhh"
    document.body.appendChild(div)

    setElemText(div, text)
    expect(div.textContent).toBe(text)
    div.remove()
  })

  it("setAttr()", () => {
    const div = createElem("div")
    setAttr(div, "key", "123")
    document.body.appendChild(div)
    expect(div.getAttribute("key")).toBe("123")

    setAttr(div, "key", "abc")
    expect(div.getAttribute("key")).toBe("abc")

    div.remove()
  })

  it("getAttr()", () => {
    const div = createElem("div")
    setAttr(div, "key", "123")
    document.body.appendChild(div)
    expect(getAttr(div, "key")).toBe("123")

    div.remove()
  })

  it("removeAttr()", () => {
    const div = createElem("div")
    document.body.appendChild(div)

    setAttr(div, "key", "123")
    removeAttr(div, "key")

    expect(getAttr(div, "key")).toBeNull()
    div.remove()
  })

  it("setEvent()", () => {
    const fn = vi.fn(() => null)
    const btn = createElem("button")
    document.body.appendChild(btn)
    setEvent(btn, "click", fn)
    btn.click()

    expect(fn).toBeCalled()
    btn.remove()
  })

  it("removeEvent()", () => {
    const fn = vi.fn(() => null)
    const btn = createElem("button")
    document.body.appendChild(btn)
    setEvent(btn, "click", fn)
    removeEvent(btn, "click", fn)
    btn.click()

    expect(fn).not.toBeCalled()
    btn.remove()
  })

  it("query()", () => {
    document.body.appendChild(createElem("abc"))
    expect(query("abc")).toBeInTheDocument()
    document.body.innerHTML = ""
  })

  it("queryAll()", () => {
    document.body.appendChild(createElem("abc"))
    document.body.appendChild(createElem("abc"))
    document.body.appendChild(createElem("abc"))
    document.body.appendChild(createElem("abc"))

    const list = queryAll("abc")
    expect(list.length).toBe(4)
    document.body.innerHTML = ""
  })
})
