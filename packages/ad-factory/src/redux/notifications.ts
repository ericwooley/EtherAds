import { Store, Dispatch, Action } from 'redux'
import iziToast, { IziToastSettings } from 'izitoast'
import { IAction } from 'typed-redux-reducers'
import { colors } from '../theme'
const actionCreatorFactory = (type: string) => (
  payload: IziToastSettings
): IAction<IziToastSettings> => ({
  type: ['NOTIFICATION', type].filter(t => !!t).join('/'),
  payload: {
    timeout: 20000,
    resetOnHover: true,
    ...payload,
    message: (payload.message || '').slice(0, 100).trim()
  }
})
export const notificationActionCreators = {
  notification: actionCreatorFactory(''),
  successNotification: actionCreatorFactory('success'),
  errorNotification: actionCreatorFactory('error')
}
export default (str: Store<any>) => (next: Dispatch<IAction>) => (
  action: IAction<IziToastSettings>
) => {
  if (action.type === 'NOTIFICATION') {
    iziToast.show(action.payload)
  } else if (action.type === 'NOTIFICATION/success') {
    iziToast.success(action.payload)
  } else if (action.type === 'NOTIFICATION/error') {
    iziToast.error(action.payload)
  }
  next(action)
}
