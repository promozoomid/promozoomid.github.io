const mode="live"
const QRISready = false
var lempar

sessionStorage.setItem("Versi","4")
var totalharga = 0
var tglzoom = []
var IDlist = []
function awal(){
	mode==="live"?lempar=0:console.log("Updated Version")
localStorage.removeItem("new")
localStorage.removeItem("lihat")
sessionStorage.clear()
var skr = new Date()
skr = skr.getTime()
if (skr < parseInt(localStorage.getItem("expired"))){
var param = localStorage.getItem("wa")
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://script.google.com/macros/s/AKfycbzseDMVrvnQwkFMuMVj4TxF8QyBxbgwMolnIF3UtQ/exec?action=test&data="+param);

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
    if (xhr.status === 200) {
        text = xhr.responseText.split("|")
        localStorage.setItem("hasil",xhr.responseText)
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
        "Jul", "Agt", "Sep", "Okt", "Nov", "Des"
        ];
        var body = document.getElementById("table-body")
        var bodybayar = document.getElementById("tabelbayar-body")
        var induk = localStorage.getItem("hasil")
        induk = induk.split("|")
        induk.forEach(function(x){
        var y = x.split(",")
        var row = document.createElement("tr");
        var rowbayar = document.createElement("tr");
        var col1 = document.createElement("td");
        col1.innerHTML = y[2].split("-")[2]+" "+monthNames[parseInt(y[2].split("-")[1])-1]+" "+y[2].split("-")[0];
        var col2 = document.createElement("td");
        col2.innerHTML = y[3]
        var col3 = document.createElement("td");
        y[6]=="Gladi"?col3.innerHTML = y[4] +" Jam<br>(Gladi)":col3.innerHTML = y[4] +" Jam"
        var col4 = document.createElement("td");
        col4.innerHTML = y[8]
        var col5 = document.createElement("td");
        col5.setAttribute("style","text-align:center")
        var loading = "load"+y[0].toString()
        if (y[5]=="BELUM BAYAR"){
            const tanggal = new Date(parseInt(y[2].split("-")[0]),parseInt(y[2].split("-")[1]),parseInt(y[2].split("-")[2]),parseInt(y[3].split(":")[0]),parseInt(y[3].split(":")[1]))
            var colbayar1 = document.createElement("td");
            colbayar1.innerHTML = y[2].split("-")[2]+" "+monthNames[parseInt(y[2].split("-")[1])-1]+" "+y[2].split("-")[0];
            var colbayar2 = document.createElement("td");
            colbayar2.innerHTML = y[3]
            var colbayar3 = document.createElement("td");
            colbayar3.innerHTML = y[4] +" Jam"
            var colbayar4 = document.createElement("td");
            colbayar4.innerHTML = 'Rp'+numberWithCommas(y[14])
            var colbayar5 = document.createElement("td");
            colbayar5.style.textAlign = "center"
            colbayar5.innerHTML = '<input class="form-check-input" name="bayar" type="checkbox" onchange="checkboxbayar()"value="" id="'+y[0]+'" nominal='+parseInt(y[14])+' tgltime='+tanggal.getTime()+' style="text-align:center;cursor:pointer" >'
            col5.setAttribute("style","text-align:center")
            col5.innerHTML = 'Belum<br>Lunas'
            rowbayar.appendChild(colbayar1);
            rowbayar.appendChild(colbayar2);
            rowbayar.appendChild(colbayar3);
            rowbayar.appendChild(colbayar4);
            rowbayar.appendChild(colbayar5);
            bodybayar.appendChild(rowbayar);
            QRISready?document.getElementById("btnbayar").style.display = "block":document.getElementById("btnbayar").style.display = "none"
        }
        else {
            if ( y[8] == ""){col5.innerHTML = '<button type="button" id="'+y[0]+'" tipe="'+y[6]+'" tipeasli="'+y[13]+'" tgl="'+y[2]+'" jam="'+y[3]+'" durasi="'+y[4]+'" onclick="buat(this)" class="btn btn-primary">Buat</button><button class="btn btn-primary" id="load'+y[0]+'" type="button" style="display : none;" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>'}
            else {col5.innerHTML = '<button type="button" id="'+y[0]+'" tipe="'+y[6]+'" tipeasli="'+y[13]+'" onclick="lihat(this)" class="btn btn-secondary">Lihat</button><button class="btn btn-secondary" id="'+loading+'" type="button" style="display : none;" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>'}
        }
        if (y[14] != ""){
            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);
            row.appendChild(col5);
            body.appendChild(row);
        }
        })
        document.getElementById("loader").style.display = "none"
        document.getElementById("tabel").style.display = "table"
    }
    else {  alert("Terjadi Error saat mengirim/menerima data, silakan coba lagi")
    location.href = localStorage.getItem("backup")}
   }};

xhr.send();
localStorage.setItem("index","ya")
localStorage.removeItem("new")
localStorage.removeItem("lihat")
}
else {location.href = "buatroom.html"}
}

function lihat(apa){
var tombol = document.getElementsByTagName("button")
for ( var i=0;i<tombol.length;i++ ){
tombol[i].disabled = true
}
var id = apa.getAttribute("id")
var loader = "load"+id.toString()
apa.style.display = "none"
document.getElementById(loader).style.display = "table-cell"
var tipe = apa.getAttribute("tipeasli")
fetch("https://script.google.com/macros/s/AKfycbzseDMVrvnQwkFMuMVj4TxF8QyBxbgwMolnIF3UtQ/exec?action=cariID&data="+id, {
   'method' : 'get'}).then(function(response) {
    return response.text().then(function(hasil) {
text = hasil.split(",")
sessionStorage.setItem("ID",text[0])
sessionStorage.setItem("tgl",text[2])
sessionStorage.setItem("jam",text[3])
sessionStorage.setItem("durasi",text[4])
sessionStorage.setItem("IDmeeting",text[5])
sessionStorage.setItem("tipe",text[6])
sessionStorage.setItem("pengundang",text[7])
sessionStorage.setItem("streamingurl",text[9])
sessionStorage.setItem("streamingkey",text[10])
sessionStorage.setItem("streamingpage",text[11])
sessionStorage.setItem("status",text[12])
sessionStorage.setItem("tipeasli",text[13])
if (text[14] != null){
sessionStorage.setItem("tgltrial",text[14])
sessionStorage.setItem("jamtrial",text[15])
sessionStorage.setItem("durasitrial",text[16])
}
localStorage.setItem("lihat","ya")
var param2 = [text[5],tipe]
fetch("https://script.google.com/macros/s/AKfycbzseDMVrvnQwkFMuMVj4TxF8QyBxbgwMolnIF3UtQ/exec?action=getUrl&data="+param2, {
  'method' : 'get'}).then(function(response) {
    return response.text().then(function(text) {
	var e = text.split("|")
	sessionStorage.setItem("url",e[0])
	if (e[1] == "undefined"){e[1]=""}
	sessionStorage.setItem("password",e[1])
	sessionStorage.setItem("topic",e[2])
	sessionStorage.setItem("agenda",e[3])
	sessionStorage.setItem("lihat","Ya")
	location.href = "zoomview.html"
  })})
  .catch(function(error) {
  alert("Terjadi Error saat mengirim/menerima data, silakan coba lagi")
  location.href = localStorage.getItem("backup")
})
  })})
  .catch(function(error) {
  alert("Terjadi Error saat mengirim/menerima data, silakan coba lagi")
  location.href = localStorage.getItem("backup")
})
}
function buat(apa){
var tombol = document.getElementsByTagName("button")
for ( var i=0;i<tombol.length;i++ ){
tombol[i].disabled = true
}
var id = apa.getAttribute("id")
var loader = "load"+id.toString()
apa.style.display = "none"
localStorage.setItem("new","ya")
document.getElementById(loader).style.display = "table-cell"
sessionStorage.setItem("ID",apa.getAttribute("id"))
sessionStorage.setItem("tgl",apa.getAttribute("tgl"))
sessionStorage.setItem("jam",apa.getAttribute("jam"))
sessionStorage.setItem("durasi",apa.getAttribute("durasi"))
sessionStorage.setItem("tipe",apa.getAttribute("tipe"))
sessionStorage.setItem("tipeasli",apa.getAttribute("tipeasli"))
location.href="zoom.html"
}
function next(){
document.getElementById("load").style.display = "block"
document.getElementById("next").style.display = "none"
var param = document.getElementById("wa").value
fetch("https://script.google.com/macros/s/AKfycbzseDMVrvnQwkFMuMVj4TxF8QyBxbgwMolnIF3UtQ/exec?action=masuk&data="+param, {
   'method' : 'get'}).then(function(response) {
    return response.text().then(function(hasil) {
	text = hasil.split("|") 
	if ( text=="Gaada"){
  var myModal = new bootstrap.Modal(document.getElementById("gaadaWA"), {backdrop:'static',keyboard:false});
    myModal.show();
    document.getElementById("load").style.display = "none"
    document.getElementById("next").style.display = "block"
}
else if( text.length > 1){
sessionStorage.setItem("hasil",hasil)
location.href = "zoomlist.html"
}
else{
text = text.split(",")
sessionStorage.setItem("ID",text[0])
sessionStorage.setItem("wa",text[1])
sessionStorage.setItem("tgl",text[2])
sessionStorage.setItem("jam",text[3])
sessionStorage.setItem("durasi",text[4])
sessionStorage.setItem("IDmeeting",text[5])
sessionStorage.setItem("tipe",text[6])
sessionStorage.setItem("pengundang",text[7])
sessionStorage.setItem("streamingurl",text[9])
sessionStorage.setItem("streamingkey",text[10])
sessionStorage.setItem("streamingpage",text[11])
sessionStorage.setItem("status",text[12])
sessionStorage.setItem("new","ya")
if (text[4] != "") {
var param = [text[4],text[5]]
fetch("https://script.google.com/macros/s/AKfycbzseDMVrvnQwkFMuMVj4TxF8QyBxbgwMolnIF3UtQ/exec?action=getUrl&data="+param, {
  'method' : 'get'}).then(function(response) {
    return response.text().then(function(text) {
	var e = text.split("|")
	sessionStorage.setItem("url",e[0])
	if (e[1] == "undefined"){e[1]=""}
	sessionStorage.setItem("password",e[1])
	sessionStorage.setItem("topic",e[2])
	sessionStorage.setItem("agenda",e[3])
	sessionStorage.setItem("lihat","Ya")
  location.href = "zoomview.html"})
  .catch(function(error) {
  alert("Terjadi Error saat mengirim/menerima data, silakan coba lagi")
  location.href = localStorage.getItem("backup")
})
})}
else{
location.href = "zoom.html"
}
}
})})
.catch(function(error) {
  alert("Terjadi Error saat mengirim/menerima data, silakan coba lagi")
  location.href = localStorage.getItem("backup")
})
}
function hasilWA(e){
if ( e==null ){
  var myModal = new bootstrap.Modal(document.getElementById("gaadaWA"), {backdrop:'static',keyboard:false});
    myModal.show();
    document.getElementById("load").style.display = "none"
    document.getElementById("next").style.display = "block"
}
else{
sessionStorage.setItem("wa",e[0])
sessionStorage.setItem("tgl",e[1])
sessionStorage.setItem("jam",e[2])
sessionStorage.setItem("durasi",e[3])
sessionStorage.setItem("IDmeeting",e[4])
sessionStorage.setItem("tipe",e[5])
if (e[4] != "") {
google.script.run.withSuccessHandler(lama).getUrl(e[4],e[5])}
else{
google.script.run.withSuccessHandler(refreshApp).reload("zoom100")}
}
}
function lama(e){
sessionStorage.setItem("url",e[0])
if (e[1] == null){e[1]=""}
sessionStorage.setItem("password",e[1])
sessionStorage.setItem("topic",e[2])
sessionStorage.setItem("agenda",e[3])
google.script.run.withSuccessHandler(refreshApp).reload("zoom100view")
}
function konfirmasi(){
var myModal = new bootstrap.Modal(document.getElementById("konfirmasi"), {backdrop:'static',keyboard:false});
    myModal.show();
}
function checkboxbayar(){
    totalharga = 0
    IDlist = []
    tglzoom = []
    $("input:checkbox[name=bayar]:checked").each(function(){
        IDlist.push($(this).attr("ID"));
        tglzoom.push(parseInt($(this).attr("tgltime")));
        totalharga += parseInt($(this).attr("nominal"));
    });
    $("#totalharga").html("Rp"+numberWithCommas(totalharga))
    totalharga===0?$("#btnkonfirmasibayar").prop("disabled", true):$("#btnkonfirmasibayar").prop("disabled", false)
}
function centang(btn){
    if ($(btn).attr("mode") == "uncheck"){
        $("input:checkbox[name=bayar]").each(function(){
            $(this).prop("checked", false)
            checkboxbayar()
            $(btn).attr("mode", "check")
        });
    }
    else {
        $("input:checkbox[name=bayar]").each(function(){
            $(this).prop("checked", true)
            checkboxbayar()
            $(btn).attr("mode", "uncheck")
        });
    }
}
function submit(){
document.getElementById("load").style.display = "block"
document.getElementById("next").style.display = "none"
var meeting = document.getElementById("meeting").value.toString()
var desc = document.getElementById("desc").value.toString()
var pass = document.getElementById("pass").value.toString()
var tgl = document.getElementById("tgl").value.toString()
var jam = document.getElementById("jam").value.toString()
var mulai = tgl+"T"+jam+":00"
var durasi = parseInt(document.getElementById("durasi").value)*60
google.script.run.withSuccessHandler(showinvitation).zoom([meeting,desc,pass,mulai,durasi])
}
function back() {
document.getElementById("loadback").style.display = "block"
document.getElementById("btnback").style.display = "none"
location.href = "buatroom.html"
}
function copyinvitation() {
var el = document.createElement('textarea');
  el.value = document.getElementById("invitation").value;
  document.getElementById("zoominvitation").appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  document.getElementById("sudahcopy").style.display = "block"
  document.getElementById("btn1").style.display = "none"
  document.getElementById("btn2").style.display = "block"
}
function toast() {
var toastElList = [].slice.call(document.querySelectorAll('.toast'))
        var toastList = toastElList.map(function(toastEl) {
        // Creates an array of toasts (it only initializes them)
          return new bootstrap.Toast(toastEl) // No need for options; use the default options
        });
       toastList.forEach(toast => toast.show()); // This show them
   
        mode==="live"?lempar=0:console.log(toastList); // Testing to see if it works
        }
function refreshApp(newHtml) {
    document.open();
    document.write(newHtml)
    document.close();
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
document.getElementById("btnkonfirmasibayar").addEventListener("click", function(){
    tglzoom.sort(function(a, b){return a - b});
    var tanggal = new Date(tglzoom[0])
    sessionStorage.setItem("tgl",tanggal.getFullYear()+'-'+tanggal.getMonth()+'-'+tanggal.getDate())
    sessionStorage.setItem("jam",tanggal.getHours()+":"+tanggal.getMinutes())
    sessionStorage.setItem("harga",totalharga)
    sessionStorage.setItem("ID",IDlist)
    sessionStorage.setItem("skip","yes")
    location.href="qris.html"
})
document.getElementById("btnbayar").addEventListener("click", function(){
var myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {backdrop:'static',keyboard:false});
myModal.show();
})
document.getElementById("clsbayar").addEventListener("click", function(){
var myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {});
myModal.hide();
})