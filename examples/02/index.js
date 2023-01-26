const asyncTask = (shouldThowError) => new Promise((resolve, reject) => {
  return shouldThowError
    ? reject("server broke")
    : resolve("server started")
})

const logService = console.log

const main = () => {
  logService("Inicializando banco de dados")
  
  asyncTask(false)
    .then(logService)
    .catch(error => console.log(error))
    .finally(() => console.log("finished"))

  console.log("Inicializando conexão com gateway de pagamento")
}

main()