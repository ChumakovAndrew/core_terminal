import promptSync from 'prompt-sync';
import colors from 'colors'
const fs = require("fs");
const prompt = promptSync()

class NewCoreTerminal {
    constructor(config){
        this.config = config

        
    }

    message = ''; 
    commands


    setConfig = (commands) => {
        this.commands = commands
    }


    launch = () => {
        function sliseAscii ( ascii, num ) {
            const data = []
            let start = 0
            let end = num
        
            for(let i = 0; i < ascii.length - num; i += num ){
                data.push({asciiString: (ascii.slice(start, end)), string: ''})
                start += num + 1
                end = start + num  
            }
            return data
        }
        
        function postInformation (data, config, offset = 3) {
            let id = 0
            let maxid = Object.keys(config).length
        
            data.forEach((item, i) => {
                if( i > offset && maxid > id){
                    let key = Object.keys(config)[id]
                    item.string = `${Object.keys(config)[id].black} : ${config[key]}`
                    id++
                }
            });
        
            const newArr = data.map((item) => {
                return `${item.asciiString}     ${item.string} \n`
            })
            console.log(newArr.join(''))
        }

        const config = {
            age: 22,
            name: 'Andrew',

        }
        console.log('')
        let fileContent = fs.readFileSync("ascii-art (1).txt", "utf8")
        const arr = sliseAscii(fileContent, 42)
        postInformation(arr, config, 2)


        
        
        this.message = prompt('введите пароль ')

        this.message == this.config.userPassword ? this.getMessage() : console.log('неверный пароль'.red)
        }
    

    getMessage = () => {
        const {userName, terminalName} = this.config
        this.message = prompt(terminalName.black + '@' + userName + ' ')

        if(this.message === 'exit'){
            return
        }

        this.commands()
        this.getMessage()

        
    }

   
     useCommand = (command, func) => {
        if(this.message === command){
            func() 
        }
    }

}


 const config = {
    userName: 'root',
    userPassword: 'andrew',
    terminalName: 'nana',
    terminalWelcomeText: 'terminal nana'
 }



const core = new NewCoreTerminal(config)

const commands = () => {
    core.useCommand('hello', () => {console.log('hi broo')})
    core.useCommand('set', () => {core.setMessage('newMessage')})
    core.useCommand('log', () => {
       
    })
}

core.setConfig(commands)
core.launch()



