

const username = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submit');

function submitContact(event){
    event.preventDefault()
	if(username.value === '' || email.value === '' || subject.value === '' || message.value === ''){
		alert("Please provide all information")
	} else {
		let contact = {
			username: username.value,
			email: email.value,
			subject: subject.value,
			message: message.value,
		}
		axios.post('https://seftond.github.io/send', contact)
		username.value = '';
		email.value = '';
		subject.value = '';
		message.value = '';
		alert("Your message has been sent")
	}
}



submitBtn.addEventListener('click', submitContact);