export const preload = {
    img(arrImgSrc) {
        try {
            let arrImages = [];
            let arrIdx = new Date().getTime();
            $.each(arrImgSrc, function(idx, item){
                arrImages[arrIdx] = new Image();
                arrImages[arrIdx].src = item;
                arrIdx++;
            });
        } catch (e){}
    },
};
