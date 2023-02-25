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

    fetchInform = (config = this.config.descripton) => {
        const {ascii} = config

            let fileContent = fs.readFileSync(ascii.fileName , "utf8")

        
            const data = []
            let start = 0
            let end = ascii.characterСount
            let id = 2
            let maxid = Object.keys(config).length
        


            for(let i = 0; i < fileContent.length - ascii.characterСount ; i += ascii.characterСount ){
                data.push({asciiString: (fileContent.slice(start, end)), string: ''})
                start += ascii.characterСount + 1
                end = start + ascii.characterСount  
            }
            

            data.forEach((item, i) => {
                if( i > config.offset && maxid > id){
                    let key = Object.keys(config)[id]
                    item.string = `${Object.keys(config)[id].blue} : ${config[key]}`
                    id++
                }
            });


            const newArr = data.map((item) => {
                return `${item.asciiString}     ${item.string} \n`
            })
            console.log('')
            console.log(newArr.join(''))
        
    }


    launch = () => {
        this.message = prompt('введите пароль ')
        if( this.message == this.config.userPassword){
            this.fetchInform()
            this.getMessage()
        }
        else{
            console.log('неверный пароль'.red)
        }
    }
    

    getMessage = () => {
        const {userName, terminalName} = this.config
        this.message = prompt(terminalName.blue + '@' + userName.red + ' ')

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
    userPassword: 'root',
    terminalName: 'nano',
    terminalWelcomeText: 'nanoTerm',
    descripton: {
        ascii: {fileName: "ascii-art (1).txt", characterСount: 42},
        offset: 0,
        terninal: 'nanoTerm',
        version: '1.0.1',
        user: 'root',
        }
 }



const core = new NewCoreTerminal(config)

const commands = () => {
    core.useCommand('hello', () => {console.log('hi broo')})
    core.useCommand('set', () => {core.setMessage('newMessage')})
    core.useCommand('log', () => {core.fetchInform()})
}

core.setConfig(commands)
core.launch()



