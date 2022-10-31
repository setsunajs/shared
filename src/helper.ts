// import { isObservable } from "@setsunajs/observable"
import { getNextSibling } from "./dom"
import { isFunction, isObject, isPlainObject } from "./type"

// export function resolveObservableState(value) {
//   return isObservable(value)
//     ? value
//     : (isFunction(value) || isPlainObject(value)) && isObservable(value.input$)
//     ? value.input$
//     : undefined
// }

export function resolveNextNodes<E extends ChildNode>(el: E, flag: string) {
  const open: ChildNode[] = []
  const nextNodes: ChildNode[] = [el]
  let next: ChildNode | null = el
  while ((next = getNextSibling(next))) {
    nextNodes.push(next)

    if (next.textContent && next.textContent.trim() === flag) {
      if (open.length === 0) {
        return nextNodes
      } else {
        open.pop()
      }
    }
  }
}

export function excludes(
  source: Record<string, any>,
  blackList: string[]
): Record<string, any> {
  return Object.keys(source).reduce((result, key) => {
    !blackList.includes(key) && (result[key] = source[key])
    return result
  }, {} as any)
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
  value: any
): void
export function def<T extends Object>(
  target: T,
  key: PropertyKey,
  options: PropertyDescriptor
): void
export function def<T extends Object>(
  target: T,
  key: PropertyKey,
  options: any
) {
  Object.defineProperty(target, key, {
    enumerable: false,
    configurable: false,
    ...(isObject(options) ? { value: options } : options)
  })
}

export const BROWSER = typeof window
