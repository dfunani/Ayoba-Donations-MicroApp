# Ayoba Donations Micro-App

## Background

In an effort to formalize the process of testing Ayoba Payments within the Ayoba App, the Ayoba Donations Micro-App was developed.
The Micro-App will server not only as an end-to-end production testing platform but also as a service for Ayoba users to Donate to Ayoba Registered Non-Profit Organizations.

The Donations MicroApp will allow users to see a list of integrated NPO’s, where the user will be
redirected to the NPO’s MicroApp and I can make a donation using ayoba’s payment overlay.

NPO requirements:

1. Registered NPO

2. Registered as a MicroApp on ayoba

3. Registered for the payment methods offered by ayoba

4. In the OpCo where testing is required. (in country payment only)

5. All FICA and NPO certificates to be provided upon registration. 

## Run Locally

```git
git clone https://github.com/dfunani/Ayoba-Donations-MicroApp.git
```

> Open index.html # Live Server

## Deployment

Project deployed to vercel
> https://ayoba-donations-micro-app.vercel.app/

Project Available on the Ayoba (PRE) Mobile App
> Ayoba Donations

## Dependencies

1. Ayoba API's

2. DevStrapi - Registered NPOs collection

## How To Add NPO

1. Add Micro-App to DevStrapi Micro-Apps Collection
2. Add Micro-App to AyobaDonationsApp-Charities
3. Link Micro-App in AyobaDonationsApp-Charities    collection to a Micro-App in the Micro-Apps Collection

## Support/ Troubleshoot

1. Check the NPO is in the [Donations App Collection](https://devstrapi.thedigitalacademy.co.za/api/ayoba-donations-app-charities?populate[0]=micro_app&populate[1]=micro_app.countries).

2. Check the NPO countries settings in the underlying Micro Apps Collections.

> Note: The Project filters for Micro-Apps with countries that include the users current country as per the Ayoba GetCountry API.

## Project Structure

```structure
├── src
│   ├── assets
│   │   ├── arrow-left.svg
│   │   ├── fav-icon.png
│   │   ├── Icon-Flag-America.png
│   │   ├── search.svg
│   │   ├── three-dots.svg
│   ├── scripts
│   │   ├── ayobastub.js
│   │   ├── index.js
│   │   ├── microapp.js
│   ├── styles
│   │   ├── index.css
│   │   ├── success.css
├── index.html
├── README.md
└── success.html
```
## Errors you will encounter
When user cancel the payment in Ozow and when it returns to donation app the Ozow page in the background does not close. When user try to pay again it show unsuccessful because the first Ozow page is still open, that why is not showing and the second we just open in the background but not in the frontend.

#### User makes a donation
![user_makes_donation](/src/assets/Screenshot_2023_09_15_at_11.30.43_2_.png)
#### User cancling the payment
![cancel_payment](/src/assets/WhatsApp_Image_2023_09_15_at_11.24.18.jpeg)
#### User tries to make another payment, but the user is not redirect to Ozow. The payment status says cancel.
![not_redirect](/src/assets/Screenshot_2023_09_15_at_11.16.48_2.png)
![not_redirect](/src/assets/Screenshot_2023_09_15_at_11.27.54_2.png)
![not_redirect](/src/assets/Screenshot_2023_09_15_at_11.28.11_2.png)

#### Proof that ozow is still running the background
![ozow_running_backgroung](/src/assets/Screenshot_2023_09_15_at_11.53.09_2.png)
![ozow_running_backgroung](/src/assets/Screenshot_2023_09_15_at_11.53.28_2.png)