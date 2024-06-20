const idSpreadSheet = '1aiKL0EiZV4C-QA4D221N0QxDdhB6y9pWyCpbxkAqmJ0'
const idSheet = '1212381971'

async function generatePdf(obj){
    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'B11',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.studentName]]
    })

    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'D11:F11',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.curso]]
    })

    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'B12',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.rGrado]]
    })

    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'D12:F12',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.seccion]]
    })

    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'D12:F12',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.seccion]]
    })

    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'B17:C17',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.act1]]
    })

    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'B18:C18',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.act2]]
    })
    
    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'B19:C19',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.act3]]
    })

    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'B20:C20',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.act4]]
    })

    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'B21:C21',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.act5]]
    })

    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'B22:C22',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.act6]]
    })

    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'B23:C23',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.act7]]
    })


    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'B24:C24',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.act8]]
    })

    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'B25:C25',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.act9]]
    })

    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'B26:C26',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.act10]]
    })

    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'B27:C27',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.act11]]
    })

    requestUpdateName = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: idSpreadSheet,
        range: 'B28:C28',
        valueInputOption: 'USER_ENTERED',
        values: [[obj.exam]]
    })
    


    updateSheetName = await gapi.client.sheets.spreadsheets.batchUpdate({
        spreadsheetId: idSpreadSheet,
        resource: {
        requests: [
        {
          updateSheetProperties: {
            properties: {
              sheetId: idSheet,
              title: obj.grado + ' clave ' + obj.clave,
            },
            fields: 'title',
          },
        },
      ],
    }

    })

    window.open('https://docs.google.com/spreadsheets/d/1aiKL0EiZV4C-QA4D221N0QxDdhB6y9pWyCpbxkAqmJ0/export?exportFormat=pdf&format=pdf&gid=1212381971')

}
    