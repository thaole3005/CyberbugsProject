import { BaseService } from './baseService';


class ProjectService extends BaseService {

    getAllProjectCategory = () => {
        return this.get('ProjectCategory');
    }

    createProject = (newProject) => {
        return this.post('Project/createProjectAuthorize', newProject);
    }

    getProjectList = () => {
        return this.get('Project/getAllProject');
    }

    updateProject = (updatedProject) => {
        return this.put(`Project/updateProject?projectId=${updatedProject.id}`, updatedProject);
    }

    deleteProject = (projectId) => {
        return this.delete(`Project/deleteProject?projectId=${projectId}`);
    }

    getProjectDetail = (projectId) => {
        return this.get(`Project/getProjectDetail?id=${projectId}`);
    }
}

export const projectService = new ProjectService();