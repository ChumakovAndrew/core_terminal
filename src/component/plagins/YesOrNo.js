
function YesOrNo() {

    const first = () => {
        const num = Math.floor(Math.random() * (100 - 0) + 0)
        if(num % 2 == 0){
            console.log("yes")
        }else{
            console.log("no")
        }
        
    }
   

    const yorn = [first]

    return yorn
}

export default YesOrNo