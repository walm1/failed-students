async function generatePdf(obj, i){
    let idSpreadSheet = ''
    let idSheet = ''
    if(i <= 5){
        idSpreadSheet = '1aiKL0EiZV4C-QA4D221N0QxDdhB6y9pWyCpbxkAqmJ0'
        idSheet = '1212381971'
    } else{
        if(i <= 10){
            idSpreadSheet = '1hkCy3S7AnVaFXyLS6QS-17zwTO-sM691yRYluCR32mQ'
            idSheet = '1420434824'
        } else{
            idSpreadSheet = '1K2A9P8_hvi8x-qVd4caRkUqMRS-KvTtaXYbxCfU6vdg'
            idSheet = '1508574870'
        }
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
                    values: [[obj.rGrado]]
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
                    values: [[obj.activities.value1]]
                },
                {
                    range: 'B18:C18',
                    values: [[obj.activities.value2]]
                },
                {
                    range: 'B19:C19',
                    values: [[obj.activities.value3]]
                },
                {
                    range: 'B20:C20',
                    values: [[obj.activities.value4]]
                },
                {
                    range: 'B21:C21',
                    values: [[obj.activities.value5]]
                },
                {
                    range: 'B22:C22',
                    values: [[obj.activities.value6]]
                },
                {
                    range: 'B23:C23',
                    values: [[obj.activities.value7]]
                },
                {
                    range: 'B24:C24',
                    values: [[obj.activities.value8]]
                },
                {
                    range: 'B25:C25',
                    values: [[obj.activities.value9]]
                },
                {
                    range: 'B26:C26',
                    values: [[obj.activities.value10]]
                },
                {
                    range: 'B27:C27',
                    values: [[obj.activities.value11]]
                },
                {
                    range: 'B28:C28',
                    values: [[obj.activities.value12]]
                },
                {
                    range: 'D17',
                    values: [[obj.activitiesValues.value1]]
                },
                {
                    range: 'D18',
                    values: [[obj.activitiesValues.value2]]
                },
                {
                    range: 'D19',
                    values: [[obj.activitiesValues.value3]]
                },
                {
                    range: 'D20',
                    values: [[obj.activitiesValues.value4]]
                },
                {
                    range: 'D21',
                    values: [[obj.activitiesValues.value5]]
                },
                {
                    range: 'D22',
                    values: [[obj.activitiesValues.value6]]
                },
                {
                    range: 'D23',
                    values: [[obj.activitiesValues.value7]]
                },
                {
                    range: 'D24',
                    values: [[obj.activitiesValues.value8]]
                },
                {
                    range: 'D25',
                    values: [[obj.activitiesValues.value9]]
                },
                {
                    range: 'D26',
                    values: [[obj.activitiesValues.value10]]
                },
                {
                    range: 'D27',
                    values: [[obj.activitiesValues.value11]]
                },
                {
                    range: 'D28',
                    values: [[obj.activitiesValues.value12]]
                },
                {
                    range: 'E17',
                    values: [[obj.studentGrades.value1 + ' pts.']]
                },
                {
                    range: 'E18',
                    values: [[obj.studentGrades.value2 + ' pts.']]
                },
                {
                    range: 'E19',
                    values: [[obj.studentGrades.value3 + ' pts.']]
                },
                {
                    range: 'E20',
                    values: [[obj.studentGrades.value4 + ' pts.']]
                },
                {
                    range: 'E21',
                    values: [[obj.studentGrades.value5 + ' pts.']]
                },
                {
                    range: 'E22',
                    values: [[obj.studentGrades.value6 + ' pts.']]
                },
                {
                    range: 'E23',
                    values: [[obj.studentGrades.value7 + ' pts.']]
                },
                {
                    range: 'E24',
                    values: [[obj.studentGrades.value8 + ' pts.']]
                },
                {
                    range: 'E25',
                    values: [[obj.studentGrades.value9 + ' pts.']]
                },
                {
                    range: 'E26',
                    values: [[obj.studentGrades.value10 + ' pts.']]
                },
                {
                    range: 'E27',
                    values: [[obj.studentGrades.value11 + ' pts.']]
                },
                {
                    range: 'E28',
                    values: [[obj.studentGrades.value12 + ' pts.']]
                },
                {
                    range: 'E29',
                    values: [[obj.finalGrade + ' pts.']]
                },
                {
                    range: 'A32:F32',
                    values: [[`${obj.genderForObserv} presentó bajo rendimiento durante las actividades del bimestre, obteniendo también una mala nota dentro del parcial, siendo de ${obj.studentGrades.parcial} puntos, incentivo a ${obj.genderForObserv.toLowerCase()} que ponga mayor empeño durante las actividades y especialmente durante las evaluaciones, pues obtuvo ${obj.studentGrades.value12} puntos.`]]
                }
            ]
        }
    })

    Notification.requestPermission()

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
    link.href = `https://docs.google.com/spreadsheets/d/${idSpreadSheet}/export?exportFormat=pdf&format=pdf&gid=${idSheet}`
    link.click();
    link.remove();
}
    