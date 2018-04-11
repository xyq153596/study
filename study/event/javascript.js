let e = document.getElementById('test')
let t = document.getElementById('eee')

t.addEventListener('click', function (event) {
  console.log(event.target)
  
})

function eventTarget(parent, children, handler) {

  parent.addEventListener('click', function (event) {
    console.log(event.target)
    console.log(event.currentTarget)
    Array.from(document.getElementsByTagName(children)).forEach(item => {

      if (item === event.target) {
        handler(event);
      }
    })
  })


}

eventTarget(document.getElementById('test'), 'p', (event) => {
  console.log(event.srcElement)
})