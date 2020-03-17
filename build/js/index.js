imageComplete()


function imageComplete(imgs){
    document.querySelectorAll("article.loading").forEach(node =>{

        node.querySelector("a img").addEventListener("load",  ()=> {
            node.classList.remove("loading") 
            // node.querySelector("a img").removeEventListener("load", () => )
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




