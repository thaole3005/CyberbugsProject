import React from 'react'
import { Editor } from '@tinymce/tinymce-react'; 


export default function CreateProject() {

    const handleEditorChange = (content, editor) => {
        console.log("content", content);
        console.log("editor", editor);
        
    }


    return (
        <div className="container mt-4">
            <h3>CreateProject</h3>
            <form className="container">
                <div className="form-group">
                    <p>Name</p>
                    <input className="form-control" name = "projectName"/>
                </div>
                <div className="form-group">
                    <p>Description</p>
                    <>
                        <Editor
                            name = "description"
                            initialValue="<p>This is the description of your project.</p>"
                            init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                             'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </>
               
                </div>
                <div className="form-group">
                   <select name = "categoryId" className="form-control">
                       <option>Software</option>
                       <option>Web</option>
                       <option>App</option>
                   </select>
                </div>
                <button className="btn btn-success" type ="submit">Create project</button>
            </form>
        </div>
    )
}

