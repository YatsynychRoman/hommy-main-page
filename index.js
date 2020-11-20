//TODO NAV HIGHLIGHT
const navButtons = Array.from(document.getElementsByClassName('nav-button'));

navButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const current = Array.from(document.getElementsByClassName('active'));

            current[0].className = current[0].className.replace(' active', '');
            btn.className += ' active';
        });
    }
)
//END

//TODO AUTH POPUP
let [overlay] = document.getElementsByClassName('overlay');
let [mainPopUp] = document.getElementsByClassName('auth-popup');
let signIn = document.getElementById('sign-in');
let register = document.getElementById('register');
let [formSignIn] = document.getElementsByClassName('sign-in-form');
let [formRegister] = document.getElementsByClassName('register-form');
let loginButton = document.getElementById('login');
let mobileLoginButton = document.getElementById('mobile-login');

loginButton.addEventListener('click', () => {
    overlay.className += ' visible';
    mainPopUp.className += ' visible';
    signIn.className += ' active';
});

mobileLoginButton.addEventListener('click', () => {
    overlay.className += ' visible';
    mainPopUp.className += ' visible';
    signIn.className += ' active';
});

overlay.addEventListener('click', () => {
    overlay.className = overlay.className.replace(' visible', '');
    mainPopUp.className = mainPopUp.className.replace(' visible', '');
});

signIn.addEventListener('click', () => {
    signIn.className += signIn.className.includes('active') ? '' : 'active';
    register.className = register.className.replace('active', '');
    formSignIn.className = formSignIn.className.replace(' move-left', '');
    formRegister.className = formRegister.className.replace(' move-left', '');
});

register.addEventListener('click', () => {
    signIn.className = signIn.className.replace('active', '');
    register.className += register.className.includes('active') ? '' : 'active';
    formSignIn.className += formSignIn.className.includes(' move-left') ? '' : ' move-left';
    formRegister.className += formRegister.className.includes(' move-left') ? '' : ' move-left';
});
//END


//BURGER MENU
let [header] = document.getElementsByTagName('header');
let [mobileNav] = document.getElementsByClassName("mobile-nav-buttons");
let mobileNavMain = document.getElementById('mobile-nav');

const showBurger = () => {
    if (mobileNav.className.includes(' mobile-active')) {
        header.className = header.className.replace(' mobile-active', '');
        mobileNav.className = mobileNav.className.replace(' mobile-active', '');
        mobileNavMain.className = mobileNav.className.replace(' mobile-active', '');
    } else {
        header.className += ' mobile-active';
        mobileNav.className += ' mobile-active';
        mobileNavMain.className += ' mobile-active';
    }
};

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        mobileNav.className = mobileNav.className.replace(' mobile-active', '');
        header.className = header.className.replace(' mobile-active', '');
        mobileNavMain.className = mobileNav.className.replace(' mobile-active', '');
    }
});
//END

//HOUSE CARDS

const houses = [
    {
        name: 'Townhouse "Fleeky"',
        price: '27 350'
    },
    {
        name: 'Townhouse "Luxury"',
        price: '55 600'
    },
    {
        name: 'Townhouse "Life"',
        price: '20 756'
    },
    {
        name: 'Townhouse "Kvitka"',
        price: '67 555'
    },
    {
        name: 'Townhouse "Smetana"',
        price: '32 000'
    },
    {
        name: 'Townhouse "Relax"',
        price: '58 500'
    },
    {
        name: 'Townhouse "Bereg"',
        price: '48 600'
    },
    {
        name: 'Townhouse "Rubik"',
        price: '36 000'
    }
];

window.onload = () => {
    const [houseContainer] = document.getElementsByClassName('house-container');

    houses.forEach(({name, price}, index) => {
        const houseCard = document.createElement('div');
        const outerP = document.createElement('p');
        const cardInside = document.createElement('div');
        const insiderP = document.createElement('p');
        const likeButton = document.createElement('button');
        const buttonImage = document.createElement('img');

        houseCard.className = 'house-card';
        houseCard.style.backgroundImage = `linear-gradient(0, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('images/house${index + 1}.jpg')`;
        outerP.innerText = name;
        cardInside.className = 'card-inside';
        insiderP.innerHTML = `From ${price}$`;
        buttonImage.src = 'images/heart.gif';
        buttonImage.width = 30;
        buttonImage.onclick = () => {
            buttonImage.src = (buttonImage.src.includes('heart.gif')) ? 'images/heartFilled.gif' : 'images/heart.gif';
        }

        likeButton.append(buttonImage);
        cardInside.append(insiderP);
        cardInside.append(likeButton);
        houseCard.append(outerP);
        houseCard.append(cardInside);
        houseContainer.append(houseCard);
    });
}

//END

//FORM CHECK

const pass = document.getElementById('pass');
const phoneNumber = document.getElementById('phone-number');
const email = document.getElementById('email');
const passConfirm = document.getElementById('pass-confirm');

email.addEventListener('input', emailCheck);
phoneNumber.addEventListener('input', phoneCheck);
pass.addEventListener('input', passCheck);
passConfirm.addEventListener('input', passCompare);

function emailCheck(e) {
    const emailValue = e.target.value;
    const regExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const message = document.getElementById('email-message');

    if (!regExp.test(emailValue)) {
        message.innerText = 'Please enter valid E-mail';
        message.style.color = 'red';
    } else {
        message.innerText = 'Correct E-mail';
        message.style.color = 'limeGreen';
    }


}

function phoneCheck(e) {
    let phoneNumberValue = e.target.value;
    const message = document.getElementById('phone-number-message');

    if (typeof Number(phoneNumberValue) !== "number" || phoneNumberValue[0] !== '+' || phoneNumberValue.length !== 13) {
        message.innerText = 'Enter correct phone number';
        message.style.color = 'red';
    } else {
        message.innerText = 'Correct phone number';
        message.style.color = 'limegreen';
    }
}

function passCheck() {
    const passValue = pass.value;
    const message = document.getElementById('pass-message');
    let valid = false;
    const specialChars = ['!', '@', '$', '%', '#', '^', '&', '?', '*', ')', '(', '-', '+', '/', "'", ';', '`', '"', '.', '{', '}', '|', '~', '=', '+', '-', '<', '>']

    if (passValue.length < 8) {
        message.innerText = 'Minimum 8 characters';
        message.style.color = 'red';
        return null;
    }

    for (let char of specialChars) {
        if (passValue.includes(char)) {
            valid = true;
            break;
        }
    }

    if (passValue === passValue.toLowerCase()) {
        message.innerText = 'Pass must contain at least one upper case letter';
        message.style.color = 'red';
        return null;
    }

    if (passValue === passValue.toUpperCase()) {
        message.innerText = 'Pass must contain at least one lower case letter';
        message.style.color = 'red';
        return null;
    }

    if (valid) {
        message.innerText = 'Great password';
        message.style.color = 'LimeGreen';
    } else {
        message.innerText = 'Pass must contain special character';
        message.style.color = 'red';
    }
}

function passCompare(e) {
    const passValue = pass.value;
    const passConfirmValue = e.target.value;
    const message = document.getElementById('pass-confirm-message');

     if(passConfirmValue && passConfirmValue !== passValue) {
        message.innerText = 'Password mismatch';
        message.style.color = 'red'
        return null;
    }

    message.innerText = 'Password match';
    message.style.color = 'LimeGreen';
}

//END


//TODO THEME CHANGE

const changeButton = document.getElementById('change-button');

changeButton.addEventListener('click', () => {
    const searchDiv = document.getElementById('search-div');
    const navButtonsDiv = document.getElementById('nav-buttons-div')
    const [body] = document.getElementsByTagName('body');
    const [header] = document.getElementsByTagName('header');
    const [footer] = document.getElementsByTagName('footer');
    const intro = Array.from(document.getElementsByClassName('intro'));
    const search = document.getElementById('search');
    const switchImage = document.getElementById('switch-img');

    if(switchImage.src.includes('day.png')) {
        switchImage.src = './images/night.png ';
        changeButton.remove();
        searchDiv.append(changeButton);
    } else {
        switchImage.src = './images/day.png ';
        changeButton.remove();
        navButtonsDiv.insertBefore(changeButton, navButtons[0]);
    }

    body.className = body.className.includes('dark') ? body.className.replace('dark', '') : 'dark';
    header.className = header.className.includes('dark') ? header.className.replace('dark', '') : 'dark';
    footer.className = footer.className.includes('dark') ? footer.className.replace('dark', '') : 'dark';
    search.className = search.className.includes('dark') ? search.className.replace('dark', '') : 'dark';

    navButtons.map(btn => {
        btn.className = btn.className.includes('dark') ? btn.className.replace(' dark', '') : 'nav-button dark';
    });
    navButtons[1].className += navButtons[1].className.includes(' active') ? '' : ' active'
    intro.map(intro => {
        intro.className = intro.className.includes('dark') ? intro.className.replace(' dark', '') : 'intro dark';
    });
});
