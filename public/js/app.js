

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
// 	response.json().then((data)=>{
// 		console.log(data)
// 	})
// 	// console.log(response)
// })



const searchForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

searchForm.addEventListener('submit' , (ev)=> {
	ev.preventDefault()

	const location = searchTerm.value
	const url = '/weather?address='+location

	messageOne.textContent = 'Loading..'
	messageTwo.textContent = ''

	fetch(url).then((response)=>{
		response.json().then((data)=>{
			if(data.error){
				return messageOne.textContent = data.error
			}

			messageOne.textContent = ''
			messageTwo.textContent = 'Location : '+data.location+' Temparature : '+data.temparature+' Summary : '+data.summary
			// console.log('Location : ',data.location)
			// console.log('Temparature : ',data.temparature)
		})
	})
})