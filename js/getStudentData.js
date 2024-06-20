async function listStudentData() {

    const sheetToEvaluate = document.getElementById('sheet-selection').value
    const curso = document.getElementById('class').value
    let url = document.getElementById('workbookId').value;
    let path = url.split('')
    let finalGradeCell
    let grado = document.getElementById('grado').value
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
                    console.log('no values were founded in R')
                      } else{
                        if(result.values[0][0] === 'Nota final'){
                            console.log('si en R')
                            finalGradeCell = 'R'
                            responseOfActivityNames = await gapi.client.sheets.spreadsheets.values.get({
                                spreadsheetId: path,
                                range: `${sheetToEvaluate}!C${1}:${finalGradeCell}${1}`
                            })
                            const resultForActivities = responseOfActivityNames.result
                            console.log(resultForActivities.values[0])
                        }
                      }
    } else{
        if(result.values[0][0] === 'Nota final'){
            console.log('si en P')
            finalGradeCell = 'P'
            responseOfActivityNames = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: path,
                range: `${sheetToEvaluate}!C${1}:${finalGradeCell}${1}`
            })
            var resultForActivities = responseOfActivityNames.result
            console.log(resultForActivities.values[0])
        }
    }
    } else {
        if(result.values[0][0] === 'Nota final'){
            console.log('si en q')
            finalGradeCell = 'Q'
            responseOfActivityNames = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: path,
                range: `${sheetToEvaluate}!C${1}:${finalGradeCell}${1}`
            })
            var resultForActivities = responseOfActivityNames.result
        }
}

    let activitiesNames = resultForActivities.values[0]
    let act1 = activitiesNames[0]
    let act2 = activitiesNames[1]
    let act3 = activitiesNames[2]
    let act4 = activitiesNames[3]
    let act5 = activitiesNames[4]
    let act6 = activitiesNames[5]
    let act7 = activitiesNames[6]
    let act8 = activitiesNames[7]
    let act9 = activitiesNames[8]
    let act10 = activitiesNames[9]
    let act11 = activitiesNames[10]
    let act12 = activitiesNames[11]
    let act13 = activitiesNames[12]
    let exam = activitiesNames[13]
    let act15 = activitiesNames[14]
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

    for(i = 0; i < rangeToLookAt + 1; i++ ){
        let rangeForEvaluate = parseInt(firstCell) + i
        responseForStudents = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: path,
            range: `${sheetToEvaluate}!${finalGradeCell + rangeForEvaluate}`
        })
        const resultOfStudents = responseForStudents.result
        if(parseInt(resultOfStudents.values[0][0]) < 60){
            responseOfStudents = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: path,
                range: `${sheetToEvaluate}!A${rangeForEvaluate}:${finalGradeCell}${rangeForEvaluate}`
            })    

            const resultForStudents = responseOfStudents.result
            
            console.log(resultForStudents.values[0])
            let clave = resultForStudents.values[0][0]
            let studentName = resultForStudents.values[0][1]
            let finalGrade = resultForStudents.values[0][resultForStudents.values[0].length - 1]
            let nAct1 = resultForStudents.values[0][2]
            let nAct2 = resultForStudents.values[0][3]
            let nAct3 = resultForStudents.values[0][4]
            let nAct4 = resultForStudents.values[0][5]
            let nAct5 = resultForStudents.values[0][6]
            let nAct6 = resultForStudents.values[0][7]
            let nAct7 = resultForStudents.values[0][8]
            let nAct8 = resultForStudents.values[0][9] 
            let nQuiz = resultForStudents.values[0][10]
            let nIntProyect = resultForStudents.values[0][11]
            let nActitud = resultForStudents.values[0][12]
            let nExam = resultForStudents.values[0][16]
            

            if(studentName.includes(',')){
                var nameForApi = studentName.split(',').slice(1)
                nameForApi = nameForApi.toString()
                nameForApi.trimStart()
                nameForApi.trimEnd()
                nameForApi = nameForApi.split(' ').slice(1, 2)
                console.log(nameForApi)
            } else{
                var nameForApi = studentName.split(' ').slice(2, 3)
                console.log(nameForApi)
            }
            //var genderForObserv = await getGender(nameForApi)
            grado = grado.split(' ')
            var rGrado = grado.slice(0,2)
            rGrado = rGrado.join(' ')
            var seccion = grado[2]
            grado = grado.join(' ')
            var genderForObserv = 'El alumno'
            var observ = `${genderForObserv} presentó bajo rendimiento durante las actividades del bimestre, obteniendo también una mala nota dentro del parcial, siendo de puntos, incentivo a ${genderForObserv} que ponga mayor empeño durante las actividades y especialmente durante las evaluaciones, pues obtuvo puntos.`
            let paramObj = {
                grado,
                clave,
                rGrado,
                seccion,
                studentName,
                curso,
                act1,
                act2,
                act3,
                act4,
                act5,
                act6,
                act7,
                act8,
                act9,
                act10,
                act11,
                act12,
                exam,
                finalGrade,
                observ

            }
            generatePdf(paramObj)
        }
    }
}