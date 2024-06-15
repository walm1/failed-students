async function listStudentData() {
    let url = document.getElementById('workbookId').value;
    let path = url.split('')
    path = path.slice(39, 83).join('')
    let finalGradeCell


    try {
      // Fetch first 10 files
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: path,
        range: 'Q1',

        
      });
      responseForFirstCell = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: path,
        range: 'A3'
    })

    } catch (err) {
      console.log(err.message)
      return;
    }
    const result = response.result;
    let firstCell = responseForFirstCell.result
    console.log(firstCell.values)
    if (!result || !result.values || result.values.length == 0 || result.values[0][0] != 'Nota final') {
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: path,
            range: 'P1',
          });
          const result = response.result
          if (!result || !result.values || result.values.length == 0 || result.values[0][0] != 'Nota final') {
            response = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: path,
                range: 'R1',
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
                                range: `C${1}:${finalGradeCell}${1}`
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
                range: `C${1}:${finalGradeCell}${1}`
            })
            const resultForActivities = responseOfActivityNames.result
            console.log(resultForActivities.values[0])
        }
    }
    } else {
        if(result.values[0][0] === 'Nota final'){
            console.log('si en q')
            finalGradeCell = 'Q'
            responseOfActivityNames = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: path,
                range: `C${1}:${finalGradeCell}${1}`
            })
            const resultForActivities = responseOfActivityNames.result
            console.log(resultForActivities.values[0])
        }
}

    for(i = 0; i < rangeToLookAt + 1; i++ ){
        console.log(parseInt(firstCellToEvaluate) + i)
        let rangeForEvaluate = parseInt(firstCellToEvaluate) + i
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: path,
            range: finalGradeCell + rangeForEvaluate
        })
        const result = response.result
        if(parseInt(result.values[0][0]) < 60){
            responseOfStudents = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: path,
                range: `A${rangeForEvaluate}:${finalGradeCell}${rangeForEvaluate}`
            })
            
            const resultForStudents = responseOfStudents.result
            console.log(resultForStudents.values[0])
            
        }
    }
}