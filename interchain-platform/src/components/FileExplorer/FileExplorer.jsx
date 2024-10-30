import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuItem,
  Drawer,
  Toolbar,
  Divider,
  Button,
  TextField,
} from '@mui/material';
import {
  Folder as FolderIcon,
  Description as FileIcon,
  CloudQueue as CloudIcon,
  MoreVert as MoreVertIcon,
  CreateNewFolder as CreateNewFolderIcon,
  Upload as UploadIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  DriveFileMove as MoveIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

function FileExplorer() {
  const [selectedStorage, setSelectedStorage] = useState('local');
  const [currentPath, setCurrentPath] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const storageProviders = [
    { id: 'local', name: 'Local Storage', icon: <FolderIcon /> },
    { id: 'gdrive', name: 'Google Drive', icon: <CloudIcon /> },
    { id: 'onedrive', name: 'OneDrive', icon: <CloudIcon /> },
  ];

  const mockFiles = [
    { id: 1, name: 'Documents', type: 'folder' },
    { id: 2, name: 'Images', type: 'folder' },
    { id: 3, name: 'report.pdf', type: 'file' },
    { id: 4, name: 'presentation.pptx', type: 'file' },
  ];

  const handleStorageChange = (storage) => {
    setSelectedStorage(storage);
    setCurrentPath([]);
  };

  const handleFileClick = (file) => {
    if (file.type === 'folder') {
      setCurrentPath([...currentPath, file.name]);
    } else {
      setSelectedFile(file);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledDrawer variant="permanent">
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {storageProviders.map((provider) => (
              <ListItem
                key={provider.id}
                disablePadding
                selected={selectedStorage === provider.id}
              >
                <ListItemButton onClick={() => handleStorageChange(provider.id)}>
                  <ListItemIcon>{provider.icon}</ListItemIcon>
                  <ListItemText primary={provider.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem>
              <Button
                startIcon={<CreateNewFolderIcon />}
                fullWidth
                variant="outlined"
              >
                New Folder
              </Button>
            </ListItem>
            <ListItem>
              <Button
                startIcon={<UploadIcon />}
                fullWidth
                variant="outlined"
                component="label"
              >
                Upload File
                <input type="file" hidden />
              </Button>
            </ListItem>
          </List>
        </Box>
      </StyledDrawer>

      <Main>
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Breadcrumbs>
                <Typography
                  color="inherit"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setCurrentPath([])}
                >
                  {selectedStorage.charAt(0).toUpperCase() + selectedStorage.slice(1)}
                </Typography>
                {currentPath.map((path, index) => (
                  <Typography
                    key={index}
                    color="inherit"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
                  >
                    {path}
                  </Typography>
                ))}
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <TextField
                size="small"
                placeholder="Search files..."
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Paper>
          <List>
            {mockFiles.map((file) => (
              <ListItem
                key={file.id}
                secondaryAction={
                  <IconButton edge="end" onClick={handleMenuOpen}>
                    <MoreVertIcon />
                  </IconButton>
                }
              >
                <ListItemButton onClick={() => handleFileClick(file)}>
                  <ListItemIcon>
                    {file.type === 'folder' ? <FolderIcon /> : <FileIcon />}
                  </ListItemIcon>
                  <ListItemText primary={file.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <ShareIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Share</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <DownloadIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Download</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <MoveIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Move</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </Main>
    </Box>
  );
}

export default FileExplorer;
