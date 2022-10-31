export function isFunction(value: unknown): value is Function {
  return typeof value === "function"
}

export function isString(value: unknown): value is string {
  return typeof value === "string"
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean"
}

export function isPlainObject(value: unknown): value is Record<any, any> {
  return Object.prototype.toString.call(value) === "[object Object]"
}

export function isObject(value: unknown): value is object {
  return typeof value === "object"
}

export const isArray = Array.isArray

export function isUndef(value: unknown): value is undefined {
  return value === void 0
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number"
}

export function isPromise<T = any>(value: unknown): value is Promise<T> {
  return (
    value instanceof Promise ||
    (isPlainObject(value) && isFunction(value.then) && isFunction(value.catch))
  )
}

export function isSomeVNode<T extends Record<string, any>>(n1: T, n2: T): boolean {
  return Object.is(n1.type, n2.type) && Object.is(n1.key, n2.key)
}
