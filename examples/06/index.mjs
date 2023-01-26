import { setTimeout } from "node:timers/promises"

const task = async (name, timeout = 200) => await setTimeout(timeout, `Inicializando ${name}`)

const main = async () => {
  const services = await Promise.allSettled([
    task("mongodb", 50),
    task("express.js", 1000),
    task("stripe", 200),
  ])

  services.forEach((promise) => {
    promise.status === "fulfilled"
      ? console.log(promise.value)
      : console.log(promise.reason)
  })
}

await main()