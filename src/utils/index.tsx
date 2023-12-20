import { FolderStructure, File } from '../Workspace/WorkspaceContext';

export const generateFolderStructure = (files: File[]) => {
  const addToStructure = (acc: FolderStructure, file: File) => {
    const pathArray = file.path.split('/');
    let current = acc;

    for (let i = 0; i < pathArray.length; i++) {
      const segment = pathArray[i];
      const isLastSegment = i === pathArray.length - 1;

      let existingNode = current.children?.find(
        child => child.name === segment
      );

      if (!existingNode) {
        const newNode = {
          name: segment,
          type: isLastSegment ? 'file' : 'folder',
          children: isLastSegment ? undefined : [],
          contents: isLastSegment ? file.contents : undefined
        };

        if (!current.children) {
          current.children = [];
        }

        current.children.push(newNode);
        current.children.sort((a, b) => a.name.localeCompare(b.name));
        existingNode = newNode;
      }

      current = existingNode;
    }

    return acc;
  };

  const initialStructure: FolderStructure = {
    name: 'Cytora Technical Challenge',
    type: 'folder',
    children: []
  };

  // Adding files to the structure
  const structureWithFiles = files.reduce(
    (acc, file) => addToStructure(acc, file),
    initialStructure
  );

  return structureWithFiles;
};
