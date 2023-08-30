import { Project, SyntaxKind } from "ts-morph";

// create and configurate ts-morph project
const project = new Project({ tsConfigFilePath: "tsconfig.json" });

// get command-line parameter
const renameTo = process.argv.slice(2);

const renameVarDeclarations = (sourceFile) => {
  for (const variableDec of sourceFile.getDescendantsOfKind(
    SyntaxKind.VariableDeclaration
  )) {
    const variableMatches = variableDec.getName().match(/Entity/gi);
    // if variable contains "Entity", rename
    if (variableMatches) {
      const newVariableDec = variableDec
        .getName()
        .replace(variableMatches[0], renameTo);
      variableDec.rename(newVariableDec);
    }
  }
};

const renameExpressions = (sourceFile) => {
  for (const expression of sourceFile.getDescendantsOfKind(
    SyntaxKind.ExpressionStatement
  )) {
    const expressionMatches = expression.getText().match(/Entity/gi);
    if (expressionMatches) {
      const newExpression = expression
        .getText()
        .replace(expressionMatches[0], renameTo);
      expression.setExpression(newExpression);
    }
  }
};

const renameStringLiterals = (sourceFile) => {
  for (const stringLiteral of sourceFile.getDescendantsOfKind(
    SyntaxKind.StringLiteral
  )) {
    const stringLiteralMatches = stringLiteral
      .getLiteralText()
      .match(/Entity/gi);
    if (stringLiteralMatches) {
      const newStringLiteral = stringLiteral
        .getLiteralText()
        .replace(stringLiteralMatches[0], renameTo);
      stringLiteral.setLiteralValue(newStringLiteral);
    }
  }
};

// loop over entire folder
for (const sourceFile of project.getSourceFiles("./toBeModified/*.tsx")) {
  // rename variables of type SyntaxKind.VariableDeclaration containing "entity" || "Entity"
  renameVarDeclarations(sourceFile);

  // rename expressions of type SyntaxKind.ExpressionStatement containing "entity" || "Entity"
  renameExpressions(sourceFile);

  // rename string literals of type SyntaxKind.StringLiteral containing "entity" || "Entity"
  renameStringLiterals(sourceFile);

  // rename file if contains "Entity" and move to final folder
  // if (sourceFile.getFilePath().match(/Entity/g) != -1) {
  //   const newFileName = sourceFile
  //     .getBaseName()
  //     .toString()
  //     .replace("Entity", renameTo);
  //   sourceFile.move("./modifiedFiles/" + newFileName);
  // } else {
  //   // else just move to final folder without renaming
  //   sourceFile.move("./modifiedFiles/");
  // }
}

//save changes
project.save();
