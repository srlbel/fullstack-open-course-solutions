export const filterChange = (filter) => {
  return {
    type: 'filter/setFilter',
    payload: { filter }
  }
}