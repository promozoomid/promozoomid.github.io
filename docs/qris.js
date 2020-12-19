var server_key = "TWlkLXNlcnZlci1wUmVVWDF1MndveFh5aHhIWU9jT3FiaVc6" //production
//var server_key = "U0ItTWlkLXNlcnZlci1JYjFhYl9mMnpNZEFNZW95TWVtVUNSQkE6" //sandbox

var base_url = "https://api.midtrans.com/v2/" //production
//var base_url = "https://api.sandbox.midtrans.com/v2/" //sandbox

var bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli", "Agustus","September","Oktober","November","Desember"]
html2canvas(document.querySelector("#qris-template")).then(canvas => {
    document.body.appendChild(canvas)
});
function sudahbayar(){
var id_trx = document.querySelector("#btnsudahbayar").getAttribute("id_trx")
var url = "https://promozoomid-proxy.herokuapp.com/"+base_url+id_trx+"/status";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", "Basic "+server_key);

xhr.onreadystatechange = function () {

   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      var respon = JSON.parse(xhr.responseText)
      if (respon.transaction_status == "settlement"){
          document.querySelector("#transaction_id").innerHTML = respon.transaction_id
          document.querySelector("#bayar").hidden = true
          document.querySelector("#sudahbayar").hidden = false
          lunas(id_trx)
      }
      else if (respon.transaction_status == "expire" || respon.status_code=="404"){
            document.querySelector("#bayar").hidden = true
            document.querySelector("#qrexpired").hidden = false
            qrexpired()
        }
      else {
        setTimeout(sudahbayar(),3000)
      }
   }};

xhr.send();
}
function bayar(){
document.querySelector("#btnbayar").hidden = true
document.querySelector("#loadbtnbayar").hidden = false
var tgl = new Date()
var expired = tgl.getTime()+300000
var id_trx = "QR"+tgl.getTime()
document.querySelectorAll(".deadline").forEach(deadline => {deadline.innerHTML=tgl.getDate()+" "+bulan[tgl.getMonth()]+" "+tgl.getFullYear()+"  "+tgl.getHours()+":"+(tgl.getMinutes()+5)})
document.querySelector("#btnsudahbayar").setAttribute("id_trx",id_trx)
var url = "https://promozoomid-proxy.herokuapp.com/"+base_url+"charge";

var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
xhr.setRequestHeader("Authorization", "Basic +server_key");
xhr.setRequestHeader("Access-Control-Allow-Origin", "")
xhr.setRequestHeader("Access-Control-Allow-Methods", "*")

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      var respon = JSON.parse(xhr.responseText)
      console.log(respon)
      console.log(respon.actions[0].url);
      document.querySelector("#qrcode").src = respon.actions[0].url
      inputQR(id_trx,respon.actions[0].url,expired)
   }};

var data = `{
  "payment_type": "qris",
  "transaction_details": {
    "order_id": "${id_trx}",
    "gross_amount": "${sessionStorage.getItem("harga")}"
  },
  "customer_details": {
    "phone": "${konversibalik(localStorage.getItem("wa"))}"
  },
  "qris": {
    "acquirer": "airpay shopee"
  }
}`;
console.log(data)
xhr.send(data);
}
function inputQR(id_trx,qr,expired){
    var param = []
    param.push(id_trx)
    param.push(qr)
    param.push(sessionStorage.getItem("ID"))
    param.push(localStorage.getItem("wa"))
    param.push(sessionStorage.getItem("harga"))
    param.push(expired)
    fetch("https://script.google.com/macros/s/AKfycbzseDMVrvnQwkFMuMVj4TxF8QyBxbgwMolnIF3UtQ/exec?action=newQRIS&data="+param, {
  'method' : 'get'}).then(function(response) {
    return response.text().then(function(text) {
        console.log(text)
        document.querySelector("#awal").hidden = true
        document.querySelector("#bayar").hidden = false
    })})
}
function lunas(id_trx){
    fetch("https://script.google.com/macros/s/AKfycbzseDMVrvnQwkFMuMVj4TxF8QyBxbgwMolnIF3UtQ/exec?action=bayarQRIS&data="+id_trx, {
   'method' : 'get'}).then(function(response) {
    return response.text().then(function(text) {
        console.log(text)
        location.href = localStorage.getItem("backup")
    })})
}
function qrexpired(){
    var id_trx = document.querySelector("#btnsudahbayar").getAttribute("id_trx")
    console.log(id_trx)
    fetch("https://script.google.com/macros/s/AKfycbzseDMVrvnQwkFMuMVj4TxF8QyBxbgwMolnIF3UtQ/exec?action=qrexpired&data="+id_trx, {
   'method' : 'get'}).then(function(response) {
    return response.text().then(function(text) {
        console.log(text)

    })})
}
function konversibalik(str){
    var res = str.slice(0,2);
    var res2 = str.slice(2,str.length);
    res = res.replace("62","0")
    str = res+res2
    return str
    }