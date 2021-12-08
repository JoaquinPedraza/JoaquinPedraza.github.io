window.addEventListener('DOMContentLoaded', () => {
  const order = localStorage.getItem('order');
  if (order) {
    const catalogueorder = JSON.parse(order);
    const orderselected = document.querySelector('.order-selected');
    orderselected.querySelector('.title').innerText = catalogueorder.title;
    orderselected.querySelector('.price').innerText = catalogueorder.price;
    const img = orderselected.querySelector('img');
    img.setAttribute('src', `${catalogueorder.id}`);
    document.querySelector('#item').value = catalogueorder.title;
  }
});

const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expression = {
  direction: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/, // Letras, numeros y espacios.
  names: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  phone: /^\d{14}$/, // 7 a 14 numeros.
  departament: /^\d{1,10}$/,
};

const validateForm = (input) => {
  switch (input.id) {

    case 'firstname':
      validateInput(expression.names, input, 'firstname' );
      break;

    case 'lastname':
      validateInput(expression.names, input, 'lastname' );
      break;

    case 'direction':
      validateInput(expression.direction, input, 'direction' );
      break;

    case 'province':
      validateInput(expression.names, input, 'province' );
      break;

    case 'country':
      validateInput(expression.names, input, 'country' );
      break;

    case 'departament':
      validateInput(expression.departament, input, 'departament' );
      break;

    case 'email':
      validateInput(expression.email, input, 'email' );
      break;

    case 'phone':
      validateInput(expression.phone, input, 'phone' );
      break;

    case 'item':
      document.getElementById('item_input').classList.add('form-group-success');
      document.querySelector('#item_input i').classList.remove('fa-times-circle');
      document.querySelector('#item_input i').classList.add('fa-check-circle');
      break;
  }
};

const validateInput = (expression, input, groupname ) => {

  if(expression.test(input.value)) {
    document.getElementById(`${groupname}_input`).classList.remove('form-group-error');
    document.getElementById(`${groupname}_input`).classList.add('form-group-success');
    document.querySelector(`#${groupname}_input i`).classList.remove('fa-times-circle');
    document.querySelector(`#${groupname}_input i`).classList.add('fa-check-circle');
    document.querySelector(`#${groupname}_input .form-input-error`).classList.remove('form-input-error-activo');
  } else {
    document.getElementById(`${groupname}_input`).classList.remove('form-group-success');
    document.getElementById(`${groupname}_input`).classList.add('form-group-error');
    document.querySelector(`#${groupname}_input i`).classList.remove('fa-check-circle');
    document.querySelector(`#${groupname}_input i`).classList.add('fa-times-circle');
    document.querySelector(`#${groupname}_input .form-input-error`).classList.add('form-input-error-activo');
  }
}



form.addEventListener('submit', (event) => {
  event.preventDefault();
  let successcount = 0;

  inputs.forEach((input) => {
    if(input.value != "" || input.id == 'item'){
      validateForm(input);
    }
    if(input.parentElement.parentElement.classList.contains('form-group-success')){
      successcount++;
    }
  }); 
  if(successcount == 9 || (successcount == 8 && !document.querySelector('#departament_input').classList.contains('form-group-success') && !document.querySelector('#departament_input').classList.contains('form-group-error'))){
    form.submit();
  }
});
