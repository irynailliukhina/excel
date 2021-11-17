import {ExcelComponent} from "../../core/ExcelComponent";
import {debounce} from "../../core/utils";
import {changeName} from "../../redux/actions";
import {$} from "../../core/dom";
import {ActiveRouter} from "../../core/routes/ActiveRouter";

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
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
                <div class="button" data-button="remove"> 
                <i class="material-icons" data-button="remove">delete</i>
                </div>
            <a href="#">
                <div class="button" data-button="exit">
                    <i class="material-icons" >exit_to_app</i>
                </div>
            </a>
            </div>
            `
    }

    toHtml(){
       return this.createName(this.store.getState())
    }

    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeName($target.text()))
    }

    onClick(event){
        const $target = $(event.target)

        if($target.data.button === 'remove'){
            const decision = confirm('Do you really want to delete such a great table')
            if (decision){
                localStorage.removeItem('excel:'+ ActiveRouter.param[1])
                ActiveRouter.navigate('')
            }
        } else if($target.data.button === 'exit'){
            ActiveRouter.navigate('')
        }
    }
}
