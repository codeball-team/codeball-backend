import { model } from 'utils';

const ErrorModel = model({
  getDefaultAttributes: () => ({
    title: undefined,
    message: undefined,
    isSilent: false
  }),

  fromServerFormat(serverResponse) {
    return new ErrorModel({
      title: serverResponse.error || 'Error',
      message: serverResponse.message,
      isSilent: serverResponse.isSilent
    });
  }
});

export default ErrorModel;
