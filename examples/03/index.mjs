const iniciarServidorAssincrono = async () => {
  // código assíncrono
}

// "async" define uma promise
async function main() {
  console.log("Inicializando banco de dados")
  
  iniciarServidorAssincrono()
    .then(() => {
      console.log("Inicializando servidor")
    })

  console.log("Inicializando conexão com gateway de pagamento")
}

// "await" para o processamento do código até que aquela promise resolva
await main();