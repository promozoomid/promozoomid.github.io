sessionStorage.setItem("Versi","4")
var data
var datajson
var dataedit
var no = 1
fetch("https://script.google.com/macros/s/AKfycbzseDMVrvnQwkFMuMVj4TxF8QyBxbgwMolnIF3UtQ/exec?action=token&data="+sessionStorage.getItem("tipeasli"), {
   'method' : 'get'}).then(function(response) {
    return response.text().then(function(hasil) {
      sessionStorage.setItem("token",hasil)
    })})
function awal(){
console.log("Updated Version")
localStorage.removeItem("new")
localStorage.removeItem("lihat")
var skr = new Date()
skr = skr.getTime()

var param = []
param.push(sessionStorage.getItem("IDmeeting"))
param.push(sessionStorage.getItem("tipeasli"))
fetch("https://script.google.com/macros/s/AKfycbzseDMVrvnQwkFMuMVj4TxF8QyBxbgwMolnIF3UtQ/exec?action=listpolling&data="+param, {
   'method' : 'get'}).then(function(response) {
    return response.text().then(function(hasil) {
        //console.log(JSON.parse(hasil))
        data = JSON.parse(hasil)
        const{total_records,polls} = data
        var nomor = 0
        var listpolling = hasil.split(",")
        var body = document.getElementById("table-body")
        for (var i =0 ; i<total_records;i++){
            var row = document.createElement("tr");
            var col1 = document.createElement("td");
            col1.innerHTML = i+1
            var col2 = document.createElement("td");
            col2.innerHTML = polls[i].title
            var col3 = document.createElement("td");
            if (polls[i].status == "notstart"){col3.innerHTML = '<button type="button" onclick="lihat(this)" index='+i+' class="btn btn-primary btn-sm">Edit</button>'}
            else {col3.innerHTML = ''}
            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            body.appendChild(row);
        }
        document.getElementById("loader").style.display = "none"
        document.getElementById("tabel").style.display = "table"
    })})
    .catch(function() {
        alert("Server tidak dapat dijangkau akibat koneksi tidak stabil. Coba kembali setelah beberapa saat")
    });
localStorage.setItem("index","ya")
}
function newpoll(){
    document.querySelectorAll(".newpoll").forEach(element => {element.hidden = false});
    document.querySelectorAll(".editpoll").forEach(element => {element.hidden = true});
    document.querySelector("#detailpolling").hidden = false
    document.querySelector("#awal").hidden = true
    document.querySelector("#btnsimpan").hidden = true
    document.querySelector("#btnbuat").hidden = false
    document.querySelector("#title").value = ""
    document.querySelector("#id-polling").value = ""
    no = 1
    var html = `<tr><td colspan="2"></td></tr>
    <tr class="question">
        <td>1.</td>
        <td>
            Pertanyaan
            <input id="q1-question" maxlength="255" type="text" class="form-control" placeholder="Pertanyaan" onkeyup="myFunction2(event,this)"><br>
            
            Tipe 
            <select id="q1-type" class="form-select" aria-label="Default select example">
                <option selected disabled value=0>-- Pilih Salah Satu --</option>
                <option value="single">Single Choice (hanya bisa memilih 1 jawaban)</option>
                <option value="multiple">Multiple Choice (dapat memilih lebih dari 1 jawaban)</option>
              </select><br>
            Pilihan Jawaban <span style="font-size:85%">(Minimal 2 pilihan)</span>
            <input id="q1-answer1" maxlength="255" type="text" class="form-control answer1" placeholder="Opsi 1" onkeyup="myFunction2(event,this)" required>
            <input id="q1-answer2" maxlength="255" type="text" class="form-control answer1" placeholder="Opsi 2" onkeyup="myFunction2(event,this)" required>
            <input id="q1-answer3" maxlength="255" type="text" class="form-control answer1" placeholder="Opsi 3" onkeyup="myFunction2(event,this)">
            <input id="q1-answer4" maxlength="255" type="text" class="form-control answer1" placeholder="Opsi 4" onkeyup="myFunction2(event,this)">
            <input id="q1-answer5" maxlength="255" type="text" class="form-control answer1" placeholder="Opsi 5" onkeyup="myFunction2(event,this)">
            <input id="q1-answer6" maxlength="255" type="text" class="form-control answer1" placeholder="Opsi 6" onkeyup="myFunction2(event,this)">
            <input id="q1-answer7" maxlength="255" type="text" class="form-control answer1" placeholder="Opsi 7" onkeyup="myFunction2(event,this)">
            <input id="q1-answer8" maxlength="255" type="text" class="form-control answer1" placeholder="Opsi 8" onkeyup="myFunction2(event,this)">
            <input id="q1-answer9" maxlength="255" type="text" class="form-control answer1" placeholder="Opsi 9" onkeyup="myFunction2(event,this)">
            <input id="q1-answer10" maxlength="255" type="text" class="form-control answer1" placeholder="Opsi 10" onkeyup="myFunction2(event,this)">
            
        </td>
    </tr>`
    document.querySelector("#table-polling-body").innerHTML = html
}
function lihat(apa){
document.querySelectorAll(".newpoll").forEach(element => {element.hidden = true});
document.querySelectorAll(".editpoll").forEach(element => {element.hidden = false});
document.querySelector("#detailpolling").hidden = false
document.querySelector("#awal").hidden = true
document.querySelector("#btnsimpan").hidden = false
document.querySelector("#btnbuat").hidden = true
var index = apa.getAttribute("index")
var polling = data.polls[index]
//console.log(polling)
let html=''
no = 0
document.querySelector("#title").value = polling.title
document.querySelector("#id-polling").value = polling.id
polling.questions.forEach(questions =>{
    no++
    //console.log(questions,no)
    let jawaban=''
    var li1 = `
            <tr><td colspan="2"></td></tr>
            <tr class="question">
                <td style="vertical-align:top">${no}.</td>
                <td>
                    Pertanyaan
                    <input id="q${no}-question" maxlength="255" type="text" class="form-control" placeholder="Pertanyaan" value="${questions.name}" onkeyup="myFunction2(event,this)"><br>
                    Tipe 
                    <select id="q${no}-type" class="form-select" aria-label="Default select example">
                        <option disabled value=0>-- Pilih Salah Satu --</option>
                        <option value="single">Single Choice (hanya bisa memilih 1 jawaban)</option>
                        <option value="multiple">Multiple Choice (dapat memilih lebih dari 1 jawaban)</option>
                      </select><br>
                    Pilihan Jawaban <span style="font-size:85%">(Minimal 2 pilihan)</span>
                `;
    var indexjawaban = 1
    questions.answers.forEach(answers =>{
        var li3 = `
        <input id="q${no}-answer${indexjawaban}" maxlength="255" type="text" class="form-control answer${no}" placeholder="Opsi ${indexjawaban}" value="${answers}" onkeyup="myFunction2(event,this)">
                `;
        jawaban += li3;
        indexjawaban++
    })
    for(var i=0 ; i<=10-indexjawaban;i++){
        var li3 = `
        <input id="q${no}-answer${indexjawaban+i}" maxlength="255" type="text" class="form-control answer${no}" placeholder="Opsi ${indexjawaban+i}" onkeyup="myFunction2(event,this)">
                `;
        jawaban += li3;
    }
    var li2 =`
                </td>
            </tr>
                `;
    var gabungan = li1+jawaban+li2
        html += gabungan;
        if (no == 1){
          document.querySelector("#table-polling-body").innerHTML = gabungan
        }else{document.querySelector("#table-polling-body").innerHTML += gabungan}
    document.querySelector("#q"+no+"-type").value = questions.type
})
}
function tambah(){
    no++
    var newquestion = `
            <tr class="question">
                <td  style="vertical-align:top">${no}.</td>
                <td>
                    Pertanyaan
                    <input id="q${no}-question" type="text" class="form-control" placeholder="Pertanyaan" onkeyup="myFunction2(event,this)"><br>
                    Tipe 
                    <select id="q${no}-type" class="form-select" aria-label="Default select example">
                        <option selected disabled value=0>-- Pilih Salah Satu --</option>
                        <option value="single">Single Choice (hanya bisa memilih 1 jawaban)</option>
                        <option value="multiple">Multiple Choice (dapat memilih lebih dari 1 jawaban)</option>
                      </select><br>
                    Pilihan Jawaban <span style="font-size:85%">(Minimal 2 pilihan)</span>
                    <input id="q${no}-answer1" maxlength="255" type="text" class="form-control answer${no}" placeholder="Opsi 1" onkeyup="myFunction2(event,this)" required>
                    <input id="q${no}-answer2" maxlength="255" type="text" class="form-control answer${no}" placeholder="Opsi 2" onkeyup="myFunction2(event,this)" required>
                    <input id="q${no}-answer3" maxlength="255" type="text" class="form-control answer${no}" placeholder="Opsi 3" onkeyup="myFunction2(event,this)">
                    <input id="q${no}-answer4" maxlength="255" type="text" class="form-control answer${no}" placeholder="Opsi 4" onkeyup="myFunction2(event,this)">
                    <input id="q${no}-answer5" maxlength="255" type="text" class="form-control answer${no}" placeholder="Opsi 5" onkeyup="myFunction2(event,this)">
                    <input id="q${no}-answer6" maxlength="255" type="text" class="form-control answer${no}" placeholder="Opsi 6" onkeyup="myFunction2(event,this)">
                    <input id="q${no}-answer7" maxlength="255" type="text" class="form-control answer${no}" placeholder="Opsi 7" onkeyup="myFunction2(event,this)">
                    <input id="q${no}-answer8" maxlength="255" type="text" class="form-control answer${no}" placeholder="Opsi 8" onkeyup="myFunction2(event,this)">
                    <input id="q${no}-answer9" maxlength="255" type="text" class="form-control answer${no}" placeholder="Opsi 9" onkeyup="myFunction2(event,this)">
                    <input id="q${no}-answer10" maxlength="255" type="text" class="form-control answer${no}" placeholder="Opsi 10" onkeyup="myFunction2(event,this)">
                    
                </td>
            </tr>
            `
            document.getElementsByClassName("question")[no-2].insertAdjacentHTML('afterend', newquestion);
}
function buatpolling(){
    document.querySelector("#btnbuat").hidden = true
    document.querySelector("#btnload").hidden = false
    document.querySelector("#btnbackdetail").disabled = true
    var title = document.querySelector("#title").value
    datajson = {
  "title": title,
  "questions": [
  ]
}
for (var i = 1;i<=no;i++){
    var name = document.querySelector("#q"+i+"-question").value
    if (name == ""){break}
    var type = document.querySelector("#q"+i+"-type").value
    var question = {
      "name": name,
      "type": type,
      "answers": [
      ]
    }
    document.querySelectorAll(".answer"+i).forEach(answer =>{
        if (answer.value != ""){
            question["answers"].push(answer.value)
        }
    })
    datajson["questions"].push(question)
}
if (datajson["questions"]==""){
    alert("Error : Polling harus berisi minimal 1 pertanyaan")
    document.querySelector("#btnbuat").hidden = false
    document.querySelector("#btnload").hidden = true
    document.querySelector("#btnbackdetail").disabled = false
    return
}
//console.log(datajson)
kirim("add")
}
function simpanpolling(){
    document.querySelector("#btnsimpan").hidden = true
    document.querySelector("#btnload").hidden = false
    document.querySelector("#btnbackdetail").disabled = true
    var title = document.querySelector("#title").value
    var idpoling = document.querySelector("#id-polling").value
    datajson = {
  "title": title,
  "questions": [
  ]
}
for (var i = 1;i<=no;i++){
    var name = document.querySelector("#q"+i+"-question").value
    if (name == ""){break}
    var type = document.querySelector("#q"+i+"-type").value
    var question = {
      "name": name,
      "type": type,
      "answers": [
      ]
    }
    //console.log(".answer"+no)
    document.querySelectorAll(".answer"+i).forEach(answer =>{
        if (answer.value != ""){
            question["answers"].push(answer.value)
        }
    })
    datajson["questions"].push(question)
}
if (datajson["questions"]==""){
    alert("Error : Polling harus berisi minimal 1 pertanyaan")
    return
}
//console.log(datajson)
kirim(idpoling)
}
function kirim(pollid){
if (pollid == "add"){
var param = "addpoll/"+sessionStorage.getItem("IDmeeting")+"/"+sessionStorage.getItem("token")}
else{var param = "editpoll/"+sessionStorage.getItem("IDmeeting")+"/"+pollid+"/"+sessionStorage.getItem("token")}
var url = "https://secure-stream-96180.herokuapp.com/"+param;

var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      //console.log(xhr.status);
      //console.log(xhr.responseText);
      if(xhr.status == 204 && pollid != "add"){
        alert("Polling berhasil disimpan")
        location.reload()
      }
      try{
        //console.log(JSON.parse(xhr.responseText));
        alert("Polling berhasil disimpan")
        location.reload()
      }
      catch{
        const {result} = xmlToJson.parse(xhr.responseText)
        if (result.code=="300"){
          alert("Error : Isian tidak lengkap, setiap pertanyaan wajib memiliki minimal 2 opsi jawaban")
        }
        }
    if (pollid == "add"){document.querySelector("#btnbuat").hidden = false}
    else{document.querySelector("#btnsimpan").hidden = false}
    document.querySelector("#btnload").hidden = true
    document.querySelector("#btnbackdetail").disabled = false
   }};

var data = JSON.stringify(datajson);

xhr.send(data);
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
	location.href = "zoomview.html"})})}
else{
location.href = "zoom.html"
}
}
})})
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
document.getElementById("btnnewpoll").disabled = true
document.getElementById("loadback").hidden = false
document.getElementById("btnback").hidden = true
localStorage.setItem("index","ya")
sessionStorage.setItem("lihat","Ya")
localStorage.setItem("lihat","Ya")
location.href = "zoomview.html"
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
function myFunction(event,apa) {
  var x = event.which || event.keyCode;
  if (x == 220 && event.shiftKey == true){
  hasil = apa.value.trimEnd()}
}
function myFunction2(event,apa) {
  var x = event.which || event.keyCode;
  if (x == 220 && event.shiftKey == true){
  apa.value = hasil}
  if (apa.getAttribute("id") == "pengundang"){document.getElementById("tekspengundang").innerHTML = apa.value}
}
function toast() {
var toastElList = [].slice.call(document.querySelectorAll('.toast'))
        var toastList = toastElList.map(function(toastEl) {
        // Creates an array of toasts (it only initializes them)
          return new bootstrap.Toast(toastEl) // No need for options; use the default options
        });
       toastList.forEach(toast => toast.show()); // This show them
   
        //console.log(toastList); // Testing to see if it works
        }
function refreshApp(newHtml) {
    document.open();
    document.write(newHtml)
    document.close();
  }
function backdetail(){
    document.querySelector("#detailpolling").hidden = true
    document.querySelector("#awal").hidden = false
}