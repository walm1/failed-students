async function getValues(data, cell){
    if(cell.toLowerCase() === 'q'){
        let value1 = data[0]
        let value2 = data[1]
        let value3 = data[2]
        let value4 = data[3]
        let value5 = data[4]
        let value6 = data[5]
        let value7 = data[6]
        let value8 = data[7]
        let parcial = value8
        let value9 = data[8]
        let value10 = data[9]
        let value11 = data[11]
        let value12 = data[data.length - 3]
        return {value1, value2, parcial, value3, value4, value5, value6, value7, value8, value9, value10, value11, value12}
    } else{
        if(cell.toLowerCase() === 'r'){
            let value1 = data[0]
            let value2 = data[1]
            let value3 = data[2]
            let value4 = data[3]
            let value5 = data[4]
            let value6 = data[5]
            let value7 = data[6]
            let value8 = data[7]
            let value9 = data[8]
            let parcial = value9
            let value10 = data[9]
            let value11 = data[10]
            let value12 = data[data.length - 3]
            return {value1, value2, parcial, value3, value4, value5, value6, value7, value8, value9, value10, value11, value12}
        }
    }
}