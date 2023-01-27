# Dia 1
## O que é uma promise?
Uma promise é uma "promessa", um valor que ainda não existe, mas em algum ponto futuro do código vai existir.

Quando uma função retorna uma promise ela está te falando o seguinte: 

Função: "Vou executar um código aqui, pode demorar uns 10 segundos, mas segue com o seu código síncrono que eu te dou um toque quando eu retornar um valor"

V8 (Engine): "Vou executar um código aqui então, mas quando vc terminar roda essa `callback()` aqui"

Função: "Ok"

## Exemplo

```js
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
```

Aqui, podemos lidar com a promise usando o método `then()`, lembrando um pouco do `Builder Pattern`

O output desse exemplo é:

```bash
Inicializando banco de dados
Inicializando conexão com gateway de pagamento
Inicializando servidor
```

Ou seja, o V8 continuou a executar código síncrono, ou seja, um atrás do outro. (single-threaded) Porém, quando chegou na promise, conseguiu envia-lá para um lugar especial na call stack, onde quando concluída retornaria via `then()`.

## Controlando fluxo com promises

Uma forma de controlar o fluxo da aplicação utilizando promises seria a seguinte:

```js
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
```

## Async/Await
Async/Await é um syntactic sugar da linguagem, uma abstração em cima das Promises, fazendo que não seja necessário o uso da API `Promise` diretamente para criar promises.

Ao re-implementar o primeiro exemplo utilizando async/await vemos um código muito mais simples de entender

```js
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
```

É bom notar que ainda podemos utilizar a sintaxe de `.then` e `.catch` para controlar o fluxo da aplicação.

## Await
Levando o código acima como exemplo, e se o gateway de pagamento necessitade de uma informação que a funcão de inicializar o servidor retornasse? Como que isso funcionaria?

```js
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
  
  iniciarServidorAssincrono()
    .then(paymentServiceInstance => {
      console.log("Inicializando servidor")
      
      console.log(`Inicializando conexão com gateway de pagamento com ip ${paymentServiceInstance.ip}`)
    })
}

main()
```

O problema aqui é o seguinte, foi necessário esperar o servidor inicializar para conseguir passar essa informação adiante, e essa espera bloqueou o fluxo síncrono do javascript além de deixar o nosso código menos legível.
Mas graças ao `Await` é possível esperar a promise resolver e receber as informações no mesmo nível.

```js
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
```

## Controlando fluxo com promises pt2

# Dia 2
[ref](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)

## Promises na call stack
O runtime do javascript pode assim dizer pode ser quebrado em 4 partes

- Call Stack
- Web API
- MicroTask (process.nextTick, Promsise Callback, queue microtask)
- MacroTask (setInterval, setImmediate, setTimeout)

### Call Stack
Uma "Stack" (estrutura de programação) que contém as funções chamadas no código.

Cada vez que uma função é chamada é adicionada a stack
Cada vez que uma função retorna um valor ela sai da stack

Imagine o seguinte código:

```js
function Yell() {
  return "YELLING"
}

function myFunc() {
  console.log(Yell())
}

myFunc()
```

O javascript é executado em dois passos, o primeiro sendo de leitura e "caching" de valores (como funções, variáveis, definição de escopos), e o segundo sendo execução, onde o javascript entra nas funções e começa a interagir com a stack.

Quando a engine do javascript lê uma função sendo chamada, como `myFunc()`, ele adiciona a invocação da função na call stack entra no corpo dessa função e adiciona cada linha de código dessa função para a call stack.

```bash
call-stack: [
  myFunc,
  console.log,
  Yell,
  returns "YELLING"
]
```