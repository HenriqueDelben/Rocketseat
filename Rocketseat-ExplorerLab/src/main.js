import "./css/index.css"
import IMask from "imask"

// Document é a representação em objeto da DOM do documento HTML
// document.querySelector é um método do objeto document que permite selecionar um valor de uma tag/atributo
const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const logo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#C69347", "#DF6F29"],
    default: ["black", "gray"],
  }

  // setAttribute() é um método do objeto ccBgColor01 que permite modificar o valor de uma atributo
  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])

  // `/cc-${type}.svg` é uma interpolação que injeta a variável type dentro da string /cc-''.svg
  logo.setAttribute("src", `/cc-${type}.svg`)
}
// Definindo a função setCardType como global
globalThis.setCardType = setCardType

// Criando variável que armazenará a input do usuário do CVV
const securityCode = document.querySelector("#security-code")

// Criando máscara do tipo Pattern Mask
const securityCodePattern = {
  mask: "0000"
}

const securityCodeMasked = IMask(securityCode, securityCodePattern)

// Definindo a mascara para a data de expiração do cartao
const expirationDate = document.querySelector("#expiration-date")

const expirationDatePattern = {

  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    }, 
     
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    }
  }
}

const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

// Definindo a máscara para o número do cartão: visa e mastercard
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function(appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g,"")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    return foundMask
  }
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

// Criando um evento para o botão 
const addButton = document.querySelector("#card-button")

addButton.addEventListener("click", () => {
  alert("Cartão adicionado!")
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

// Criando o evento para o nome do dono do cartão que é digitado na caixa de texto
const cardHolder = document.querySelector("#card-holder")

cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-info .cc-holder .value")

  ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

// Criando evento para o CVV do cartão
securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")

  ccSecurity.innerText = code.length === 0 ? "123" : code
}

// Criando evento para a data de expiração do cartão
expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(code) {
  const ccExpirationDate = document.querySelector(".cc-expiration .value")

  ccExpirationDate.innerText = code.length === 0 ? "02/32" : code
}

// Criando evento para o número do cartão
cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  updateCardNumber(cardNumberMasked.value)
  setCardType(cardType)
})

function updateCardNumber(code) {
  const ccNumber = document.querySelector(".cc-number")

  ccNumber.innerHTML = code.length === 0 ? "1234 5678 9012 3456" : code
}


