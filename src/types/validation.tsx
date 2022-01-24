export type ValidationRuleResultType = {
    rule: string;
    passed: any;
    errorMessage: string | undefined;
}

export type ValidationResultType = {
    passedAll: boolean;
    ruleResults: ValidationRuleResultType[];
}