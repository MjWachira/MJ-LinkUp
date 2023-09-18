const dataDisplayDiv = document.getElementById("top");

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
            <div class="bgimg"></div>
            <div class="pbox">
                <img class="pimg" src="${data.info.profpic}" alt="">
                <h3>${data.info.fullname}</h3>
                <p class="username">@${data.info.username}</p>
                <div>
                    <p>Email:${data.info.email}</p>
                    <p>Friends:4</p>
                    <p>Posts:3</p>
                </div>

                <div>
                    <button style=" width: 90px;
                    border: none;
                    border-radius: 10px;
                    padding: 5px;
                    background-color: rgb(207, 208, 252);">
                        <a style="color: black; 
                        text-decoration: none;
                        font-weight: bold;"
                         href="/profileedit.html">Edit Profile
                        </a></button>
                </div>

    `
  dataDisplayDiv.innerHTML = usersHTML;
    console.log(data);
})
.catch(error => {
    console.error(error);
});


///GETTING ALL POSTS
let id = localStorage.getItem('userID')

if(id == null){
    // window.location.href = '/index.html'; 
}

function fetchAndDisplayPosts() {
    const PostsURL = `http://localhost:4200/post/user/${id}`;

    fetch(PostsURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // const dataDisplayDiv = document.getElementById("top");
            const displayData = document.querySelector('.allposts');
            console.log(data);
            

            if (data && data.posts && Array.isArray(data.posts)) {
                const postsHTML = data.posts.map(post => `

                    <div class="postbox" data-post-id="${post.postID}">
                        <div class="postprofile">
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <img class="postpimg" src="${post.profPic}" alt="">
                                <p class="username">@${post.username}</p>
                            
                            </div>
                            <p>${
                                date =  (((new Date()-new Date(post.dateCreated))/36000000 )+0.3).toFixed(2)
                            }hrs ago</p>
                            <img src="/icons/dots.svg" style="height: 20px;" alt="">
                        </div>
                        <div class="postcontent">
                            <p>${post.postDescription}</p>
                            <img class="postimg" src="${post.postImage}" alt="no img">
                        </div>
                        <div class="pbtn">
                            <button><img src="/icons/uiw_like-o.svg" alt="">5</button>
                            <button><img src="/icons/Vector.svg" alt="">4 </button>
                            <button><img src="/icons/uil_share.svg" alt="">1</button>
                            <button class="edit-button" data-post-id="${post.postID}">Edit</button>
                            <button class="delete-button" data-post-id="${post.postID}">Delete</button>
                        </div>

                        
                              <div class="dispcomments" id="dispcomments">
                
                                            
                
            </div>
                        <div class="comments" >
                            <form action="" class="comment-form" data-post-id="${post.postID}">
                                <input type="text" id= "comment" placeholder = 'input a comment'>
                                <button><img src="/icons/material-symbols_send-outline.svg" alt=""></button>
                            </form>
                        </div>
                    </div>
                
                    `).join("");
                displayData.innerHTML = postsHTML;
               
                

                // Add event listeners for edit and delete buttons
                const editButtons = document.querySelectorAll('.edit-button');
                const deleteButtons = document.querySelectorAll('.delete-button');
                // const postbox = document.querySelectorAll('.postbox')
                const comment = document.querySelectorAll('.comment-form')
                const comDisplayDiv = document.getElementById("dispcomments");
                editButtons.forEach(button => {
                    button.addEventListener('click', (event) => {
                        const postId = event.target.getAttribute('data-post-id');
                        // Implement the edit logic for postId here
                        // You can open a modal or redirect to an edit page

                        localStorage.setItem('postId', postId)
                        console.log(`Edit post with ID ${postId}`);

                        if (postID){
                            window.location.href = '/postedit.html'; 
                        }
                        // window.location.href = '/postedit.html';
                        
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
                                    window.location.href = '/index.html'; 
                                })
                                .catch(error => {
                                    console.error(`Error deleting post with ID ${postId}:`, error);
                                });
                        }




                    });
                });

                ////COMMENT
// const comDisplayDiv = document.getElementById("dispcomments");

let postID = localStorage.getItem('postID')
const apiUrl = `http://localhost:4200/comment/${postID}`;

fetch(apiUrl)
.then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    return response.json(); 
    })
.then(data => {
    const usersHTML = data.comments.map(user => `
    <div class="comment1">
            <img class="comimg" src="${user.profpic}" alt="">
        <div class="pcom">   
            <p class="username">@${user.username}</p> 
            <p> ${ date =  (((new Date()-new Date(user.dateCreated))/36000000)+0.3).toFixed(2)} hrs ago</p>
        </div>
        <div class="ccontent">
            <p>${user.commentDescription}</p>
        </div>
        <button class="edit-button" data-post-id=""></button>
        <button class="delete-button" data-post-id=""></button>
    </div>
  `).join("");
  // Render the user displays in the div
  comDisplayDiv.innerHTML = usersHTML;


    console.log(data);
})
.catch(error => {
    console.error('Fetch error:', error);
    displayData.innerHTML= `
    <div class ='postbox'>
    <h3> No posts yet </h3>
    </div>`
});


                // postbox.forEach(post => {
                //     post.addEventListener('click', (event) => {
                //         let postId = event.target.getAttribute('data-post-id');
                //         // Implement the edit logic for postId here
                //         // You can open a modal or redirect to an edit page
                        

                //         localStorage.setItem('postID', postId)   
                //         console.log(`Edit post with ID ${postId}`);
                        
                
                        
                //     });


                // });
                comment.forEach(comment => {
                    comment.addEventListener('click', (e) => {
                    
                        // e.preventDefault()
                        // let postId = event.target.getAttribute('data-post-id');
                        // Implement the edit logic for postId here
                        // You can open a modal or redirect to an edit page
                        

                        let postId = localStorage.getItem('postID')   
                        console.log(` comment  with ID ${postId}`);

                                                              
                        const txtcomment = document.getElementById('comment')
                            
                        let userid = localStorage.getItem('userID') 
                        let postid = localStorage.getItem('postID')  
                 
                            
                                let comment = 
                                    txtcomment.value !== '' &&
                                    userid !=='' &&
                                    postid !=='' 
                                    
                                     
                                    console.log(comment)
                                    if(comment){
                                        const promise = new Promise ((resolve , reject)=>{
                                            fetch(`http://localhost:4200/comment`,{
                                                headers:{
                                                    'Accept':'application/json',
                                                    'Content-type':'application/json',
                                                    "token": localStorage.getItem('token')
                                                },
                                                method:'POST',
                                                body:JSON.stringify({
                                                    "commentDescription":txtcomment.value,
                                                    "userID":userid,
                                                    "postID":postid,
                                                    
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
                            
                            
                                
                            }
                            
                            
                
                        
                    );


                });
                // postbox.forEach(post => {
                //     post.addEventListener('click', (event) => {
                //         let postId = event.target.getAttribute('data-post-id');
                //         // Implement the edit logic for postId here
                //         // You can open a modal or redirect to an edit page
                        

                //         localStorage.setItem('postID', postId)   
                //         console.log(`Edit post with ID ${postId}`);
                        
                
                        
                //     });


                // });
                
            } else {
                console.error('Invalid data format:', data);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}
fetchAndDisplayPosts()