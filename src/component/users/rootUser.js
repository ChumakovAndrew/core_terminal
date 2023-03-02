import Core from '../Core'

import nanoFetch from '../plagins/nanofetch'



function rootUser () {

    const config = {
        userName: 'root',
        userPassword: 'root',
        terminalName: 'nano',
        terminalWelcomeText: 'nanoTerm',
        colorTerm: 'root',
        nanoFetchConfig: {
            ascii: {fileName: "ascii-art (1).txt", characterСount: 42},
            offset: 0,
            terninal: 'nanoTerm',
            version: '1.0.1',
            user: 'root',
            }
    }
    
    const root = new Core(config)

    const commands = (userTerm) => () => {
        userTerm.сommand('hello', () => {console.log('hi broo')})
        userTerm.сommand('nanoFetch', () => {nanoFetch(config)})
    }
    
    
    root.setConfig(commands(root))
    
    return root
}

export default rootUser
