import CoreTerminal from '../component/CoreTerminal';

import genereteNum from '../component/plagins/generateNum'

function rootUser () {
    const rootComands = [
        {
            command: ["num"],
            nextStep: genereteNum()
        },
    ]
    
    const rootTerminal = new CoreTerminal('root', rootComands, {password: 123});

    return rootTerminal
}

export default rootUser
