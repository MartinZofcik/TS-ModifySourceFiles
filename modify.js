import { Project, SyntaxKind } from "ts-morph";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });

var newVariableDec, newExpression, newFileName, newStringLiteral;
const renameTo = process.argv.slice(2);

// loop over entire folder
for (const sourceFile of project.getSourceFiles("./toBeModified/*.tsx")) {
  // rename variables of type SyntaxKind.VariableDeclaration containing "entity" || "Entity"
  for (const variableDec of sourceFile.getDescendantsOfKind(
    SyntaxKind.VariableDeclaration
  )) {
    // if variable contains "Entity", rename
    if (variableDec.getName().match(/Entity/g) != -1) {
      newVariableDec = variableDec.getName().replace("Entity", renameTo);
      variableDec.rename(newVariableDec);
    }
    // if variable contains "entity", rename
    if (variableDec.getName().match(/entity/g) != -1) {
      newVariableDec = variableDec.getName().replace("entity", renameTo);
      variableDec.rename(newVariableDec);
    }
  }

  // rename expressions of type SyntaxKind.ExpressionStatement containing "entity" || "Entity"
  for (const expression of sourceFile.getDescendantsOfKind(
    SyntaxKind.ExpressionStatement
  )) {
    if (expression.getText().match(/Entity/g) != -1) {
      newExpression = expression.getText().replace("Entity", renameTo);
      expression.setExpression(newExpression);
    }
    if (expression.getText().match(/entity/g) != -1) {
      newExpression = expression.getText().replace("entity", renameTo);
      expression.setExpression(newExpression);
    }
  }

  // rename string literals of type SyntaxKind.StringLiteral containing "entity" || "Entity"
  for (const stringLiteral of sourceFile.getDescendantsOfKind(
    SyntaxKind.StringLiteral
  )) {
    if (stringLiteral.getLiteralText().match(/Entity/g) != -1) {
      newStringLiteral = stringLiteral
        .getLiteralText()
        .replace("Entity", renameTo);
      stringLiteral.setLiteralValue(newStringLiteral);
    }
    if (stringLiteral.getLiteralText().match(/entity/g) != -1) {
      newStringLiteral = stringLiteral
        .getLiteralText()
        .replace("entity", renameTo);
      stringLiteral.setLiteralValue(newStringLiteral);
    }
  }

  // rename file if contains "Entity" and move to final folder
  if (sourceFile.getFilePath().match(/Entity/g) != -1) {
    newFileName = sourceFile
      .getBaseName()
      .toString()
      .replace("Entity", renameTo);
    sourceFile.move("./modifiedFiles/" + newFileName);
  } else {
    // else just move to final folder without renaming
    sourceFile.move("./modifiedFiles/");
  }
}

//save changes
project.save();
