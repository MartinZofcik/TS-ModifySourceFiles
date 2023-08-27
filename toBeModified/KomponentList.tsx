export const EntityKomponent = (props) => {
  const entityLiteral = "Entity string";
  [data] = useEntityQuery()
  return data.map(d => <EntityKomponent data={d} />
}