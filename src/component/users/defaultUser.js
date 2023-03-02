import Core from '../Core'
import nanoFetch from '../plagins/nanofetch'
function defaultUser () {

    const config = {
        userName: 'user',
        userPassword: '',
        terminalName: 'nano',
        terminalWelcomeText: 'nanoTerm',
        colorTerm: 'default',
        nanoFetchConfig: {
            ascii: {fileName: "ascii-art (1).txt", characterСount: 42},
            offset: 0,
            terninal: 'nanoTerm',
            version: '1.0.1',
            user: 'user',
        }
     }
    
    
    const user = new Core(config)
    
    const commands = (userTerm) => () => {
        userTerm.сommand('hello', () => {console.log('hi broo')})
        userTerm.сommand('nanoFetch', () => {nanoFetch(config)})
    }
    
    user.setConfig(commands(user))
    
    return user
}

export default defaultUser