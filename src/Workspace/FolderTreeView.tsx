import React from 'react';
import FolderTree from 'react-folder-tree';
import { File, FolderStructure } from './WorkspaceContext';
import 'react-folder-tree/dist/style.css';

const FolderTreeView: React.FC<{
  folderStructure: FolderStructure;
  onFileClick: (file: File) => void;
}> = ({ folderStructure, onFileClick }) => {
  return (
    <FolderTree
      showCheckbox={false}
      data={folderStructure}
      indentPixels={15}
      onNameClick={onFileClick as any}
    />
  );
};

export default FolderTreeView;
