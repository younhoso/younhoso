function convertCamelName(name) {
    let camelName = '';
    for(let i = 0, newSpace = false; i < name.length; i++){
        if(name[i] == ' '){
            newSpace = true;
            continue;
        }
        if(newSpace){
            camelName = camelName + name[i].toUpperCase();
            newSpace = false;
        } else {
            camelName = camelName + name[i].toLowerCase();
        }
    }
    return camelName;
};

const simpleCamel = (name, splitter = ' ') => name.split(splitter)
    .map((word, wi) => word.split('')
        .map((c, ci) => wi > 0 && ci === 0 ? c.toUpperCase() : c.toLowerCase())
        .join(''))
    .join('')
// wi > 0은 첫번째 단어 스킵한다.
// ci === 0 공백으로 분할된 맨 앞에 있는 위치라는 의미
console.log(convertCamelName('YOUN HO SO')); //younHoSo
console.log(simpleCamel('YOUN hO sO')); //younHoSo