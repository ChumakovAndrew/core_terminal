import promptSync from 'prompt-sync';


import YesOrNo from './YesOrNo';
import genereteNum from './generateNum';

const prompt = promptSync();


const arrAL = [
    {
        command: ["yorn"],
        nextStep:  YesOrNo()
    },
    {
        command: ["num"],
        nextStep: genereteNum()
    },

]




class myBot {
    constructor(user, arrayCommand){
        this.user = user
        this.arrayCommand = arrayCommand
    }

    

    start = () => {
            console.log('start term')
            this.loop()
    }


    loop = (arrCommand = this.arrayCommand) => {

        let message = this.getMessage(this.user) // получение message

        arrCommand.forEach(element => {    // перебор массива с командами
            const {command, nextStep} = element

            if(command.indexOf(message) > -1) {     // проверка на совподение команды и меседжа
                message = this.scene(this.user, nextStep)   // запуск сцены которая соответствует команде
            }
        });

        if(message !== 'exit'){     // если сцена возвращает "exit" то поток выполнения заканчивается
            this.loop()             //  если сцена возвращает чтото другое то запускается рекурсия
        }
        

    }


   

    getMessage = (user = this.user) => {      
        return prompt(user + ': ')
    }

    // exitScene = (message, functn) => {
    //     if(message === 'exit'){
    //         return 'exit'
    //     }
    //     return functn(message)
    // }
        

    scene = (user, arrfunction) => {    //  сцена принимает в себя юзера и массив с функциями
        let sceneExit = false
        let count = false
        let response
        for(const func of arrfunction){

            let message = ''

            !count ? count = true  :  message = this.getMessage(user)  // это делается для того что бы при запуске сцены не запускаля лишний getMessage

           
            response = (message === "exit") ? 'exit' : func(message)    //если в ходе выполнения сцены пользователь вводит exit то возвращается exit 
                                                                        //если нет то запускается функция которая тоже может вернуть какой то флаг
            if(response === 'break'){                                   
                break;
            }
            if(response === 'exit'){
                sceneExit = true
                break
            }
            if(response === "continue"){
                this.loop()
            }
        }

        return response     
    }

}

const firstSession = new myBot('root', arrAL);



firstSession.start()

