const mode="live"
var lempar
var server_key = "TWlkLXNlcnZlci1wUmVVWDF1MndveFh5aHhIWU9jT3FiaVc6" //production
//var server_key = "U0ItTWlkLXNlcnZlci1JYjFhYl9mMnpNZEFNZW95TWVtVUNSQkE6" //sandbox

var base_url = "https://api.midtrans.com/v2/" //production
//var base_url = "https://api.sandbox.midtrans.com/v2/" //sandbox
var loopbayar
var bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli", "Agustus","September","Oktober","November","Desember"]
html2canvas(document.querySelector("#qris-template")).then(canvas => {
    document.body.appendChild(canvas)
});
var getCanvas
var id_trx
/*if (sessionStorage.getItem("skip") == "yes"){
  sessionStorage.removeItem("skip")
  document.querySelectorAll(".nominal").forEach(nominal =>{nominal.innerHTML = "Rp"+numberWithCommas(sessionStorage.getItem("harga"))})
  bayar()
}
else{*/
try{
document.getElementById("tgl").value = sessionStorage.getItem("tgl")
document.getElementById("jam").value = sessionStorage.getItem("jam")
sessionStorage.removeItem("skip")
var param = sessionStorage.getItem("ID")
fetch("https://script.google.com/macros/s/AKfycbzseDMVrvnQwkFMuMVj4TxF8QyBxbgwMolnIF3UtQ/exec?action=cariHarga&data="+param, {
  'method' : 'get'}).then(function(response) {
    return response.text().then(function(text) {
        mode==="live"?lempar=0:console.log(text)
        var hasil = JSON.parse(text)
        var nomor = parseInt(hasil['harga'])
        parseInt(sessionStorage.getItem("harga"))>0?nomor = parseInt(sessionStorage.getItem("harga")):sessionStorage.setItem("harga",nomor)
        document.querySelectorAll(".nominal").forEach(nominal =>{nominal.innerHTML = "Rp"+numberWithCommas(nomor)})
        if (hasil['expired'] == 0){
          document.querySelector("#loading").hidden = true
          document.querySelector("#bayar").hidden = false
          bayar()
        }
        else if (hasil['harga']==="abort"){location.href=localStorage.getItem("backup")}
        else if (hasil['expired'] < new Date().getTime()) {
          document.querySelector("#loading").hidden = true
          document.querySelector("#qrexpired").hidden = false
          qrexpired()
        }
        else {
            $("#divqris").qrcode({
              text: hasil['QR_string'],
              // 'canvas', 'image' or 'div'
              render: 'image',
              ecLevel: 'L',
              // size in pixels
              size:300,
            });
            id_trx = hasil["ID"]
            document.querySelector("#QRIS").src = document.querySelector("#divqris").querySelector("img").src
            var tgl = new Date(parseInt(hasil['expired']))
            document.querySelectorAll(".deadline").forEach(deadline => {deadline.innerHTML=tgl.getDate()+" "+bulan[tgl.getMonth()]+" "+tgl.getFullYear()+"  "+("0" + tgl.getHours()).slice(-2)+":"+("0" + tgl.getMinutes()).slice(-2)})
            sudahbayar()
            mode==="live"?lempar=0:console.log("ACTIVE")
            document.querySelector("#loading").hidden = true
            document.querySelector("#bayar").hidden = false
            html2canvas(document.querySelector("#qris-template")).then(canvas => {
                document.querySelector("#hasiljadi").append(canvas)
                getCanvas = canvas
            });
            document.querySelector("#waiting").removeAttribute("hidden")
            document.querySelector("#btnsavepng").removeAttribute("disabled")
        }
    })})
    /*.catch(function(error){
      alert("Terjadi Error saat mengirim/menerima data, silakan coba lagi")
      document.querySelector("#loading").innerHTML = "<br><h2>Terjadi Error saat mengirim/menerima data, </h2><br> Halaman ini akan dimuat ulang dalam 5 detik"
    })*/

function saveQRIS(){
  document.getElementById("btnsavepng").style.display = "none"
  document.getElementById("loadbtnsavepng").style.display = "block"
  var imgageData = document.querySelector("#hasiljadi").querySelector("canvas").toDataURL("image/png");
    // Now browser starts downloading it instead of just showing it
    var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
    saveAs(imgageData,"QRIS Payment.png")
    document.getElementById("loadbtnsavepng").style.display = "none"
  document.getElementById("btnsavepng").style.display = "block"
}
function sudahbayar(){
  loopbayar = setInterval(sudahbayar1,15000)
}
function sudahbayar1(){
var url = "https://secure-stream-96180.herokuapp.com/status/"+id_trx+"/";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      mode==="live"?lempar=0:console.log(xhr.status);
      mode==="live"?lempar=0:console.log(xhr.responseText);
      try{
        var respon = JSON.parse(xhr.responseText)
        if (respon.status == "INACTIVE"){
            document.querySelector("#transaction_id").innerHTML = respon.id.toUpperCase();
            document.querySelector("#bayar").hidden = true
            document.querySelector("#sudahbayar").hidden = false
            clearInterval(loopbayar);
            document.getElementById("btnsuksesbayar").removeAttribute("disabled")
        }
        else if (respon.status =="404"){
              document.querySelector("#bayar").hidden = true
              document.querySelector("#qrexpired").hidden = false
              qrexpired()
              clearInterval(loopbayar);
          }
        }
      catch {
        const tulisan = document.getElementById("waiting")
        tulisan.removeAttribute("id")
        tulisan.querySelector("h5").innerHTML = "<i>Error, Silahkan muat ulang halaman ini (Refresh)</i>"
        clearInterval(loopbayar);
      }
   }};
xhr.send();
}
}
catch{balikin()}

function bayar(){
document.querySelector("#btnbayar").style.display = 'none'
document.querySelector("#loadbtnbayar").style.display = 'block'
try{
const tanggal = sessionStorage.getItem("tgl").split("-")
const jam = sessionStorage.getItem("jam").split(":")
var tgl = new Date(parseInt(tanggal[0]),parseInt(tanggal[1])-1,parseInt(tanggal[2]),parseInt(jam[0]),parseInt(jam[1]))
var expired = tgl.getTime()-900000
var tglexpired = new Date(expired)
}
catch{balikin()}
id_trx = "QR"+new Date().getTime()
document.querySelectorAll(".deadline").forEach(deadline => {deadline.innerHTML=tglexpired.getDate()+" "+bulan[tglexpired.getMonth()]+" "+tglexpired.getFullYear()+"  "+("0" + tglexpired.getHours()).slice(-2)+":"+("0" + tglexpired.getMinutes()).slice(-2)})
var url = "https://secure-stream-96180.herokuapp.com/xendit/qris";

var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      mode==="live"?lempar=0:console.log(xhr.status);
      var respon = JSON.parse(xhr.responseText)
      mode==="live"?lempar=0:console.log(respon)
      $("#divqris").qrcode({
        text: respon.qr_string,
        // 'canvas', 'image' or 'div'
        render: 'image',
        ecLevel: 'L',
        // size in pixels
        size: 300,
      });
      inputQR(id_trx,respon.qr_string,expired)
   }};

var data = `{
  "externalID": "${id_trx}",
  "amount": "${sessionStorage.getItem("harga")}"
}`;
mode==="live"?lempar=0:console.log(data)
xhr.send(data);
}
function inputQR(id_trx,qr,expired){
    var param = []
    param.push(id_trx)
    param.push(qr)
    param.push(localStorage.getItem("wa"))
    param.push(sessionStorage.getItem("harga"))
    param.push(expired)
    fetch("https://script.google.com/macros/s/AKfycbzseDMVrvnQwkFMuMVj4TxF8QyBxbgwMolnIF3UtQ/exec?action=newQRIS&data="+param+"&ID="+sessionStorage.getItem("ID"), {
  'method' : 'get'}).then(function(response) {
    return response.text().then(function(text) {
        mode==="live"?lempar=0:console.log(text)
        document.querySelector("#QRIS").src = document.querySelector("#divqris").querySelector("img").src
        html2canvas(document.querySelector("#qris-template")).then(canvas => {
          document.querySelector("#hasiljadi").append(canvas)
          getCanvas = canvas
        });
        document.querySelector("#waiting").removeAttribute("hidden")
        document.querySelector("#btnsavepng").removeAttribute("disabled")
        sudahbayar()
    })})
}
function lunas(){
  location.replace(localStorage.getItem("backup"))
}
function qrexpired(){
    var id_trx = document.querySelector("#btnsudahbayar").getAttribute("id_trx")
    mode==="live"?lempar=0:console.log(id_trx)
    fetch("https://script.google.com/macros/s/AKfycbzseDMVrvnQwkFMuMVj4TxF8QyBxbgwMolnIF3UtQ/exec?action=qrexpired&data="+id_trx, {
   'method' : 'get'}).then(function(response) {
    return response.text().then(function(text) {
        // console.log(text)
    })})
}
var i = 0

function konversibalik(str){
    var res = str.slice(0,2);
    var res2 = str.slice(2,str.length);
    res = res.replace("62","0")
    str = res+res2
    return str
    }

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function balikin(){
  location.href=localStorage.getItem("backup")
}
document.getElementById("btnsuksesbayar").addEventListener("click", function (){
  location.href = localStorage.getItem("backup")
})