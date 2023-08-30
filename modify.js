import { Project, SyntaxKind } from "ts-morph";
import { replaceString } from "./utils/replaceString.util.js";

// create and configurate ts-morph project
const project = new Project({ tsConfigFilePath: "tsconfig.json" });

// get command-line parameter
const renameTo = process.argv.slice(2);

const renameVarDeclarations = (sourceFile) => {
  // loop over the objects of type SyntaxKind.VariableDeclaration
  for (const variableDec of sourceFile.getDescendantsOfKind(
    SyntaxKind.VariableDeclaration
  )) {
    // assign TRUE if varbiable matches given regex
    const variableMatches = variableDec.getName().match(/Entity/gi);
    // if variable contains "Entity", rename
    if (variableMatches) {
      const newVariableName = replaceString(
        variableDec.getName(),
        variableMatches[0],
        renameTo
      );
      variableDec.rename(newVariableName);
    }
  }
};

const renameExpressions = (sourceFile) => {
  for (const expression of sourceFile.getDescendantsOfKind(
    SyntaxKind.ExpressionStatement
  )) {
    const expressionMatches = expression.getText().match(/Entity/gi);
    if (expressionMatches) {
      const newExpressionName = replaceString(
        expression.getText(),
        expressionMatches[0],
        renameTo
      );
      expression.setExpression(newExpressionName);
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
      const newStringLiteral = replaceString(
        stringLiteral.getLiteralText(),
        stringLiteralMatches[0],
        renameTo
      );
      stringLiteral.setLiteralValue(newStringLiteral);
    }
  }
};

// loop over entire folder
for (const sourceFile of project.getSourceFiles("./toBeModified/*.tsx")) {
  // SyntaxKind.VariableDeclaration
  renameVarDeclarations(sourceFile);
  // SyntaxKind.ExpressionStatement
  renameExpressions(sourceFile);
  // SyntaxKind.StringLiteral
  renameStringLiterals(sourceFile);

  // rename file if contains "Entity" and move to final folder
  if (sourceFile.getFilePath().match(/Entity/g) != -1) {
    const newFileName = replaceString(
      sourceFile.getBaseName(),
      "Entity",
      renameTo
    );
    sourceFile.copy("./modifiedFiles/" + newFileName);
  } else {
    // else just move to final folder without renaming
    sourceFile.copy("./modifiedFiles/");
  }
}

//save changes
project.save();
