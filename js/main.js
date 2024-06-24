const selectionSpace = document.getElementById('sheet-selection')
const profesores = document.getElementById("profesores")
const mate = document.getElementById("mate")
const fifu = document.getElementById("fifu")
const estadistica = document.getElementById("estadistica")
const social = document.getElementById("social")
const etica = document.getElementById("etica")
const seminario = document.getElementById("seminario")
const compu1 = document.getElementById("compu1")
const lab = document.getElementById("lab")
const Repa = document.getElementById("Repa")
const LyL = document.getElementById("LyL")
const natu = document.getElementById("natu")
const music = document.getElementById("music")
const conta = document.getElementById("conta")
const bio = document.getElementById('bio')
const quim = document.getElementById('quim')
const ingles = document.getElementById('ing')
const signoutButton = document.getElementById('signout_button')
const classes = document.getElementById('class')
const workbook = document.getElementById('workbookId')
const grado = document.getElementById('grado')

document.addEventListener('DOMContentLoaded', ()=>{
  if(localStorage.length > 0){
    let items = localStorage.getItem('user-saved-data')
    items = JSON.parse(items)
    profesores.value = items.teacher
    classes.value = items.clase
    workbook.value = items.id 
    return
  } 

    profesores.value = ''
    classes.value = ''
    workbook.value = ''
    grado.value = ''
    
})

profesores.onchange = ()=>{
        classes.value = ''
        let profes = document.getElementById("profesores").value
        if(profes=="Mauro López" || profes=="Henry Reyes"){
            mate.style.display = "inline-block"
            fifu.style.display = "inline-block"
            estadistica.style.display = "inline-block"
          } else{
            mate.style.display = "none"
            fifu.style.display = "none"
            estadistica.style.display = "none"
          }

        if(profes=="Nancy Méndez" || profes=="Bárbara Sánchez"){
          social.style.display = "inline-block"
          etica.style.display = "inline-block"
          seminario.style.display = "inline-block"
          // Para Josúe y Mónica falta conocer clases de especialidad..//
          //RyS no me la aceptó
          } else{
            social.style.display = "none"
            etica.style.display = "none"
            seminario.style.display = "none"
          }

          if(profes=="Luis Uribio"){
            compu1.style.display = "inline-block"
            lab.style.display = "inline-block"
            Repa.style.display = "inline-block"
          } else{
            compu1.style.display = "none"
            lab.style.display = "none"
            Repa.style.display = "none"
          }


           if(profes=="Noly Herrera" || profes=="Iris Revolorio"){
              LyL.style.display = "inline-block"
          } else{
            LyL.style.display = 'none'
          }
          if(profes=="Emily Donis"){
              natu.style.display = "inline-block"
              bio.style.display = 'inline-block'
              quim.style.display = 'inline-block'
              //Clases adicionales de música
          } else {
            natu.style.display = 'none'
            bio.style.display = 'none'
            quim.style.display = 'none'
          }
           if(profes=="Manuel Solís" || profes=="Daniel Letona"){
              music.style.display = "inline-block"
          } else{
                music.style.display = 'none'
          }

          if(profes=="Mynor Sián" || profes=="Letty Parada"){
            conta.style.display = "inline-block"
          } else{
            conta.style.display = 'none'
          }

          if(profes=="Mildred Véliz"){
                ingles.style.display = "inline-block"
            } else{
              ingles.style.display = 'none'
            }
    }

async function listSheets(){
    const workbook = document.getElementById('workbookId').value
    let path = workbook.split('')
    path = path.slice(39, 83).join('')
    try{
    responseForWb = await gapi.client.sheets.spreadsheets.get({
        spreadsheetId: path
    })
  
    console.log(responseForWb.status)
    
    const responsewb = responseForWb.result.sheets
    console.log(responsewb.values)
    if(responsewb){
        responsewb.forEach((hoja) =>{
            let name = hoja.properties.title
            let el = document.createElement('option')
            el.setAttribute('value', name)
            el.innerText = name
            selectionSpace.append(el)
        })
    }
  } catch(err){
    if(err.status === 403){
      alert('La app no tiene permiso para leer el link de la hoja')
      alert(`para solucionar este problema comparta el libro con el correo:
js-api@proyectoinformes-426403.iam.gserviceaccount.com 
y dele permisos de lectura y edición.
        `)
      handleSignoutClick()
        return
    }
  }
}


 async function getGender(name){
    return fetch(`https://gender-api.com/get?name=${name}&country=GT&key=4b0f82e90ba4e2e274789d58a47314ee77a9f996241cd214a218c60047f58783`)
    .then(response => {return response.json()})
    .then(res2 => 
        {
            var gender = res2.gender 
            return gender == 'female' ? 'La alumna' : 'El alumno'
        }
  )
}