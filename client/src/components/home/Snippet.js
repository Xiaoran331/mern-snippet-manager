import React from "react";
import Axios from "axios";
import "./Snippet.scss";

function Snippet({ snippet, getSnippets, editSnippet }) {
    
    async function deleteSnippet() {
        if(window.confirm("Do you want to delete this Snippet?")){
        await Axios.delete(`http://localhost:3333/snippet/${snippet._id}`);

        getSnippets();
        }
    }

    return (
    <div className="snippet">
        <p>
            some more text<a herf="/">Test link</a>
        </p>
        {snippet.title && <h2 className="title">{snippet.title}</h2>}
        {snippet.description && <p className="description">{snippet.description}</p>}
        {snippet.code && (<pre className="code">
            <code>{snippet.code}</code>
            </pre>
            )
        } 
    <button className="btn-edit" onClick={() => editSnippet(snippet)}>Edit</button>
    <button className="btn-delete"onClick={deleteSnippet}>Delete</button>
    </div>
    );
};

export default Snippet;