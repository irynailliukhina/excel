export class ActiveRouter{
    static get path(){
        return window.location.hash
    }

    static get param(){
        return ActiveRouter.path.split('/')
    }

    static navigate(path){
        window.location.hash = path
    }
}