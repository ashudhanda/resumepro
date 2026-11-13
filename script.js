// EmailJS loads from a CDN; if that request fails the global is missing
// and the whole builder must still work, so only init when it exists.
if (typeof emailjs !== "undefined") {
emailjs.init("lnX5w0H-myhX7si_r");
}

const inputs = document.querySelectorAll(".form-box input,.form-box textarea");

inputs.forEach(input=>{
input.addEventListener("input",updateResume);
});

// Keep the phone field digits-only so pasted text can't leave it in a
// state the 10-digit check will always reject.
let phoneInput=document.getElementById("phone");
if(phoneInput){
phoneInput.addEventListener("input",function(){
let digits=phoneInput.value.replace(/\D/g,"").slice(0,10);
if(phoneInput.value!==digits) phoneInput.value=digits;
});
}

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
// "HTML" and "html" are the same skill — dedupe case-insensitively
// but keep the spelling the user typed first.
let seenSkills=new Set();
let list=skills.split(",").map(skill=>skill.trim()).filter(skill=>skill!=="").filter(skill=>{
let key=skill.toLowerCase();
if(seenSkills.has(key)) return false;
seenSkills.add(key);
return true;
});

list.forEach(skill=>{
let span=document.createElement("span");
span.className="skill-tag";
span.innerText=skill;
skillBox.appendChild(span);
});
}
}

function showError(id){
let el=document.getElementById(id);
if(!el) return;
el.style.display="block";
}

function hideError(id){
let el=document.getElementById(id);
if(!el) return;
el.style.display="none";
}

function markRed(id){
let el=document.getElementById(id);
if(!el) return;
el.classList.add("input-error");
}

function markNormal(id){
let el=document.getElementById(id);
if(!el) return;
el.classList.remove("input-error");
}

function isValidEmail(value){
return /^[^@ ]+@[^@ ]+\.[^@ ]+$/.test(value);
}

// First field that failed validation in the current submit attempt, so
// the form can move keyboard focus to it instead of leaving the user
// hunting for the error message.
let firstInvalidField=null;

function validateField(isValid,errorId,inputId){
if(!isValid){
showError(errorId);
markRed(inputId);
if(!firstInvalidField) firstInvalidField=inputId;
return false;
}
hideError(errorId);
markNormal(inputId);
return true;
}

document.getElementById("download-btn").addEventListener("click",function(){

firstInvalidField=null;
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
valid=validateField(isValidEmail(email),"err-email","email")&&valid;
valid=validateField(/^\d{10}$/.test(phone),"err-phone","phone")&&valid;
valid=validateField(location!=="","err-location","location")&&valid;
valid=validateField(about!=="","err-aboutme","aboutme")&&valid;
valid=validateField(edu!=="","err-edu","edu")&&valid;
valid=validateField(exp!=="","err-exp","exp")&&valid;
valid=validateField(skills!=="","err-skills","skills")&&valid;

if(valid){
window.print();
}else{
let first=document.getElementById(firstInvalidField);
if(first) first.focus();
}
});

document.getElementById("contact-btn").addEventListener("click",function(){
let btn=document.getElementById("contact-btn");
if(btn.disabled) return;

firstInvalidField=null;
let valid=true;

let name=document.getElementById("c-name").value.trim();
let email=document.getElementById("c-email").value.trim();
let message=document.getElementById("c-message").value.trim();

valid=validateField(name!=="","err-c-name","c-name")&&valid;
valid=validateField(isValidEmail(email),"err-c-email","c-email")&&valid;
valid=validateField(message!=="","err-c-msg","c-message")&&valid;

if(!valid){
let first=document.getElementById(firstInvalidField);
if(first) first.focus();
return;
}

if(valid){
if(typeof emailjs==="undefined"){
alert("Email service is unavailable right now. Please try again later.");
btn.disabled=false;
return;
}
btn.disabled=true;
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
}).finally(function(){
btn.disabled=false;
});
}
});
