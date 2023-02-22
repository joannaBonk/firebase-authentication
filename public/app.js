// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';


// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAxRapf1DbYMdzJlM780GYiiBCfJlR4UVQ',
	authDomain: 'project-auth-a51f9.firebaseapp.com',
	projectId: 'project-auth-a51f9',
	storageBucket: 'project-auth-a51f9.appspot.com',
	messagingSenderId: '750753018731',
	appId: '1:750753018731:web:e012b72c16644033cad22e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


const emailForm = document.querySelector('#emailForm');
const passwordForm = document.querySelector('#passwordForm');
const firstNameForm = document.querySelector('#firstNameForm');

const signInBtn = document.querySelector('#signInBtn');
const signUpBtn = document.querySelector('#signUpBtn');
const signOutBtn = document.querySelector('#signOutBtn');

const errorLabel = document.querySelector('#errorLabel');
const welcomeUser = document.querySelector('#welcomeUser');

const form = document.querySelector('form');

const viewForNotLoggedUser = document.querySelector('#viewForNotLoggedUser');
const viewForLoggedUser = document.querySelector('#viewForLoggedUser');

/************************/
//functions about view password

let pwShown = 0;
const eye = document.getElementById('eye');

const show = () => {
	passwordForm.setAttribute('type', 'text');
};
const hide = () => {
	passwordForm.setAttribute('type', 'password');
};

const passShown = () => {
	if (pwShown == 0) {
		pwShown = 1;
		show();
	} else {
		pwShown = 0;
		hide();
	}
};

eye.addEventListener('click', passShown);
/************************/

//Login User

const signInUser = async () => {
	const valueEmail = emailForm.value;
	const valuePassword = passwordForm.value;

	try {
		const user = await signInWithEmailAndPassword(auth, valueEmail, valuePassword);
	} catch (exception) {
		errorLabel.innerHTML = 'Invalid email or password!';
	}
};

signInBtn.addEventListener('click', signInUser);

//Register user

const signUpUser = async () => {
	const valueEmail = emailForm.value;
	const valuePassword = passwordForm.value;

	try {
		const user = await createUserWithEmailAndPassword(auth, valueEmail, valuePassword);
	} catch (error) {
		if (error.code === 'auth/email-already-in-use') {
			errorLabel.innerHTML = 'Select another email. This email is already taken.';
		} else if (valueEmail.length <= 0) {
			alert('Please enter your email address!');
		}  else if(valuePassword.length <6){
			errorLabel.innerHTML = 'Your password is too short.';
		}
		else {
			errorLabel.innerHTML = 'Registration failed...';
		}
	}
};

signUpBtn.addEventListener('click', signUpUser);

// Sing out User
const signOutUser = async () => {
	await signOut(auth);
};

signOutBtn.addEventListener('click', signOutUser);

//Watch for a change in user session status
const authUserObserver = () => {
	onAuthStateChanged(auth, user => {
		if (user) {
		
			viewForLoggedUser.style.display = 'block';
			welcomeUser.innerHTML = `Welcome ${firstNameForm.value} 😀 You are logged in.`;
			viewForNotLoggedUser.style.display = 'none';
		} else {
			
			viewForLoggedUser.style.display = 'none';
			viewForNotLoggedUser.style.display = 'block';
		}
	});
};
authUserObserver();





