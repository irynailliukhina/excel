export class Page{
    constructor(params) {
        this.params = params[1]
    }

    getRoot(){
        throw new Error('Method getRoot should be implemented!')
    }

    afterRender(){

    }

    destroy(){

    }
}