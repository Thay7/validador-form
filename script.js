let B7validator = {
  handleSubmit: (event) => {
    event.preventDefault(); //para o evento

    let send = true;

    let inputs = form.querySelectorAll("input");

    B7validator.clearErrors()//limpando erros que estão sendo exibidos na tela, caso já tenha

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];

      let check = B7validator.checkInput(input);

      if (check !== true) {
        //se a funçao não retornar true, nao envia o formulario
        send = false;

        B7validator.showError(input, check);
      }
    }

    if (send) {
      if (send) {
        form.submit();
      }
    }
  },
  checkInput: (input) => {
    let rules = input.getAttribute("data-rules"); //verica em cada input se tem o atributo "data-rules"
    if (rules !== null) {
      //se tiver, entra aqui
      rules = rules.split("|"); //cria um array de regras com o separador que você passar

      for (let k in rules) {
        //verifica cada uma das regras
        let rDetails = rules[k].split("="); //passando outro separador pois podem ter regras do tipo "min=2"

        switch (rDetails[0]) {
          case "required":
            if (input.value == "") {
              return "Este campo é obrigatório.";
            }
            break;
            case 'min':
              if(input.value.length < rDetails[1]) {
                return `Campo tem que ter pelo menos ${rDetails[1]} caracteres!`
              }
            break;
            case 'email':
              if(input.value != '') {

               }
            break;
        }
      }
    }

    return true;
  },
  showError: (input, error) => {
    input.style.borderColor = "#FF0000";

    let errorElement = document.createElement("div");
    errorElement.classList.add("error");
    errorElement.innerHTML = error;

    input.parentElement.insertBefore(errorElement, input.ElementSibling); //parentElement acessa um elemento acima; ElementSibling acessa um elemento após (caso não tenha, so adiciona após o elemento em si)
  },
  clearErrors: () => {
    //limpando a borda vermelha
    let inputs = form.querySelectorAll('input')
    for(let i = 0; i < inputs.length; i++) {
      inputs[i].style = ''
    }
    
    //limpando o erro da tela
    let errorElements = document.querySelectorAll('.error')
    for(let i = 0; i < errorElements.length; i++) {
      errorElements[i].remove()
    }
  }
};

let form = document.querySelector(".b7validator");
form.addEventListener("submit", B7validator.handleSubmit);
