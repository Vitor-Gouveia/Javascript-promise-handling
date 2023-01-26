// Promise API, .then, .catch
const iniciarServidorAssincrono = async () => {
  // código assíncrono
  const paymentServiceInstance = {
    ip: "127.0.0.1"
  }

  return paymentServiceInstance
}

const main = async () => {
  console.log("Inicializando banco de dados")
  
  const paymentServiceInstance = await iniciarServidorAssincrono()
  console.log("Inicializando servidor")

  console.log(`Inicializando conexão com gateway de pagamento com ip ${paymentServiceInstance.ip}`)
}

await main()