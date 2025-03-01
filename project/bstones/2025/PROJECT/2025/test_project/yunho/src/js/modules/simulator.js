export const simul = {
    getMergeData(buyingData, listNm = 'result', simulListNm = 'simulator'){
        let resultData = [];
        try {
            buyingData[listNm].forEach(function (list){
                buyingData[simulListNm].forEach(function (simulList){
                    if(list.gCode === simulList.gCode){
                        resultData.push(Object.assign(list, simulList));
                    }
                });
            });
        } catch (e) {}
        return resultData;
    }
}