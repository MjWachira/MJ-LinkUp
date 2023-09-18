if(window.location.pathname=="/profileedit.html"){
const edit_form = document.querySelector('.updateform')
const txtfullname = document.getElementById('fullname')
const txtcoverimg = document.getElementById('coimg')
const txtprofimg = document.getElementById('pimg')
const txtemail = document.getElementById('email')
const txtpassword = document.getElementById('password')

let profimg = ""  
    
    txtprofimg.addEventListener('change',(event)=>{
        const target =event.target 
        const files = target.files

        if(files){
            const formData = new FormData()
            
            formData.append("file",files[0])
            formData.append("upload_preset","mjlinkup")
            formData.append("cloud_name", "du1zkniut")

            fetch('https://api.cloudinary.com/v1_1/du1zkniut/image/upload',{
                method:"POST",
                body: formData
            }).then((res)=>res.json()).then(res=>profimg =res.url)
        }
})

let coverimg = ""  
    
    txtcoverimg.addEventListener('change',(event)=>{
        const target =event.target 
        const files = target.files

        if(files){
            const formData = new FormData()
            
            formData.append("file",files[0])
            formData.append("upload_preset","mjlinkup")
            formData.append("cloud_name", "du1zkniut")

            fetch('https://api.cloudinary.com/v1_1/du1zkniut/image/upload',{
                method:"POST",
                body: formData
            }).then((res)=>res.json()).then(res=>coverimg =res.url)
        }
})

let userID =localStorage.getItem('userID')

edit_form.addEventListener('submit',(e)=>{
    e.preventDefault();




    let user = 
        txtfullname.value !== '' &&
        coverimg !=='' &&
        profimg !=='' &&
        txtemail.value !== '' && 
        txtpassword.value !== ''
         
        console.log(user)
        if(user){
            const promise = new Promise ((resolve , reject)=>{
                fetch(`http://localhost:4200/user/${userID}`,{
                    headers:{
                        'Accept':'application/json',
                        'Content-type':'application/json',
                        "token": localStorage.getItem('token')
                    },
                    method:'PUT',
                    body:JSON.stringify({
                        "fullname":txtfullname.value,
                        "coverpic":coverimg,
                        "profpic":profimg,
                        "email":txtemail.value,
                        "password":txtpassword.value
                    })
                }).then(res=>(res.json())).then(data=>{
                    console.log(data);
                    
                    // reg_notification.innerHTML = data[0]?.message ?? data?.message
                    resolve(data)
                    // window.location.href = '/login.html'; 
                    setTimeout(()=>{
                        // reg_notification.innerHTML=''
                    },3000)
                }).catch(error =>{
                    console.log(error);
                    reject(error)
                })
            })
        }


    })
}
const dataDisplayDiv = document.getElementById("pbox");

    let userID = localStorage.getItem('userID')

    const oneUser = 'http://localhost:4200/user/check';

    fetch(oneUser,{
    headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json',
        "token": localStorage.getItem('token')
    },
    method: "GET"})
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json(); 
        })
    .then(data => {
        const usersHTML = 
        `
        <div class="pbox" id="pbox">
        <div class="bgimg"></div>
        <img class="pimg" src="${data.info.profpic}" alt="">
        <h3>${data.info.fullname}</h3>
        <p class="username" >@${data.info.username}</p>  
        </div>

        `
      dataDisplayDiv.innerHTML = usersHTML;
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
