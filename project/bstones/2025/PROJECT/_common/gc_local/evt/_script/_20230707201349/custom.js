String.prototype.string = function(len) {
    var s = "";
    var i = 0;
    while (i < len) {
        s += this;
        i++
    }
    return s
};
String.prototype.df = function(len) {
    return "0".string(len - this.length) + this
};
Number.prototype.df = function(len) {
    return this.toString().df(len)
};
Date.prototype.format = function(f) {
    if (!this.valueOf()) return "";
    var weekName = ["�쇱슂��", "�붿슂��", "�붿슂��", "�섏슂��", "紐⑹슂��", "湲덉슂��", "�좎슂��"];
    var d = this;
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy":
                return d.getFullYear();
            case "yy":
                return (d.getFullYear() % 1E3).df(2);
            case "MM":
                return (d.getMonth() + 1).df(2);
            case "dd":
                return d.getDate().df(2);
            case "E":
                return weekName[d.getDay()];
            case "HH":
                return d.getHours().df(2);
            case "hh":
                var h = d.getHours() % 12;
                return (h ? h : 12).df(2);
            case "mm":
                return d.getMinutes().df(2);
            case "ss":
                return d.getSeconds().df(2);
            case "a/p":
                return d.getHours() < 12 ? "�ㅼ쟾" : "�ㅽ썑";
            default:
                return $1
        }
    })
};
String.prototype.trim = function(str) {
    str = this !== window ? this : str;
    return str.replace(/^\s+/g, "").replace(/\s+$/g, "")
};
String.prototype.hasFinalConsonant = function(str) {
    str = this !== window ? this : str;
    var strTemp = str.substr(str.length - 1);
    return (strTemp.charCodeAt(0) - 16) % 28 != 0
};
String.prototype.bytes = function(str) {
    str = this !== window ? this : str;
    var len = 0;
    for (var j = 0; j < str.length; j++) {
        var chr = str.charAt(j);
        len += chr.charCodeAt() > 128 ? 2 : 1
    }
    return len
};
String.prototype.replaceAll = function(str1, str2) {
    var temp_str = "";
    if (this.trim() !== "" && str1 !== str2) {
        temp_str = this.trim();
        while (temp_str.indexOf(str1) > -1) temp_str = temp_str.replace(str1, str2)
    }
    return temp_str
};
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] != null) {
            if (!o[this.name].push) o[this.name] = [o[this.name]];
            o[this.name].push(this.value || "")
        } else o[this.name] = this.value || ""
    });
    return o
};
$.fn.serializeJson = function() {
    var o = {};
    $(this).find('input[type="hidden"], input[type="text"],input[type="number"], input[type="password"], input[type="checkbox"]:checked, input[type="radio"]:checked, textarea, select').each(function() {
        if ($(this).attr("type") === "hidden") {
            var $parent = $(this).parent();
            var $chb = $parent.find('input[type="checkbox"][name="' + this.name.replace(/\[/g, "[").replace(/\]/g, "]") + '"]');
            if ($chb != null)
                if ($chb.prop("checked")) return
        }
        if (this.name == null || this.name === "") return;
        var elemValue =
            null;
        if ($(this).is("select")) elemValue = $(this).find("option:selected").val();
        else elemValue = this.value;
        if (o[this.name] != null) {
            if (!o[this.name].push) o[this.name] = [o[this.name]];
            o[this.name].push(elemValue || "")
        } else o[this.name] = elemValue || ""
    });
    return o
};