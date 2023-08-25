import { Project, SyntaxKind } from "ts-morph";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });

for (const sourceFile of project.getSourceFiles("EntityKomponentList.tsx")) {
  for (const arrowFunc of sourceFile.getDescendantsOfKind(
    SyntaxKind.VariableDeclaration
  ))
    if (arrowFunc.getName() === "EntityKomponent") {
      arrowFunc.rename("aaaa");
    }
}
project.save();
