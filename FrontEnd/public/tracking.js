const serverURL = 'http://localhost:3000/tracking';

// Extract the 'affiliateID' parameter from the current URL
const urlParams = new URLSearchParams(window.location.search);
const affiliateID = urlParams.get('affiliateID');
console.log(affiliateID);

if (affiliateID) {
    // If an affiliate ID was found, send it to your server
    fetch(`${serverURL}?affiliateID=${affiliateID}`, { method: 'GET' });
}