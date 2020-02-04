export default context => () => {
  const {
    $axios,
    app: { $whppt },
  } = context;

  const page = $whppt.page;

  return $axios.post(`${$whppt.baseAPIUrl}/api/page/save`, { page });
};
