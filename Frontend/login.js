//user Redistration
if(window.location.pathname=="/register.html"){
    const registration_form = document.querySelector('.register')
    const txtfullname = document.querySelector('#full-name')
    const txtusername = document.querySelector('#username')
    const txtemail = document.querySelector('#email')
    const txtpassword = document.querySelector('#password') 
    const txtpassword2 = document.querySelector('#password2') 
    const reg_notification= document.querySelector('#notification') 

    let profpic = "https://res.cloudinary.com/du1zkniut/image/upload/v1692710866/samples/people/boy-snow-hoodie.jpg"

    registration_form.addEventListener('submit', (e)=>{
        e.preventDefault();


    if(txtfullname.value == '' 
    || txtusername.value=='' 
    || txtemail.value == '' 
    || txtpassword.value == '' 
    || txtpassword2.value == ''  ){
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

        let user = 
        txtfullname.value !== '' &&
        profpic !=='' &&
        txtusername.value !=='' &&
        txtemail.value !== '' && 
        txtpassword.value !== ''
        
        

        console.log(user)
        if(user){
            const promise = new Promise ((resolve , reject)=>{
                fetch('http://localhost:4200/user',{
                    headers:{
                        'Accept':'application/json',
                        'Content-type':'application/json'
                    },
                    method:'POST',
                    body:JSON.stringify({
                        "fullname":txtfullname.value,
                        "profpic": profpic,
                        "username":txtusername.value,
                        "email":txtemail.value,
                        "password":txtpassword.value
                    })
                }).then(res=>(res.json())).then(data=>{
                    // console.log(data);
                    
                    reg_notification.innerHTML = data[0]?.message ?? data?.message
                    resolve(data)
                    // window.location.href = '/login.html'; 
                    setTimeout(()=>{
                        reg_notification.innerHTML=''
                    },3000)
                }).catch(error =>{
                    console.log(error);
                    reject(error)
                })
            })
        }

    })

}



// USER LOGIN
if(window.location.pathname =='/login.html'){
    const login_form=document.getElementById("login-form");
    const txtusername = document.getElementById("username");
    const txtpassword = document.getElementById("password");
    const reg_notification= document.querySelector('#notification'); 

    let token =''
    let userID = ''
    

    login_form.addEventListener('submit', async (e)=>{
        e.preventDefault();
        let user = 
        txtusername.value !== '' &&
        txtpassword.value !==''

        console.log(user)
        
        if(user){
            
               await fetch('http://localhost:4200/user/login',{
                    headers:{
                        'Accept':'application/json',
                        'Content-type':'application/json'
                    },
                    method:'POST',
                    body:JSON.stringify({
                        "username":txtusername.value,
                        "password":txtpassword.value
                    })
                }).then(res=>(res.json())).then(data=>{
                    reg_notification.innerHTML=data?.message
                    token=data?.token

                    localStorage.setItem('token', token)
                    localStorage.setItem('userID', userID)
                    setTimeout(()=>{
                        reg_notification.innerHTML=''
                    },3000)

                   /* window.location.href = '/index.html'; */


                })
            

            if(localStorage.getItem('token')){
                // console.log("inside fetch");
              await fetch('http://localhost:4200/user/check', {
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        "token": localStorage.getItem('token')
                    },
                    method: "GET"
                }).then(res => (res.json())).then(data=>{
                    console.log(data?.message);

                   userID = data?.info?.userID
                   localStorage.setItem('userID', userID)

                    console.log(userID);

                    let i = localStorage.getItem('userID')
                    
                    // await()
                    if(userID && token ){
                       window.location.href = '/index.html';  
                    }                  
                   
                })
            }
        }
    })
}

