const iniciarServidorAssincrono = () => new Promise((resolve, reject) => {
  // código assíncrono
  resolve()
})

const main = () => {
  console.log("Inicializando banco de dados")
  
  iniciarServidorAssincrono().then(message => {
    console.log("Inicializando servidor")
  })

  console.log("Inicializando conexão com gateway de pagamento")
}

main()