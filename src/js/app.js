(function() {
    let tabs = document.querySelectorAll('.nav__link');

    let boxs = document.querySelectorAll('.box');

    let title = document.querySelector('#title');

    let text = document.querySelector('#text');

    let create = document.querySelector('#create-btn');

    let blog = document.querySelector('.posts-box__inner');

    let type = document.querySelector('#type');

    let favoritesBox = document.querySelector('.favorites-box__inner')

    Array.prototype.forEach.call(tabs, link => {
        link.addEventListener('click', evt => {
            evt.preventDefault();
            Array.prototype.forEach.call(boxs, box => {
                if (link.dataset.name === box.dataset.name) {
                    box.classList.add('show-box')
                    box.classList.remove('hide-box')
                } else {
                    box.classList.add('hide-box')
                }
            })
        })
    });

    create.addEventListener('click', () => {
        if ((title.value) && (text.value)) {
            let post = document.createElement('div');
            post.classList.add('posts-box__item');
            let postTitle = document.createElement('h2');
            postTitle.classList.add('posts-box__title');
            postTitle.textContent = title.value;
            let postCategory = document.createElement('span');
            postCategory.classList.add('posts-box__category');
            let postText = document.createElement('p');
            postText.classList.add('posts-box__text');
            postText.textContent = text.value;
            let control = document.createElement('div');
            control.classList.add('posts-box__icon');
            let removeIcon = document.createElement('i');
            removeIcon.classList.add('material-icons');
            removeIcon.textContent = 'clear';
            let favIcon = document.createElement('i');
            favIcon.classList.add('material-icons');
            favIcon.textContent = 'star';
            control.appendChild(favIcon);
            control.appendChild(removeIcon);
            let postTop = document.createElement('div');
            postTop.classList.add('posts-box__top');
            postTop.appendChild(postTitle);
            postTop.appendChild(postCategory);
            let postCenter = document.createElement('div');
            postCenter.classList.add('posts-box__center');
            postCenter.appendChild(postText);
            postCenter.appendChild(control);
            post.appendChild(postTop);
            post.appendChild(postCenter);
            blog.appendChild(post);
            postCategory.textContent = type.options[type.selectedIndex].text;
            removeIcon.addEventListener('click', () => {
                blog.removeChild(post)
            });
            let postToFav = evt => {
                favIcon.classList.add('active');
                let clonePost = post.cloneNode(false);
                favoritesBox.appendChild(clonePost);
                let cloneTop = postTop.cloneNode(true);
                clonePost.appendChild(cloneTop);
                let cloneCenter = postCenter.cloneNode(false);
                clonePost.appendChild(cloneCenter);
                let cloneText = postText.cloneNode(true);
                cloneCenter.appendChild(cloneText);
                let removeFav = document.createElement('i');
                removeFav.classList.add('material-icons');
                removeFav.textContent = 'clear';
                cloneCenter.appendChild(removeFav);
                removeFav.addEventListener('click', evt => {
                    favIcon.classList.remove('active');
                    favoritesBox.removeChild(clonePost);
                    if (evt.target) {
                        favIcon.addEventListener('click', postToFav, { once: true });
                        removeFav.addEventListener('click', () => {
                            favoritesBox.removeChild(clonePost)
                        })
                    }
                });
            };
            favIcon.addEventListener('click', postToFav, { once: true });
            title.value = '';
            text.value = ''
        }
    })
})()