import { svgTags } from "./element"

export function createElem(
  tag: keyof HTMLElementTagNameMap,
  options?: ElementCreationOptions
) {
  return tag in svgTags
    ? document.createElementNS("http://www.w3.org/2000/svg", tag)
    : document.createElement(tag, options)
}

export function createTextElem(text: string) {
  return document.createTextNode(text)
}

export function insertElem<E extends Node>(
  child: E,
  parent: E,
  anchor: E | null
) {
  return parent.insertBefore(child, anchor)
}

export function removeElem(el: Node) {
  return el.parentNode!.removeChild(el)
}

export function getNextSibling(el: Node) {
  return el.nextSibling
}

export function setElemText(el: Node, value: any) {
  return (el.textContent = value)
}

export function setAttr(el: HTMLElement, key: string, value: any) {
  return key === "value"
    ? ((el as any).value = value)
    : el.setAttribute(key, value)
}

export function removeAttr(el: HTMLElement, key: string) {
  return el.removeAttribute(key)
}

export function setEvent(
  el: Node,
  type: string,
  event: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) {
  return el.addEventListener(type, event, options)
}

export function removeEvent(
  el: Node,
  type: string,
  event: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) {
  return el.removeEventListener(type, event, options)
}

export function query<K extends keyof HTMLElementTagNameMap>(
  sel: K
): HTMLElementTagNameMap[K] | null
export function query<K extends keyof SVGElementTagNameMap>(
  sel: K
): SVGElementTagNameMap[K] | null
export function query<K = Element>(sel: string): K | null
export function query(sel: any): any {
  return document.querySelector(sel)
}

export function queryAll<K extends keyof HTMLElementTagNameMap>(
  selectors: K
): NodeListOf<HTMLElementTagNameMap[K]>
export function queryAll<K extends keyof SVGElementTagNameMap>(
  selectors: K
): NodeListOf<SVGElementTagNameMap[K]>
export function queryAll<E extends Element = Element>(
  selectors: string
): NodeListOf<E>
export function queryAll(sel: any): any {
  return document.querySelectorAll(sel)
}
