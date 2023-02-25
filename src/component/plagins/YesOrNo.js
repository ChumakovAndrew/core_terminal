const fs = require("fs");

function YesOrNo() {

    const first = () => {
        // const num = Math.floor(Math.random() * (100 - 0) + 0)
        // if(num % 2 == 0){
        //     console.log("yes")
        // }else{
        //     console.log("no")
        // }

        
 
        // асинхронное чтение
        fs.readFile("hello.txt", "utf8", 
                    function(error,data){
                        console.log("Асинхронное чтение файла");
                        if(error) throw error; // если возникла ошибка
                        console.log(data);  // выводим считанные данные
        });
 
        // синхронное чтение
        console.log("Синхронное чтение файла")
        let fileContent = fs.readFileSync("hello.txt", "utf8");
        console.log(fileContent);
        
    }
   

    const yorn = [first]

    return first()
}

export default YesOrNo