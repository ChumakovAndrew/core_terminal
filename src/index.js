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
        let message = this.getMessage(this.user)

        arrCommand.forEach(element => {
            const {command, nextStep} = element

            if(command.indexOf(message) > -1) {
                this.scene(this.user, nextStep)
            }
        });

        if(message !== 'exit'){
            this.loop()
        }
        

    }


   

    getMessage = (user = this.user) => {
        return prompt(user + ': ')
    }

    exitScene = (message, functn) => {
        if(message === 'exit'){
            return 'exit'
        }
        return functn(message)
    }
        

    scene = (user, arrfunction) => {
        let sceneExit = false

        for(const func of arrfunction){
            const message = this.getMessage(user)


            const response = this.exitScene(message, func)

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

        if(sceneExit){
            console.log("bb")
        }

    }

}

const firstSession = new myBot('root', arrAL);



firstSession.start()

