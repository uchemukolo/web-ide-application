import React, { useEffect, useState } from 'react';
import { File, FolderStructure, FileTreeProps } from './WorkspaceContext';
import { generateFolderStructure } from '../utils';
import FolderTreeView from './FolderTreeView';
import FileDetailsView from './FileDetailsView';
import './Workspace.css';

const Workspace: React.FC<FileTreeProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [value, setValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [folderStructure, setFolderStructure] = useState<FolderStructure>(
    generateFolderStructure(files) // Generating the initial folder structure from files
  );

  // Function to handle changes in the search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase().trim();

    // Function to filter the folder structure based on the search query
    const filterFolder = (folder: FolderStructure): FolderStructure => {
      const filteredChildren = (folder.children || []).filter(child => {
        const nameMatch = child.name.toLowerCase().includes(query);

        // Recursively filter folders and files based on the search query
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

    // Update the folder structure based on the filtered results
    const filteredStructure: FolderStructure = {
      ...generateFolderStructure(files), // Generate a fresh folder structure
      children: (generateFolderStructure(files).children || []).map(child =>
        filterFolder(child)
      )
    };

    setSearchQuery(query); // Set the search query state
    setFolderStructure(filteredStructure); // Update the folder structure state
  };

  // Function to handle file click events
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

  // Function to handle changes in the file contents and save to localStorage
  useEffect(() => {
    if (selectedFile && value.length) {
      localStorage.setItem(selectedFile.nodeData.name, value);
      setValue('');
    }
  }, [selectedFile, value]);

  return (
    <div className="workspace-container">
      <div className="folder-tree" data-testid="folder-tree">
        {/* Search bar for filtering files */}
        <input
          type="text"
          placeholder="Search file..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
          data-testid="search-bar"
        />
        {/* Component to display the folder structure */}
        <FolderTreeView
          folderStructure={folderStructure}
          onFileClick={handleFileClick}
        />
      </div>
      <div className="file-details" data-testid="file-details">
        {selectedFile ? (
          // Component to display file details and contents
          <FileDetailsView
            selectedFile={selectedFile}
            value={value}
            onChange={setValue}
          />
        ) : (
          // Placeholder when no file is selected
          <div className="file-details-placeholder">
            - Select a file to view its contents or type in the search bar to
            search for a file
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
