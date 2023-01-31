const unwrap = async (promise) => {
    const [{ value, reason: error }] = await Promise.allSettled([promise])

    return {
        value,
        error
    }
}

main = async () => {
    console.log("a")

    const { error, value } = await unwrap(new Promise((resolve) => {
        resolve("b")
    }))
    
    if(error) {
        console.error(error)
        return
    }

    console.log(value)

    console.log("c")
}

main()