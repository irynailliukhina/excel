import {storage} from "../core/utils";

function toHtml(key){



    const model = storage(key)
    const id = key.split(':')[1]
    return `
            <li class="db__record">
                <a href="#excel/${id}">${model.tableName}</a>
                <strong>
                    ${new Date(model.date).toLocaleDateString()}
                    ${new Date(model.date).toLocaleTimeString()}
                </strong>
            </li>
            `
}

function getAllKeys(){
    const keys = []
    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i)
        if (!key.includes('excel')){
            continue
        }
        keys.push(key)
    }
    return keys
}

export function createRecordsTable(){
    const keys = getAllKeys()

    if (!keys.length){
        return `
                <ul class="db__list">
                  No records
                </ul>
                `
    }
    return `
     <div class="db__list-header">
        <span>Name</span>
        <span>Recent changes</span>
    </div>
    
    <ul class="db__list">
      ${keys.map(toHtml).join('')}
    </ul>
    `
}