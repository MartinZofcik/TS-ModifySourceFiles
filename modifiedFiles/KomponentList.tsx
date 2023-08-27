export const RenamedKomponent = (props) => {
  const RenamedLiteral = "Renamed string";
  [data] = useRenamedQuery()
  return data.map(d => <RenamedKomponent data={d} />
}