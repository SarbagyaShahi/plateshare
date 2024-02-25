import * as csv from "fast-csv"

export function readCsvBuffer<T>(buffer:Buffer){
    return new Promise<T[]>((resolve,reject)=>{
        let return_value:T[]=[]
        let keys:string[]
        let file=csv.parseString(buffer.toString())
        let counter=0
        file.on("data",(data:any[])=>{
            if(counter > 0){
                let object:{[key:string]:any}={}
                data.forEach((value,index)=>{
                 object[keys[index]]=value
                })
                return_value.push(object as T) 
            }
            else{
                counter++
                keys=data
            }
        }).on("end",()=>{
            resolve(return_value)
        }).on("error",(e)=>{
            console.log(e)
            reject(new Error("Error reading file"))
        })

    })
}

export function readCsvFile(path:string){
    return new Promise((resolve,reject)=>{
        let return_value:{[key:string]:any}[]=[]
        let keys:string[]
        let file=csv.parseFile(path)
        let counter=0
        file.on("data",(data:any[])=>{
            if(counter > 0){
                let object:{[key:string]:any}={}
                data.forEach((value,index)=>{
                 console.log(value)
                 object[keys[index]]=value
                })
                return_value.push(object) 
            }
            else{
                counter++
                keys=data
            }
        }).on("end",()=>{
            resolve(return_value)
        }).on("error",(e)=>{
            console.log(e)
            reject(new Error("Error reading file"))
        })

    })
}


