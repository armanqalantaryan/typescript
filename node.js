const fs = require("fs");
let arg = process.argv.slice(2);
let newArg = arg[0];
let newArr = newArg.split(' ');
let path  = './node.txt'
function parse()
{
    if(fs.existsSync(path)) 
    {
        let str = fs.readFileSync(path, 'utf8');
        return str;
    }
    else
        return '{}';
}
function myReplace (arr)
{
    arr.forEach((item,index,array) =>
        {
                item =  item.replace('(','').replace(',','').replace(')','').replace(';','');
                array[index] = item;
        }
    )
}

if(newArr[0] === "INSERT" && newArr.includes('VALUES')) {
    let index = newArr.indexOf('VALUES')
    let colums = newArr.slice(1, index);
    let values = newArr.slice(index + 1, newArr.length);
    myReplace(colums);
    myReplace(values);
    let jsonobj = JSON.parse(parse()); 
    for (let i = 0; i < colums.length; i++) {
        jsonobj[colums[i]].push(values[i]);
    }
    
    let write = JSON.stringify(jsonobj);
    fs.writeFileSync(path, write);
    if(fs.existsSync(path)){  console.log(true)}
    let str = fs.readFile(path, 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(data)
    })
 
}
if (newArr[0] === 'SELECT')
{
    myReplace(newArr);
    let index  = newArr


}

