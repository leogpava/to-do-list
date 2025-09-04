let lista_tarefas = []

document.getElementById("add").addEventListener("click", function() {
    let input = document.getElementById("input-task")
    if (input.value === "") {window.alert("VAZIO")} else {
    let task = {task:(input.value), status: "pendente"}
    lista_tarefas.push(task)

    addStorage(lista_tarefas)

    if(lista_tarefas.length > 5) {window.alert("Limite de tarefas excedido.")} else {addHTML(lista_tarefas)}

    (input.value) = "" 
    }
})

addHTML = (lista) => {
    document.getElementById("tarefas").innerHTML = ""
    lista.forEach((item, index) => {
        document.getElementById("tarefas").innerHTML += `
        <div class="task">
            <div id="esquerda">
                <input type="checkbox" name="checkbox-${index}" id="checkbox-${index}">
                <label for="checkbox-${index}"></label>
                <p>${item.task}</p>
            </div>
            <button id="apagar" data-index="${index}"><span class="material-symbols-outlined">close</span></button>
        </div>`
    })
}

document.getElementById("tarefas").addEventListener("click", function(event) {
    let botao = event.target.closest('button')
    let indexBotao = botao.dataset.index
    lista_tarefas.splice(indexBotao, 1)
    addStorage(lista_tarefas)
    addHTML(lista_tarefas)

    //checkbox
    let checkbox = event.target.closest('input[type="checkbox"]')
    if (checkbox == true) {
        let index = checkbox.dataset.index
        lista_tarefas[index] = {status: "concluido"}
        addStorage(lista_tarefas)
    }


})

addStorage = (lista_tarefas) => {
    let lista = JSON.stringify(lista_tarefas)
    localStorage.setItem("minhasTarefas", lista)
}