export function Model(){
    return <T extends new (...args: any[]) => any>(ctr: T): T=>{
        let instance: InstanceType<T>;
        let return_call= class {
            constructor(...args: any[]) {
                if (instance) {
                    return instance;
                }
                instance = new ctr(...args);
                return instance;
            }
        } as T
        for (const key of Object.getOwnPropertyNames(ctr)) {
            let descriptor:any = Object.getOwnPropertyDescriptor(ctr, key);
            Object.defineProperty(return_call, key, descriptor);
        }
        return return_call
    }
}

export function Singleton(){
    return <T extends new (...args: any[]) => any>(ctr: T): T=>{
        let instance: InstanceType<T>;
        let return_call= class {
            constructor(...args: any[]) {
                if (instance) {
                    return instance;
                }
                instance = new ctr(...args);
                return instance;
            }
        } as T
        for (const key of Object.getOwnPropertyNames(ctr)) {
            let descriptor:any = Object.getOwnPropertyDescriptor(ctr, key);
            Object.defineProperty(return_call, key, descriptor);
        }
        return return_call
    }
}