html2canvas(document.querySelector("#qris-template")).then(canvas => {
    document.body.appendChild(canvas)
});
function sudahbayar(){
document.querySelector("#btnsudahbayar").hidden = true
document.querySelector("#loadbtnsudahbayar").hidden = false
var url = "https://promozoomid-proxy.herokuapp.com/https://api.sandbox.midtrans.com/v2/order0303/status";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", "Basic U0ItTWlkLXNlcnZlci1JYjFhYl9mMnpNZEFNZW95TWVtVUNSQkE6");

xhr.onreadystatechange = function () {
    var deadline = document.querySelector("#deadline")
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      var respon = JSON.parse(xhr.responseText)
      if (respon.transaction_status == "settlement"){
          document.querySelector("#transaction_id").innerHTML = respon.transaction_id
          document.querySelector("#bayar").hidden = false
          document.querySelector("#sudahbayar").hidden = false
          lunas()
      }
      else{
          alert("Pembayaran tidak ditemukan. Silakan bayar sebelum")
          document.querySelector("#btnsudahbayar").hidden = false
        document.querySelector("#loadbtnsudahbayar").hidden = true
        }
   }};

xhr.send();
}
function bayar(){
document.querySelector("#btnbayar").hidden = true
document.querySelector("#loadbtnbayar").hidden = false
var tgl = new Date()
var id_trx = QR+tgl.getTime()
    var url = "https://promozoomid-proxy.herokuapp.com/https://api.sandbox.midtrans.com/v2/charge";

var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
xhr.setRequestHeader("Authorization", "Basic U0ItTWlkLXNlcnZlci1JYjFhYl9mMnpNZEFNZW95TWVtVUNSQkE6");
xhr.setRequestHeader("Access-Control-Allow-Origin", "")
xhr.setRequestHeader("Access-Control-Allow-Methods", "*")

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      var respon = JSON.parse(xhr.responseText)
      console.log(respon)
      console.log(respon.actions[0].url);
      document.querySelector("#qrcode").src = respon.actions[0].url
      inputQR(id_trx,respon.actions[0].url)
   }};

var data = `{
  "payment_type": "qris",
  "transaction_details": {
    "order_id": ${id_trx},
    "gross_amount": ${sessionStorage.getItem("harga")}
  },
  "customer_details": {
    "phone": ${localStorage.getItem("wa")}
  },
  "qris": {
    "acquirer": "airpay shopee"
  }
}`;

xhr.send(data);
}
function inputQR(id_trx,qr){
    var param = []
    param.push(id_trx)
    param.push(qr)
    param.push(sessionStorage.getItem("ID"))
    param.push(localStorage.getItem("wa"))
    param.push(sessionStorage.getItem("harga"))
    fetch("https://script.google.com/macros/s/AKfycbzseDMVrvnQwkFMuMVj4TxF8QyBxbgwMolnIF3UtQ/exec?action=cariHarga&data="+param, {
  'method' : 'get'}).then(function(response) {
    return response.text().then(function(text) {
        console.log(text)
        var nomor = parseInt(text)
        document.querySelectorAll(".nominal").forEach(nominal =>{nominal.innerHTML = "Rp"+numberWithCommas(nomor)})
        document.querySelector("#awal").hidden = true
        document.querySelector("#bayar").hidden = false
    })})
}
function lunas(){

}
