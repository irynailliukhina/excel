import {ExcelComponent} from "../../core/ExcelComponent";
import {debounce} from "../../core/utils";

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        });
    }

    prepare() {
        this.onInput = debounce(this.onInput, 400)
    }

    createName(state){
        return `
            <input type="text" class="input" value='${state['tableName']}' />
            <div>
                    <div class="button"> <i class="material-icons">delete</i></div>
                    <div class="button">
                      <i class="material-icons">exit_to_app</i>
            </div>
            </div>`
    }

    toHtml(){
       return this.createName(this.store.getState())
    }

    onInput(event){
        this.$emit('header:addName', event.target.value)
    }
}
