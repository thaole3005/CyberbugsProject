import { BaseService } from './baseService';

class TaskService extends BaseService {
    
    getAllTaskType = () => {
        return this.get('TaskType/getAll');
    }

    getAllTaskPriority = () => {
        return this.get(`Priority/getAll`);
    }

    getAllTaskStatus = () => {
        return this.get('Status/getAll');
    }

    createNewTask = (newTask) => {
        return this.post('Project/createTask', newTask);
    }

    getTaskDetail = (taskId) => {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }

    updateTaskStatus = (updateStatusTask) => {
        // console.log("updateStatusTask in taskService", updateStatusTask)
        return this.put('Project/updateStatus', updateStatusTask)
    }

    updateTask = (taskUpdate) => {
        return this.post('Project/updateTask', taskUpdate)
    }

}


export const taskService = new TaskService();