const router = require("express").Router();
const Snippet = require("../models/snippetModel");
const auth = require("../middleware/auth");

/*
router.get("/test", (req, res) => {
    res.send("Router test");
});
*/

router.get("/", auth, async(req, res) => {
    try {
        //console.log(req.user);
        //const token = req.cookies.token;
        //console.log(token);

        const snippet = await Snippet.find({ user: req.user });
        res.json(snippet);
    }
    catch(err) {
        res.status(500).send();
    } 
});

router.post("/", auth, async (req, res) => {
    try{
        const {title, description, code} = req.body;
        
        //validation

        if(!description && !code) {
            return res.status(400).json({ errorMessage: "you need to enter at least description or some code"});
        }

        const newSnippet = new Snippet({
            title, 
            description, 
            code,
            user: req.user,
        });

        const savedSnippet = await newSnippet.save();
        res.json(savedSnippet);
    }
    catch(err) {
        res.status(500).send();
    }
});

router.put("/:id", async (req, res) => {
    try {
        const {title, description, code} = req.body;
        const snippetId = req.params.id;
        //console.log(snippetId);
        
        //validation

        if(!description && !code) {
            return res.status(400).json({ errorMessage: "you need to enter at least description or some code"});
        }

        if(!snippetId) 
            return res.status(400).json({ errorMessage: "snippet Id not given, plz contact the developer" }); 
        

        const originalSnippet = await Snippet.findById(snippetId);
        if(!originalSnippet) 
            return res.status(400).json({ errorMessage: "no snippet with this id found, plz contact the developer"});
        
        if(originalSnippet.user.toString() !== req.user)
            //return res.status(401).json({ errorMessage: "Unauthorized.123"});

        originalSnippet.title = title;
        originalSnippet.description = description;
        originalSnippet.code = code;
        
        const savedSnippet = await originalSnippet.save();

        res.json(savedSnippet);

    }
    catch(err) {
        res.status(500).send();
    }
})


router.delete("/:id", auth, async (req, res) => {
    try{
        const snippetId = req.params.id;
        //console.log(snippetId);
        
        //validation
        if(!snippetId) 
            return res.status(400).json({ errorMessage: "snippet Id not given, plz contact the developer" }); 
        

        const existingSnippet = await Snippet.findById(snippetId);
        if(!existingSnippet) 
            return res.status(400).json({ errorMessage: "no snippet with this id found, plz contact the developer"});
        
        if(existingSnippet.user.toString() !== req.user)
            return res.status(401).json({ errorMessage: "Unauthorized."});
 

        await existingSnippet.delete();
        
        res.json(existingSnippet);
    }
    catch(err) {
        res.status(500).send();
    }
});

module.exports = router;