
const express = require('express');

const router = express.Router()
const { Rembg } = require("rembg-node");
const sharp = require("sharp")
const got = require("got");
const fs = require('fs')


router.get('/hello',async(req,res)=>{
  res.send('helloworld')
})

router.post('/rembg', async (req, res) => {
    try {


        const imageBuffer = await got(req.body.url).buffer();
        const input = sharp(imageBuffer);

        // optional arguments
        const rembg = new Rembg({
            logging: true,
        });

        const output = await rembg.remove(input);


        await output.png().toFile("helloworl2.png");
        
        // const img= fetch('')



        function toBase64(filePath) {
            const img = fs.readFileSync(filePath);
          
            return Buffer.from(img).toString('base64');
          }


          const myimage = toBase64('helloworl2.png')
          const withPrefix = 'data:image/png;base64,' + myimage

        const url = "https://api.cloudinary.com/v1_1/dextrzp2q/image/upload"

        // https://faithful-bass-yoke.cyclic.app/api/sendImg/
    
        const formData = new FormData()
    
        formData.append('file', withPrefix)
        formData.append('upload_preset', 'dga8po59')
    
        const response = await fetch(url, {
          method: 'post', // *GET, POST, PUT, DELETE, etc.
    
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
    
          body: formData // body data type must match "Content-Type" header
        });
        const myurl = await response.json()
    //     // const contents = await fs.readFile('helloworl.webp',{encoding:'base64url'});
       

    //    const imgResult = await cloudinary.uploader.upload(changeimg)
       
    //     // // optionally you can use .trim() too!
    //     // // await output.trim().webp().toFile("test-output-trimmed.webp");



        res.send(myurl)
    } catch (error) {
        res.status(500).send("Some iNTERNAL sERVER ERROR")
        console.error(error)
    }
})


module.exports = router