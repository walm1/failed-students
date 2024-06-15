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

