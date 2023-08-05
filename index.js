const express = require('express');
require("dotenv").config();
const cors = require("cors");
const app = express();

const axios = require('axios');
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get("/data", (req, res) => {
    res.send('datadfsaf');
})

app.post('/convert', async (req, res) => {
    console.log('data');
    try {
        const { code, language ,debug } = req.body;

        // let prompt, convertedCode;

        if (language == "python") {
            let a = `Convert this code:${code} into python code with accuracy percent`;
            console.log(a);
            const response = await axios.post(
                'https://api.openai.com/v1/engines/text-davinci-003/completions',
                {
                    prompt: a,
                    max_tokens: 2000, // Adjust the number of tokens as per your requirements
                    n: 1
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    },
                }
            );

            // Extract the generated Shayari from the response
            const data = response.data.choices[0].text.trim();
            res.send({ "msg": data });
            return;
        } else if (language == "javascript") {
            let a = `Convert this code:${code} into javascript code`;
            console.log(a);
            const response = await axios.post(
                'https://api.openai.com/v1/engines/text-davinci-003/completions',
                {
                    prompt: a,
                    max_tokens: 2000, // Adjust the number of tokens as per your requirements
                    n: 1
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    },
                }
            );

            // Extract the generated Shayari from the response
            const data = response.data.choices[0].text.trim();
            res.send({ "msg": data });
            return;

        } else if (language == "java") {
            let a = `Convert this code:${code} into java code`;
            console.log(a);
            const response = await axios.post(
                'https://api.openai.com/v1/engines/text-davinci-003/completions',
                {
                    prompt: a,
                    max_tokens: 2000, // Adjust the number of tokens as per your requirements
                    n: 1
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    },
                }
            );

            // Extract the generated Shayari from the response
            const data = response.data.choices[0].text.trim();
            res.send({ "msg": data });
            return;

        }


    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred during code conversion.');
    }
});

app.post("/debug",async(req,res)=>{
    try {
        const { code} = req.body;
        let a = `${code} debug this code and provide what is write  what we have to change or put`;
            console.log(a);
            const response = await axios.post(
                'https://api.openai.com/v1/engines/text-davinci-003/completions',
                {
                    prompt: a,
                    max_tokens: 1000, // Adjust the number of tokens as per your requirements
                    n: 1
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    },
                }
            );

            // Extract the generated Shayari from the response
            const data = response.data.choices[0].text.trim();
            res.send({ "msg": data });
        
    } catch (error) {
     res.send({"msg":error.message})   
    }
})

app.post("/quality",async(req,res)=>{
    try {
        const { code } = req.body;
        let a = `${code} provide me a quality check for this code with the percentage and some details`;
            console.log(a);
            const response = await axios.post(
                'https://api.openai.com/v1/engines/text-davinci-003/completions',
                {
                    prompt: a,
                    max_tokens: 2000, // Adjust the number of tokens as per your requirements
                    n: 1
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    },
                }
            );

            // Extract the generated Shayari from the response
            const data = response.data.choices[0].text.trim();
            res.send({ "msg": data });
        
    } catch (error) {
     res.send({"msg":error.message})   
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
