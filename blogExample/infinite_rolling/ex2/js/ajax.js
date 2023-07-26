// Ajax 요청
export const fetchData = (path) => {
  return $.ajax({
    url: path,
    method: 'GET',
    dataType: 'json',
    async: false,
  });
};