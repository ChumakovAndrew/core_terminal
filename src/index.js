import promptSync from 'prompt-sync';
import * as Allusers from './component/users'
const prompt = promptSync()

function authentication () {
   
    let login = prompt("введите логин: ")

    for(let key in Allusers){
        if(login == key){
            return Allusers[key].launch()
        }
    }

    return authentication()
}


authentication()

