import zxcvbn from 'zxcvbn';

export const funcProgressColor = (testResult: zxcvbn.ZXCVBNResult) => {
    switch (testResult.score) {
        case 0:
            return '#828282';
        case 1:
            return '#fb4e4e';
        case 2:
            return '#ffad00';
        case 3:
            return '#2bc945';
        case 4:
            return '#2bc945';
        default:
            return 'none';
    }
};
