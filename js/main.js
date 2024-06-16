const workbook = document.getElementById('workbookId').value 
const selectionSpace = document.getElementById('sheet-selection')
let path = workbook.split('')
path = path.slice(39, 83).join('')

async function listSheets(){
    responseForWb = await gapi.client.sheets.spreadsheets.get({
        spreadsheetId: path
    })
    const responsewb = responseForWb.result.sheets
    console.log(responsewb)
    if(responsewb){
        responsewb.forEach((hoja) =>{
            let name = hoja.properties.title
            console.log(name)
            let el = document.createElement('option')
            el.setAttribute('value', name)
            el.innerText = name
            selectionSpace.append(el)
        })
    }
}


async function getGender(name){
     return fetch(`https://gender-api.com/get?name=${name}&country=GT&key=4b0f82e90ba4e2e274789d58a47314ee77a9f996241cd214a218c60047f58783`)
    .then(response => {return response.json()})
    .then(res2 => 
        {
            var gender = res2.gender 
            if(gender == 'female'){
                return 'La alumna'
            } else {
                return 'El alumno'
            }
        }
    )
}
