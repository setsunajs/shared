// import { isObservable } from "@setsunajs/observable"
import { getNextSibling } from "./dom"
import { isFunction, isPlainObject } from "./type"

// export function resolveObservableState(value) {
//   return isObservable(value)
//     ? value
//     : (isFunction(value) || isPlainObject(value)) && isObservable(value.input$)
//     ? value.input$
//     : undefined
// }

export function resolveNextNodes(el: HTMLElement, flag: string) {
  const open: ChildNode[] = []
  const nextNodes: ChildNode[] = [el]
  let next = getNextSibling(el)
  while (next) {
    nextNodes.push(next)

    if (next.nodeType != 8) {
      next = getNextSibling(next)
      continue
    }

    const content = next.textContent!.trim()
    if (content === `/${flag}`) {
      if (open.length === 0) {
        return nextNodes
      } else {
        open.pop()
      }
    }
    next = getNextSibling(next)
  }
}

export function excludes<T extends Record<string, any>>(
  source: T,
  blackList: string[]
): Record<string, any> {
  return Object.keys(source).reduce((result, key) => {
    !blackList.includes(key) && (result[key] = source[key])
    return result
  }, {} as Record<string, any>)
}

export function noop<T>(value: T): T {
  return value
}

export function noopError(error: unknown): never {
  throw error
}

export function def<T extends Object>(
  target: T,
  key: PropertyKey,
  options: PropertyDescriptor
) {
  Object.defineProperty(target, key, {
    enumerable: false,
    configurable: false,
    ...options
  })
}

export const BROWSER = typeof window
