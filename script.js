emailjs.init("lnX5w0H-myhX7si_r");

const inputs = document.querySelectorAll(".form-box input,.form-box textarea");

inputs.forEach(input=>{
input.addEventListener("input",updateResume);
});

function updateResume(){

let name=document.getElementById("name").value;
let role=document.getElementById("role").value;
let email=document.getElementById("email").value;
let phone=document.getElementById("phone").value;
let location=document.getElementById("location").value;
let about=document.getElementById("aboutme").value;
let edu=document.getElementById("edu").value;
let exp=document.getElementById("exp").value;
let skills=document.getElementById("skills").value;

document.getElementById("resume-name").innerText=name || "Your Name";
document.getElementById("resume-role").innerText=role || "Your Role";
document.getElementById("resume-contact").innerText=
(email || "Email")+" | "+
(phone || "Phone")+" | "+
(location || "Location");

document.getElementById("resume-about").innerText=
about || "Your summary here.";

document.getElementById("resume-edu").innerText=
edu || "Your education here.";

document.getElementById("resume-exp").innerText=
exp || "Your experience here.";

let skillBox=document.getElementById("resume-skills");
skillBox.innerHTML="";

if(skills.trim()==""){
skillBox.innerText="Your skills here.";
}
else{
let list=[...new Set(skills.split(",").map(skill=>skill.trim()).filter(skill=>skill!==""))];

list.forEach(skill=>{
let span=document.createElement("span");
span.className="skill-tag";
span.innerText=skill;
skillBox.appendChild(span);
});
}
}

function showError(id){
document.getElementById(id).style.display="block";
}

function hideError(id){
document.getElementById(id).style.display="none";
}

function markRed(id){
document.getElementById(id).classList.add("input-error");
}

function markNormal(id){
document.getElementById(id).classList.remove("input-error");
}

function validateField(isValid,errorId,inputId){
if(!isValid){
showError(errorId);
markRed(inputId);
return false;
}
hideError(errorId);
markNormal(inputId);
return true;
}

document.getElementById("download-btn").addEventListener("click",function(){

let valid=true;

let name=document.getElementById("name").value.trim();
let role=document.getElementById("role").value.trim();
let email=document.getElementById("email").value.trim();
let phone=document.getElementById("phone").value.trim();
let location=document.getElementById("location").value.trim();
let about=document.getElementById("aboutme").value.trim();
let edu=document.getElementById("edu").value.trim();
let exp=document.getElementById("exp").value.trim();
let skills=document.getElementById("skills").value.trim();

valid=validateField(name!=="","err-name","name")&&valid;
valid=validateField(role!=="","err-role","role")&&valid;
valid=validateField(/^[^@ ]+@[^@ ]+\.[^@ ]+$/.test(email),"err-email","email")&&valid;
valid=validateField(/^\d{10}$/.test(phone),"err-phone","phone")&&valid;
valid=validateField(location!=="","err-location","location")&&valid;
valid=validateField(about!=="","err-aboutme","aboutme")&&valid;
valid=validateField(edu!=="","err-edu","edu")&&valid;
valid=validateField(exp!=="","err-exp","exp")&&valid;
valid=validateField(skills!=="","err-skills","skills")&&valid;

if(valid){
window.print();
}
});

document.getElementById("contact-btn").addEventListener("click",function(){

let valid=true;

let name=document.getElementById("c-name").value.trim();
let email=document.getElementById("c-email").value.trim();
let message=document.getElementById("c-message").value.trim();

if(name===""){
showError("err-c-name");
markRed("c-name");
valid=false;
}else{
hideError("err-c-name");
markNormal("c-name");
}

if(!/^[^@ ]+@[^@ ]+\.[^@ ]+$/.test(email)){
showError("err-c-email");
markRed("c-email");
valid=false;
}else{
hideError("err-c-email");
markNormal("c-email");
}

if(message===""){
showError("err-c-msg");
markRed("c-message");
valid=false;
}else{
hideError("err-c-msg");
markNormal("c-message");
}

if(valid){
emailjs.send("service_c51g08v","template_7s6ei6a",{
name: name,
email: email,
message: message,
}).then(function(){
alert("Message sent successfully!");
document.getElementById("c-name").value="";
document.getElementById("c-email").value="";
document.getElementById("c-message").value="";
}).catch(function(){
alert("Failed to send. Please try again.");
});
}
});
