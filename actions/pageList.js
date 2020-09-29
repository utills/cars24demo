import { GET_PAGE_LIST } from '../constants';
export function setPageList(pageList) {
  return {
    type: GET_PAGE_LIST,
    payload: pageList,
  };
}
export function getPageList() {
  return async (dispatch) => {
    try {
      const apiReq = await fetch('https://jsonplaceholder.typicode.com/photos', {
        method: 'GET'
      });
      let response = await apiReq.text();
      let responseJson = JSON.parse(response)
      await dispatch(setPageList(responseJson));
      return responseJson || [];
    } catch (error) {
      console.error(error);
    }
  };
}