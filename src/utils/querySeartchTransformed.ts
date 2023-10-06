export interface IVariantQuerySeartchUser {
    nickname?: string;
    firstName?: string;
    lastName?: string;
}
export default function getQuerySeartchTransformed(querySeartch: string) {
    if (querySeartch) {
        const spplitedQuery = querySeartch.split(' ');
        const lengthSpplitedQuery = spplitedQuery.length;
        const varaintArray: IVariantQuerySeartchUser[] = [];

        if (lengthSpplitedQuery > 1) {
            varaintArray.push({
                firstName: spplitedQuery[1],
                lastName: spplitedQuery[0],
            });

            varaintArray.push({
                firstName: spplitedQuery[0],
                lastName: spplitedQuery[1],
            });
        } else {
            varaintArray.push({nickname: spplitedQuery[0]});
            varaintArray.push({firstName: spplitedQuery[0]});
            varaintArray.push({lastName: spplitedQuery[0]});
        }
        return varaintArray;
    }
    return '';
}
