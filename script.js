const inputs = document.querySelectorAll(".form-box input,.form-box textarea");

inputs.forEach(input=>{
input.addEventListener("input",updateResume);
});

document.getElementById("download-btn").addEventListener("click",()=>{
window.print();
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
let list=skills.split(",");

list.forEach(skill=>{
let span=document.createElement("span");
span.className="skill-tag";
span.innerText=skill.trim();
skillBox.appendChild(span);
});
}

}