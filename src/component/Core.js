import promptSync from 'prompt-sync';
import colors from 'colors'
const fs = require("fs");
const prompt = promptSync()

class Core {
    constructor(config){
        this.config = config
    }

    message = ''
    commands
    colorTerm


    setConfig = (commands) => {
        this.commands = commands
        this.colorTerm = this.config.colorTerm === 'root' ? colors.red : colors.blue
    }

    launch = () => {
        console.log(this.config.colorTerm)
        this.message = prompt('введите пароль ')
        if( this.message == this.config.userPassword){
            this.getMessage()
        }
        else{
            console.log('неверный пароль'.red)
        }
    }
    

    getMessage = () => {
        const {userName, terminalName} = this.config
        this.message = prompt(terminalName.blue + '@' + this.colorTerm(userName) + ' ')

        if(this.message === 'exit'){
            return
        }

        this.commands()
        this.getMessage()
        
    }

    сommand = (command, func) => {
        if(this.message === command){
            func() 
        }
    }

}

export default Core







