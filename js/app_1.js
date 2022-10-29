const cartWrapper = document.querySelector('.cart-wrapper');

window.addEventListener('click', function(event){
    if(event.target.hasAttribute('data-cart')){
        const card = event.target.closest('.block--item');

        const productInfo = {
            id: card.id,
            title: card.querySelector('.text-title').innerText,
            storage: card.querySelector('.text--storage').innerText,
            price_weight: card.querySelector('.text--price').innerText,
            counter: card.querySelector('[data-counter]').innerText,
        };

        const itemInCart = cartWrapper.querySelector(`[id="${productInfo.id}"]`);
        console.log(itemInCart);
        console.log(productInfo);

        if(itemInCart){
            const counerElement =  itemInCart.querySelector('[data-counter]');
            counerElement.innerText = parseInt(counerElement.innerText) + parseInt(productInfo.counter);
        }
        else{
            const cartItemHTML = ` <div class ="caca" id="${productInfo.id}">
            <h2 class="cl">${productInfo.title}</h2>
            <h3>Склад:</h3>
            <p class="nw">${productInfo.storage}</p>
            <p class="lc">${productInfo.price_weight}</p>
            <div class="items counetr-wrapper">
            <div class="items_control" data-action="minus">-</div>
            <div class="items_current" data-counter>${productInfo.counter}</div>
            <div class="items_control" data-action="plus">+</div>
        </div>
        </div>`;
    
        cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);

        }

        card.querySelector('[data-counter]').innerText = '1';
        
        toggleCartStatus();
    };

    let counter;

    if(event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus'){

        const counterWrapper = event.target.closest('.counetr-wrapper');
         counter = counterWrapper.querySelector('[data-counter]');
    }

    if(event.target.dataset.action === 'plus'){
        counter.innerText = ++counter.innerText;
    }

    if(event.target.dataset.action === 'minus'){

        if(parseInt(counter.innerText) > 1){
            counter.innerText = --counter.innerText;
        }
        else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerText) === 1){
            console.log('in');
            event.target.closest('.caca').remove();
            toggleCartStatus();
        }
    }
})