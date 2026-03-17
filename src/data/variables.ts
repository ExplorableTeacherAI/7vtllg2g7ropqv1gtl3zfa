/**
 * Variables Configuration
 * =======================
 *
 * CENTRAL PLACE TO DEFINE ALL SHARED VARIABLES
 *
 * This file defines all variables that can be shared across sections.
 * AI agents should read this file to understand what variables are available.
 *
 * USAGE:
 * 1. Define variables here with their default values and metadata
 * 2. Use them in any section with: const x = useVar('variableName', defaultValue)
 * 3. Update them with: setVar('variableName', newValue)
 */

import { type VarValue } from '@/stores';

/**
 * Variable definition with metadata
 */
export interface VariableDefinition {
    /** Default value */
    defaultValue: VarValue;
    /** Human-readable label */
    label?: string;
    /** Description for AI agents */
    description?: string;
    /** Variable type hint */
    type?: 'number' | 'text' | 'boolean' | 'select' | 'array' | 'object' | 'spotColor' | 'linkedHighlight';
    /** Unit (e.g., 'Hz', '°', 'm/s') - for numbers */
    unit?: string;
    /** Minimum value (for number sliders) */
    min?: number;
    /** Maximum value (for number sliders) */
    max?: number;
    /** Step increment (for number sliders) */
    step?: number;
    /** Display color for InlineScrubbleNumber / InlineSpotColor (e.g. '#D81B60') */
    color?: string;
    /** Options for 'select' type variables */
    options?: string[];
    /** Placeholder text for text inputs */
    placeholder?: string;
    /** Correct answer for cloze input validation */
    correctAnswer?: string;
    /** Whether cloze matching is case sensitive */
    caseSensitive?: boolean;
    /** Background color for inline components */
    bgColor?: string;
    /** Schema hint for object types (for AI agents) */
    schema?: string;
}

/**
 * =====================================================
 * 🎯 ALGEBRA LESSON VARIABLES
 * =====================================================
 */
export const variableDefinitions: Record<string, VariableDefinition> = {
    // ─────────────────────────────────────────
    // SECTION 1: What is Algebra?
    // ─────────────────────────────────────────
    mysteryBoxValue: {
        defaultValue: 5,
        type: 'number',
        label: 'Mystery Box Value',
        description: 'The hidden number inside the mystery box (x)',
        min: 1,
        max: 20,
        step: 1,
        color: '#62D0AD',
    },
    revealProgress: {
        defaultValue: 0,
        type: 'number',
        label: 'Reveal Progress',
        description: 'How much of the mystery box is revealed (0-100)',
        min: 0,
        max: 100,
        step: 1,
        color: '#8E90F5',
    },
    answerWhatIsVariable: {
        defaultValue: '',
        type: 'text',
        label: 'What is a Variable Answer',
        description: 'Student answer for what a variable represents',
        placeholder: '???',
        correctAnswer: 'number',
        color: '#62D0AD',
    },

    // ─────────────────────────────────────────
    // SECTION 2: Writing and Reading Algebraic Expressions
    // ─────────────────────────────────────────
    applesCount: {
        defaultValue: 3,
        type: 'number',
        label: 'Number of Apples',
        description: 'Number of apples in the bag',
        min: 1,
        max: 10,
        step: 1,
        color: '#F7B23B',
    },
    extraApples: {
        defaultValue: 2,
        type: 'number',
        label: 'Extra Apples',
        description: 'Additional apples given',
        min: 0,
        max: 10,
        step: 1,
        color: '#AC8BF9',
    },
    coefficientValue: {
        defaultValue: 2,
        type: 'number',
        label: 'Coefficient',
        description: 'The number multiplied by x',
        min: 1,
        max: 10,
        step: 1,
        color: '#8E90F5',
    },
    constantValue: {
        defaultValue: 3,
        type: 'number',
        label: 'Constant',
        description: 'The number added to the expression',
        min: 0,
        max: 10,
        step: 1,
        color: '#F8A0CD',
    },
    inputValueForExpression: {
        defaultValue: 4,
        type: 'number',
        label: 'Input Value',
        description: 'The value to substitute for x',
        min: 0,
        max: 10,
        step: 1,
        color: '#62D0AD',
    },
    answerExpressionResult: {
        defaultValue: '',
        type: 'text',
        label: 'Expression Result Answer',
        description: 'Student answer for expression evaluation',
        placeholder: '???',
        correctAnswer: '11',
        color: '#62D0AD',
    },

    // ─────────────────────────────────────────
    // SECTION 3: Solving Simple Equations
    // ─────────────────────────────────────────
    balanceLeftWeight: {
        defaultValue: 8,
        type: 'number',
        label: 'Left Side Weight',
        description: 'Weight on the left side of the balance',
        min: 1,
        max: 20,
        step: 1,
        color: '#62CCF9',
    },
    balanceRightWeight: {
        defaultValue: 8,
        type: 'number',
        label: 'Right Side Weight',
        description: 'Weight on the right side of the balance',
        min: 1,
        max: 20,
        step: 1,
        color: '#F4A89A',
    },
    simpleEquationX: {
        defaultValue: 5,
        type: 'number',
        label: 'Unknown x',
        description: 'The unknown value to solve for',
        min: 1,
        max: 15,
        step: 1,
        color: '#62D0AD',
    },
    subtractAmount: {
        defaultValue: 0,
        type: 'number',
        label: 'Amount to Subtract',
        description: 'Amount to subtract from both sides',
        min: 0,
        max: 10,
        step: 1,
        color: '#AC8BF9',
    },
    answerSimpleEquation: {
        defaultValue: '',
        type: 'text',
        label: 'Simple Equation Answer',
        description: 'Student answer for solving x + 3 = 10',
        placeholder: '???',
        correctAnswer: '7',
        color: '#62D0AD',
    },

    // ─────────────────────────────────────────
    // SECTION 4: Equations with Variables on Both Sides
    // ─────────────────────────────────────────
    leftCoefficient: {
        defaultValue: 3,
        type: 'number',
        label: 'Left Coefficient',
        description: 'Coefficient of x on the left side',
        min: 1,
        max: 10,
        step: 1,
        color: '#8E90F5',
    },
    rightCoefficient: {
        defaultValue: 1,
        type: 'number',
        label: 'Right Coefficient',
        description: 'Coefficient of x on the right side',
        min: 1,
        max: 10,
        step: 1,
        color: '#F7B23B',
    },
    leftConstant: {
        defaultValue: 4,
        type: 'number',
        label: 'Left Constant',
        description: 'Constant on the left side',
        min: 0,
        max: 20,
        step: 1,
        color: '#F8A0CD',
    },
    rightConstant: {
        defaultValue: 12,
        type: 'number',
        label: 'Right Constant',
        description: 'Constant on the right side',
        min: 0,
        max: 30,
        step: 1,
        color: '#A8D5A2',
    },
    answerBothSides: {
        defaultValue: '',
        type: 'text',
        label: 'Both Sides Answer',
        description: 'Student answer for equation with x on both sides',
        placeholder: '???',
        correctAnswer: '4',
        color: '#62D0AD',
    },

    // ─────────────────────────────────────────
    // SECTION 5: Introduction to Substitution
    // ─────────────────────────────────────────
    yValue: {
        defaultValue: 4,
        type: 'number',
        label: 'y Value',
        description: 'The value of y in the substitution',
        min: 1,
        max: 10,
        step: 1,
        color: '#AC8BF9',
    },
    substitutionX: {
        defaultValue: 2,
        type: 'number',
        label: 'x for Substitution',
        description: 'The value of x used in y = 2x',
        min: 1,
        max: 10,
        step: 1,
        color: '#62D0AD',
    },
    answerSubstitutionBasic: {
        defaultValue: '',
        type: 'text',
        label: 'Basic Substitution Answer',
        description: 'Student answer for basic substitution',
        placeholder: '???',
        correctAnswer: '11',
        color: '#62D0AD',
    },

    // ─────────────────────────────────────────
    // SECTION 6: Complex Substitution Problems
    // ─────────────────────────────────────────
    complexX: {
        defaultValue: 3,
        type: 'number',
        label: 'Complex Problem x',
        description: 'Value of x in complex substitution',
        min: 1,
        max: 10,
        step: 1,
        color: '#62D0AD',
    },
    complexY: {
        defaultValue: 5,
        type: 'number',
        label: 'Complex Problem y',
        description: 'Value of y in complex substitution',
        min: 1,
        max: 15,
        step: 1,
        color: '#AC8BF9',
    },
    scrollStep: {
        defaultValue: 0,
        type: 'number',
        label: 'Scroll Step',
        description: 'Current step in scrollytelling',
        min: 0,
        max: 5,
        step: 1,
    },
    answerComplexSubstitution: {
        defaultValue: '',
        type: 'text',
        label: 'Complex Substitution Answer',
        description: 'Student answer for complex substitution problem',
        placeholder: '???',
        correctAnswer: '5',
        color: '#62D0AD',
    },

    // ─────────────────────────────────────────
    // SECTION 7: Practice Challenge
    // ─────────────────────────────────────────
    practiceStepProgress: {
        defaultValue: 0,
        type: 'number',
        label: 'Practice Step',
        description: 'Current step in practice challenge',
        min: 0,
        max: 5,
        step: 1,
    },
    answerPractice1: {
        defaultValue: '',
        type: 'text',
        label: 'Practice Answer 1',
        description: 'Answer for practice question 1',
        placeholder: '???',
        correctAnswer: '6',
        color: '#62D0AD',
    },
    answerPractice2: {
        defaultValue: '',
        type: 'text',
        label: 'Practice Answer 2',
        description: 'Answer for practice question 2',
        placeholder: '???',
        correctAnswer: '3',
        color: '#8E90F5',
    },
    answerPractice3: {
        defaultValue: '',
        type: 'text',
        label: 'Practice Answer 3',
        description: 'Answer for practice question 3',
        placeholder: '???',
        correctAnswer: '7',
        color: '#AC8BF9',
    },
    answerPracticeComplex: {
        defaultValue: '',
        type: 'text',
        label: 'Practice Complex Answer',
        description: 'Answer for complex practice question',
        placeholder: '???',
        correctAnswer: '2',
        color: '#F7B23B',
    },

    // ─────────────────────────────────────────
    // Highlight variables for linked highlights
    // ─────────────────────────────────────────
    activeHighlight: {
        defaultValue: '',
        type: 'text',
        label: 'Active Highlight',
        description: 'Currently highlighted element',
        color: '#62D0AD',
        bgColor: 'rgba(98, 208, 173, 0.15)',
    },
};

/**
 * Get all variable names (for AI agents to discover)
 */
export const getVariableNames = (): string[] => {
    return Object.keys(variableDefinitions);
};

/**
 * Get a variable's default value
 */
export const getDefaultValue = (name: string): VarValue => {
    return variableDefinitions[name]?.defaultValue ?? 0;
};

/**
 * Get a variable's metadata
 */
export const getVariableInfo = (name: string): VariableDefinition | undefined => {
    return variableDefinitions[name];
};

/**
 * Get all default values as a record (for initialization)
 */
export const getDefaultValues = (): Record<string, VarValue> => {
    const defaults: Record<string, VarValue> = {};
    for (const [name, def] of Object.entries(variableDefinitions)) {
        defaults[name] = def.defaultValue;
    }
    return defaults;
};

/**
 * Get number props for InlineScrubbleNumber from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
export function numberPropsFromDefinition(def: VariableDefinition | undefined): {
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    color?: string;
} {
    if (!def || def.type !== 'number') return {};
    return {
        defaultValue: def.defaultValue as number,
        min: def.min,
        max: def.max,
        step: def.step,
        ...(def.color ? { color: def.color } : {}),
    };
}

/**
 * Get cloze input props for InlineClozeInput from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
/**
 * Get cloze choice props for InlineClozeChoice from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function choicePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Get toggle props for InlineToggle from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function togglePropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

export function clozePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
    caseSensitive?: boolean;
} {
    if (!def || def.type !== 'text') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
        ...(def.caseSensitive !== undefined ? { caseSensitive: def.caseSensitive } : {}),
    };
}

/**
 * Get spot-color props for InlineSpotColor from a variable definition.
 * Extracts the `color` field.
 *
 * @example
 * <InlineSpotColor
 *     varName="radius"
 *     {...spotColorPropsFromDefinition(getVariableInfo('radius'))}
 * >
 *     radius
 * </InlineSpotColor>
 */
export function spotColorPropsFromDefinition(def: VariableDefinition | undefined): {
    color: string;
} {
    return {
        color: def?.color ?? '#8B5CF6',
    };
}

/**
 * Get linked-highlight props for InlineLinkedHighlight from a variable definition.
 * Extracts the `color` and `bgColor` fields.
 *
 * @example
 * <InlineLinkedHighlight
 *     varName="activeHighlight"
 *     highlightId="radius"
 *     {...linkedHighlightPropsFromDefinition(getVariableInfo('activeHighlight'))}
 * >
 *     radius
 * </InlineLinkedHighlight>
 */
export function linkedHighlightPropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    return {
        ...(def?.color ? { color: def.color } : {}),
        ...(def?.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Build the `variables` prop for FormulaBlock from variable definitions.
 *
 * Takes an array of variable names and returns the config map expected by
 * `<FormulaBlock variables={...} />`.
 *
 * @example
 * import { scrubVarsFromDefinitions } from './variables';
 *
 * <FormulaBlock
 *     latex="\scrub{mass} \times \scrub{accel}"
 *     variables={scrubVarsFromDefinitions(['mass', 'accel'])}
 * />
 */
export function scrubVarsFromDefinitions(
    varNames: string[],
): Record<string, { min?: number; max?: number; step?: number; color?: string }> {
    const result: Record<string, { min?: number; max?: number; step?: number; color?: string }> = {};
    for (const name of varNames) {
        const def = variableDefinitions[name];
        if (!def) continue;
        result[name] = {
            ...(def.min !== undefined ? { min: def.min } : {}),
            ...(def.max !== undefined ? { max: def.max } : {}),
            ...(def.step !== undefined ? { step: def.step } : {}),
            ...(def.color ? { color: def.color } : {}),
        };
    }
    return result;
}
