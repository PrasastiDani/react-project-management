import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, CardActions, Typography, Button, Grid, MenuItem, Select, FormControl, InputLabel, TextField, Modal, Paper, CircularProgress, IconButton } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AddProjectForm from './AddProjectForm';
import TaskListComponent from './TaskListComponent';
import AddTaskForm from './AddTaskForm';
import { fetchProjects, addProject } from '../redux/projectSlice';
import { useAuth } from '../auth/AuthContext';

const ProjectListComponent = ({ onProjectSelect }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const projectStatus = useSelector((state) => state.projects.status);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('lastAdded');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const projectsPerPage = 9;
  const { user } = useAuth();

  useEffect(() => {
    if (projectStatus === 'idle') {
      dispatch(fetchProjects());
    }
  }, [projectStatus, dispatch]);

  const handleProjectAdded = (newProject) => {
    dispatch(addProject(newProject));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewTasks = (projectId) => {
    setSelectedProject(projectId);
    setTaskModalOpen(true);
  };

  const handleAddTaskClick = () => {
    setAddTaskModalOpen(true);
  };

  const sortProjects = (projects) => {
    switch (sortCriteria) {
      case 'lastAdded':
        return projects.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'earliestAdded':
        return projects.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      default:
        return projects;
    }
  };

  const sortedProjects = sortProjects(projects);
  const filteredProjects = sortedProjects.filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 4, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Daftar Proyek
      </Typography>
      {user.username === 'admin' && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
          sx={{
            marginBottom: 2,
            background: 'linear-gradient(to right, #6a11cb, #2575fc)',
            color: '#fff',
            '&:hover': { background: 'linear-gradient(to right, #2575fc, #6a11cb)' }
          }}
          startIcon={<AddIcon />}
        >
          Tambahkan Proyek Baru
        </Button>
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="sort-label">Urutkan Proyek</InputLabel>
          <Select
            labelId="sort-label"
            id="sort"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            label="Urutkan Proyek"
          >
            <MenuItem value="lastAdded">Terbaru Ditambahkan</MenuItem>
            <MenuItem value="earliestAdded">Terlama Ditambahkan</MenuItem>
          </Select>
        </FormControl>
        <Box display="flex" alignItems="center">
          <TextField
            label="Cari Nama Proyek"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <SearchIcon />
              ),
            }}
            sx={{ marginLeft: 2 }}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {projectStatus === 'loading' ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: '100%', height: '100px' }}>
            <CircularProgress />
          </Box>
        ) : (
          currentProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card
                sx={{
                  width: '100%',
                  height: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: '0.3s',
                  '&:hover': { boxShadow: 8 }
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <AssignmentIcon color="primary" />
                    <Typography variant="h6" component="div">
                      {project.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {project.description || 'Tidak ada deskripsi'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleViewTasks(project.id)}
                    sx={{
                      background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                      color: '#fff',
                      '&:hover': { background: 'linear-gradient(to right, #2575fc, #6a11cb)' }
                    }}
                  >
                    Lihat Tugas
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          sx={{ marginRight: 1 }}
        >
          Previous
        </Button>
        <Typography variant="body2">
          Halaman {currentPage} dari {totalPages}
        </Typography>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          sx={{ marginLeft: 1 }}
        >
          Next
        </Button>
      </Box>

      {user.username === 'admin' && (
        <AddProjectForm
          onProjectAdded={handleProjectAdded}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}

      <Modal open={taskModalOpen} onClose={() => setTaskModalOpen(false)}>
        <Paper
          sx={{
            width: '80%',
            maxWidth: 600,
            height: '80%',
            maxHeight: 450,
            overflowY: 'auto',
            padding: 3,
            margin: '40px auto',
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -20%)',
            borderRadius: 2,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => setTaskModalOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          {/* Tambahkan margin di bawah IconButton */}
          <Box mt={6}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Typography variant="h6">Daftar Tugas</Typography>
              {user.username === 'admin' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddTaskClick}
                  startIcon={<AddIcon />}
                  sx={{
                    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                    color: '#fff',
                    '&:hover': { background: 'linear-gradient(to right, #2575fc, #6a11cb)' },
                  }}
                >
                  Tambahkan Tugas
                </Button>
              )}
            </Box>
            <div
              className="task-list"
              style={{
                maxHeight: 350,
                overflowY: 'auto',
                margin: '0 auto',
                padding: '0 10px',
              }}
            >
              <TaskListComponent projectId={selectedProject} />
            </div>
          </Box>
        </Paper>
      </Modal>


      {user.username === 'admin' && (
        <Modal open={addTaskModalOpen} onClose={() => setAddTaskModalOpen(false)}>
        <Paper
          sx={{
            padding: 3,
            maxWidth: 400,
            margin: '20px auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 2,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => setAddTaskModalOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box mt={6}>
            <AddTaskForm projectId={selectedProject} onTaskAdded={() => { }} />
          </Box>
        </Paper>
      </Modal>
      
      )}
    </Box>
  );
};

export default ProjectListComponent;
