if(window.location.pathname=="/register.html"){
    const registration_form = document.querySelector('.register')
    const txtfullname = document.querySelector('#full-name')
    const txtusername = document.querySelector('#username')
    const txtemail = document.querySelector('#email')
    const txtpassword = document.querySelector('#password') 
    const txtpassword2 = document.querySelector('#password2') 
    const reg_notification= document.querySelector('#notification') 



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


//LOGIN
if(window.location.pathname =='/login.html'){
    const login_form=document.getElementById("login-form");
    const txtusername = document.getElementById("username");
    const txtpassword = document.getElementById("password");
    const reg_notification= document.querySelector('#notification'); 

    let token =''

    login_form.addEventListener('submit', (e)=>{
        e.preventDefault();
        let user = 
        txtusername.value !== '' &&
        txtpassword.value !==''

        console.log(user)
        
        if(user){
            const promise = new Promise ((resolve, reject)=>{
                fetch('http://localhost:4200/user/login',{
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

                    setTimeout(()=>{
                        reg_notification.innerHTML=''
                    },3000)

                   /* window.location.href = '/index.html'; */


                })
            })

            if(localStorage.getItem('token')){
                // console.log("inside fetch");
                fetch('http://localhost:4200/user/check', {
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        "token": localStorage.getItem('token')
                    },
                    method: "GET"
                }).then(res => (res.json())).then(data=>{
                    console.log(data?.message);

                    // window.location.href = '/index.html'; 

                    // loginMsgs.innerHTML = data?.message 
                    // token = data?.token

                    
                    // const userRole = data?.info?.role;

                    // console.log(userRole);
                    

                   
                    // if (userRole === 'user') {
                    //     window.location.href = '/userpage.html'; // Redirect for regular users
                    // } else if (userRole === 'admin') {
                    //     window.location.href = '/adminpage.html'; // Redirect for admin users
                    // }

                    // userRole = ''


                       
                    // localStorage.setItem('token', token)

                   
                })
            }
        }
    })
}

if(window.location.pathname =='/index.html'){
    const post_form =  document.getElementById('post-form')
    const txtpostdes = document.getElementById('post-des')
    const txtpostimg1 = document.getElementById('post-img')
    const notification = document.getElementById('notification')

    // const txtpostimg ="https://res.cloudinary.com/du1zkniut/image/upload/v1692710889/cld-sample.jpg"
    let txtpostimg = ""  
    
    txtpostimg1.addEventListener('change',(event)=>{
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
            }).then((res)=>res.json()).then(res=>txtpostimg =res.url)
        }
    })

    post_form.addEventListener('submit',(e)=>{
        e.preventDefault()

        if(txtpostdes.value == ''){
            notification.textContent = 'cant post empty post'
            return
        }

        post = 
        txtpostdes.value !== '' &&
        txtpostimg !=='' 
        const uid= '1040'
        console.log(post)

        if(post){
            const promise = new Promise ((resolve , reject)=>{
                fetch('http://localhost:4200/post',{
                    headers:{
                        'Accept':'application/json',
                        'Content-type':'application/json'
                    },
                    method:'POST',
                    body:JSON.stringify({
                        "postDescription":txtpostdes.value,
                        "postImage":txtpostimg,
                        "userID": uid
                    })
                }).then(res=>(res.json())).then(data=>{
                    console.log(data);
                    
                    notification.innerHTML = data[0]?.message ?? data?.message
                    resolve(data)
                    // window.location.href = '/login.html'; 
                    setTimeout(()=>{
                        notification.innerHTML=''
                    },3000)
                }).catch(error =>{
                    console.log(error);
                    reject(error)
                })
            })
        
        }

    })
    // Fetching all users
    const apiUrl = 'http://localhost:4200/user';


    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json(); 
        })
    .then(data => {
    
        console.log(data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });


///GETTING ALL POSTS

    // const allPosts = 'http://localhost:4200/post';

    // fetch(allPosts)
    // .then(response => {
    //     if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     const displayData = document.querySelector('.allposts');
    //     console.log(data);

    //     if (data && data.posts && Array.isArray(data.posts)) {
    //     const postsHTML = data.posts.map(post => `

    //     <div class="postbox" >
    //     <div class="postprofile">
    //         <div style="display: flex; gap: 10px; align-items: center; heigt">
    //                         <img class="postpimg" src="${post.profpic}" alt="">
    //                         <p class="username">@${post.username}</p>
    //                         </div>
    //                         <p> ${post.dateCreated}</P>
    //                         <img src="/icons/dots.svg" style="height: 20px;" alt="">
    //     </div>
    //     <div class="postcontent">
    //     <p>${post.postDescription}</P>
    //     <img class="postimg" src="${post.postImage}" alt="no img">
    //     </div>
    //     <div class="pbtn">
    //                 <button><img src="/icons/uiw_like-o.svg" alt="">200 likes</button>
    //                 <button><img src="/icons/Vector.svg" alt="">100 comments</button>
    //                 <button><img src="/icons/uil_share.svg" alt="">Share</button>
    //             </div>
    //             <div class="comments">
    //                 <form action="">
    //                     <input type="text">
    //                     <button><img src="/icons/material-symbols_send-outline.svg" alt=""></button>
    //                 </form>
    //             </div>
    //     </div>

    //     `).join("");
    //     displayData.innerHTML = postsHTML;
    //     } else {
    //     console.error('Invalid data format:', data);
    //     }
    // })
    // .catch(error => {
    //     console.error('Fetch error:', error);
    // });


    
    function fetchAndDisplayPosts() {
        const allPostsURL = 'http://localhost:4200/post';
    
        fetch(allPostsURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const displayData = document.querySelector('.allposts');
                console.log(data);
    
                if (data && data.posts && Array.isArray(data.posts)) {
                    const postsHTML = data.posts.map(post => `
                        <div class="postbox">
                            <div class="postprofile">
                                <div style="display: flex; gap: 10px; align-items: center;">
                                    <img class="postpimg" src="${post.profpic}" alt="">
                                    <p class="username">@${post.username}</p>
                                </div>
                                <p>${post.dateCreated}</p>
                                <img src="/icons/dots.svg" style="height: 20px;" alt="">
                            </div>
                            <div class="postcontent">
                                <p>${post.postDescription}</p>
                                <img class="postimg" src="${post.postImage}" alt="no img">
                            </div>
                            <div class="pbtn">
                                <button><img src="/icons/uiw_like-o.svg" alt="">200 likes</button>
                                <button><img src="/icons/Vector.svg" alt="">100 comments</button>
                                <button><img src="/icons/uil_share.svg" alt="">Share</button>
                                <button class="edit-button" data-post-id="${post.postID}">Edit</button>
                                <button class="delete-button" data-post-id="${post.postID}">Delete</button>
                            </div>
                            <div class="comments">
                                <form action="">
                                    <input type="text">
                                    <button><img src="/icons/material-symbols_send-outline.svg" alt=""></button>
                                </form>
                            </div>
                        </div>
                    `).join("");
                    displayData.innerHTML = postsHTML;
    
                    // Add event listeners for edit and delete buttons
                    const editButtons = document.querySelectorAll('.edit-button');
                    const deleteButtons = document.querySelectorAll('.delete-button');
    
                    editButtons.forEach(button => {
                        button.addEventListener('click', (event) => {
                            const postId = event.target.getAttribute('data-post-id');
                            // Implement the edit logic for postId here
                            // You can open a modal or redirect to an edit page
                            console.log(`Edit post with ID ${postId}`);
                            
                        });

                    });
    
                    deleteButtons.forEach(button => {
                        button.addEventListener('click', (event) => {
                            const postId = event.target.getAttribute('data-post-id');                 
                            console.log(`Delete post with ID ${postId}`);
                            const confirmDelete = window.confirm(`Are you sure you want to delete post with ID ${postId}?`);

                            if (confirmDelete) {
                
                                fetch(`http://localhost:4200/post/${postId}`, {
                                    method: 'DELETE',
                                })
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error('Network response was not ok');
                                        }
                                        // Assuming the server returns a success message on successful deletion
                                        return response.json();
                                    })
                                    .then(data => {
                                        // Handle the response from the server
                                        console.log(`Post with ID ${postId} deleted successfully:`, data);
                                        // Optionally, you can also remove the deleted post from the UI
                                        event.target.closest('.postbox').remove();
                                    })
                                    .catch(error => {
                                        console.error(`Error deleting post with ID ${postId}:`, error);
                                    });
                            }




                        });
                    });
                } else {
                    console.error('Invalid data format:', data);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }
    
    // Call the function to fetch and display posts
    fetchAndDisplayPosts();
    
}


if(window.location.pathname =='/friends.html'){
    // Fetching all users
    const dataDisplayDiv = document.getElementById("dataDisplay");
    const apiUrl = 'http://localhost:4200/user';

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json(); 
        })
    .then(data => {
        const usersHTML = data.allUsers.map(user => `
        <div class="friendlist">
                <img class="profpic" src="${user.profpic}" alt="">
                <h3>${user.fullname}</h3>
                <p>@${user.username}</p>        
        
          <div class="btnbox">
                        <button class="pbtn">Profile</button>
                        <button class="unfollow">Unfollow</button>
                    </div>
        </div>
      `).join("");
      // Render the user displays in the div
      dataDisplayDiv.innerHTML = usersHTML;
    
    
        console.log(data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}