async function generatePdf(obj, i){
    if(i <= 5){
        var idSpreadSheet = '1aiKL0EiZV4C-QA4D221N0QxDdhB6y9pWyCpbxkAqmJ0'
        var idSheet = '1212381971'
    } else{
        var idSpreadSheet = '1hkCy3S7AnVaFXyLS6QS-17zwTO-sM691yRYluCR32mQ'
        var idSheet = '1420434824'
    }
    requestUpdateName = await gapi.client.sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: idSpreadSheet,
        resource: {
            valueInputOption: 'USER_ENTERED',
            data: [
                {
                    range: 'B11',
                    values: [[obj.studentName]]
                },
                {
                    range: 'B12',
                    values: [[obj.grado]]
                },
                {
                    range: 'D11:F11',
                    values: [[obj.curso]]
                },
                {
                    range: 'D12:F12',
                    values: [[obj.seccion]]
                },
                {
                    range: 'B17:C17',
                    values: [[obj.act1]]
                },
                {
                    range: 'B18:C18',
                    values: [[obj.act2]]
                },
                {
                    range: 'B19:C19',
                    values: [[obj.act3]]
                },
                {
                    range: 'A32:F32',
                    values: [[obj.observ]]
                }
            ]
        }
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

    var link = document.createElement("a");
    link.setAttribute('target', '_blank')
    link.download = `Informe ${obj.grado} + Clave ${obj.clave}`; // <- name instead of 'name'
    link.href = `https://docs.google.com/spreadsheets/${idSpreadSheet}/export?exportFormat=pdf&format=pdf&gid=${idSheet}`
    link.click();
    link.remove();
}
    