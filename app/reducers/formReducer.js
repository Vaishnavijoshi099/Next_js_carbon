
const initialState = {
    dropdown1: '',
    dropdown2: '',
    textInput1: '',
    textInput2: '',
    textInputButton: '',
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SUBMIT_FORM':
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };
  
  export default formReducer;
  