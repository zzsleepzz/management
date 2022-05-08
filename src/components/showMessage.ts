
import { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider';


/**
 * 渲染信息提示
 * @param message message 体, 使用 useMessage 创建 
 * @param msg  提示信息
 * @param level 
 *  1: 为绿色正确
 *  2: 为蓝色提示
 * @returns 
 */
export const doShowMessage = (message : MessageApiInjection, msg : string, level : number) => {
    if(level === 1) {
       message.info(msg);
       return;
   }
   message.success(msg);
}