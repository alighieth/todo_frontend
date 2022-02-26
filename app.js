console.log("hello world")

const application_root = document.getElementById("application")
const element = document.createElement('p')
element.append("This is all the Notes")

application_root.appendChild(element)

const element_data = document.createElement('p')
let table = document.createElement('table')
table.setAttribute("id", "myTable")
let thead = document.createElement('thead')
let tbody = document.createElement('tbody')

table.appendChild(thead);
table.appendChild(tbody);

application_root.appendChild(table)

fetch("http://localhost:9292/todo", { mode: 'cors' })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let myData = data

        //creating table headers
        let headRow = document.createElement('tr')
        let idHeader = document.createElement('th')
        let titleHead = document.createElement('th')
        let noteHead = document.createElement('th')

        idHeader.innerHTML = 'ID'
        titleHead.innerHTML = 'Title'
        noteHead.innerHTML = 'Note'

        headRow.appendChild(idHeader)
        headRow.appendChild(titleHead)
        headRow.appendChild(noteHead)

        table.appendChild(headRow)

        myData.map(function (note) {
            let rowHead = document.createElement('tr')

            let heading = document.createElement('th')
            heading.innerHTML = `${note.id}`

            let title = document.createElement('td')
            title.innerHTML = `${note.title}`

            let notes = document.createElement('td')
            notes.innerHTML = `${note.note}`

            rowHead.appendChild(heading)
            rowHead.appendChild(title)
            rowHead.appendChild(notes)

            table.appendChild(rowHead)
        })
    })


//Requet input
const req = document.createElement("span")
req.innerHTML = "Please enter your notes"
application_root.appendChild(req)

const line = document.createElement('hr')
application_root.appendChild(line)

var br = document.createElement("br");

const form = document.createElement("form")
// form.setAttribute("onsubmit", "return submittion(this)")

const titleInput = document.createElement("input")
titleInput.setAttribute("type", "text")
titleInput.setAttribute("name", "title")
titleInput.setAttribute("placeholder", "Title")


const noteInput = document.createElement("input")
noteInput.setAttribute("type", "text")
noteInput.setAttribute("name", "note")
noteInput.setAttribute("placeholder", "Note")

//submit button
const submit = document.createElement("input")
submit.setAttribute("name", "Submit")
submit.setAttribute("type", "Submit")
submit.setAttribute("onclick", "return submittion()")

form.appendChild(br.cloneNode())
form.appendChild(titleInput)
form.appendChild(br.cloneNode())
form.appendChild(noteInput)
form.appendChild(br.cloneNode())
form.appendChild(submit)

application_root.appendChild(form)

let titleIn = titleInput.value
let noteIn = noteInput.value

function submittion() {
    fetch("http://localhost:9292/todo", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({title: titleInput.value.toString, note: noteInput.value.toString}),
})
    .then(response => response.json())
    .then(Note => console.log("note added successfully"))
}


