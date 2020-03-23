



// imageComplete()


// function imageComplete(imgs){
    document.querySelectorAll("article").forEach(node =>{
      node.classList.add('loading');
        node.querySelector("a img").addEventListener("load",  ()=> {
            // node.classList.remove("loading") 
            node.removeAttribute("class")
            // node.querySelector("a img").removeEventListener("load", () => )
        })
        
    })
// }

// self.addEventListener("beforeinstallprompt", function(e) {
    
//     if(window.location.href != 'http://localhost:8080/'){
//         e.prompt()
//     }else{
//         e.preventDefault()
//     }

// })


window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    deferredPrompt = e
  })
  
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

if(document.querySelector('button.share')){
    if(navigator.share){
        
    const btn = document.querySelector('button.share');
    const resultPara = document.querySelector('.result');

    btn.classList.add("show")

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




