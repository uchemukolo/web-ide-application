export interface File {
  nodeData: any;
  path: string;
  contents?: string;
}

export interface FolderStructure {
  name: string;
  type: string;
  children?: FolderStructure[];
  contents?: string;
  setSearchQuery?: (query: string) => void;
  setFolderStructure?: (folderStructure: FolderStructure) => void;
}

export interface FileTreeProps {
  files: File[];
}
