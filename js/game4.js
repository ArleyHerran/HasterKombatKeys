const APP_TOKEN = "d28721be-fd2d-4b45-869e-9f253b554e50";////
const PROMO_ID = "43e35910-c168-4634-ad4f-52fd764a843f";
const EVENTS_DELAY = 20000;
document.getElementById("startBtn").addEventListener("click", async () => {
  iniciarCronometro();
  const startBtn = document.getElementById("startBtn");
  const progressContainer = document.getElementById("progressContainer");

  //const progressText = document.getElementById("progressText");
  const keyContainer = document.getElementById("keyContainer");
  const generatedKeys = document.getElementById("generatedKeys");
  const keyCount = parseInt(document.getElementById("keyCountSelect").value);

  progressContainer.classList.remove("hidden");
  keyContainer.classList.add("hidden");
  generatedKeys.innerText = "";
  startBtn.disabled = true;

 
  const generateKeyProcess = async () => {
    const clientId = generateClientId();
    let clientToken;
    try {
      clientToken = await login(clientId);
    } catch (error) {
      alert(`Login failed:${error.message}`);
      startBtn.disabled = false;
      return;
    }
   
    
    for (let i = 0; i < 7; i++) {
      await sleep(EVENTS_DELAY * delayRandom());
   
      const hasCode = await emulateProgress(clientToken);
    
      if (hasCode) {
        break;
      }
    }
    try {
      const key = await generateKey(clientToken);
     
      return key;
    } catch (error) {
      alert(`Key generation failed:${error.message}`);
      return null;
    }
  };
  const keys = await Promise.all(
    Array.from({ length: keyCount }, generateKeyProcess)
  );

  const keyreal=keys.filter((key) => key);

  generatedKeys.innerHTML="";
  // Recorrer el array de llaves y crear HTML para cada una
  for (const key of keyreal) {
    generatedKeys.innerHTML += `
        <div class="itemkey"><span>${key}</span> <button class="btnCopi" onclick="copyToClipboard('${key}')">Copiar</button></div>
    `;
   
}
 
detenerCronometro();
  keyContainer.classList.remove("hidden");
 
  progressContainer.classList.add("hidden");
  startBtn.disabled = false;
});

//GENERAR ID
function generateClientId() {
  const timestamp = Date.now();
  const randomNumbers = Array.from({ length: 19 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  return `${timestamp}-${randomNumbers}`;
}

///LOGUEAR USUARIO EL LA API
async function login(clientId) {
  const response = await fetch("https://api.gamepromo.io/promo/login-client", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      appToken: APP_TOKEN,
      clientId,
      clientOrigin: "deviceid",
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to login");
  }
  return data.clientToken;
}

///simula el progreso de algo
async function emulateProgress(clientToken) {
  const response = await fetch(
    "https://api.gamepromo.io/promo/register-event",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clientToken}`,
      },
      body: JSON.stringify({
        promoId: PROMO_ID,
        eventId: crypto.randomUUID(),
        eventOrigin: "undefined",
      }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to register event");
  }
  
  return data.hasCode;
}


///Generar llaves
async function generateKey(clientToken) {
  const response = await fetch("https://api.gamepromo.io/promo/create-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${clientToken}`,
    },
    body: JSON.stringify({ promoId: PROMO_ID }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to generate key");
  }
  return data.promoCode;
}
/////
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

///////
function delayRandom() {
  return Math.random() / 3 + 1;
}
