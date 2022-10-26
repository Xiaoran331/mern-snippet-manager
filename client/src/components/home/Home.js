import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import "./Home.scss";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

function Home() {
    const [snippets, setSnippets] = useState([]);
    const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);
    const [editSnippetData, setEditSnippetData] = useState(null);

    const { user } = useContext(UserContext);

    useEffect(() => {
        if(!user) {
            setSnippets([]);
        }
        else
        //get snippet
        getSnippets();
    }, [user]);

    async function getSnippets() {
        const snippetsRes = await Axios.get("http://localhost:3333/snippet/");
        //console.log(snippetsRes);
        setSnippets(snippetsRes.data);
    }

    function editSnippet(snippetData) {
        setEditSnippetData(snippetData);
        setSnippetEditorOpen(true);
    }
    
    function renderSnippets() {

        let sortedSnippets = [...snippets];
        sortedSnippets = sortedSnippets.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return sortedSnippets.map((snippet, i) => {
            return <Snippet key={i} snippet={snippet} getSnippets={getSnippets}
            editSnippet={editSnippet}/>
        })
    }

    return (<div className="home">
        {!snippetEditorOpen && (
            <button className="btn-editor-toggle" onClick={() => setSnippetEditorOpen(true)}>
            Add snippet 
            </button>
        )}
        {snippetEditorOpen && 
            <SnippetEditor 
            setSnippetEditorOpen={setSnippetEditorOpen}
            getSnippets={getSnippets}
            editSnippetData={editSnippetData}/>
        }
        {snippets.length > 0 ? (
        renderSnippets()
        ) : user && (
            <p className="no-snippets-msg">No snippets have been added yet.</p>
        )}
        {user === null && 
            <div className="no-user-message">
                <h2>Welcome to snippet manager</h2>
                <Link to="/register">Register Here</Link>
            </div>
        }
        </div>);
}

export default Home;