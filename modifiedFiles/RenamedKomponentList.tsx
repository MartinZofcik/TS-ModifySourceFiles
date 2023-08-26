export const RenamedKomponent = (props) => {
  [data] = useRenamedQuery()
  const RenamedLiteral = "Renamed string";
  return data.map(d => <RenamedKomponent data={d} />
}