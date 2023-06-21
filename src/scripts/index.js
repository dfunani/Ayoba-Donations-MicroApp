// GLOBAL LIST OF CHARITIES
let CHARITIES = [];
// Strapi base URL
const STRAPI = "https://devstrapi.thedigitalacademy.co.za";
// Static Currency Icons
const CURRENCIES = [
  {
    country: "South African",
    icon: "src/assets/Icon-Flag-America.png",
    currency: {
      name: "Rands",
      code: "ZAR",
    },
  },
];

// Page Entry Point
window.onload = async (event) => {
  const scroller = document.querySelector(".scrolling-wrapper");
  CHARITIES = await fetch(STRAPI + "/api/ayoba-donations-app-charities")
    .then((res) => res.json())
    .then((result) => result.data)
    .catch(() => []);
  CHARITIES.forEach((element) => {
    scroller.innerHTML += createCharity(element.attributes);
  });
};

// Called When Search bar is used
const searchNPO = (event) => {
  const scroller = document.querySelector(".scrolling-wrapper");
  scroller.innerHTML = "";
  const reg = new RegExp(event.target.value, "i");
  CHARITIES.filter((term) => reg.test(term.attributes.title)).forEach(
    (element) => {
      scroller.innerHTML += createCharity(element.attributes);
    }
  );
};

// Creates a Card Component on the layout for Each charity in the Collection
const createCharity = (obj) => {
  return `<div class="col-5">
  ${createCharityCard(obj)}
  ${createCharityModal(obj)}
  </div>`;
};

// Card Component to be rendered in the above column col-5
const createCharityCard = (obj) => {
  return `<div
  class="card card-block border-0"
  type="button"
  data-bs-toggle="offcanvas"
  data-bs-target="#offcanvasBottom_${obj.title.split(" ").join("")}"
  aria-controls="offcanvasBottom"
>
  <img
    src="${obj.background}"
    class="card-img-top"
    alt="..."
  />
  <div
    class="card-img-overlay d-flex flex-column justify-content-start align-items-center"
  >
    <div class="align-self-end">
      <img src="src/assets/three-dots.svg" alt="" />
    </div>
  </div>
  <div class="card-body">
    <div>
      <h5 class="card-title text-center">${obj.title}</h5>
      <p class="card-text text-center">
      ${obj.summary}
      </p>
    </div>
    <div class="logo">
    <img src="${obj.image}" />
    </div>
  </div>
</div>`;
};

// Individual Card View
const createCharityModal = (obj) => {
  return `
  <div
      class="offcanvas offcanvas-bottom"
      tabindex="-1"
      id="offcanvasBottom_${obj.title.split(" ").join("")}"
      aria-labelledby="offcanvasBottomLabel"
    >
    <div class="card mb-3 border-0 d-flex">
    <div class="abs-card d-flex justify-content-center align-items-center">
    <img src="${obj.background}" class="card-img-top offcanvas-img" alt="...">
    <img src="${obj.image}" class="icon" alt="...">
    <button type="button" onclick="back('${
      obj.title.split(" ").join("")
    }')" class="btn-close text-reset closer" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
  <div class="card-body border-0 d-flex flex-column desc">
    <h5 class="card-title h5-title fs-1 mt-3" id="title_${obj.title.split(" ").join("")}">${
    obj.title
  }</h5>
    <p class="card-text fs-5" id="card_${obj.title.split(" ").join("")}">${description(
    obj.title.split(" ").join(""),
    obj.description
  )}</p>
    <p class="card-text">
    <div class="donateBTN fixed-bottom"></div>
    <button type="submit" onclick="offcanvas('${obj.title.split(" ").join("")}')" id="donate_${
    obj.title.split(" ").join("")
  }" class="fs-5 text-light fixed-bottom border-0 donate">Donate</button>
    </p>
    ${createDonationOverlay(obj)}
  </div>
  
</div>
  </div>
  `;
};

const description = (title, description) => {
  const desc = document.getElementById("card_" + title);
  // desc.innerHTML = description.split(".").slice(0, 2).join(".") + `.<br/><a onclick="learnMore('${title}', '${description}')">learn more ></a>`
  return (
    description.split(".").slice(0, 2).join(".") +
    `.<br/><a onclick="learnMore('${title}', '${description
      .split("\n")
      .join(" ")}')">learn more ></a>`
  );
};

const learnMore = (title, description) => {
  const desc = document.getElementById("card_" + title);
  desc.innerHTML =
    `<div class="border bg-light w-25 m-auto" onclick="truncate('${title.split(" ").join("")}', '${description}')"><svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.29 6.70998C11.68 6.31998 11.68 5.68998 11.29 5.29998L6.70002 0.70998C6.31002 0.31998 5.68002 0.31998 5.29002 0.70998L0.700021 5.29998C0.31002 5.68998 0.31002 6.31998 0.700021 6.70998C1.09002 7.09998 1.72002 7.09998 2.11002 6.70998L6.00002 2.82998L9.88002 6.70998C10.27 7.09998 10.91 7.08998 11.29 6.70998Z" fill="#5C5C5C"/>
  </svg>
  </div>` + description;
};
const truncate = (title, desc) => {
  document.getElementById("card_" + title).innerHTML = description(title, desc);
};

// Overlay when Donate is pressed
const createDonationOverlay = (obj) => {
  return `<div class="fixed-bottom" id="fixed_${obj.title.split(" ").join("")}" hidden>
  <div class="donate_overlay">
      <div class="donate-head d-flex mt-3 justify-content-center align-items-center">
          <img onclick="back('${
            obj.title.split(" ").join("")
          }')" src="src/assets/arrow-left.svg" alt="...">
          <div class="fs-2">Donate to ${obj.title}</div>
      </div>
  <div class="input-select input-currency-select">
      <div class="dropdown">
        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="src/assets/Icon-Flag-America.png" class="dropdown_currency dropdown_currency_${obj.title.split(" ").join("")}" alt="...">
        </a>

        <ul class="dropdown-menu dropdown-menu_${obj.title.split(" ").join("")}" aria-labelledby="dropdownMenuLink">
          ${getCurrency(obj.title)}
        </ul>
      </div>
      <div class="input-currency">
          <label for="currency_${obj.title.split(" ").join("")}" class="currency-label">Donation Amount</label>
          <input placeholder="R" type="number" data-currency="ZAR" name="currency" id="currency_${obj.title.split(" ").join("")}" step="0.01">
      </div></div>   
      
      <div class="tag_${obj.title.split(" ").join("")}">Amount is in South African Rands (ZAR)</div>
  
  <div class="input-textarea">
      <label for="textarea_${obj.title.split(" ").join("")}">Message (Optional)</label>
      <textarea name="textarea" id="textarea_${obj.title.split(" ").join("")}" cols="30" rows="10"></textarea>
  </div>
  <div class="input-btn">
  <button type="submit" id="payment_${
    obj.title
  }" class="fs-5 text-light border-0 donate fixed-bottom" onclick="startPaymentOverlay('${obj.title.split(" ").join("")}')">Continue to payments</button>
  </div>    
  </div>
</div>`;
};

/* Helper Functions */
// Set Data Attributes for the input based
// on the dropdown currency selected
const setCurrency = (title, icon, country, name, code) => {
  const currencyDropdown = document.querySelector(".dropdown_currency_" + title);
  const inputTag = document.querySelector(".tag_" + title);
  const inputBox = document.getElementById("currency_" + title);
  currencyDropdown.src = icon;
  inputTag.innerHTML = `Amount is in ${country} ${name} (${code})`;
  inputBox.dataset.currency = code;
};

// Gets the currency from the drop down - If selected
const getCurrency = (title) => {
  return CURRENCIES.map(
    (elem) =>
      `<li onclick="setCurrency('${title}', '${elem.icon}', '${elem.country}', '${elem.currency.name}', '${elem.currency.code}')"><a class="dropdown-item" href="#">${elem.country}</a></li>`
  ).join("");
};

// Deals with the toggling of the overlay view
const offcanvas = (title) => {
  const donate = document.getElementById("donate_" + title);
  const card = document.getElementById("card_" + title);
  const titles = document.getElementById("title_" + title);
  const fixed_title = document.getElementById("fixed_" + title);
  donate.hidden ^= true;
  fixed_title.hidden ^= true;
  card.hidden ^= true;
  titles.hidden ^= true;
  reset(title)
};

// Deals with toggling of the oiverlay view when back button prersssed
const back = (title) => {
  const donate = document.getElementById("donate_" + title);
  const card = document.getElementById("card_" + title);
  const titles = document.getElementById("title_" + title);
  const fixed_title = document.getElementById("fixed_" + title);
  donate.hidden = false;
  fixed_title.hidden = true;
  card.hidden = false;
  titles.hidden = false;
  reset(title)
};

const reset = (title) => {
  document.getElementById("currency_" + title).value = "";
  document.getElementById("textarea_" + title).value = "";
}