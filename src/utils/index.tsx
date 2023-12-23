import { FolderStructure, File } from '../Workspace/WorkspaceContext';

// Function to generate folder structure from an array of files
export const generateFolderStructure = (files: File[]) => {
  // Function to add a file to the folder structure
  const addToStructure = (acc: FolderStructure, file: File) => {
    // Splitting the file path into an array of path segments
    const pathArray = file.path.split('/');
    let current = acc;

    // Looping through each segment in the path array
    for (let i = 0; i < pathArray.length; i++) {
      const segment = pathArray[i];
      const isLastSegment = i === pathArray.length - 1;

      // Finding the existing node in the current folder structure
      let existingNode = current.children?.find(
        child => child.name === segment
      );

      // If the node doesn't exist, create a new node
      if (!existingNode) {
        const newNode = {
          name: segment,
          type: isLastSegment ? 'file' : 'folder',
          children: isLastSegment ? undefined : [],
          contents: isLastSegment ? file.contents : undefined
        };

        // If children array doesn't exist, create one
        if (!current.children) {
          current.children = [];
        }

        // Adding the new node to the children array
        current.children.push(newNode);
        // Sorting the children nodes alphabetically by name
        current.children.sort((a, b) => a.name.localeCompare(b.name));
        existingNode = newNode;
      }

      current = existingNode;
    }

    return acc;
  };

  // Initial structure with the root folder name
  const initialStructure: FolderStructure = {
    name: 'Cytora Technical Challenge',
    type: 'folder',
    children: []
  };

  // Adding files to the folder structure using the addToStructure function
  const structureWithFiles = files.reduce(
    (acc, file) => addToStructure(acc, file),
    initialStructure
  );

  return structureWithFiles;
};
