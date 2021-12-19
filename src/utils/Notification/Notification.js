
import {notification} from 'antd';


export const displayNotifyFunction = (type, message, description ='') => {

    notification[type]({
        //typeNotification  = "success" || "error" || "warning" || "info" 
        message: message,
        description: description,
      });

}




