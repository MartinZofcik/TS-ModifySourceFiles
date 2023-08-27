import { Project, SyntaxKind } from "ts-morph";

// create and configurate ts-morph project
const project = new Project({ tsConfigFilePath: "tsconfig.json" });

var variableMatches,
  newVariableDec,
  expressionMatches,
  newExpression,
  stringLiteralMatches,
  newStringLiteral,
  fileNameMatches,
  newFileName;

// get command-line parameter
const renameTo = process.argv.slice(2);

// loop over entire folder
for (const sourceFile of project.getSourceFiles("./toBeModified/*.tsx")) {
  // rename variables of type SyntaxKind.VariableDeclaration containing "entity" || "Entity"
  for (const variableDec of sourceFile.getDescendantsOfKind(
    SyntaxKind.VariableDeclaration
  )) {
    variableMatches = variableDec.getName().match(/Entity/gi);
    // if variable contains "Entity", rename
    if (variableMatches) {
      newVariableDec = variableDec
        .getName()
        .replace(variableMatches[0], renameTo);
      variableDec.rename(newVariableDec);
    }
  }

  // rename expressions of type SyntaxKind.ExpressionStatement containing "entity" || "Entity"
  for (const expression of sourceFile.getDescendantsOfKind(
    SyntaxKind.ExpressionStatement
  )) {
    expressionMatches = expression.getText().match(/Entity/gi);
    if (expressionMatches) {
      newExpression = expression
        .getText()
        .replace(expressionMatches[0], renameTo);
      expression.setExpression(newExpression);
    }
  }

  // rename string literals of type SyntaxKind.StringLiteral containing "entity" || "Entity"
  for (const stringLiteral of sourceFile.getDescendantsOfKind(
    SyntaxKind.StringLiteral
  )) {
    stringLiteralMatches = stringLiteral.getLiteralText().match(/Entity/gi);
    if (stringLiteralMatches) {
      newStringLiteral = stringLiteral
        .getLiteralText()
        .replace(stringLiteralMatches[0], renameTo);
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
