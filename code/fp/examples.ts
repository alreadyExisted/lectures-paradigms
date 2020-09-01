import { compose, curry } from './utils'

const sum = (x: number, y: number) => x + y

const mul = (x: number, y: number) => x * y

console.log(compose(mul, sum))
console.log(compose(curry(mul)(3), curry(sum)(2))(1))