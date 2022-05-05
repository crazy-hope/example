// 数字
let n: number = 1
// 字符串
let s: string = 'string'

// 函数
interface Point {x: number, y: number}
function tsDemo(data: Point) {
  return Math.sqrt(data.x ** 2 + data.y ** 2)
}
tsDemo({x: 1, y: 1})


// 对象
const teacher: {
  name: string,
  age: number
} = {
  name: 'dell',
  age: 18
}


// 数组
const numbers: number[] = [1,2,3]

// 类
class Person {}
const deil: Person = new Person()

// 函数
const getToal: () => number = () => {
  return 123
}

