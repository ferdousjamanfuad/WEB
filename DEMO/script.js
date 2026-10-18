const form=document.getElementById("myForm");

const name=document.getElementById("name");
const email=document.getElementById("email");
const age=document.getElementById("age");
const dept=document.getElementById("dept");
const check=document.getElementById("check");

let error=document.querySelectorAll(".error");

form.addEventListener("submit",function(event){

    let valid=true;

    // Name
    if(name.value.trim()=="")
    {
        error[0].innerHTML="Name is required";
        valid=false;
    }
    else
    {
        error[0].innerHTML="";
    }

    // Email
    if(email.value.trim()=="")
    {
        error[1].innerHTML="Email is required";
        valid=false;
    }
    else if(!email.value.includes("@"))
    {
        error[1].innerHTML="Invalid Email";
        valid=false;
    }
    else
    {
        error[1].innerHTML="";
    }

    // Age
    if(age.value=="")
    {
        error[2].innerHTML="Age is required";
        valid=false;
    }
    else if(age.value<18)
    {
        error[2].innerHTML="Age must be at least 18";
        valid=false;
    }
    else
    {
        error[2].innerHTML="";
    }

    // Gender
    let gender=document.getElementsByName("gender");
    let selected=false;

    for(let i=0;i<gender.length;i++)
    {
        if(gender[i].checked)
        {
            selected=true;
        }
    }

    if(selected==false)
    {
        error[3].innerHTML="Select Gender";
        valid=false;
    }
    else
    {
        error[3].innerHTML="";
    }

    // Department
    if(dept.value=="")
    {
        error[4].innerHTML="Select Department";
        valid=false;
    }
    else
    {
        error[4].innerHTML="";
    }

    // Checkbox
    if(check.checked==false)
    {
        error[5].innerHTML="Accept Terms";
        valid=false;
    }
    else
    {
        error[5].innerHTML="";
    }

    if(valid==false)
    {
        event.preventDefault();
    }

});