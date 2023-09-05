    const registration_form = document.querySelector('.register')
    const txtfullname = document.querySelector('#full-name')
    const txtusername = document.querySelector('#username')
    const txtemail = document.querySelector('#email')
    const txtpassword = document.querySelector('#password') 
    const txtpassword2 = document.querySelector('#password2') 
    const reg_notification= document.querySelector('#notification') 
    
    
    registration_form.addEventListener('submit', (e)=>{
        e.preventDefault();

        if(txtfullname.value == '' || txtusername.value=='' || txtemail.value == '' || txtpassword.value == '' || txtpassword2.value == ''  ){
            reg_notification.textContent = "Fill all fields"
            setTimeout(function() {
                reg_notification.textContent = ""
            }, 3000);
            return
        }

        console.log(txtpassword.value, txtpassword2.value );
        
        if(txtpassword.value !== txtpassword2.value){
            reg_notification.textContent = 'Your Passwords do not match'
            setTimeout(function() {
                reg_notification.textContent = ""
            }, 3000);
            console.log('pwd don match')
            return
        }
    })