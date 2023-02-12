import CoreTerminal from '../component/CoreTerminal';

import GenereteNum from '../component/plagins/GenerateNum'
import YesOrNo from '../component/plagins/YesOrNo';


function rootUser () {
    const rootComands = [
        {
            command: ["num"],
            nextStep: GenereteNum()
        },
        {
            command: ['yorn'],
            nextStep: YesOrNo()
        }
    ]
    
    const rootTerminal = new CoreTerminal('root', rootComands, {password: 123});

    return rootTerminal
}

export default rootUser
