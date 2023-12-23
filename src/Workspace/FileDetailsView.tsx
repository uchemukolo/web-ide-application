import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { File } from './WorkspaceContext';

const FileDetailsView: React.FC<{
  selectedFile: File | null;
  value: string;
  onChange: (value: string | undefined) => void;
}> = ({ selectedFile, onChange }) => {
  return (
    <div>
      <div>{selectedFile?.nodeData.name}</div>
      {selectedFile && (
        <MonacoEditor
          height="750"
          language="javascript"
          theme="vs"
          value={selectedFile?.nodeData.contents}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default FileDetailsView;
