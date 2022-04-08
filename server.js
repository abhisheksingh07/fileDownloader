import express from "express";
import path from "path";
import directoryTree from "directory-tree";

const tree = directoryTree('./downloads/reactTuts/');
const app = express();
const __dirname = path.resolve();
app.use('/downloads',express.static(path.join(__dirname,'downloads')))
app.set('views', './views');
app.set('view engine', 'ejs');

app.get("/",(req,res)=>{    res.render('index');  })


app.get("/downloads",(req,res)=>{  
    const treeArray =  tree.children.map((x)=>{  
         return x.children.map((y)=>{
          return y.path
       })
    });
    const mergedArray = [].concat.apply([],treeArray);
    console.log(mergedArray.length)
    res.render('download',{myLink:mergedArray});
    
})



app.listen(4443,()=>{  console.log(`server is running on port 4443`) })