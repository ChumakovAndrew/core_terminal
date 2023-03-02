import promptSync from 'prompt-sync';
import colors from 'colors'
const fs = require("fs");
const prompt = promptSync()


const nanoFetch = (config) => {

    const {nanoFetchConfig, colorTerm} = config
    const {ascii} = nanoFetchConfig

    const nanoColor = colorTerm === 'root' ? colors.red : colors.blue

    const data = []
    let fileContent = fs.readFileSync(ascii.fileName , "utf8")

    let start = 0
    let end = ascii.characterСount
    let id = 2
    let maxid = Object.keys(nanoFetchConfig).length


    for(let i = 0; i < fileContent.length - ascii.characterСount ; i += ascii.characterСount ){
        data.push({asciiString: (fileContent.slice(start, end)), string: ''})
        start += ascii.characterСount + 1
        end = start + ascii.characterСount  
    }
    

    data.forEach((item, i) => {
        if( i > nanoFetchConfig.offset && maxid > id){
            let key = Object.keys(nanoFetchConfig)[id]
            item.string = `${nanoColor(Object.keys(nanoFetchConfig)[id])} : ${nanoFetchConfig[key]}`
            id++
        }
    });


    const newArr = data.map((item) => {
        return `${item.asciiString}     ${item.string} \n`
    })
    console.log('')
    console.log(newArr.join(''))
    
}

export default nanoFetch