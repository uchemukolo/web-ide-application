import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import files from '../defaultFiles';
import Workspace from '../Workspace/Workspace';

describe('Workspace Component', () => {
  const mockFile = {
    name: 'File Name',
    type: 'file',
    contents: 'File Details'
  };
  it('renders Workspace component properly', () => {
    render(<Workspace files={files} />);

    expect(screen.getByPlaceholderText('Search file...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search file...')).toHaveAttribute(
      'type',
      'text'
    );
    expect(screen.getByTestId('folder-tree')).toBeInTheDocument();
    expect(screen.getByTestId('file-details')).toBeInTheDocument();
  });

  it('handles file click and displays details properly', () => {
    render(<Workspace files={files} />);

    // Simulate a file click action
    const fileNode = screen.getByText(mockFile.name);
    fireEvent.click(fileNode);

    // Add assertions to verify if the file details are displayed properly
    expect(screen.getByText(mockFile.contents)).toBeInTheDocument();
    expect(screen.getByTestId('file-details')).not.toHaveTextContent(
      mockFile.contents
    );
    // Simulate a file click action
    fireEvent.click(fileNode);
    expect(screen.getByTestId('file-details')).toHaveTextContent(
      'File Details'
    );
  });

  it('handles search functionality', () => {
    render(<Workspace files={files} />);

    // Simulate a search action
    const searchBar = screen.getByPlaceholderText('Search file...');
    fireEvent.change(searchBar, { target: { value: 'searchQuery' } });

    // Add assertions to check if the search functionality works as expected
    expect(screen.getByText('Search Results')).toBeInTheDocument();
    expect(screen.getByTestId('folder-tree')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search file...')).toHaveValue('');
    // Simulate a search action
    fireEvent.change(searchBar, { target: { value: 'searchQuery' } });
    expect(screen.getByTestId('folder-tree')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search file...')).toHaveValue(
      'searchQuery'
    );
  });
});
