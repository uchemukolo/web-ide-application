import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import files from './defaultFiles';

import './index.css';
import Workspace from './Workspace/Workspace';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <Workspace files={files} />
  </StrictMode>
);
