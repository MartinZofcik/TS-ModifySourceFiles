export const EntityKomponent = (props) => {
  [data] = useEntityQuery()
  const entityLiteral = "Entity string";
  return data.map(d => <EntityKomponent data={d} />
}