import { ValidationRuleResultType, ValidationResultType } from '../types/validation'

//move to a helper function
//TODO: do I need to wrap this in another call
//is there a more upto date way of doing it.
//ref: https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach(array: any[], callback: Function) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export default async function validateField(url: string, validationRules: Function[]): Promise<ValidationResultType> {
    let ruleResults: ValidationRuleResultType[] = []
    let passedAllSoFar = true
    //ok here pass in all the rules then use the callback function to call each in turn,
    //take the result of each rule and update passedAllSoFar
    //and push the messages onto the array.
    await asyncForEach(validationRules, async (rule: Function): Promise<void> => {
        if (passedAllSoFar) {
            const result: ValidationRuleResultType = await rule(url);
            // console.log('result=', result);
            if (!result.passed) {
                ruleResults.push(result) //TODO: is messages in scope here?
                passedAllSoFar = false
            }
        }
    })
    // console.log('passedAllSoFar=', passedAllSoFar);
    return { passedAll: passedAllSoFar, ruleResults: ruleResults }
}

