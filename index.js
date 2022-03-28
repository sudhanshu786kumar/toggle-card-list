let stats=false;
const data = async()=>{
    const dbdata= await fetch("https://api-datac.herokuapp.com/employees");
   const jdata= await dbdata.json();
  lisdata(jdata);
  cardedata(jdata);

  return jdata;
  
    
}
real_data=data();

function lisdata(d){
    let tablee= document.getElementById("tablo");
    for (let x of d){
        let row=tablee.insertRow();
        let data1=row.insertCell();
        let data2=row.insertCell();
        let data3=row.insertCell();
        data3.id="skill"+d.indexOf(x);
        let data4=row.insertCell();
        let data5=row.insertCell();
        let data6=row.insertCell();
        let data7=row.insertCell();
        data1.innerHTML=x.name;
        data1.id=`naam${d.indexOf(x)}`
        data2.innerHTML=x.id;
        data2.id=`idd${d.indexOf(x)}`
        data3.innerHTML=x.skills;
        
        data3.className="editable";
        data4.innerHTML=x.project;
        data4.id=`proj${d.indexOf(x)}`
        data5.innerHTML=x.HCM;
        data5.id=`HCM${d.indexOf(x)}`
        data6.innerHTML=`<i class="fa-solid fa-pen-to-square" onclick="edit(${d.indexOf(x)})"></i>`;
        data6.id=`ed${d.indexOf(x)}`;
        data7.innerHTML=`<i class="fa-solid fa-trash" onclick="deleterow(${d.indexOf(x)})"></i>`;
    }
}


function edit(n){
    let x = document.getElementById(`skill${n}`);
    let y = document.getElementById(`ed${n}`);
    
    x.innerHTML=`<input type="text" id="entered${n}" >`;
    
    
    y.innerHTML=`<i class="fa-solid fa-floppy-disk" onclick="save(${n})"></i>`;
}


/* saving data in api by patch method for specific part of body*/
function save(n){
    let a =document.getElementById("entered"+n).value;
    let c =document.getElementById("skill"+n);
let nm =document.getElementById(`skill${n}`).value;
let rfd=document.getElementById(`entered${n}`).value
if(rfd===""){
    alert("Please Enter some value")
}else
{
fetch(`https://api-datac.herokuapp.com/employees/${n+1}`, {
    method: 'PATCH',
    body: JSON.stringify({
      skills:`${a}`,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));    
    let d=document.getElementById("ed"+n);
    d.innerHTML='<i class="fa-solid fa-pen-to-square" onclick="edit+'+n+'"></i>'
}
c.innerHTML=a;
}


function deleterow(n){
    
       
       let x = document.querySelectorAll("tr")
       x[1+n].style.display="none";
       odeletec(n);
    
}

























/*Table type data function ends here */
    function cardedata(d){
        let reald=document.getElementById("cardvew")
        for(let x of d){
            let coll =document.createElement("div")
            coll.className="col"
            coll.id="crd"+d.indexOf(x);
            let el = document.createElement("div")
            el.className="card shadow m-5";

            let elh = document.createElement("div")
            elh.className="card header bg-dark";
            el.appendChild(elh)
            elh.innerHTML='<i class="fa-solid fa-trash" style="color:red;float:right;font-size:30px" onclick="odeletec('+d.indexOf(x)+')"></i>'
            
            let el2=document.createElement("div")
            el2.className="card-body text-center";
            el.appendChild(el2);
             let imgg = document.createElement("img")
             if(x.gender==0){
                 imgg.src="./male.jpeg"
             }else{
                 imgg.src="./women.jpg"
             }
             imgg.style.width="100px" ;
             imgg.style.height="100px"
             el2.append(imgg)
             let pname=document.createElement("p")
             pname.innerHTML="Name :"+x.name;
             el2.append(pname);
             
             let pid=document.createElement("p")
             pid.innerHTML="ID :"+x.id;
             pname.style.marginTop="20px";
             el2.append(pid);

             let pskills =document.createElement("p")
             pskills.innerHTML="Skills :"+x.skills
             pskills.id="skillc"+d.indexOf(x);
             el2.append(pskills);

             let pproject = document.createElement("p")
             pproject.innerHTML="PROJECT :"+x.project;
             el2.append(pproject)

             let phcm=document.createElement("p")
             phcm.innerHTML="HCM : "+x.HCM;
             el2.append(phcm);
            
             let elf=document.createElement("div")
             el.append(elf);
             elf.innerHTML='<button class="btn btn-success" style="margin-bottom:10px;margin-left:40px" onclick="editc('+d.indexOf(x)+')">Edit</button> <button class="btn btn-primary" style="margin-bottom:10px;float:right;margin-right:50px" onclick="savec('+d.indexOf(x)+')">Save</button>'
             elf.id="but"+d.indexOf(x);

             coll.appendChild(el)
             
             reald.appendChild(coll)   
        }

    }

function odeletec(n){
    let x = document.getElementById(`crd${n}`);
    x.style.display="none";
    deleterow(n);
}

function editc(n){
    let x = document.getElementById(`skillc${n}`)
    x.innerHTML=`<label for="inp${n}" >Skills :</label><input type="text" id="inp${n}">`
    
}

function savec(n){
    let x = document.getElementById(`inp${n}`).value;
    if(x==""){
        alert("enter some value")
    }else{
    fetch(`https://api-datac.herokuapp.com/employees/${n+1}`, {
    method: 'PATCH',
    body: JSON.stringify({
      skills:`${x}`,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    let c = document.getElementById(`skillc${n}`)   
    c.innerHTML=x;}

}








function toggl(){
stats=!stats//changing to true
if(!stats){
    let a = document.getElementById("cardvew");
    let b = document.getElementById("listvew");
    let c=document.getElementById("gridview");
    let d= document.getElementById("tableview");
    a.style.display="flex";
    b.style.display="none";
    c.style.display="flex";
    d.style.display="none";

}else{
    let a = document.getElementById("cardvew");
    let b = document.getElementById("listvew");
    let c=document.getElementById("gridview");
    let d= document.getElementById("tableview");
    a.style.display="none";
    b.style.display="block";
    c.style.display="none";
    d.style.display="block";
}
}
toggl()
