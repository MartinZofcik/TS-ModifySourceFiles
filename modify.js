import { Project, SyntaxKind } from "ts-morph";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });

var newVariableDec, newExpression, newFilePath;

for (const sourceFile of project.getSourceFiles("EntityKomponentList.tsx")) {
  // rename variables containing "entity" || "Entity"
  for (const variableDec of sourceFile.getDescendantsOfKind(
    SyntaxKind.VariableDeclaration
  )) {
    if (variableDec.getName().indexOf("Entity") > -1) {
      newVariableDec = variableDec.getName().replace("Entity", "Premenovane");
      variableDec.rename(newVariableDec);
    }
    if (variableDec.getName().indexOf("entity") > -1) {
      newVariableDec = variableDec.getName().replace("entity", "premenovane");
      variableDec.rename(newVariableDec);
    }
  }

  // rename expressions containing "entity" || "Entity"
  for (const expression of sourceFile.getDescendantsOfKind(
    SyntaxKind.ExpressionStatement
  )) {
    if (expression.getText().indexOf("Entity") > -1) {
      newExpression = expression.getText().replace("Entity", "Premenovane");
      expression.setExpression(newExpression);
    }
    if (expression.getText().indexOf("entity") > -1) {
      newExpression = expression.getText().replace("entity", "premenovane");
      expression.setExpression(newExpression);
    }
  }

  // rename file if contains "Entity"
  if (sourceFile.getFilePath().indexOf("Entity") > -1) {
    newFilePath = sourceFile
      .getFilePath()
      .toString()
      .replace("Entity", "Premenovane");
    sourceFile.move(newFilePath);
  }
}
project.save();
