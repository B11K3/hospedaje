const roomPrices = {
    normal: 150,
    premium: 250
  };
  
  const taxRate = 0.16;
  const reservationForm = document.getElementById('reservation-form');
  const roomTypeSelect = document.getElementById('room-type');
  const nightsInput = document.getElementById('nights');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const guestsInput = document.getElementById('guests');
  const childInputs = document.getElementById('child-inputs');
  const childNumberInput = document.getElementById('children');
  const adultRadio = document.getElementById('adult');
  const childRadio = document.getElementById('child');
  const submitButton = document.getElementById('submit-button');
  
  function showPersonInputs() {
    let adults = parseInt(document.getElementById("guests").value);
    let selectChild = document.getElementById("children");
    selectChild.innerHTML = "";
    let childOption = document.createElement("option");
    childOption.innerHTML = 0;
    selectChild.appendChild(childOption);
    for (let i = 1; i <= getMaxChildNum(adults); i++) {
      let childOption = document.createElement("option");
      childOption.innerHTML = i;
      selectChild.appendChild(childOption);
    }
  }
  
  function getMaxChildNum(adults) {
    let maxChildNum = 4;
    if (adults === 1) {
      maxChildNum = 3;
    } else if (adults === 2) {
      maxChildNum = 2;
    } else if (adults === 3) {
      maxChildNum = 1;
    } else if (adults === 4) {
      maxChildNum = 0;
    }
    return maxChildNum;
  }
  
  roomTypeSelect.addEventListener('change', () => {
    const roomType = roomTypeSelect.value;
    const cuarto = roomPrices[roomType];
  });
  
  guestsInput.addEventListener('change', () => {
    const guests = guestsInput.value;
    if (guests > 1) {
      childInputs.classList.remove('hidden');
      showPersonInputs();
    } else {
      childInputs.classList.add('hidden');
    }
  });
  
  reservationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const roomType = roomTypeSelect.value;
    const cuarto = roomPrices[roomType];
    const noches = nightsInput.value;
    const name = nameInput.value;
    const email = emailInput.value;
    const personas = guestsInput.value;
    const tipo = adultRadio.checked ? 'adulto' : 'child';
    const numNi = childNumberInput.value;
  
    let subtotal = cuarto * noches;
    let iva = subtotal * taxRate;
    let total = subtotal + iva;
  
    if (tipo === 'child') {
      if (personas === '2') {
        subtotal += cuarto * noches;
      } else if (personas === '3') {
        subtotal += cuarto * noches;
        if (numNi > 0) {
          subtotal += cuarto * noches;
        }
      }
    }
  
    const reservationData = {
      cuarto,
      noches,
      name,
      email,
      personas,
      tipo,
      numNi,
      subtotal,
      iva,
      total
    };
  
    const jsonReservationData = JSON.stringify(reservationData);
  
    const ticketWindow = window.open("ticket.html", "_blank", width=800, height=500);
  
    ticketWindow.document.write(`<pre>${jsonReservationData}</pre>`);
  });
  