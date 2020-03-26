import '../css/style.css';

import '../images/the-movie-db-logo.cb5571ba.png';

import '../manifest-webmanifest.json';

import '../index.html';

import '../offline.html'


importAll(require.context('../images/', true, /\.(png|jp(e*)g|svg)$/));
function importAll (r) {
  r.keys().forEach(r);
}


if(document.querySelector("article a img")){
    console.log("test10")
    document.querySelectorAll("article").forEach(node =>{
      node.querySelector("a img").classList.add('loading');
      console.log("Add loader")
        node.querySelector("a img").addEventListener("load",  function(){
            // node.classList.remove("loading") 
            node.querySelector("a img").removeAttribute("class")
            // node.querySelector("a img").removeEventListener("load", () => )
        })
        
    })
  }



// self.addEventListener("beforeinstallprompt", function(e) {
    
//     if(window.location.href != 'http://localhost:8080/'){
//         e.prompt()
//     }else{
//         e.preventDefault()
//     }

// })


window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    let deferredPrompt;
    deferredPrompt = e

  
  const btnInstallApp = document.getElementById('btn-install-app')
  
  if(btnInstallApp) {
    btnInstallApp.addEventListener('click', e => {
      deferredPrompt.prompt()
      deferredPrompt.userChoice
        .then(choiceResult => {
          if(choiceResult.outcome === 'accepted') {
            console.log('user accepted A2HS prompt')
          } else {
            console.log('user dismissed A2HS prompt')
          }
          deferredPrompt = null
        })
      })
  }
})
if(document.querySelector('button.share')){
 
    if(navigator.share){
        
      const btn = document.querySelector('button.share');
      btn.classList.add("show")
      btn.classList.remove("hidden")
    const resultPara = document.querySelector('.result');



      btn.addEventListener('click', () => {
        const title = window.document.title;
        const url = window.document.location.href;

        const file = {
            title: title, 
            url: url
        }
       
            navigator.share(file).then(() => {
                console.log('nice');
            })
      
      });
    }else{
        console.log("Not supported")
    }
}




