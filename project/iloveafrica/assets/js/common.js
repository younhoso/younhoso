function changeToMobile() {
    let url = "/index.php/changer/view/MOBILE";
    $.get(url, function(r) { 
        location.reload();
    });
}

function changeToDesk() {
    let url = "/index.php/changer/view/PC";
    $.get(url, function(r) { 
        location.reload();
    });
}