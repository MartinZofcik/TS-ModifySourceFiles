export const PremenovaneKomponent = (props) => {
  [data] = usePremenovaneQuery()
  const PremenovaneLiteral = "Premenovane string";
  return data.map(d => <PremenovaneKomponent data={d} />
}