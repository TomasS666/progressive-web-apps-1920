imageComplete()


function imageComplete(imgs){
    document.querySelectorAll("article.loading").forEach(node =>{

        node.querySelector("a img").addEventListener("load",  ()=> {
            node.classList.remove("loading") 
            // node.querySelector("a img").removeEventListener("load", () => )
        })
        
    })
}

window.onload = function() {

    if(document.querySelector('button.share')){
    const shareData = {
        title: 'MDN',
        text: 'Learn web development on MDN!',
        url: 'https://developer.mozilla.org',
      }
      
      const btn = document.querySelector('button.share');
   
      
      // Must be triggered some kind of "user activation"
      btn.addEventListener('click', async () => {
        try {
          await navigator.share(shareData)
          console.log('MDN shared successfully')
        } catch(err) {
            console.log(err)
        }
      });
    }
};


