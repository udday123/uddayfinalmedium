import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import axios from "axios";
import { BACKEND_URL } from "./config";

// Define TypeScript types
interface ToolbarProps {
  applyStyles: (style: string) => void;
  applyType: (blockType: string) => void;
}

interface EditorProps {
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
}

interface PublishProps {
  titleState: EditorState;
  descriptionState: EditorState;
}

// Toolbar Component
const Toolbar: React.FC<ToolbarProps> = ({ applyStyles, applyType }) => (
  <div className="flex gap-2 mb-3">
    <button onClick={() => applyStyles("BOLD")} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md">Bold</button>
    <button onClick={() => applyStyles("ITALIC")} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md">Italic</button>
    <button onClick={() => applyType("header-one")} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md">H1</button>
    <button onClick={() => applyType("header-two")} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md">H2</button>
  </div>
);

// Title Editor Component
const TitleEditor: React.FC<EditorProps> = ({ editorState, setEditorState }) => {
  const applyStyles = (style: string) => setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  const applyType = (style: string) => setEditorState(RichUtils.toggleBlockType(editorState, style));

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-2">Title</h2>
      <Toolbar applyStyles={applyStyles} applyType={applyType} />
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};

// Description Editor Component
const RichTextEditor: React.FC<EditorProps> = ({ editorState, setEditorState }) => (
  <div className="max-w-3xl mx-auto mt-6 p-4 border rounded-lg shadow-lg bg-white">
    <h2 className="text-xl font-semibold mb-2">Description</h2>
    <Editor editorState={editorState} onChange={setEditorState} />
  </div>
);

// Publish Component
const Publish: React.FC<PublishProps> = ({ titleState, descriptionState }) => {
  const [loading,setloading]=useState(false);
  const handlePublish = async () => {

    const title = titleState.getCurrentContent().getPlainText().trim();
    const content = descriptionState.getCurrentContent().getPlainText().trim();
  
    if (!title || !content) {
      alert("Title and Description cannot be empty!");
      return;
    }

    setloading(true);
  
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog/create`, { title, content },{
        headers:{
          Authorization:localStorage.getItem("token")
        }
      });
      console.log("Success:", response.data);
      alert("Post published successfully!");
      
    } catch (error: any) { // Explicitly typing error
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Server Error:", error.response.data);
        alert(error.response.data.message || "Failed to publish. Please try again.");
      } else if (error.request) {
        // Request was made but no response received
        console.error("No Response from Server:", error.request);
        alert("Server is not responding. Please try again later.");
      } else {
        // Something else happened
        console.error("Error:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }finally{
      setloading(false);
    }
  };
  

  return (
    <div className="w-full flex justify-center mt-6">
      <button onClick={handlePublish} className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md shadow-md">
      {loading ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
};

// Main Editor Component
export const CompletEditor: React.FC = () => {
  const [titleState, setTitleState] = useState<EditorState>(EditorState.createEmpty());
  const [descriptionState, setDescriptionState] = useState<EditorState>(EditorState.createEmpty());

  return (
    <div>
      <TitleEditor editorState={titleState} setEditorState={setTitleState} />
      <RichTextEditor editorState={descriptionState} setEditorState={setDescriptionState} />
      <Publish titleState={titleState} descriptionState={descriptionState} />
    </div>
  );
};
