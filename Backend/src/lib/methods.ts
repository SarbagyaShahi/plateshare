export function Get(path:string) {
    return (target: Object, propertyName: string, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(`get\r\r\n\n${path}`,{method:"get",descriptor:descriptor,name:propertyName},target) //Assigning path, descriptor, and method name to the metadata of every object
    }
}

export function Post(path:string) {
    return (target: Object, propertyName: string, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(`post\r\r\n\n${path}`,{method:"post",descriptor:descriptor,name:propertyName},target)
    }
}

export function Put(path:string) {
    return (target: Object, propertyName: string, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(`put\r\r\n\n${path}`,{method:"put",descriptor:descriptor,name:propertyName},target) 
    }
}

export function Delete(path:string) {
    return (target: Object, propertyName: string, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(`delete\r\r\n\n${path}`,{method:"delete",descriptor:descriptor,name:propertyName},target)
    }
}

export function Update(path:string) {
    return (target: Object, propertyName: string, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(`update\r\r\n\n${path}`,{method:"update",descriptor:descriptor,name:propertyName},target)
    }
}

export function Patch(path:string) {
    return (target: Object, propertyName: string, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(`patch\r\r\n\n${path}`,{method:"patch",descriptor:descriptor,name:propertyName},target)
    }
}