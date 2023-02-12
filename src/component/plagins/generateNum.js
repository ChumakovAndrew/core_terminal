
function GenereteNum() {

    const firs = () => {
        console.log("press ener to get a random number")
        
    }
    const second = (message) => {
        const num = Math.floor(Math.random() * (10 - 0) + 0)
        console.log(num)
    }
    

   

    const yorn = [firs, second]

    return yorn
}

export default GenereteNum