import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

// Import all sections
import { section1Blocks } from "./sections/Section1WhatIsAlgebra";
import { section2Blocks } from "./sections/Section2AlgebraicExpressions";
import { section3Blocks } from "./sections/Section3SolvingSimpleEquations";
import { section4Blocks } from "./sections/Section4BothSides";
import { section5Blocks } from "./sections/Section5Substitution";
import { section6Blocks } from "./sections/Section6ComplexSubstitution";
import { section7Blocks } from "./sections/Section7PracticeChallenge";

/**
 * ------------------------------------------------------------------
 * ALGEBRA EXPLORABLE EXPLANATION
 * ------------------------------------------------------------------
 *
 * This lesson teaches algebra from zero knowledge to complex
 * substitution problems. Each section builds on the previous one:
 *
 * 1. What is Algebra? - Variables as "mystery boxes"
 * 2. Algebraic Expressions - Writing and reading 2x + 3
 * 3. Solving Simple Equations - The balance principle
 * 4. Variables on Both Sides - Collecting like terms
 * 5. Introduction to Substitution - Replacing y with 2x
 * 6. Complex Substitution - Multi-step problem solving
 * 7. Practice Challenge - Progressive practice problems
 *
 * ------------------------------------------------------------------
 */

export const blocks: ReactElement[] = [
    ...section1Blocks,
    ...section2Blocks,
    ...section3Blocks,
    ...section4Blocks,
    ...section5Blocks,
    ...section6Blocks,
    ...section7Blocks,
];
