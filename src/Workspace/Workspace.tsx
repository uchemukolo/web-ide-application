import React, { useEffect, useState } from 'react';
import { File, FolderStructure, FileTreeProps } from './WorkspaceContext';
import { generateFolderStructure } from '../utils';
import FolderTreeView from './FolderTreeView';
import FileDetailsView from './FileDetailsView';
import 'react-folder-tree/dist/style.css';
import './Workspace.css';

const Workspace: React.FC<FileTreeProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [value, setValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [folderStructure, setFolderStructure] = useState<FolderStructure>(
    generateFolderStructure(files)
  );

  const handleChange = (value: string | undefined) => {
    setValue(value);
  };

  const handleFileClick = (file: File) => {
    const storedItem = localStorage.getItem(file.nodeData.name);
    if (file.nodeData.type === 'file') {
      if (storedItem) {
        setSelectedFile({
          ...file,
          nodeData: {
            ...file.nodeData,
            contents: storedItem
          }
        });
      } else {
        setSelectedFile(file);
      }
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase().trim();

    const filterFolder = (folder: FolderStructure): FolderStructure => {
      const filteredChildren = (folder.children || []).filter(child => {
        const nameMatch = child.name.toLowerCase().includes(query);

        if (child.type === 'folder') {
          const filteredFolder = filterFolder(child);
          return (
            nameMatch ||
            (filteredFolder.children && filteredFolder.children.length > 0)
          );
        }

        return (
          nameMatch ||
          (child.type === 'file' && child.name.toLowerCase().includes(query))
        );
      });

      return {
        ...folder,
        children: filteredChildren.map(child => {
          if (child.type === 'folder') {
            return filterFolder(child);
          }
          return child;
        })
      };
    };

    const filteredStructure: FolderStructure = {
      ...generateFolderStructure(files),
      children: (generateFolderStructure(files).children || []).map(child =>
        filterFolder(child)
      )
    };

    setSearchQuery(query);
    setFolderStructure(filteredStructure);
  };

  useEffect(() => {
    if (selectedFile && value.length) {
      localStorage.setItem(selectedFile.nodeData.name, value);
      setValue('');
    }
  }, [selectedFile, value]);

  return (
    <div className="workspace-container">
      <div className="folder-tree">
        <input
          type="text"
          placeholder="Search file..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
        <FolderTreeView
          folderStructure={folderStructure}
          onFileClick={handleFileClick}
        />
      </div>
      <div className="file-details">
        <FileDetailsView
          selectedFile={selectedFile}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Workspace;
