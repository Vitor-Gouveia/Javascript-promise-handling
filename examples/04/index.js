// Promise API, .then, .catch
const iniciarServidorAssincrono = () => new Promise((resolve, reject) => {
  // código assíncrono
  const paymentServiceInstance = {
    ip: "127.0.0.1"
  }

  resolve(paymentServiceInstance)
})

const main = () => {
  console.log("Inicializando banco de dados")
  
  const a = iniciarServidorAssincrono()
    .then(paymentServiceInstance => {
      console.log("Inicializando servidor")
      
      console.log(`Inicializando conexão com gateway de pagamento com ip ${paymentServiceInstance.ip}`)
    })
}

main()