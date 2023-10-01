const formOpenBtn = document.querySelector("#click_login"),
background = document.querySelector(".homepage"),
formContainer = document.querySelector(".form_container"),
xmark_CLOSE = document.querySelector(".xmark_CLOSE"),
signup = document.querySelector("#signup"),
loginbtn = document.querySelector("#login"),
submit = document.querySelector("#button2");

formOpenBtn.addEventListener("click", () => background.classList.add("show"))
xmark_CLOSE.addEventListener("click", () => background.classList.remove("show"));
signup.addEventListener("click", () => formContainer.classList.add("active"))
loginbtn.addEventListener("click", () => formContainer.classList.remove("active"));



var login_attempts=3;
function validate() {
	var name = document.getElementById("username").value;
	var pass = document.getElementById("password").value;
if(name=="emonawong" && pass=="12345")
{
	alert("SuccessFully Logged In");
	document.getElementById("username").value="";
	document.getElementById("password").value="";
	window.location ="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new";
	return false;
}
else
{
	if(login_attempts==0)
		{
		alert("No Login Attempts Available");
		}
	else
	{
		login_attempts=login_attempts-1;
		alert("Login Failed Now Only "+login_attempts+" Login Attempts Available");
		if(login_attempts==0)
		{
		document.getElementById("username").disabled=true;
		document.getElementById("password").disabled=true;
		document.getElementById("button2").disabled=true;
		return false;
		}
	}
}
 
 return false;
}




//function myFunction(){
//	var Ename = document.forms["form"]["usernameC"];
//	var Epass = document.forms["form"]["passwordC"];
//	var user_error = document.getElementById("usernameC");
//	var pass_error = document.getElementById("passwordC");
//		if (email.value.length < 9) {
//		usernameC.style.border = "1px solid red";
//		email.focus();
//		return false;
//		}
//}