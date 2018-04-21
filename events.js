let evtPath = "http://ferrarigiada.com/kea/07-cms/wordpress/wp-json/wp/v2/events?_embed"
let template = document.querySelector('template').content;

/*loader handler*/
$(window).ready(() => {
    $('.loader-wrapper').addClass('hide');
})


function fetchEvents() {
    console.log('im fetching')
    fetch(evtPath).then(e => e.json()).then(showEvents)
}

function showEvents(evt) {
    evt.forEach((e) => {
        let clone = template.cloneNode(true);
        let picPath = e.acf.event_picture.sizes.medium
        let pList = 'http://ferrarigiada.com/kea/07-cms/wordpress/wp-json/wp/v2/events?slug='


        console.log('im cloning')
        clone.querySelector('h1').textContent = e.title.rendered;
        clone.querySelector('.day').textContent = e.acf.date.substring(6, 8);
        clone.querySelector('.month').textContent = e.acf.date.substring(4, 6);
        clone.querySelector('.year').textContent = e.acf.date.substring(0, 4);
        /*use sub string for presentation*/
        clone.querySelector('.time').textContent = e.acf.event_time;
        clone.querySelector('img').setAttribute('src', picPath)
        clone.querySelector('.venue').textContent = e.acf.venue;

        if (e.acf.free_event == false) {
            clone.querySelector('.price').textContent = e.acf.event_price;
        } else {
            $('.button').addClass('hide');
            clone.querySelector('.free').textContent = "FREE";
        }

        let modal = document.querySelector('.modal')

          clone.querySelector(".more").addEventListener('click', () => {
                modal.classList.remove('hide');
                fetch(pList + e.slug).then(result => result.json()).then(productID => showModal(productID, clone))
            });

        function showModal(p) {
            console.log(p)

    modal.querySelector('h2').textContent = p.title.rendered;

    modal.querySelector('.contentMe').innerHTML = p.content.rendered
    modal.addEventListener('click', () => modal.classList.add('hide'))
}















        function cinemaFilter(){if(e.acf.cinema==false){
                  document.querySelectorAll('section').forEach((s)=>{s.classList.add('hide')})
              console.log('I fucking rock')
} }


        /*filters*/

       $('.genreFilter').on('click', () => {
            $('.genreNav').css('width', '90vw')
            $('.genreNav').on('click',()=>{$('.genreNav').css('width', '0vw')})
           document.querySelectorAll('.gFilter').forEach((g)=>{g.addEventListener('click', ()=>{
            if (g.classList.contains('cinema')) {
       cinemaFilter();

                /*I need to only show the events with the acf cinema set as true*/}
            })

        })


    })
  let main = document.querySelector('main');
        main.appendChild(clone)



}
                                                         )}


fetchEvents()













/*
document.querySelectorAll('.more').forEach((m)=>{m.addEventListener('click',(evt)=>{evt.target.classList.toggle('hide');
                          console.log('something')})})

document.querySelectorAll('.modal').forEach((mo)=>{mo.addEventListener('click',(evt)=>{evt.target.classList.toggle('hide')})})*/
