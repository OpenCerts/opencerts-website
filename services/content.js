const people = () => [
  { name: 'Nader', age: Math.ceil(Math.random()*100) },
  { name: 'Amanda', age: Math.ceil(Math.random()*100) },
  { name: 'Jason', age: Math.ceil(Math.random()*100) }
];

export default () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(people())
    }, 1000)
  })
}