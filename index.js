const express = require("express")



const  app =express()
const fs=require("fs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.text())

// app.get("/",(req,res)=>{
//     res.send("hello from shristi")
    
// })

app.post("/",(req,res)=>{

    const dataclient=req.body;
    fs.readFile("./data.json",{encoding:"utf-8"},(err,data)=>{
        if(err){
            console.log("error")
        }
        const parsedata=JSON.parse(data)
      parsedata.msg=[...parsedata.msg,dataclient]
      fs.writeFile("./data.json",JSON.stringify(parsedata),"utf-8",()=>{
      res.send("msg added")
      })
    })
 
})



app.get("/",(req,res)=>{
   
    fs.readFile("./data.json",{encoding:"utf-8"},(err,data)=>{
        if(err){
            res.send("something went wrong")
        }
        const parsedata=JSON.parse(data)
        const msg=parsedata.msg
        res.send(JSON.stringify(msg))
    })
 
})

app.delete("/:id",(req,res)=>{
    const {id} = req.params
    
    fs.readFile("./data.json",{encoding:"utf-8"},(err,data)=>{
        const parsedata =JSON.parse(data)

        const msg=parsedata.msg
        const remaining_msg=msg.filter((el)=>el.id!=id)

        parsedata.msg =remaining_msg
        fs.writeFile("./data.json",JSON.stringify(parsedata),"utf-8",()=>{
            res.send("deleted")
        })
    })

})

app.patch("/:id",(req,res)=>{

let id=req.params.id
    let name=req.body.name
      
    fs.readFile("./data.json",{encoding:"utf-8"},(err,data)=>{
        const parsedata =JSON.parse(data)

        let newmsg = parsedata.msg.reduce((acu,el)=>{
                if(el.id==id){
                    el.name = name
                }
                acu.push(el)
                return acu
        },[])

        parsedata.msg =newmsg
        fs.writeFile("./data.json",JSON.stringify(parsedata),"utf-8",()=>{
            res.send("patched")
        })
    
    })


   
})

app.listen(5000,()=>{
    console.log("started")
})