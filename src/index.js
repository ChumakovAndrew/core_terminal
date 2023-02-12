import CoreTerminal from './component/CoreTerminal';
import { Color } from 'colors';
// users
import rootUser from './users/rootUser';

const root = rootUser()



function startUserTerminal (terminal) {

    const first = () => {
        console.log('введите пароль')
    }
    const second = (message) => {
        message == terminal.config.password ? terminal.start() : console.log('неверный пароль'.red)
    }

    return [first, second]

}


const arrNano = [
    {
        command: ["root"],
        nextStep: startUserTerminal(root)
    }
]


const nanoTerminal = new CoreTerminal('nano', arrNano);

nanoTerminal.start()

