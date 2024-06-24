async function listStudentData() {

    const sheetToEvaluate = document.getElementById('sheet-selection').value
    const curso = document.getElementById('class').value
    let url = document.getElementById('workbookId').value;
    let path = url.split('')
    let finalGradeCell
    let grado = document.getElementById('grado').value
    let iterable = 0
    var ifc = 1
    path = path.slice(39, 83).join('')


    try {
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: path,
        range: `${sheetToEvaluate}!Q1`,   
      });
    } catch (err) {
      console.log(err.message)
      return;
    }
    const result = response.result;
    if (!result || !result.values || result.values.length == 0 || result.values[0][0] != 'Nota final') {
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: path,
            range: `${sheetToEvaluate}!P1`,
          });
          const result = response.result
          if (!result || !result.values || result.values.length == 0 || result.values[0][0] != 'Nota final') {
            response = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: path,
                range: `${sheetToEvaluate}!R1`,
              });
                const result = response.result
                if (!result || !result.values || result.values.length == 0) {
                      } else{
                        if(result.values[0][0] === 'Nota final'){
                            finalGradeCell = 'R'
                            responseOfActivityNames = await gapi.client.sheets.spreadsheets.values.get({
                                spreadsheetId: path,
                                range: `${sheetToEvaluate}!C${1}:${finalGradeCell}${1}`
                            })
                            var resultForActivities = responseOfActivityNames.result
                        }
                      }
    } else{
        if(result.values[0][0] === 'Nota final'){
            finalGradeCell = 'P'
            responseOfActivityNames = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: path,
                range: `${sheetToEvaluate}!C${1}:${finalGradeCell}${1}`
            })
            var resultForActivities = responseOfActivityNames.result
        }
    }
    } else {
        if(result.values[0][0] === 'Nota final'){
            finalGradeCell = 'Q'
            responseOfActivityNames = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: path,
                range: `${sheetToEvaluate}!C${1}:${finalGradeCell}${1}`
            })
            var resultForActivities = responseOfActivityNames.result
        }
}


    let resultActivitiesNames = resultForActivities.values[0]
    let activities = await getValues(resultActivitiesNames, finalGradeCell)

    while(ifc > 0){
            responseOfFirstCell = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: path,
                range: `${sheetToEvaluate}!A${ifc}`
            })
            var resultOfirstCell = responseOfFirstCell.result
            if (!resultOfirstCell || !resultOfirstCell.values || resultOfirstCell.values.length == 0 || resultOfirstCell.values[0][0] != 1) {
                ifc = ifc + 1
                } else {
                    var firstCell = ifc
                    ifc = 0
                }
        }

        responseOfACells = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: path,
            range: `${sheetToEvaluate}!A${2}:A`
        })
        var resultofAcells = responseOfACells.result
        var lastCell = (resultofAcells.values.length + firstCell) - 3
    
    let rangeToLookAt = lastCell - firstCell
    responseOfActValues= await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: path,
        range: `${sheetToEvaluate}!C${firstCell-1}:${finalGradeCell}${firstCell-1}`
    })

    let resultActivitiesValues = responseOfActValues.result.values[0]
    let activitiesValues = await getValues(resultActivitiesValues, finalGradeCell)
    
    for(i = 0; i < rangeToLookAt + 1; i++ ){
        let rangeForEvaluate = parseInt(firstCell) + i
        responseForStudents = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: path,
            range: `${sheetToEvaluate}!${finalGradeCell + rangeForEvaluate}`
        })
        const resultOfStudents = responseForStudents.result
        if(parseInt(resultOfStudents.values[0][0]) < 60){
            iterable = iterable + 1
            responseOfStudents = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: path,
                range: `${sheetToEvaluate}!A${rangeForEvaluate}:${finalGradeCell}${rangeForEvaluate}`
            })    

            var resultForStudents = responseOfStudents.result.values[0]
            let clave = resultForStudents[0]
            let studentName = resultForStudents[1]
            let finalGrade = resultForStudents[resultForStudents.length-1]
            resultForStudents = resultForStudents.slice(2, resultForStudents.length)
            let studentGrades = await getValues(resultForStudents, finalGradeCell)

            if(studentName.includes(',')){
                var nameForApi = studentName.split(',').slice(1)
                nameForApi = nameForApi.toString()
                nameForApi.trimStart()
                nameForApi.trimEnd()
                nameForApi = nameForApi.split(' ').slice(1, 2)
            } else{
                var nameForApi = studentName.split(' ').slice(2, 3)
            }
            
            //var genderForObserv = await getGender(nameForApi)
            grado = grado.split(' ')
            var rGrado = grado.slice(0,2)
            rGrado = rGrado.join(' ')
            var seccion = grado[2]
            grado = grado.join(' ')
            var genderForObserv = 'El alumno'
            let paramObj = {
                grado,
                clave,
                rGrado,
                seccion,
                studentName,
                curso,
                finalGrade,
                studentGrades,
                activitiesValues,
                activities,
                genderForObserv,
            }
            await generatePdf(paramObj, iterable)
        }
    }
}