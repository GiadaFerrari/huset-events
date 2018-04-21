let evtPath = "http://ferrarigiada.com/kea/07-cms/wordpress/wp-json/wp/v2/events?_embed"
let template = document.querySelector('template').content;

 $(window).ready(()=>{     $('.loader-wrapper').addClass('hide');})
function fetchEvents(){
fetch(evtPath).then(e => e.json()).then(showEvents)
}

function showEvents(evt){
    evt.forEach((e)=>{

        let clone = template.cloneNode(true);
        let picPath = e.acf.event_picture.sizes.medium



        clone.querySelector('h1').textContent = e.title.rendered;
        clone.querySelector('.day').textContent = e.acf.date.substring(6,8);
        clone.querySelector('.month').textContent =e.acf.date.substring(4,6);
          clone.querySelector('.year').textContent =e.acf.date.substring(0,4);
        /*use sub string for presentation*/
        clone.querySelector('.time').textContent = e.acf.event_time;
        clone.querySelector('img').setAttribute('src',picPath)
        clone.querySelector('.venue').textContent = e.acf.venue;
       if(e.acf.free_event==false){clone.querySelector('.price').textContent = e.acf.event_price;
        } else {$('.button').addClass('hide');
                 clone.querySelector('.free').textContent = "FREE";
               }




        let main = document.querySelector('main');
        main.appendChild(clone)
    })
}

fetchEvents()
