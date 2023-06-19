const CHARITIES = [
  {
    title: "Call Care",
    logo: "src/assets/logo.svg",
    background: "src/assets/dummy_npo.png",
    summary:
      "Call 2 Care is a non-profit Organization in Cape Town that improves lives through education",
    description: `Save the Children believes every child deserves a future. We work in over 120 countries to save lives, fight for rights, and provide education, healthcare and child protection services to children, adolescents, and their families, with a particular focus on the most vulnerable and excluded.

We have been working for over 100 years, and we are proud to have helped millions of children survive, learn, and thrive. But there is still so much more to do. Millions of children around the world are still denied their rights, simply because of who they are or where they are from. 

We are committed to working until every child has the chance for a future. We will not give up until every child can:

Grow up healthy and strong
Learn and reach their full potential
Be safe from violence and abuse
Be free from discrimination
Have a say in their own lives`,
    last_updated: "22/02/2022",
  },
];


window.onload = (event) => {
  const scroller = document.querySelector(".scrolling-wrapper");
  CHARITIES.forEach((element) => {
    scroller.innerHTML += createCharity(element);
  });
};

const createCharity = (obj) => {
  return `<div class="col-5">
    <div
      class="card card-block border-0"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasBottom_${obj.title.split(" ").join("")}"
      aria-controls="offcanvasBottom"
    >
      <img
        src="src/assets/dummy_npo.png"
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
          <p class="card-text text-center">
            <small class="text-muted">${obj.last_updated}</small>
          </p>
        </div>
        <div class="logo">
          <img src="src/assets/logo.svg" alt="" />
        </div>
      </div>
    </div>
    <div
      class="offcanvas offcanvas-bottom"
      tabindex="-1"
      id="offcanvasBottom_${obj.title.split(" ").join("")}"
      aria-labelledby="offcanvasBottomLabel"
    >
    <div class="card mb-3 border-0 d-flex">
    <div class="abs-card d-flex justify-content-center align-items-center">
    <img src="src/assets/dummy_npo.png" class="card-img-top offcanvas-img" alt="...">
    <img src="src/assets/logo.svg" class="icon" alt="...">
    <button type="button" onclick="back('${
      obj.title
    }')" class="btn-close text-reset closer" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
  <div class="card-body border-0 d-flex flex-column desc">
    <h5 class="card-title fs-1 mt-5" id="title_${obj.title}">${obj.title}</h5>
    <p class="card-text fs-5" id="card_${obj.title}" >${obj.description}</p>
    <p class="card-text">
    <button type="submit" onclick="offcanvas('${obj.title}')" id="donate_${
    obj.title
  }" class="fs-5 text-light border-0 donate">Donate</button>
    </p>
    <div class="fixed-bottom" id="fixed_${obj.title}" hidden>
        <div class="donate_overlay">
            <div class="donate-head d-flex justify-content-between align-items-center">
                <img onclick="back('${
                  obj.title
                }')" src="src/assets/arrow-left.svg" alt="...">
                <h5>Donate to ${obj.title}</h5>
            </div>
        <div class="input-select input-currency-select">
        <div class="dropdown">
        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="src/assets/Icon-Flag-America.png">
        </a>
      
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
            <div class="input-currency">
                <label for="currency">Donation Amount</label>
                <input placeholder="R" type="number" name="currency" id="currency" step="0.01">
            </div></div>   
            
            <div class="tag">Amount is in South African Rands (ZAR)</div>
        
        <div class="input-textarea">
            <label for="textarea">Message (Optional)</label>
            <textarea name="textarea" id="textarea" cols="30" rows="10"></textarea>
        </div>
        <div class="input-btn">
        <button type="submit" id="payment_${
          obj.title
        }" class="fs-5 text-light border-0 donate" onclick="startPaymentOverlay()">Continue to payments</button>
        <button type="submit" id="payment_${
          obj.title
        }" class="fs-5 text-light border-0 donate" onclick="startPayment()">Continue to payments</button>
        </div>    
        </div>
    </div>
  </div>
  
</div>
  </div>`;
};

const offcanvas = (title) => {
    const donate = document.getElementById("donate_" + title);
const card = document.getElementById("card_" + title);
const titles = document.getElementById("title_" + title);
const fixed_title = document.getElementById("fixed_" + title);
  donate.hidden ^= true;
  fixed_title.hidden ^= true;
  card.hidden ^= true;
  titles.hidden ^= true;
};

const back = (title) => {
    const donate = document.getElementById("donate_" + title);
const card = document.getElementById("card_" + title);
const titles = document.getElementById("title_" + title);
const fixed_title = document.getElementById("fixed_" + title);
  donate.hidden = false;
  fixed_title.hidden = true;
  card.hidden = false;
  titles.hidden = false;
};
