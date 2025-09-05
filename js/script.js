let lista_tarefas = []
let darkmode = localStorage.getItem('darkmode')
let button = document.getElementById("changer")

button.addEventListener("click", function(){
    darkmode = localStorage.getItem('darkmode')
    darkmode !== 'active' ? enableDarkmode() : disableDarkmode();
})

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
    let icon = 'wb_sunny'
    button.innerHTML = `<span class="material-symbols-outlined">${icon}</span>`
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
    let icon = 'moon_stars'
    button.innerHTML = `<span class="material-symbols-outlined">${icon}</span>`
}

window.addEventListener("load", function(){

    darkmode === 'active' ? enableDarkmode() : disableDarkmode()
    let store = localStorage.getItem("minhasTarefas")
    if(store) { 
        lista_tarefas = JSON.parse(store)
        addHTML(lista_tarefas)
    } else { 
        addHTML(lista_tarefas)
    }

    warningInvisible()
})  


document.getElementById("add").addEventListener("click", function() {
    let input = document.getElementById("input-task")
    if (input.value === "") {
        warningVisible()
    } else {
    warningInvisible()
    let task = {task:(input.value), status: "pendente"}
    lista_tarefas.push(task)

    addStorage(lista_tarefas)

    if(lista_tarefas.length > 6) {window.alert("Limite de tarefas excedido.")} else {addHTML(lista_tarefas)}

    input.value = "" 
    }
})

const addHTML = (lista) => {
    document.getElementById("tarefas").innerHTML = ""
    lista.forEach((item, index) => {
        let classe
        let checked = item.status === "concluido" ? "checked" : ""

        item.status === "concluido" ? classe = "done" : classe = "none"

        document.getElementById("tarefas").innerHTML += `
        <div class="task">
            <div id="esquerda">
                <input type="checkbox" ${checked} name="checkbox-${index}" id="checkbox-${index}">
                <label for="checkbox-${index}"></label>
                <p class="${classe}">${item.task}</p>
            </div>
            <button id="apagar" data-index="${index}"><span class="material-symbols-outlined" id="close">close</span></button>
        </div>`
    })
}

document.getElementById("tarefas").addEventListener("click", function(event) {
    let botao = event.target.closest('button')
    let checkbox = event.target.closest('input[type="checkbox"]')

    if (botao) {
        let indexBotao = botao.dataset.index
        lista_tarefas.splice(indexBotao, 1)
        addStorage(lista_tarefas)
        addHTML(lista_tarefas)
    }
    
    if (checkbox) {
        let id = checkbox.id
        let partes = id.split('-')
        let index = partes[1]
        let classe = ""
        if (lista_tarefas[index].status === "pendente") {
            lista_tarefas[index].status = "concluido"
        } else { 
            lista_tarefas[index].status = "pendente"
        }

        addStorage(lista_tarefas)
        addHTML(lista_tarefas)
    }
})

const addStorage = (lista_tarefas) => {
    let lista = JSON.stringify(lista_tarefas)
    localStorage.setItem("minhasTarefas", lista)
}

const warningVisible = () => {
    document.getElementById("warning").classList.remove("invisible")
    document.getElementById("warning").classList.add("visible")
}
const warningInvisible = () => {
    document.getElementById("warning").classList.remove("visible")
    document.getElementById("warning").classList.add("invisible")
}

document.getElementById("close").addEventListener("click", function(){
    warningInvisible()
})