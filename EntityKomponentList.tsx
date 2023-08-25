export const EntityKomponent = (props) => {
  [data] = useEntityQuery()
  return data.map(d => <EntityKomponent data={d} />
}