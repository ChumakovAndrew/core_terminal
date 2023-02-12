
function YesOrNo() {

    const firs = () => {
        const num = Math.floor(Math.random() * (100 - 0) + 0)
        if(num % 2 == 0){
            console.log("yes")
        }else{
            console.log("no")
        }
        
    }

    const second = (message) => {
        if(message == 'back'){
        
        return 'back'
    }
    else{
        return 'replay'
    }
}
   

    const yorn = [firs, second]

    return yorn
}

export default YesOrNo