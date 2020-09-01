export function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return <T>(arg: T) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args: any) => a(b(...args)))
}

export const curry = (f: Function) => <A>(a: A) => <B>(b: B) => f(a, b)

export function advancedCurry(f: Function) {
  return function curried(...args: any[]) {
    if (args.length >= f.length) {
      return f.apply(this, args)
    } else {
      return function(...args2: any[]) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}