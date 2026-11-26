// EmailJS loads from a CDN; if that request fails the global is missing
// and the whole builder must still work, so only init when it exists.
if (typeof emailjs !== "undefined") {
emailjs.init("lnX5w0H-myhX7si_r");
}

// Preview nodes are written on every keystroke, so look them up
// once instead of querying the DOM ten times per input event.
const preview={
name:document.getElementById("resume-name"),
role:document.getElementById("resume-role"),
contact:document.getElementById("resume-contact"),
about:document.getElementById("resume-about"),
edu:document.getElementById("resume-edu"),
exp:document.getElementById("resume-exp"),
skills:document.getElementById("resume-skills")
};

// The builder fields are read on every keystroke too, so cache them
// alongside the preview nodes instead of querying the DOM each time.
const fields={
name:document.getElementById("name"),
role:document.getElementById("role"),
email:document.getElementById("email"),
phone:document.getElementById("phone"),
location:document.getElementById("location"),
about:document.getElementById("aboutme"),
edu:document.getElementById("edu"),
exp:document.getElementById("exp"),
skills:document.getElementById("skills")
};

const inputs = document.querySelectorAll(".form-box input,.form-box textarea");

inputs.forEach(input=>{
input.addEventListener("input",updateResume);
});

// Keep the phone field digits-only so pasted text can't leave it in a
// state the 10-digit check will always reject.
let phoneInput=fields.phone;
if(phoneInput){
phoneInput.addEventListener("input",function(){
// Pasted numbers often carry the country code ("+91 98765 43210")
// or a trunk zero ("09876543210"); strip that prefix before
// keeping the 10 digits the validator expects, instead of
// chopping the first 10 digits off the real number.
let digits=phoneInput.value.replace(/\D/g,"");
if(digits.length===12&&digits.startsWith("91")) digits=digits.slice(2);
else if(digits.length===11&&digits.startsWith("0")) digits=digits.slice(1);
digits=digits.slice(0,10);
if(phoneInput.value!==digits){
phoneInput.value=digits;
// updateResume already ran for this keystroke with the raw pasted
// value, so refresh the preview with the cleaned number instead of
// leaving the stale text there until the next keystroke.
updateResume();
}
});
}

function updateResume(){

let name=fields.name.value;
let role=fields.role.value;
let email=fields.email.value;
let phone=fields.phone.value;
let location=fields.location.value;
let about=fields.about.value;
let edu=fields.edu.value;
let exp=fields.exp.value;
let skills=fields.skills.value;

preview.name.textContent=name || "Your Name";
preview.role.textContent=role || "Your Role";
preview.contact.textContent=
(email || "Email")+" | "+
(phone || "Phone")+" | "+
(location || "Location");

preview.about.textContent=
about || "Your summary here.";

preview.edu.textContent=
edu || "Your education here.";

preview.exp.textContent=
exp || "Your experience here.";

let skillBox=preview.skills;
skillBox.innerHTML="";

if(skills.trim()==""){
skillBox.textContent="Your skills here.";
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

if(list.length===0){
skillBox.textContent="Your skills here.";
}
else{
list.forEach(skill=>{
let span=document.createElement("span");
span.className="skill-tag";
span.textContent=skill;
skillBox.appendChild(span);
});
}
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
return /^[^@ ]+@[^@ ]+\.[^@ ]{2,}$/.test(value);
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

// The builder and contact sections have no <form>, so Enter in a field
// would do nothing. Treat Enter as a click on the section's button,
// except inside a textarea where Enter must insert a newline.
function submitOnEnter(containerSelector,buttonId){
let container=document.querySelector(containerSelector);
if(!container) return;
container.addEventListener("keydown",function(e){
if(e.key!=="Enter") return;
if(e.target.tagName==="TEXTAREA") return;
e.preventDefault();
let button=document.getElementById(buttonId);
if(button) button.click();
});
}
submitOnEnter(".form-box","download-btn");
submitOnEnter(".contact","contact-btn");

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
let hasSkill=skills.split(",").some(skill=>skill.trim()!=="");
valid=validateField(hasSkill,"err-skills","skills")&&valid;

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

if(typeof emailjs==="undefined"){
alert("Email service is unavailable right now. Please try again later.");
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
});
