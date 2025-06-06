var device = {
    agent: navigator.userAgent.toLocaleLowerCase(),
    os: null,
    ver: null,
    isApp: null,
    appHgt: 0,
    val: "",
    init: function() {
        var str;
        var ver;
        if (device.agent !== undefined) {
            if (device.agent.indexOf("iphone") > -1 || device.agent.indexOf("ipad") > -1) {
                str = device.agent.substring(device.agent.indexOf("os") + 3);
                ver = str.substring(0, str.indexOf(" like"));
                device.os = "ios";
                device.ver = device.os + ver
            }
            if (device.agent.indexOf("android") > -1) {
                str = device.agent.substring(device.agent.indexOf("android") + 8);
                var strSub = str.substring(0,
                    str.indexOf(";"));
                ver = strSub.replace(/[.]/gi, "_");
                device.os = "android";
                device.ver = device.os + ver
            }
        }
        device.set()
    },
    set: function() {
        var html = document.querySelector("html");
        var htmlClass = html.getAttribute("class");
        var etc = "";
        if (device.agent.indexOf("samsung") > -1) etc += " samsung";
        if (device.agent.indexOf("naver") > -1) etc += " naver";
        if (device.agent.indexOf("secapp") > -1) {
            device.ver += " secapp";
            device.isApp = true
        }
        if (device.os !== null) htmlClass ? html.setAttribute("class", htmlClass + " " + device.ver + etc) : html.setAttribute("class",
            device.ver + etc);
        device.resp();
        window.addEventListener("resize", device.resp)
    },
    resp: function() {
        if (window.innerWidth > 1100) device.val = "p";
        if (window.innerWidth <= 1100 && window.innerWidth >= 801) device.val = "t";
        if (window.innerWidth < 801) device.val = "m";
        setTimeout(function() {
            if (window.innerWidth > 1100) device.val = "p";
            if (window.innerWidth <= 1100 && window.innerWidth >= 801) device.val = "t";
            if (window.innerWidth < 801) device.val = "m"
        }, 100)
    }
};
device.init();
var topForApp = function(hgt) {
    if (!document.querySelector("#wrap").classList.contains("useWebGnb")) {
        // 230320 KDP-26718 媛ㅼ틺�� app �곷떒 margin-top : 56px �쒓굅
        // document.querySelector("html").style.marginTop = hgt + "px";
        device.appHgt = hgt;
        $("#container.type-visual").addClass("fold-app-top")
    }
    return false
};
var scrollActive = function(el, callback) {
    var scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
    var scrollStart = scrollTop + window.innerHeight;
    var clientReact = el.getBoundingClientRect();
    var elStart = scrollTop + clientReact.top;
    var elEnd = elStart + clientReact.height;
    var state = false;
    window.addEventListener("scroll", function() {
        scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop ||
            0);
        scrollStart = scrollTop + window.innerHeight;
        clientReact = el.getBoundingClientRect();
        elStart = scrollTop + clientReact.top;
        elEnd = elStart + clientReact.height;
        if (scrollStart >= elStart && elEnd >= scrollTop) {
            if (state === false) {
                callback();
                state = true
            }
        } else if (state === true) state = false
    })
};
window.addEventListener("DOMContentLoaded", function() {
    var objGif = document.querySelectorAll(".objGif");
    [].forEach.call(objGif, function(_this) {
        var lazySrc = _this.dataset.lazy;
        var lazySrc2 = _this.dataset.src;
        var src = _this.src;
        if (lazySrc) src = lazySrc;
        else if (lazySrc2) src = lazySrc2;
        scrollActive(_this, function() {
            if ($(_this).css("display") != "none") _this.src = src
        })
    })
});
var findEl = {
    obj: null,
    arr: [],
    parent: function(el, str) {
        var tag = el.parentNode.tagName.toLowerCase();
        var cls = el.parentNode.classList;
        var id = el.parentNode.getAttribute("id");
        findEl.obj = el.parentNode;
        if (str !== tag && !cls.contains(str) && str != id)
            if (tag != "body") findEl.parent(findEl.obj, str);
            else findEl.obj = null;
        return findEl.obj
    },
    child: function(el, str) {
        findEl.arr = [];
        var nodes;
        try {
            nodes = el.childNodes
        } catch ($error) {
            return false
        } [].forEach.call(el.childNodes, function(obj) {
            if (obj.nodeType == 1) {
                var tag = obj.tagName.toLowerCase();
                var cls = obj.classList;
                var id = obj.getAttribute("id");
                if (str === tag || cls.contains(str) || str === id) {
                    findEl.obj = obj;
                    findEl.arr.push(obj)
                }
            }
        });
        if (findEl.arr.length > 1) return findEl.arr;
        else return findEl.obj
    },
    prevNode: function(str) {
        if (str.previousSibling != null) {
            if (str.previousSibling.nodeType == 1) findEl.obj = str.previousSibling;
            else findEl.prevNode(str.previousSibling);
            return findEl.obj
        } else return false
    },
    nextNode: function(str) {
        if (str.nextSibling != null) {
            if (str.nextSibling.nodeType == 1) findEl.obj = str.nextSibling;
            else findEl.nextNode(str.nextSibling);
            return findEl.obj
        } else return false
    }
};
var viewportChange = function() {
    var pcView = "width=802,maximum-scale=1.0";
    var normalView = "width=device-width,initial-scale=1.0";
    var viewPort = document.querySelector('[name="viewport"]');

    function widthChk() {
        var winW = window.outerWidth;
        if (device.agent !== undefined)
            if (device.agent.indexOf("iphone") > -1 || device.agent.indexOf("ipad") > -1 || device.agent.indexOf("android") > -1)
                if (540 < winW && winW < 1100) viewPort.setAttribute("content", pcView);
                else viewPort.setAttribute("content", normalView)
    }
    widthChk();
    window.addEventListener("resize",
        function() {
            if (viewPort.getAttribute("content") == pcView || viewPort.getAttribute("content") == normalView) widthChk();
            else return false
        })
};
! function() {
    viewportChange()
}();
var menuMov = {
    movLength: 10,
    init: function(el) {
        var target = el;
        if (!target.querySelector(".btnListControl")) {
            var down = function() {
                var downLimit = limit - mov;
                if (downLimit > mov) {
                    movNum += mov;
                    limit -= mov
                } else {
                    movNum += downLimit;
                    limit -= downLimit;
                    btnDown.disabled = true
                }
                ul.style.cssText = "transform: translateY(-" + movNum + "%)";
                if (btnUp.disabled == true) btnUp.disabled = false
            };
            var up = function() {
                if (100 > limit) {
                    if (movNum > mov) {
                        movNum -= mov;
                        limit += mov
                    } else {
                        limit += movNum;
                        movNum -= movNum;
                        btnUp.disabled = true
                    }
                    ul.style.cssText = "transform: translateY(-" +
                        movNum + "%)";
                    if (btnDown.disabled == true) btnDown.disabled = false
                }
            };
            var ul = target.querySelector("ul");
            var li = ul.querySelectorAll("li");
            var per = 100 / li.length;
            var mov = per * menuMov.movLength;
            var limit = 100;
            var movNum = 0;
            var btnUp, btnDown;
            var btnWrap = "";
            btnWrap += '<div class="btnListControl">';
            btnWrap += '\t<button type="button" class="btnUp" disabled>up</button>';
            btnWrap += '\t<button type="button" class="btnDown">down</button>';
            btnWrap += "</div>";
            if (li.length > 10) {
                target.insertAdjacentHTML("beforeend", btnWrap);
                btnUp =
                    target.querySelector(".btnUp");
                btnDown = target.querySelector(".btnDown");
                btnUp.addEventListener("click", up);
                btnDown.addEventListener("click", down)
            }
        }
    }
};
var gnb = {
    html: null,
    header: null,
    wrap: null,
    dep1: null,
    dep2: null,
    allLi: null,
    btnMob: null,
    btnClose: null,
    btnBack: null,
    ariaSelected: "aria-selected",
    init: function() {
        gnb.html = document.querySelector("html");
        gnb.header = document.querySelector("#header");
        gnb.wrap = document.querySelector(".new-gnb");
        if (gnb.wrap != null) {
            gnb.dep1 = gnb.wrap.querySelector(".gnb1depth");
            gnb.dep2 = gnb.wrap.querySelector(".gnb2depth");
            gnb.allLi = gnb.dep1.querySelectorAll("li");
            gnb.btnMob = document.querySelector(".link-m-nav");
            gnb.btnClose = gnb.wrap.querySelector(".gnb-close");
            gnb.btnBack = gnb.wrap.querySelector(".gnb-back");
            gnb.addEvent();
            gnb.btnMob.addEventListener("click", function(e) {
                e.stopPropagation();
                if (!gnb.html.classList.contains("gnbOpen")) gnb.html.classList.add("gnbOpen");
                if ($("#gnbmask").length > 0) {
                    $("#gnbmask").remove();
                    $("#header").removeClass("active").find(".s-gnbSubWrap").hide().parent().find(".open").removeClass("open")
                }
            });
            gnb.btnClose.addEventListener("click", gnb.close);
            gnb.btnClose.addEventListener("focusout", gnb.close);
            gnb.header.addEventListener("blur",
                function() {
                    if ($(".outlink.clicked").length === 0 && $(":focus").parents("nav.gnb").length > 0) $("#header a.logo").focus();
                    gnb.close()
                });
            gnb.btnBack.addEventListener("click", function() {
                var actLi = gnb.dep1.querySelectorAll(".active");
                actLi[actLi.length - 1].classList.remove("active");
                if (actLi.length == 1) this.classList.remove("show");
                if (gnb.dep1.querySelector(".rel")) {
                    gnb.dep1.querySelector(".rel > ul").removeAttribute("style");
                    gnb.dep1.querySelector(".rel").classList.remove("rel")
                }
            });
            gnb.header.addEventListener("mouseleave",
                function() {
                    if (device.val == "p") gnb.close()
                })
        }
    },
    close: function() {
        if (gnb.html.classList.contains("gnbOpen")) gnb.html.classList.remove("gnbOpen");
        if (gnb.btnBack.classList.contains("show")) gnb.btnBack.classList.remove("show");
        [].forEach.call(gnb.allLi, function(li, idx) {
            if (li.classList.contains("active")) {
                gnb.allLi[idx].classList.remove("active");
                gnb.allLi[idx].querySelector("a").setAttribute(gnb.ariaSelected, false)
            }
            if (li.parentNode.classList.contains("onDepth")) setTimeout(function() {
                    gnb.allLi[idx].parentNode.classList.remove("onDepth")
                },
                300)
        });
        if (device.val === "m" && gnb.dep1.querySelector(".rel")) {
            gnb.dep1.querySelector(".rel > ul").removeAttribute("style");
            gnb.dep1.querySelector(".rel").classList.remove("rel")
        }
    },
    depAct: function(el) {
        if (device.val === "p" && el.parentNode.parentNode.classList.contains("gnb1depth")) return false;
        else {
            var thisClosest = findEl.parent(el, "ul");
            var thisSibling = findEl.child(thisClosest, "li");
            [].forEach.call(thisSibling, function(li, idx) {
                if (li.classList.contains("active")) {
                    thisSibling[idx].classList.remove("active");
                    if (el.getAttribute("href") == "#") li.parentNode.classList.remove("onDepth");
                    else setTimeout(function() {
                        li.parentNode.classList.remove("onDepth")
                    }, 300)
                }
            });
            if (el.getAttribute("href") == "#") {
                el.parentNode.classList.add("active");
                el.parentNode.parentNode.classList.add("onDepth")
            }
            if (device.val === "p") {
                if (el.parentNode.querySelector(".gnb3depth")) {
                    var dep3Ul = el.parentNode.querySelector(".gnb3depth > ul");
                    var depth3Li = findEl.child(dep3Ul, "li");
                    for (var idx = 0; idx < depth3Li.length; idx++) {
                        if (depth3Li[idx].classList.contains("active")) break;
                        if (idx == depth3Li.length - 1 && depth3Li[0].querySelector(".gnb4depth")) setTimeout(function() {
                            dep3Ul.classList.add("onDepth");
                            depth3Li[0].classList.add("active");
                            menuMov.init(depth3Li[0].querySelector(".gnb4depth"))
                        }, 300)
                    }
                    var dep2Wrap = el.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".gnb2depth");
                    var dep2List = el.parentNode.parentNode.parentNode.querySelector(".list");
                    var dep2Height = dep2List.offsetHeight + dep2List.querySelector("li").offsetHeight;
                    if (dep3Ul !== null) {
                        var dep3conunt = dep3Ul.childElementCount;
                        var dep3Height = dep3Ul.offsetHeight + el.parentNode.parentNode.querySelector("li").offsetHeight;
                        if (dep3conunt > 12) dep2Wrap.style.cssText = "height: " + dep3Height + "px;";
                        else if (dep2List.childElementCount > 12) dep2Wrap.style.cssText = "height: " + dep2Height + "px;";
                        else gnb.dep2.removeAttribute("style")
                    }
                }
                if (el.parentNode.querySelector(".gnb4depth")) menuMov.init(el.parentNode.querySelector(".gnb4depth"))
            }
            if (el.parentNode.parentNode.classList.contains("gnb1depth") && !gnb.btnBack.classList.contains("show")) gnb.btnBack.classList.add("show");
            if (device.val !== "p") {
                var listNext = findEl.nextNode(thisClosest);
                if (listNext.classList.contains("gnbBanner")) thisClosest.parentNode.classList.add("rel");
                if (findEl.parent(el, "rel")) {
                    var rel = findEl.parent(el, "rel");
                    var target = rel.querySelector("ul");
                    var thisInner = el.parentNode.querySelector("ul");
                    target.style.height = thisInner.clientHeight + "px"
                }
            }
        }
        return false
    },
    dep3Act: function(el) {
        if (el != null) {
            var thisDep3Li = el.querySelectorAll("li");
            var thisDep4;
            if (thisDep3Li.length > 0) thisDep4 = thisDep3Li[0].querySelector(".gnb4depth");
            if (thisDep4 != null) {
                thisDep3Li[0].parentNode.classList.add("onDepth");
                setTimeout(function() {
                    thisDep3Li[0].classList.add("active");
                    menuMov.init(thisDep3Li[0].querySelector(".gnb4depth"))
                }, 300)
            }
        }
    },
    dep2Act: function(el) {
        if (el != null) {
            var thisDep2Li = el.querySelectorAll("li");
            var thisDep3 = thisDep2Li[0].querySelector(".gnb3depth");
            thisDep2Li[0].classList.add("active");
            if (thisDep3) thisDep2Li[0].parentNode.classList.add("onDepth");
            gnb.dep3Act(thisDep3)
        }
    },
    dep1Act: function(el) {
        if (el.parentNode.parentNode.classList.contains("gnb1depth")) {
            if (!gnb.wrap.classList.contains("gnbOpen") &&
                device.val !== "m") {
                gnb.html.classList.add("gnbOpen");
                if ($("#gnbmask").length > 0) $("#gnbmask").trigger("mouseenter focus");
                var dep2Wrap = el.parentNode.querySelector(".gnb2depth");
                var dep2List = el.parentNode.querySelector(".gnb2depth > .inner > .list");
                var dep2conunt = dep2List.childElementCount;
                var dep2Height = dep2List.offsetHeight + el.parentNode.querySelector(".gnb2depth > .inner > .list > li").offsetHeight;
                if (dep2conunt > 12) dep2Wrap.style.cssText = "height: " + dep2Height + "px;";
                else gnb.dep2.removeAttribute("style")
            }
            if (!el.parentNode.classList.contains("active")) {
                var thisDep2 =
                    el.parentNode.querySelector(".gnb2depth > .inner > .list");
                [].forEach.call(gnb.allLi, function(li, idx) {
                    if (li.classList.contains("active")) {
                        li.classList.remove("active");
                        li.querySelector("a").setAttribute(gnb.ariaSelected, false)
                    }
                });
                el.parentNode.classList.add("active");
                el.setAttribute(gnb.ariaSelected, true);
                if (thisDep2.querySelectorAll("li")[0].querySelector("a").getAttribute("href") == "#") gnb.dep2Act(thisDep2)
            }
        }
    },
    linkFocus: function(el) {
        var ul = findEl.parent(el, "ul");
        var li = findEl.parent(el, "li");
        var sibling =
            findEl.child(ul, "li");
        var gp = findEl.parent(li, "li");
        [].forEach.call(sibling, function(list, idx) {
            if (list.classList.contains("active")) {
                sibling[idx].classList.remove("active");
                list.parentNode.classList.remove("onDepth")
            }
        });
        if (gp && !gp.classList.contains("active")) gp.classList.add("active")
    },
    addEvent: function() {
        var eventClick = false;
        [].forEach.call(gnb.allLi, function(list) {
            var link = list.querySelector("a");
            link.addEventListener("focus", function() {
                var _this = this;
                if (eventClick == false)
                    if (_this.classList.contains("outlink") &&
                        _this.classList.contains("clicked")) {
                        var $this = $(_this);
                        var triggerEvent = device.val === "p" ? "mouseenter focus" : "click";
                        if (device.val === "m") {
                            if (!gnb.html.classList.contains("gnbOpen")) gnb.html.classList.add("gnbOpen");
                            if ($("#gnbmask").length > 0) {
                                $("#gnbmask").remove();
                                $("#header").removeClass("active").find(".s-gnbSubWrap").hide().parent().find(".open").removeClass("open")
                            }
                        }
                        if ($this.parents(".gnb2depth")) $this.parents(".gnb2depth").prev().trigger(triggerEvent);
                        if ($this.parents(".gnb3depth")) $this.parents(".gnb3depth").prev().trigger(triggerEvent);
                        setTimeout(function() {
                            $this.trigger(triggerEvent);
                            $(".outlink.clicked").removeClass("clicked")
                        }, 300)
                    } else {
                        if (!_this.classList.contains("outlink")) {
                            if (_this.getAttribute("href") == "#")
                                if (device.val === "p")
                                    if (_this.parentNode.parentNode.classList.contains("gnb1depth")) gnb.dep1Act(_this);
                                    else {
                                        gnb.depAct(_this);
                                        if (_this.parentNode.classList.contains("active")) gnb.linkFocus(_this)
                                    } if (!gnb.html.classList.contains("gnbOpen")) gnb.html.classList.add("gnbOpen");
                            gnb.linkFocus(_this)
                        }
                    }
                else eventClick = false
            });
            $(link).on("mousedown",
                function() {
                    eventClick = true
                });
            $(link).on("mouseenter focus", function() {
                var _this = $(this)[0];
                if (device.val === "p")
                    if (_this.getAttribute("href") == "#") _this.parentNode.parentNode.classList.contains("gnb1depth") ? gnb.dep1Act(_this) : gnb.depAct(_this);
                    else if (_this.parentNode.parentNode.classList.contains("gnb1depth")) gnb.close();
                    else gnb.depAct(_this)
            });
            $(link).on("click", function(e) {
                var _this = $(this)[0];
                if (_this.classList.contains("outlink")) _this.classList.add("clicked");
                if (_this.getAttribute("href") ==
                    "#") {
                    e.preventDefault();
                    if (device.val === "p") gnb.dep1Act(_this);
                    else gnb.depAct(_this)
                }
            })
        });
        window.addEventListener("resize", function() {
            if (device.val !== "p") {
                var listControl = gnb.html.querySelectorAll(".btnListControl");
                if (listControl) setTimeout(function() {
                    [].forEach.call(listControl, function(el) {
                        el.parentNode.querySelector("ul").removeAttribute("style");
                        el.parentNode.removeChild(el.parentNode.querySelector(".btnListControl"))
                    })
                }, 100)
            }
        })
    }
};

function mobileHeaderType() {
    var header = document.querySelector("#header");
    var className = null;
    if (window.innerWidth < 800) {
        if (header && header.classList.contains("type-wht")) {
            className = "type-wht";
            header.classList.remove("type-wht")
        }
    } else if (className != null && device.val != "m") header.classList.add("type-wht");
    window.addEventListener("resize", function() {
        if (window.innerWidth < 801) {
            if (header && header.classList.contains("type-wht")) {
                className = "type-wht";
                header.classList.remove("type-wht")
            }
        } else if (className != null &&
            device.val != "m") header.classList.add("type-wht")
    })
}
var nativeGnb = function() {
    $(window).scroll(function() {
        var scrollValue = $(window).scrollTop();
        // 230410 KDP-27933
        // if (window.secapp) {
        //     if (scrollValue < 50) window.secapp.showAndHideGnb("VISIBLE");
        //     else window.secapp.showAndHideGnb("GONE")
        // }
    })
};
window.addEventListener("DOMContentLoaded", function() {
    gnb.init();
    mobileHeaderType();
    if (device.isApp == true && !document.querySelector("#wrap").classList.contains("useWebGnb")) nativeGnb()
});
var scrollLock = function(state) {
    var html = document.querySelector("html");
    if (device.agent !== undefined)
        if (device.agent.indexOf("iphone") > -1 || device.agent.indexOf("ipad") > -1 || device.agent.indexOf("android") > -1) state == "lock" ? html.classList.add("scrollLock") : html.classList.remove("scrollLock")
};
$.datepicker.setDefaults({
    prevText: "�댁쟾 ��",
    nextText: "�ㅼ쓬 ��",
    monthNames: ["1��", "2��", "3��", "4��", "5��", "6��", "7��", "8��", "9��", "10��", "11��", "12��"],
    monthNamesShort: ["1��", "2��", "3��", "4��", "5��", "6��", "7��", "8��", "9��", "10��", "11��", "12��"],
    dayNames: ["��", "��", "��", "��", "紐�", "湲�", "��"],
    dayNamesShort: ["��", "��", "��", "��", "紐�", "湲�", "��"],
    dayNamesMin: ["��", "��", "��", "��", "紐�", "湲�", "��"],
    showMonthAfterYear: true,
    yearSuffix: "��",
    dateFormat: "yy-mm-dd"
});

function calendar_picker() {
    $(".inp-calendar:not(.exp-calendar)").datepicker({
        changeMonth: true,
        changeYear: true
    })
}

function skip_navigator() {
    $("#skip_content").children("a").focus(function(e) {
        e.preventDefault();
        $("#skip_content").children("a").removeClass("on");
        $(this).addClass("on")
    });
    $("#skip_content").focusout(function(e) {
        e.preventDefault();
        $("#skip_content").children("a").removeClass("on")
    })
}
$(function() {
    $(window).resize(function() {
        var $loginFront = $(".login-front");
        if ($loginFront.length > 0 && !$loginFront.hasClass("subpage")) {
            var contHeight = $loginFront.find(".wrap-login-content").outerHeight();
            var winHeight = $(window).innerHeight();
            if (contHeight >= winHeight) $loginFront.css("position", "relative");
            else $loginFront.css("position", "fixed")
        }
        var winw = $(window).width();
        $(".prop-list .photo > .thumb > img").each(function() {
            var prop_li = $(this).parent().parent().parent().parent(),
                prop_li_item = $(this).parent().parent().parent().not(".prop-txt");
            var before_width = prop_li.innerWidth(),
                max_width = Math.ceil(before_width);
            var before_height = max_width * .67,
                max_height = Math.floor(before_height);
            prop_li_item.width(max_width);
            prop_li_item.height(max_height);
            var img_width = $(this).width(),
                img_height = $(this).height();
            var before_ratio = 1.5,
                real_ratio = img_width / img_height;
            if (real_ratio > before_ratio) $(this).css({
                "height": max_height,
                "position": "absolute",
                "top": 0,
                "left": "50%",
                "transform": "translateX(-50%)"
            });
            else $(this).css({
                "width": max_width,
                "position": "absolute",
                "top": "50%",
                "left": 0,
                "transform": "translateY(-50%)"
            })
        })
    }).resize()
});

function togglechange(e) {
    var $e = $(e);
    var ariaHidden = "aria-hidden";
    if ($e.length == 0) return false;
    $e.find('input[type="checkbox"]').on("change", function() {
        if ($(this).is(":checked")) {
            $(this).siblings(".labeltxt.off").removeAttr(ariaHidden);
            $(this).siblings(".labeltxt.on").attr(ariaHidden, "true")
        } else {
            $(this).siblings(".labeltxt.on").removeAttr(ariaHidden);
            $(this).siblings(".labeltxt.off").attr(ariaHidden, "true")
        }
    });
    return false
}

function spinnerchange(e) {
    var $e = $(e),
        amountValue;
    if ($e.length == 0) return false;
    $e.each(function() {
        var disable = $(this).find(".number").attr("disabled");
        if (disable === "disabled") $(this).addClass("disabled");
        else $(this).removeClass("disabled");
        $(this).find(".count").click(function(e) {
            e.preventDefault();
            var count = $(this).siblings(".number").val();
            if (disable != "disabled")
                if ($(this).hasClass("count-miner")) {
                    if (parseInt($(this).siblings(".number").val()) > 1) {
                        count--;
                        $(this).siblings(".number").val(count);
                        $(this).parent().attr("data-count", $(this).siblings(".number").val())
                    }
                } else if (!$(this).hasClass("cart-buy-limit-except"))
                    if (parseInt($(this).siblings(".number").val()) < 99) {
                        count++;
                        $(this).siblings(".number").val(count);
                        $(this).parent().attr("data-count", $(this).siblings(".number").val())
                    }
        })
    });
    return false
}

function bookmarkBtn(e) {
    var $e = $(e);
    if ($e.length == 0) return false;
    $e.each(function() {
        $(this).click(function(e) {
            e.preventDefault();
            if ($(this).hasClass("on")) {
                $(this).removeClass("on");
                $(".bookmarkOff").show();
                $(".bookmarkOn").hide();
                setTimeout(function() {
                    $(".bookmarkOff").fadeOut(300)
                }, 5E3)
            } else {
                $(this).addClass("on");
                $(".bookmarkOn").show();
                $(".bookmarkOff").hide();
                setTimeout(function() {
                    $(".bookmarkOn").fadeOut(300)
                }, 5E3)
            }
        })
    });
    $(document).click(function(e) {
        if ($e.has(e.target).length === 0) {
            $(".bookmarkOn").fadeOut(300);
            $(".bookmarkOff").fadeOut(300)
        }
    });
    return false
}

function tooltipLeftTop(e) {
    var $e = $(e);
    if ($e.length == 0) return false;
    if (event) event.stopPropagation();
    $e.each(function() {
        $(this).click(function() {
            var top = $(this).position().top;
            var left = $(this).position().left;
            $(this).next().addClass("show").css({
                left: left - 40,
                top: top + 30
            });
            $(this).next().attr("tabindex", "0").focus()
        });
        $(this).next().find(".tolltip-close").click(function() {
            $(this).parent(".tooltip-layer").removeClass("show");
            $(this).parent(".tooltip-layer").prev(".btn-tooltop02").focus()
        })
    });
    return false
}
var ariaBox;

function tooltipCenterTop(e, t, w, b) {
    e = $(e);
    t = $("." + t);
    var widths = w,
        aria = "aria-selected";
    if (event) event.stopPropagation();
    $(".tooltip-layer").fadeOut(200);
    if (ariaBox !== undefined) ariaBox.attr(aria, false);
    e.attr(aria, true);
    ariaBox = e;
    $(window).resize(function() {
        var winw = $(window).width();
        var top = e.offset().top + 17 - $('#header__navi').height();
        if (winw > 800) {
            var left;
            var leftover = e.offset().left - widths / 2 - e.innerWidth() / 2;
            var rightover = e.offset().left + widths;
            if (leftover < 24) left = widths / 2 + 24;
            else if (rightover >
                winw) left = winw - widths / 2 - 24;
            else left = e.offset().left + e.innerWidth() / 2;
            t.css({
                maxWidth: widths + "px",
                left: left,
                right: "auto",
                top: top + 17,
                transform: "translateX(-50%)"
            })
        } else {
            if (b == "fixed") t.addClass("fixed");
            else t.removeClass("fixed");
            t.css({
                maxWidth: 100 + "%",
                left: 12 + "px",
                right: 12 + "px",
                top: top + 17,
                transform: "none"
            })
        }
    }).resize();
    t.fadeIn(200);
    t.find(".btn-tooltip-close").focus();
    t.find(".share-tooltip-box li:first-child a").focus();
    t.find(".btn-tooltip-close").on("click",
        function() {
            ariaBox.attr(aria, false);
            $(this).parent().fadeOut(200);
            if (!$(this).closest(".tooltip-layer").data("inner-slick-link"))
                if ($("#commonAlert").is(":visible"));
                else e.focus()
        });
    $("#pd-tooltip-close").on("keydown", function(e) {
        if (!event.shiftKey && (event.keyCode || event.which) === 9) {
            event.preventDefault();
            $(".pd-copylink").focus()
        }
    });
    return false
}
window.addEventListener("click", function() {
    var tooltip = document.querySelectorAll(".tooltip-layer");
    [].forEach.call(tooltip, function(el) {
        if (el.style.display == "block") {
            var close = el.querySelector(".btn-tooltip-close");
            close.click()
        }
    })
});

function slideToggle(e) {
    var $e = $(e);
    if ($e.length == 0) return false;
    $e.click(function() {
        $(this).parents(".droptoggle").find(".dropList").slideUp("fast");
        $(this).parents(".droptoggle").find(".dropButton").removeClass("open");
        if (!$(this).next().is(":visible")) {
            $(this).next().slideDown("fast");
            $(this).addClass("open")
        }
    });
    return false
}

function freebiesToggle(e) {
    var $e = $(e);
    if ($e.length == 0) return false;
    $e.click(function() {
        $(this).parent(".dropDown-content").find("._add").slideUp("fast");
        $(this).parent(".dropDown-content").find(".dropButton.frbs").removeClass("open");
        if (!$(this).next().children().find("._add").is(":visible")) {
            $(this).next().children().find("._add").slideDown("fast");
            $(this).addClass("open")
        }
    });
    return false
}
var footerDropApp = {
    mobileFunc: function() {
        var $ftlist = $(".sitemap-links");
        var $ftlink = $ftlist.find(">ul>li>ul");
        $ftlist.find("li").removeClass("active");
        $ftlink.hide();
        $(document).on("click.footevent", ".sitemap-links h3", function(e) {
            e.stopImmediatePropagation();
            if ($(this).parent().hasClass("active")) {
                $(this).parent().removeClass("active");
                $(this).siblings("ul").hide()
            } else {
                $(this).parent().addClass("active");
                $(this).siblings("ul").show()
            }
        })
    },
    desktopFunc: function() {
        var $ftlist = $(".sitemap-links");
        var $ftlink =
            $ftlist.find(">ul>li>ul");
        $(document).off("click.footevent");
        $ftlist.find("li").removeClass("active");
        $ftlink.show()
    },
    init: function() {
        var _this = this;
        if ($(window).outerWidth() < 800) _this.mobileFunc();
        else _this.desktopFunc()
    }
};
$(function() {
    var windowWidthFooter = $(window).outerWidth();
    footerDropApp.init();
    $(window).resize(function() {
        var newWinw = $(window).outerWidth();
        if (newWinw !== windowWidthFooter) {
            windowWidthFooter = newWinw;
            if (newWinw < 800) footerDropApp.mobileFunc();
            else footerDropApp.desktopFunc()
        }
    }).resize()
});

function tabContent(e) {
    var $e = $(e);
    var ariaSelected = "aria-selected";
    var $tabCont = $(".tab-content");
    if ($e.length == 0 || $tabCont.length == 0) return false;
    $e.find("a").click(function(e) {
        e.preventDefault();
        var id = $(this).attr("aria-controls");
        $(this).closest(".tab-style-btn").find("a").attr(ariaSelected, "false");
        $(this).attr(ariaSelected, "true");
        $(this).closest(".tab-style-btn").parent().find("> .tab-content").hide();
        $("#" + id).show()
    });
    return false
}
var scrollBarWidth;
$(document).ready(function() {
    skip_navigator();
    calendar_picker();
    $(document).on("click", ".droptoggle .dropOption .dropButton", function() {
        $(this).parents(".droptoggle").find(".dropList").slideUp("fast");
        $(this).parents(".droptoggle").find(".dropButton").removeClass("open");
        if (!$(this).next().is(":visible")) {
            $(this).next().slideDown("fast");
            $(this).addClass("open")
        }
        $(this).off()
    });
    togglechange(".toggleCheck");
    tooltipLeftTop(".btn-tooltop02");
    tabContent(".tab-style-btn");
    spinnerchange(".spinner-box");
	bookmarkBtn(".btn-good, .sns-heart")

});

// �좊같�� slick 珥덇린��
function strBnrInit(){
	/* s : 221028 �좊같�� base.js濡� �대룞 */
	/* s:  221025 異붽� */
	$(".string-banner-wrap .slide-box").on('init',function(event, slick){
		if(slick.$slides[0].dataset.theme == 'white'){
			$(this).parent().addClass('theme-white');
		}else{
			$(this).parent().addClass('theme-black');
		}
	});
	/* e:  221025 異붽� */
	
	/* s : 20200903 string banner */
	if ($(".string-banner-wrap")) {
		var stringWrap = $(".string-banner-wrap"),
			stringItem = $(".string-banner-item"),
			stringSlide = stringWrap.find(".slide-box");
		if ( stringItem.length > 1 ) {
			stringWrap.addClass("is-slide");
			var stringBanner = stringSlide.slick({
				autoplay: true,
				touchMove: false,
				dots: false,
				arrows: true, //221026 �섏젙 
				useCSS: false,
				easing: 'easeInOutQuad',
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplaySpeed: 4000,
				//vertical: true, //220914 �섏젙
				lazyLoad: 'ondemand',
				draggable: false, //221026 異붽� 
				adaptiveHeight: true,  //221026 異붽� 
				swipe: false, //221026 異붽� 
			});

			/* 220920 媛믪뿉 �곕씪 x踰꾪듉 ��/寃� 蹂�寃� */
			stringBanner.on('afterChange',function(event, slick, currentSlide){
				//console.log($(slick.$slider.parent()))
				var bannerItem = $(slick.$slides[currentSlide])[0];
				var bannerItemWrap = $(slick.$slider.parent());

				bannerItemWrap.removeClass('theme-black theme-white');
				if(bannerItem.dataset.theme == 'white'){
					bannerItemWrap.addClass('theme-white');
				}else{
					bannerItemWrap.addClass('theme-black');
				}
			});
		}
		stringWrap.off("click.bannerClose");
		stringWrap.on("click.bannerClose",".btn-close", function (){
			stringWrap.slideUp();
		});
	}
	/* e : 20200903 string banner */
}

// 紐⑤컮�� �좊같�� 留먯쨪�꾩쿂由�
function mobStrBnrAbbr(){
	
	if($(".string-banner-wrap").length > 0){
		if($(window).width() <= 800){
			const boxTit = Array.from(document.querySelectorAll('.string-banner-wrap .slide-box .string-banner-item .txt')); 
			const box = [];

			const textSlice = function(tits, lengths){
				tits.forEach((el, idx) => {
					const tix = el.textContent;
					const memberPart = tix.slice(0, lengths);
					const t = memberPart.concat('...');
					box.push(t);

					if(tix.length >= lengths){
						tits[idx].innerHTML = box[idx];
					}
				});
			};
			textSlice(boxTit, 58);
		}
	}
}

var allCheckFunc = {
    check: function(name) {
        $("[data-chkgrp-name=" + name + "]:not(:disabled)").prop("checked", true)
    },
    uncheck: function(name) {
        $("[data-chkgrp-name=" + name + "]").prop("checked", false)
    }
};
$(function() {
    $("[data-allchk-name=allCheck]").click(function() {
        var children = $(this).attr("data-children-name");
        if ($(this).prop("checked")) allCheckFunc.check(children);
        else allCheckFunc.uncheck(children)
    });
    $(":checkbox:not([data-allchk-name=allCheck]):not(:disabled)").each(function() {
        $(this).click(function() {
            var name = $(this).attr("data-chkgrp-name");
            var allcount = 0;
            var checked = 0;
            $("[data-chkgrp-name=" + name + "]").each(function() {
                {
                    allcount++;
                    if ($(this).prop("checked")) checked++
                }
            });
            if (allcount != checked) {
                if ($("[data-children-name=" +
                    name + "]").length != 0) $("[data-children-name=" + name + "]").prop("checked", false)
            } else $("[data-children-name=" + name + "]").prop("checked", true)
        })
    })
});

function accessibilityFocus() {
    $(document).on("keydown", "[data-focus-prev]", "[data-focus-next]", function(e) {
        var next = $(e.target).attr("data-focus-next"),
            prev = $(e.target).attr("data-focus-prev"),
            target = next || prev || false;
        if (!target || e.keyCode != 9) return;
        if (!e.shiftKey && !!next || !e.shiftKey && !!prev) setTimeout(function() {
            $("[data-focus=" + target + "]").focus()
        }, 1)
    })
}

function popCloseFocus() {
    var next = $(event.target).attr("data-focus-next");
    $("[data-focus=" + next + "]").focus()
}
var LAYERZINDEX = 300;
var targetBtn = null;

function layerPopFunc(id) {
    var closeBtn = null;
    var ariaHidden = "aria-hidden";
    if (id) {
        var wrap = $("#" + id);
        closeBtn = wrap.find(".pop-close");
        open(id);
        if (event.type == "click") {
            targetBtn = event.srcElement;
            if (targetBtn.tagName != "BUTTON" || targetBtn.tagName != "A") targetBtn = $(targetBtn).closest("button, a")
        }
        closeBtn.off().on("click", function(e) {
            e.preventDefault();
            close(id)
        })
    } else {
        var openBtn = "[data-popup-target]";
        closeBtn = ".pop-close";
        $(document).on("click", openBtn, function(e) {
            e.preventDefault();
            $(e.target).addClass("clicked");
            open(getTarget(e.target))
        }).on("click", closeBtn, function(e) {
            e.preventDefault();
            close($(this).data("activeTarget"));
            scrollLock("unlock");
            if (device.isApp == true && !document.querySelector("#wrap").classList.contains("useWebGnb")) {
                var scrollValue = $(window).scrollTop();
                // 230414 KDP-28262
                // if (window.secapp){
                //     if (scrollValue < 50) window.secapp.showAndHideGnb("VISIBLE");
                //     else window.secapp.showAndHideGnb("GONE")
                // }
            }
        })
    }

    function getTarget(t) {
        if ($(t).attr("data-popup-target")) return $(t).attr("data-popup-target");
        else return $(t).closest("a").attr("data-popup-target")
    }

    function getTarget(t) {
        if ($(t).attr("data-popup-target")) return $(t).attr("data-popup-target");
        else return $(t).closest("a").attr("data-popup-target")
    }

    function open(t) {
        var showTarget;
        id ? showTarget = $("#" + id) : showTarget = $("[data-popup-layer=" + t + "]");
        if ($(".layer-pop").is(":visible")) LAYERZINDEX++;
        else LAYERZINDEX = 300;
        showTarget.removeAttr("style").addClass("active").css("z-index", LAYERZINDEX).attr(ariaHidden, false).attr("data-zindex", LAYERZINDEX).focus();
        showTarget.find(".layer-content").scrollTop(0);
        showTarget.find(".pop-close").data("activeTarget", t);
        if (device.isApp == true && !document.querySelector("#wrap").classList.contains("useWebGnb")) {
            scrollLock("lock");
            if(window.secapp){window.secapp.showAndHideGnb("GONE")}

        }
        if (!showTarget.hasClass("nomask") && t !== "latestItemLayer") {
            var zidx = parseInt($("#" + t).attr("data-zindex")) - 1;
            if ($("#mask[data-mask-target='" + t + "']").length === 0) {
                $("body").append("<div id='mask' data-mask-target='" + t + "' style='z-index:" + zidx + "'></div>");
                $("#mask").fadeIn().data("activeTarget", t)
            }
            scrollLock("lock")
        }
        if (t ==
            "latestItemLayer") $("#latestItemLayer").css("z-index", "300");
        if (showTarget.is("#gatherview, #layerSlick, #popupProdCode")) {
            $(".mediaslide, .modelslide, .filter-slick, .visualslide").slick("setPosition");
            $(".mediaslide-navi, .modelslide-navi, .visualslide-navi").slick("setPosition")
        }
    }

    function close(t) {
        var activeTarget;
        id ? activeTarget = $("#" + id) : activeTarget = $("[data-popup-layer=" + t + "]");
        if (!activeTarget.hasClass("active")) return;
        activeTarget.removeAttr("style").removeClass("active").removeAttr("data-zindex").attr(ariaHidden,
            true);
        scrollLock("unlock");
        $("#mask[data-mask-target='" + t + "']").fadeOut("fast").remove();
        if ($("#" + t).data("inner-slick-link")) $("[data-popup-target=" + t + "]").closest(".slick-slide").focus();
        else $("[data-popup-target=" + t + "].clicked").focus().removeClass("clicked");
        LAYERZINDEX--;
        if (targetBtn != null) targetBtn.focus()
    }
}

function showLatestItem(self, obj) {
    if (device.val != "m") {
        var $self = $(self);
        var layer = $("#" + obj);
        var btnClose = layer.find(".pop-close");
        layer.attr("tabindex", "0").css("display", "block");
        layer.focus();
        layer.addClass("active");
        btnClose.click(function() {
            layer.attr("tabindex", "-1");
            $self.focus();
            layer.removeClass("active");
            scrollLock("unlock")
        })
    } else layerPopFunc(obj)
}
$("#latestItemLayer").find(".pop-close").on("keydown", function() {
    $("#latestItemLayer").attr("tabindex", "-1");
    $("#btn-rcntgoods-floating").focus()
});
var activeDropWrap = null;
$(function() {
    layerPopFunc();
    accessibilityFocus();
    var DROPLIMIT = 5;
    $(document).on("click", ".droplist-button", function(e) {
        e.preventDefault();
        var $dropWrap = $(this).parent(".wrap-droplist");
        var $dropList = $(this).next();
        var dropListBtm;
        var docHeight = $(document).innerHeight();
        if (!$dropWrap.hasClass("nodrop"))
            if (!$dropWrap.hasClass("active")) {
                $(".wrap-droplist").removeClass("active").find(".droplist-button").attr("aria-expanded", "false");
                $dropWrap.addClass("active");
                var listh = $dropList.find("li").height() * DROPLIMIT;
                if (!$dropWrap.hasClass("custom-radio")) $dropList.css("max-height", listh);
                $dropList.find(">li").each(function() {
                    if ($(this).parents("ul").attr("role") == "listbox")
                        if ($(this).hasClass("focused")) $(this).attr({
                            "tabindex": "0"
                        });
                        else $(this).attr({
                            "aria-selected": "false",
                            "tabindex": "0"
                        })
                });
                if ($(this).next("ul").attr("role") == "listbox") $dropList.find("li:first-child").attr({
                    "aria-selected": "true",
                    "tabindex": "1"
                });
                dropListBtm = $dropList.outerHeight() + $dropList.offset().top;
                if (docHeight < dropListBtm) $dropWrap.addClass("bottom");
                $(this).attr("aria-expanded", "true");
                $dropList.find("[aria-selected='true']").focus()
            } else {
                $dropWrap.removeClass("active").removeClass("bottom");
                $(this).removeAttr("aria-expanded").focus();
                $(this).attr("aria-expanded", "false");
                activeDropWrap = null
            }
    });
    $(document).on("focus", ".droplist>li", function(e) {
        $(".droplist li").each(function(i) {
            if (!$(this).hasClass("focused")) $(this).attr("aria-selected", "false")
        });
        $(this).attr("aria-selected", "true")
    });
    $(document).on("focus", ".droplist-button", function(e) {
        e.preventDefault();
        var $dropBtn = $(this).parent().parent(),
            drpBTN = $(".droplist-button"),
            drpLI = $(".droplist>li");
        $dropBtn.addClass("active");
        if (e.target == drpBTN || e.target == drpLI) drpLI[0].focus()
    });
    $(document).on("click", ".droplist>li", function(e) {
        var wrapDroplist = ".wrap-droplist";
        var ariaSelected = "aria-selected";
        if (!$(this).hasClass("disabled"))
            if ($(this).attr("role") === "option") {
                if (!$(this).hasClass("focused")) {
                    $(this).parent().children().removeAttr(ariaSelected).removeClass("focused");
                    $(this).attr(ariaSelected, "selected").addClass("focused").focus()
                }
                if ($(this).children().length >
                    0 && $(this).parents(wrapDroplist).hasClass("included")) {
                    var $clone = $(this).children().clone();
                    $(this).parent().prev().html($clone)
                } else {
                    var $text = $(this).text();
                    $(this).parent().prev().html($text)
                }
                $(this).parent().attr("aria-activedescendant", $(this).attr("id"));
                $(this).parents(wrapDroplist).removeClass("active").removeClass("bottom");
                $(this).parent().prev().removeAttr("aria-expanded").addClass("selected").focus();
                activeDropWrap = null
            } else if ($(this).attr("role") === "noption") activeDropWrap = null;
            else if ($(this).attr("data-roll") ===
                "option") {
                if (!$(this).hasClass("focused")) {
                    $(this).parent().children().removeAttr(ariaSelected).removeClass("focused");
                    $(this).attr(ariaSelected, "selected").addClass("focused").focus()
                }
                if ($(this).children().length > 0 && $(this).parents(wrapDroplist).hasClass("included")) {
                    var $clone = $(this).children().clone();
                    $(this).parent().prev().html($clone)
                } else {
                    var $text = $(this).text();
                    $(this).parent().prev().html($text)
                }
                $(this).parent().attr("aria-activedescendant", $(this).attr("id"));
                $(this).parents(wrapDroplist).removeClass("active").removeClass("bottom");
                $(this).parent().prev().removeAttr("aria-expanded").addClass("selected").focus();
                activeDropWrap = null
            }
    });
    $(document).on("keydown", function(e) {
        var $target = $(e.target);
        var keyCode = window.event ? e.which : e.keyCode;
        var wrapDroplist = ".wrap-droplist";
        switch (keyCode) {
            case 9:
                if ($target.attr("role") === "option") {
                    e.preventDefault();
                    var targetParent = $target.parents(wrapDroplist);
                    if (targetParent.hasClass("active")) {
                        var current = targetParent.attr("id");
                        var currentBtn = targetParent.find(".droplist-button").attr("id");
                        $("#" + current).removeClass("active");
                        setTimeout(function() {
                            $("#" + currentBtn).focus()
                        }, 1)
                    }
                }
                break;
            case 13:
                if ($target.attr("role") === "option") {
                    e.preventDefault();
                    if ($target.attr("aria-disabled") != "true") setTimeout(function() {
                        $target.click()
                    }, 1)
                }
                if ($target.filter(".selected").length > 0) setTimeout(function() {
                    $(".droplist").find(".droplist-item.focused").focus()
                }, 1);
                break;
            case 38:
                if ($target.attr("role") === "option") {
                    e.preventDefault();
                    if ($target.index() > 0) $target.prev().focus()
                }
                break;
            case 40:
                if ($target.attr("role") ===
                    "option") {
                    e.preventDefault();
                    var len = $target.parent().children().length - 1;
                    if ($target.index() < len) $target.next().focus()
                }
                break
        }
    });
    $("body").on("click", function(e) {
        var $target = $(e.target);
        var isSelect = $target.parents(".wrap-droplist").length > 0;
        var exceptTarget = $target.hasClass("tooltip-layer") || $target.parents(".tooltip-layer").length > 0;
        var count = 0;
        var wrapDroplist = ".wrap-droplist";
        if ($(wrapDroplist).length > 0) $(wrapDroplist).each(function() {
            if ($(this).hasClass("active")) count++
        });
        if (!exceptTarget)
            if (!isSelect) {
                if ($(wrapDroplist).hasClass("active")) $(".wrap-droplist.active").find(".droplist-button").click()
            } else if (count >
                1) {
                $(".wrap-droplist.active").find(".droplist-button").click();
                $target.click()
            }
    })
});

function navLnbMyMemb() {
    var winw = $(window).width();
    var $list = $(".nav-lnb-rounded .list-menu").find(".list");
    if ($list.length > 0) {
        $list.find(".menu > a").click(function(e) {
            e.preventDefault();
            if (winw < 801 && !$(this).parent().hasClass("active")) {
                var calcleft = $(this).parent().offset().left + $list.scrollLeft() + $(this).parent().width() / 2 - $list.width() / 2;
                $list.animate({
                    scrollLeft: calcleft
                }, 300)
            }
            if (!$(this).parent().hasClass("active")) {
                $list.find(".menu").removeClass("active");
                $list.find(".menu").find("ul").slideUp();
                $(this).parent().addClass("active");
                $(this).next().slideDown()
            }
        });
        $(window).resize(function() {
            var winw = $(window).width();
            if (winw > 800) {
                var eleft = $(".nav-lnb-rounded").offset().left * -1;
                $(".nav-lnb-rounded").find(".bg").css("left", eleft)
            }
        }).resize()
    }
}
$(function() {
    var sGnbSubWrap = ".s-gnbSubWrap";
    $(".gnbMenu > ul > li > a.link-login").stop().on("mouseenter focus", function() {
        gnbMenuSubEv($(this))
    });
    $(".gnbMenu > ul > li > a.link-cart").on("click", function() {
        gnbMenuSubEv($(this))
    });
    $(".gnbMenu > ul > li > a.link-cart").on("keydown", function() {
        gnbMenuSubEv($(this))
    });

    function gnbMenuSubEv(t) {
        var __this = t,
            thisId = $(__this).attr("aria-controls"),
            aniCheck = $("#" + thisId).is(":animated");
        if (!aniCheck)
            if (!$(__this).hasClass("link-m-nav")) {
                var ariaSelected =
                    "aria-selected";
                if (document.querySelector("html").classList.contains("gnbOpen")) document.querySelector("html").classList.remove("gnbOpen");
                if (!$(__this).is(".open")) {
                    $(__this).next("div").focus();
                    if (!$("body").children().is("#gnbmask")) $("body").append("<div id='gnbmask'></div>");
                    $("#gnbmask").fadeIn();
                    $(__this).closest("#header").addClass("active").find("a").removeClass("open");
                    $(__this).addClass("open");
                    $(__this).closest("ul").find("a").attr(ariaSelected, "false");
                    $(__this).closest("#header").find(sGnbSubWrap).slideUp(200);
                    $("#" + thisId).slideDown(300)
                }
                $(__this).parent().find(".s-gnb-depth-2 li").removeClass("on").find("button").removeClass("selected");
                $(__this).parent().find(".s-gnb-depth-2 li").eq(0).addClass("on").find("button").addClass("selected")
            }
    }
    $(".lnb-close").on("click", function() {
        $(".gnb").removeClass("mo-Gnb");
        $("#gnbmask").fadeOut();
        $("body").removeClass("fixed-scroll");
        $("#header").find("a").removeClass("open")
    });
    $(".lnb-back").on("click", function() {
        $(sGnbSubWrap).slideUp(200, "easeOutCubic");
        setTimeout(function() {
                $(".lnb-back").parent().parent().parent().find("a").removeClass("open")
            },
            600)
    });

    function gnbRightUp() {
        $("#gnbmask, .lnb-close").fadeOut(300, function() {
            $(this).remove()
        });
        $(".gnbMenu > ul > li").focus();
        $(".gnbMenu > ul > li > a").attr("aria-selected", "false");
        $(".gnbMenu > ul > li > a").removeClass("open");
        $(sGnbSubWrap).slideUp(400, "easeOutCubic");
        $(".s-gnb-depth-2 li").removeClass("on").find("button").removeClass("selected");
        $("#header").removeClass("active");
        $("#gnbmask, .lnb-close").off()
    }
    $(".loginMenu, .header-right li").on("mouseleave", function() {
        if ($(".link-login.open").length >
            0) gnbRightUp()
    });
    $(".loginMenu dd:last-child a, .loginMenu dt:last-child a").keyup(function(e) {
        if (e.keyCode == 9 && $(".link-login.open").length > 0) gnbRightUp();
        e.preventDefault()
    });
    $(".gnb1depth>li:last-child>a").keyup(function(e) {
        if (e.shiftKey && e.keyCode == 9) gnbRightUp()
    });
    $(document).on("click", "#gnbmask", ".lnb-close", function() {
        if ($(".link-cart.open").length > 0) gnbRightUp()
    });
    $(".s-gnbSubWrap li").on("mouseenter focusin", function(e) {
        $(this).addClass("on").siblings().removeClass("on")
    });
    $(".s-gnbSubWrap li > button").on("mouseenter focusin",
        function() {
            $(this).closest(sGnbSubWrap).find("button").removeClass("selected");
            $(this).addClass("selected")
        });
    $(window).resize(function() {
        var winw = $(window).width();
        if (winw < 1100) {
            $(".gnb").removeClass("mo-Gnb");
            $("#gnbmask").fadeOut();
            $("body").removeClass("fixed-scroll");
            $(this).closest("#header").find(sGnbSubWrap).slideUp(200);
            $(document).on("mouseenter", "#gnbmask", function() {
                if ($(".link-cart.open").length == 0) {
                    $(this).fadeOut(300, function() {
                        $(this).remove()
                    });
                    $(".gnb").removeClass("mo-Gnb");
                    $("body").removeClass("fixed-scroll");
                    $(this).closest("#header").find(sGnbSubWrap).slideUp(200)
                }
            });
            $(".lnb-close").on("click", function() {
                $(".gnb").removeClass("mo-Gnb");
                $("#mobmask").fadeOut();
                $("body").removeClass("fixed-scroll");
                $("#header").find("a").removeClass("open");
                $(this).closest("#header").find(sGnbSubWrap).slideUp(200)
            });
            $(".s-gnb-depth-2 li").removeClass("on").find("button").removeClass("selected");
            $("#header").find(sGnbSubWrap).hide();
            $("#header").find("a").removeClass("open")
        } else {
            $(".gnb").removeClass("moGnb");
            $("body").removeClass("fixed-scroll");
            $("#mobmask").fadeOut()
        }
        if (winw <= 1100) $(".gnb3depth").each(function() {
            if ($(this).hasClass("new-prd-list")) {
                var recPcTargets = [".main-prd", ".sub-prd.num-1", ".sub-prd.num-2", ".sub-prd.num-3", ".sub-prd.num-4", ".sub-prd.num-5", ".sub-prd.num-6"];
                var recMoTagsClass = ["sub-prd main", "sub-prd n-1", "sub-prd n-2", "sub-prd n-3", "sub-prd n-4", "sub-prd n-5", "sub-prd n-6"];
                $(".new-prd-list .prd-list-wrap").replaceWith(function() {
                    return $("<ul/>", {
                        html: this.innerHTML
                    }).addClass("prd-list-wrap")
                });
                for (var pc_n = 0; pc_n <
                recPcTargets.length; pc_n++) $("div" + recPcTargets[pc_n]).replaceWith(function() {
                    return $("<li/>", {
                        html: this.innerHTML
                    }).addClass(recMoTagsClass[pc_n])
                });
                $(".txt-grp").each(function() {
                    $(this).find(".tit").addClass("mo-color");
                    $(this).find(".desc").addClass("mo-color")
                })
            }
        });
        else $(".gnb3depth").each(function() {
            if ($(this).hasClass("new-prd-list")) {
                var recMoTargets = [".sub-prd.main", ".sub-prd.n-1", ".sub-prd.n-2", ".sub-prd.n-3", ".sub-prd.n-4", ".sub-prd.n-5", ".sub-prd.n-6"];
                var recPcTagsClass = ["main-prd",
                    "sub-prd num-1", "sub-prd num-2", "sub-prd num-3", "sub-prd num-4", "sub-prd num-5", "sub-prd num-6"
                ];
                $(".new-prd-list .prd-list-wrap").replaceWith(function() {
                    return $("<div/>", {
                        html: this.innerHTML
                    }).addClass("prd-list-wrap")
                });
                for (var mo_n = 0; mo_n < recMoTargets.length; mo_n++) $("li" + recMoTargets[mo_n]).replaceWith(function() {
                    return $("<div/>", {
                        html: this.innerHTML
                    }).addClass(recPcTagsClass[mo_n])
                })
            }
            $(".gnb2depth .inner .list > li").each(function() {
                if ($(this).find(".flag-new").length > 0) $(this).addClass("new");
                $(this).find(".tit").removeClass("mo-color");
                $(this).find(".desc").removeClass("mo-color")
            })
        });
        if (device.val == "t" || device.val == "m") {
            $(".gnb1depth > li > a").each(function() {
                $(this).click(function() {
                    $(".new-gnb").find(".mob-onlyMenu").hide()
                })
            });
            $(".gnb-back").click(function() {
                if (!$(".new-gnb").find(".gnb1depth > li").hasClass("active")) $(".new-gnb").find(".mob-onlyMenu").show()
            });
            $(".gnb-close").click(function() {
                if (!$(".new-gnb").find(".gnb1depth > li").hasClass("active")) $(".new-gnb").find(".mob-onlyMenu").show()
            })
        }
    }).resize();
    navLnbMyMemb();
    $(".family-point-btn").off("click");
    $(".family-point-btn").on("click", function() {
        $(this).toggleClass("is-open");
        $(".family-point-wrap").slideToggle(0)
    })
});

function tabstyle2Bar(e) {
    var $e = $(e);
    $(".tab-point-content.tabstyle02 li").first().addClass("on");
    $e.click(function() {
        if (!$(this).hasClass("on")) {
            $(".tab-point-content.tabstyle02 li").removeClass("on");
            $(this).addClass("on")
        }
    })
}
$(window).on("load", function() {
    tabstyle2Bar(".tab-point-content.tabstyle02 li")
});
var vodPlayer = {
    ytApi: null,
    obj: {},
    accountId: "923136708001",
    playerId: "BJmCHrmIb",
    apiSet: function() {
        var tag = document.createElement("script");
        var firstScriptTag = document.getElementsByTagName("script")[0];
        tag.src = "https://www.youtube.com/iframe_api";
        vodPlayer.ytApi = tag;
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    },
    create: function(vodId, tagId, vodType, auto, loadCallBack, loopTF) {
        var autoStr = String(auto);
        var scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement &&
            document.documentElement.scrollTop || 0);
        var winH = window.innerHeight + scrollTop;
        vodPlayer.obj[tagId] = {};
        loopTF = loopTF ? 1 : 0;
        if (vodType == "video") vodPlayer.vid(vodId, tagId, autoStr, loadCallBack, {
            "winH": winH,
            "scrollTop": scrollTop
        }, loopTF);
        else if (vodType == "youtube") vodPlayer.yt(vodId, tagId, autoStr, loadCallBack, {
            "winH": winH,
            "scrollTop": scrollTop
        }, loopTF);
        if (vodType == "bc") vodPlayer.bc(vodId, tagId, autoStr, loadCallBack, {
            "winH": winH,
            "scrollTop": scrollTop
        }, loopTF);
        vodPlayer.obj[tagId]["sort"] = vodType
    },
    vid: function(vodId,
                  tagId, auto, loadCallBack, doc, loopTF) {
        var vodWrap = document.querySelector("#" + tagId);
        var mobState = false;
        var mobSrc = null;
        var vodSrc = vodId;
        if (device.val == "m" && vodWrap.dataset.mSrc) {
            mobSrc = vodWrap.dataset.mSrc;
            vodSrc = vodWrap.dataset.mSrc;
            mobState = true
        }
        var vod = document.createElement("video");
        vod.setAttribute("id", tagId);
        vod.setAttribute("playsinline", "");
        if (loopTF) vod.setAttribute("loop", "");
        var source = '<source src="' + vodSrc + '" type="video/mp4">';
        vod.innerHTML = source;
        vod.setAttribute("class", vodWrap.className);
        vodWrap.parentNode.insertBefore(vod, vodWrap);
        vodWrap.parentNode.removeChild(vodWrap);
        vodPlayer.obj[tagId]["vod"] = vod;
        window.addEventListener("resize", function() {
            if (mobState == false) {
                if (mobSrc != null && device.val == "m") {
                    vod.setAttribute("src", vodWrap.dataset.mSrc);
                    mobState = true
                }
            } else if (device.val != "m") {
                vod.setAttribute("src", vodId);
                mobState = false
            }
        });
        vod.addEventListener("play", function() {
            vodPlayer.obj[tagId]["state"] = "played"
        });
        vod.addEventListener("pause", function() {
            if (this.currentTime == 0 || this.currentTime ==
                this.duration) vodPlayer.obj[tagId]["state"] = "ready";
            else vodPlayer.obj[tagId]["state"] = "pause"
        });
        vodPlayer.vidReady(vod, tagId, auto, doc, loadCallBack)
    },
    vidReady: function(vod, tagId, auto, doc, loadCallBack) {
        var readyEl = null;
        if (device.os == "ios") canplayProc();
        else vod.addEventListener("canplay", canplayProc);

        function canplayProc() {
            vodPlayer.obj[tagId]["state"] = "ready";
            if (typeof loadCallBack != "undefined" && loadCallBack)
                if (typeof loadCallBack == "function") loadCallBack();
                else if (loadCallBack) eval(loadCallBack);
            if (auto == "true") {
                vod.muted = true;
                readyEl = $("#" + tagId);
                if (readyEl.offset().top < doc.winH && doc.scrollTop < readyEl.offset().top + readyEl.outerHeight())
                    if (readyEl.closest(".carousel-container").length == 0) vod.play();
                vodPlayer.scrollControl(readyEl, tagId)
            } else vod.setAttribute("controls", "")
        }
    },
    yt: function(vodId, tagId, auto, loadCallBack, doc, loopTF) {
        var playerOpt = loopTF ? {
            "showinfo": 0,
            "rel": 0,
            "playsinline": 1,
            "loop": loopTF,
            "playlist": vodId
        } : {
            "showinfo": 0,
            "rel": 0,
            "playsinline": 1,
            "loop": loopTF
        };
        if (vodPlayer.ytApi ==
            null) vodPlayer.apiSet("youtube");
        document.querySelector("#" + tagId).parentNode.classList.add("ifrm");
        document.querySelector("#" + tagId).parentNode.classList.add("youtube");
        var readyEl = null;
        var option = {
            width: "100%",
            height: "100%",
            videoId: vodId,
            playerVars: playerOpt,
            events: {
                "onReady": function(event) {
                    vodPlayer.obj[tagId]["state"] = "ready";
                    readyEl = $("#" + tagId);
                    if (auto == "true") {
                        if (device.val !== "p") event.target.mute();
                        if (readyEl.offset().top < doc.winH && doc.scrollTop < readyEl.offset().top + readyEl.outerHeight())
                            if (readyEl.closest(".carousel-container").length ==
                                0) setTimeout(function() {
                                event.target.playVideo()
                            }, 100);
                        vodPlayer.scrollControl(readyEl, tagId)
                    }
                    if (typeof loadCallBack != "undefined" && loadCallBack)
                        if (typeof loadCallBack == "function") loadCallBack();
                        else if (loadCallBack) eval(loadCallBack)
                },
                "onStateChange": function(event) {
                    if (event.data === 1) vodPlayer.obj[tagId]["state"] = "played";
                    else if (event.data === 2) vodPlayer.obj[tagId]["state"] = "pause";
                    else if (event.data === 0 || event.data == -1 || event.data == 5) vodPlayer.obj[tagId]["state"] = "ready"
                }
            }
        };
        try {
            vodPlayer.obj[tagId]["vod"] =
                new YT.Player(tagId, option);
            vodPlayer.obj[tagId]["sort"] = "youtube"
        } catch ($error) {
            setTimeout(function() {
                vodPlayer.create(vodId, tagId, "youtube", auto, loadCallBack, loopTF)
            }, 100)
        }
    },
    bc: function(vodId, tagId, auto, loadCallBack, doc, loopTF) {
        document.querySelector("#" + tagId).parentNode.classList.add("brightcove");
        if (!loopTF) loopTF = false;
        var vodWrap = document.querySelector("#" + tagId);
        var vodParent = vodWrap.parentNode;
        var readyEl = null;
        var tag = document.createElement("script");
        tag.src = "https://players.brightcove.net/" +
            vodPlayer.accountId + "/" + vodPlayer.playerId + "_default/index.min.js";
        var playerHTML = '<video id="' + tagId + '" data-video-id="' + vodId + '"  data-account="' + vodPlayer.accountId + '" data-player="' + vodPlayer.playerId;
        if (loopTF) playerHTML = playerHTML + '" loop="' + loopTF;
        playerHTML = playerHTML + '" data-embed="default" class="video-js" controls></video>';
        vodParent.insertAdjacentHTML("afterbegin", playerHTML);
        vodParent.insertBefore(tag, vodWrap);
        vodParent.removeChild(vodWrap);
        tag.onload = callback;

        function callback() {
            readyEl =
                $("#" + tagId);
            vodPlayer.obj[tagId]["vod"] = bc(tagId);
            vodPlayer.obj[tagId].vod.on("canplay", function() {
                var _this = this;
                vodPlayer.obj[tagId]["state"] = "ready";
                if (auto == "true") {
                    if (device.val !== "p") _this.muted(true);
                    if (readyEl.offset().top < doc.winH && doc.scrollTop < readyEl.offset().top + readyEl.outerHeight())
                        if (readyEl.closest(".carousel-container").length == 0) setTimeout(function() {
                            _this.play()
                        }, 100);
                    vodPlayer.scrollControl(readyEl, tagId)
                }
                if (typeof loadCallBack != "undefined" && loadCallBack)
                    if (typeof loadCallBack ==
                        "function") loadCallBack();
                    else if (loadCallBack) eval(loadCallBack)
            });
            vodPlayer.obj[tagId].vod.on("play", function() {
                vodPlayer.obj[tagId]["state"] = "played"
            });
            vodPlayer.obj[tagId].vod.on("pause", function() {
                if (this.cache_.currentTime == 0 || this.cache_.currentTime == this.cache_.duration) vodPlayer.obj[tagId]["state"] = "ready";
                else vodPlayer.obj[tagId]["state"] = "pause"
            })
        }
    },
    scrollControl: function(el, tagId) {
        window.addEventListener("scroll", function() {
            var scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop +
                (document.documentElement && document.documentElement.scrollTop || 0);
            var winH = window.innerHeight + scrollTop;
            if (el.offset().top < winH && scrollTop < el.offset().top + el.outerHeight()) {
                if (vodPlayer.obj[tagId].state !== "played")
                    if (el.closest(".carousel-container").length == 0) vodPlayer.play(tagId)
            } else if (vodPlayer.obj[tagId].state === "played") vodPlayer.stop(tagId)
        })
    },
    play: function(vodId) {
        if (vodPlayer.obj[vodId] != undefined)
            if (vodPlayer.obj[vodId]["sort"] == "video" || vodPlayer.obj[vodId]["sort"] == "bc") {
                if (vodPlayer.obj[vodId]["state"] ==
                    "ready") setTimeout(function() {
                    vodPlayer.obj[vodId]["vod"].play()
                }, 100)
            } else if (vodPlayer.obj[vodId]["sort"] == "youtube")
                if (vodPlayer.obj[vodId]["state"] == "ready") setTimeout(function() {
                    vodPlayer.obj[vodId]["vod"].playVideo()
                }, 100)
    },
    pause: function(vodId) {
        if (vodPlayer.obj[vodId] != undefined)
            if (vodPlayer.obj[vodId]["sort"] == "video" || vodPlayer.obj[vodId]["sort"] == "bc") vodPlayer.obj[vodId]["vod"].pause();
            else if (vodPlayer.obj[vodId]["sort"] == "youtube") vodPlayer.obj[vodId]["vod"].pauseVideo()
    },
    stop: function(vodId) {
        if (vodPlayer.obj[vodId] !=
            undefined)
            if (vodPlayer.obj[vodId]["sort"] == "video") {
                vodPlayer.obj[vodId]["vod"].pause();
                vodPlayer.obj[vodId]["vod"].currentTime = 0
            } else if (vodPlayer.obj[vodId]["sort"] == "youtube") vodPlayer.obj[vodId]["vod"].stopVideo();
            else if (vodPlayer.obj[vodId]["sort"] == "bc") {
                vodPlayer.obj[vodId]["vod"].currentTime(0);
                vodPlayer.obj[vodId]["vod"].pause()
            }
    },
    setAccount: function(accountId, playerId) {
        vodPlayer.accountId = accountId;
        vodPlayer.playerId = playerId
    }
};
var ifVodControl = function(el, type) {
    var videoWrap = el.querySelector(".video");
    if (videoWrap) {
        var video = el.querySelector(".video > video") || el.querySelector("iframe") || el.querySelector(".video-js");
        if (video) {
            var vodId = video.getAttribute("id");
            if (type == "play") {
                if (vodPlayer.obj[vodId].state != "played") vodPlayer.play(vodId)
            } else if (type == "pause") {
                if (vodPlayer.obj[vodId].state == "played") vodPlayer.pause(vodId)
            } else if (vodPlayer.obj[vodId].state == "played") vodPlayer.stop(vodId)
        }
    }
    return false
};
var vodCompoSlick = function(slideId, type, auto, ctarrow, ctindi) {
    var controlBlk = "control-blk";
    var controlWht = "control-wht";
    var arrowBlk = "arrow-blk";
    var arrowWht = "arrow-wht";
    var ctarrow = ctarrow;
    var ctindi = ctindi;
    if (ctarrow === undefined) ctarrow = true;
    if (ctindi === undefined) ctindi = true;
    if (!ctindi) slideId.parent().find(".slider-controls").addClass("hide");
    var slideOpt = {
        infinite: true,
        dots: ctindi,
        arrows: ctarrow,
        useCSS: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        easing: "easeInOutQuad",
        touchMove: false,
        appendDots: slideId.parent().find(".wrap-controls"),
        customPaging: function(slider, index) {
            var title = $(slider.$slides[index]).attr("data-ind-title");
            return "<button type='button'><span>" + title + "</span></button>"
        }
    };
    if (type == "type2") {
        slideOpt["centerPadding"] = "24px";
        slideOpt["centerMode"] = true
    }
    if (auto > 0) slideOpt["autoplaySpeed"] = auto;
    slideId.on({
        beforeChange: function(event, slick, currentSlide) {
            var videoWrap = $(slick.$slides[currentSlide])[0];
            ifVodControl(videoWrap, "stop")
        },
        afterChange: function(event, slick, currentSlide) {
            var videoWrap = $(slick.$slides[currentSlide])[0];
            var slideWrap = slideId.parent();
            if (videoWrap.querySelector(".video") !== null)
                if (videoWrap.querySelector(".video").dataset.auto !== "false") ifVodControl(videoWrap, "play");
            slideWrap.removeClass(controlBlk).removeClass(controlWht).removeClass(arrowBlk).removeClass(arrowWht);
            if (videoWrap.dataset.control == "wht") slideWrap.addClass(controlWht);
            else slideWrap.addClass(controlBlk);
            if (videoWrap.dataset.arrow == "wht") slideWrap.addClass(arrowWht);
            else slideWrap.addClass(arrowBlk)
        }
    });
    slideId.slick(slideOpt)
};
var vodCompAuto = function(v) {
    var $this = v.$this;
    var vod = v.vod;
    var slideId = v.slideId;
    var slide0 = v.slide0;
    var auto = v.auto;
    var vodSrc = v.vodSrc;
    var tagId = v.tagId;
    var autoPlay = v.autoPlay;
    var autoPause = v.autoPause;

    function loadFunc() {
        if (auto > 0) autoPlay()
    }
    var scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
    var winH = window.innerHeight + scrollTop;
    if (vod.dataset.auto == "true") $this.classList.add("auto");
    if (slideId.offset().top <
        winH && scrollTop < slideId.offset().top + slideId.outerHeight()) {
        var visualWrap = slide0.querySelector(".visual-area");
        var videoWrap = slide0.querySelector(".video");
        if (videoWrap && videoWrap.dataset.auto == "true" && visualWrap.classList.contains("auto") && videoWrap == v.vod) {
            setTimeout(function() {
                autoPause()
            }, 100);
            vodPlayer.create(vodSrc, tagId, vod.dataset.type, vod.dataset.auto, loadFunc, vod.dataset.loop)
        } else vodPlayer.create(vodSrc, tagId, vod.dataset.type, vod.dataset.auto, undefined, vod.dataset.loop)
    } else vodPlayer.create(vodSrc,
        tagId, vod.dataset.type, vod.dataset.auto, undefined, vod.dataset.loop)
};
var vodScreenAuto = function(v) {
    var slide = v.slide;
    var slideId = v.slideId;
    var auto = v.auto;
    var autoPlay = v.autoPlay;
    var autoPause = v.autoPause;
    var state = v.state;
    var controlWrap = v.controlWrap;
    var screenAuto = function() {
        var scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
        var winH = window.innerHeight + scrollTop;
        if (slideId.offset().top < winH && scrollTop < slideId.offset().top + slideId.outerHeight()) {
            var activeSlide = slide[0].querySelector(".slick-active");
            var visualWrap = activeSlide.querySelector(".visual-area");
            var videoWrap = activeSlide.querySelector(".video");
            if (videoWrap && videoWrap.dataset.auto == "true" && visualWrap.classList.contains("auto")) setTimeout(function() {
                ifVodControl(activeSlide, "play")
            }, 1E3);
            if (auto > 0)
                if (state == false) {
                    controlWrap.classList.add("ready");
                    autoPlay();
                    controlWrap.classList.remove("paused");
                    state = true
                }
        } else if (state == true) {
            autoPause();
            controlWrap.classList.add("paused");
            state = false
        }
    };
    setTimeout(function() {
        screenAuto()
    }, 500);
    window.addEventListener("scroll",
        function() {
            screenAuto()
        })
};
var vodCompoResize = function(v) {
    var vod = v.vod;
    var vodId = v.vodId;
    var mobState = v.mobState;
    var mobSrc = v.mobSrc;
    window.addEventListener("resize", function() {
        var target = vod.querySelector(".target");
        if (target && target.tagName == "VIDEO") {
            var vid = vod.querySelector("video");
            if (mobState == false) {
                if (mobSrc != null && device.val == "m") {
                    vid.setAttribute("src", mobSrc);
                    mobState = true
                }
            } else if (device.val != "m") {
                vid.setAttribute("src", vodId);
                mobState = false
            }
        }
    })
};
var vodCompoSlide = function(id, type, auto, ctarrow, ctindi) {
    var slideId = $(id);
    var state;
    slideId.on("init", function(event, slick) {
        var slide = $(this);
        var allVodWrap = slide[0].querySelectorAll(".visual-area");
        var controlWrap = slide[0].parentNode.querySelector(".slider-controls");
        var btnSlideAuto = controlWrap.querySelector(".slide-play");
        var btnSlidePause = controlWrap.querySelector(".slide-pause");
        state = false;
        slideId.parent().removeClass("control-wht control-blk arrow-wht arrow-blk");
        if (slick.$slides[0].dataset.control ==
            "wht") slideId.parent().addClass("control-wht");
        else slideId.parent().addClass("control-blk");
        if (slick.$slides[0].dataset.arrow == "wht") slideId.parent().addClass("arrow-wht");
        else slideId.parent().addClass("arrow-blk");
        var autoPlay = function() {
            slide.slick("slickPlay");
            controlWrap.classList.remove("paused")
        };
        var autoPause = function() {
            var activeSlide = slide[0].querySelector(".slick-active");
            ifVodControl(activeSlide, "pause");
            slide.slick("slickPause");
            controlWrap.classList.add("paused")
        };
        [].forEach.call(allVodWrap,
            function($this, idx) {
                var vod = $this.querySelector(".video");
                var btnPlay = $this.parentNode.querySelector(".btn-video-play");
                if (vod) {
                    var btnClose = $this.querySelector(".btn-video-close");
                    var vodWrap = $this.querySelector(".target");
                    var tagId = vod.dataset.id + idx;
                    var vodId = vod.dataset.src;
                    vodWrap.setAttribute("id", tagId);
                    var mobState = false;
                    var mobSrc = vod.dataset.mSrc;
                    var vodSrc = vodId;
                    if (device.val == "m" && vod.dataset.mSrc) {
                        vodSrc = vod.dataset.mSrc;
                        mobState = true
                    }
                    vodCompoResize({
                        "vod": vod,
                        "vodId": vodId,
                        "mobState": mobState,
                        "mobSrc": mobSrc
                    });
                    vodCompAuto({
                        "$this": $this,
                        "vod": vod,
                        "slideId": slideId,
                        "slide0": slick.$slides[0],
                        "auto": auto,
                        "vodSrc": vodSrc,
                        "tagId": tagId,
                        "autoPlay": autoPlay,
                        "autoPause": autoPause
                    });
                    if (btnClose) {
                        btnClose.addEventListener("click", function() {
                            $this.classList.remove("show");
                            slide.slick("slickNext");
                            slide.slick("slickPlay");
                            controlWrap.classList.remove("paused");
                            clearTimeout(vodPlayCallTime);
                            vodPlayer.stop(tagId)
                        });
                        btnPlay.addEventListener("click", function() {
                            $this.classList.add("show");
                            slide.slick("slickPause");
                            controlWrap.classList.add("paused");
                            vodPlayCall()
                        });
                        var vodPlayCallTime;
                        var vodPlayCall = function() {
                            if (vodPlayer.obj[tagId].state === undefined) vodPlayCallTime = setTimeout(function() {
                                vodPlayCall(tagId)
                            }, 500);
                            else vodPlayer.play(tagId)
                        }
                    }
                }
            });
        btnSlideAuto.addEventListener("click", autoPlay);
        btnSlidePause.addEventListener("click", autoPause);
        vodScreenAuto({
            "slide": slide,
            "slideId": slideId,
            "auto": auto,
            "autoPlay": autoPlay,
            "autoPause": autoPause,
            "state": state,
            "controlWrap": controlWrap
        })
    });
    vodCompoSlick(slideId,
        type, auto, ctarrow, ctindi)
};
var floatSticky = function() {
    var wrap = document.querySelector(".floating-sticky");
    var movWrap = wrap.querySelector(".inner");
    var btnFloating = wrap.querySelector(".btn-floating");
    var btnTop = wrap.querySelector(".btn-gotop");
    window.addEventListener("scroll", function() {
        var scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
        scrollTop > 1E3 ? btnTop.classList.add("show") : btnTop.classList.remove("show")
    });
    btnTop.addEventListener("click",
        function() {
            $("html, body").animate({
                scrollTop: 0
            }, 300)
        });
    if (btnFloating) btnFloating.addEventListener("click", function() {
        this.parentNode.classList.toggle("on");
        if ($(".floating-sticky .menu-list .inner").hasClass("on")) {
            $(".menu03, .menu02").attr("aria-hidden", "false");
            $(".menu03, .menu02").css("display", "block")
        } else {
            $(".menu03, .menu02").attr("aria-hidden", "true");
            $(".menu03, .menu02").css("display", "none")
        }
        event.preventDefault()
    });
    if (device.val == "p") $(".floating-sticky .menu-list .inner").draggable({
        stop: function(event,
                       ui) {
            $(event.originalEvent.target).one("click", function(e) {
                e.stopImmediatePropagation()
            })
        }
    });
    else {
        var elTop = 0;
        var elLeft = 0;
        movWrap.addEventListener("touchstart", function(e) {
            elTop = e.changedTouches[0].clientY - wrap.offsetTop - movWrap.offsetTop;
            elLeft = e.changedTouches[0].clientX - wrap.offsetLeft - movWrap.offsetLeft
        });
        movWrap.addEventListener("touchmove", function(e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();
            var top = e.changedTouches[0].clientY - wrap.offsetTop - elTop;
            var left = e.changedTouches[0].clientX -
                wrap.offsetLeft - elLeft;
            movWrap.style.cssText = "top: " + top + "px; left: " + left + "px;"
        })
    }
};
var listHeightControl = function(el, item) {
    var listWrap = document.querySelector(el);
    var list = listWrap.querySelectorAll(item);
    var itemClass = item;
    var item = {};
    var line = 0;
    var sort = "";
    [].forEach.call(list, function(el) {
        var elTop = el.offsetTop;
        if (sort !== elTop) {
            sort = elTop;
            line = line + 1;
            item["line" + line] = []
        }
        if (sort === elTop) item["line" + line].push(el)
    });
    for (var i = 1; i <= line; i++) {
        var cardArr = [];
        item["line" + i].forEach(function(el, idx) {
            var card = el.querySelectorAll('[class*="card-"]');
            [].forEach.call(card, function(el) {
                if (itemClass ===
                    ".box-product-card") el.style.margin = "";
                el.style.height = ""
            });
            if (idx === 0)[].forEach.call(card, function(el) {
                cardArr.push(el.clientHeight)
            });
            else [].forEach.call(card, function(el, idx) {
                if (cardArr[idx] < el.clientHeight) cardArr[idx] = el.clientHeight
            })
        });
        item["line" + i].forEach(function(el) {
            var card = el.querySelectorAll('[class*="card-"]');
            [].forEach.call(card, function(el, idx) {
                if (itemClass === ".box-product-card") {
                    var _thisHeight = 0;
                    _thisHeight = cardArr[idx];
                    if (_thisHeight === 0) el.style.margin = 0
                }
                el.style.height = cardArr[idx] +
                    "px"
            })
        })
    }
};
var pfListHeight = function() {
    listHeightControl(".pf-prd-cardlist", ".item-inner");
    filterSel();
    colorOptSel()
};
var pfImgChange = function() {
    var pfList = document.querySelector(".pf-prd-cardlist");
    var list = pfList.querySelectorAll(".item-inner");
    [].forEach.call(list, function(obj) {
        var imgWrap = obj.querySelector(".card-img");
        var img = imgWrap.querySelector("img");
        var imgData = imgWrap.dataset.imageSrc;
        var srcSplit = imgData.split(" ");
        var srcArry = [];
        srcSplit.forEach(function(str) {
            var start = str.indexOf("'");
            var end = str.lastIndexOf("'");
            var src = str.substring(start + 1, end);
            srcArry.push(src)
        });
        var interval;
        var activeImg = 0;
        var imgChangeFunc =
            function() {
                interval = setInterval(function() {
                    img.src = srcArry[activeImg];
                    if (activeImg < srcArry.length - 1) activeImg++;
                    else activeImg = 0
                }, 1E3)
            };
        imgWrap.addEventListener("mouseenter focus", function() {
            imgChangeFunc()
        });
        imgWrap.addEventListener("mouseleave blur", function() {
            clearInterval(interval)
        })
    })
};
var pfFilter = function() {
    $(document).ready(function() {
        $(".list-filter .btn-filter").on("click", function(e) {
            $(this).parent().find(".list-box").slideUp();
            if (!$(this).parent().hasClass("active")) {
                $(this).parent().addClass("active");
                if (!$(this).next().is(":visible")) {
                    $(this).next().slideDown();
                    $(this).parent().addClass("open")
                }
            } else {
                $(this).parent().removeClass("active");
                $(this).parent().find(".list-box").slideUp()
            }
            checkPfFilter()
        });
        if ($(window).width() > 800) {
            $(".list-filter > li").eq(0).find(".btn-filter").click();
            $(".list-filter > li").eq(1).find(".btn-filter").click()
        } else $(".list-filter > li").eq(0).find(".btn-filter").click()
    });
    window.addEventListener("load", function() {
        checkPfFilter()
    });

    function checkPfFilter() {
        var $item = $(".list-filter>li");
        $item.find($("span.blind")).remove();
        $item.each(function() {
            if ($(this).hasClass("active")) $(this).find(".btn-filter").append('<span class="blind">�대┝</span>');
            else $(this).find(".btn-filter").append('<span class="blind">�ロ옒</span>')
        })
    }
    $(function() {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 300,
            step: 1,
            values: [63, 245],
            slide: function(event, ui) {
                $("#rangePrice").find(".min-range").text(ui.values[0] + "留뚯썝");
                $("#rangePrice").find(".max-range").text(ui.values[1] + "留뚯썝")
            }
        });
        $("#rangePrice").find(".min-range").text($("#slider-range").slider("values", 0) + "留뚯썝");
        $("#rangePrice").find(".max-range").text($("#slider-range").slider("values", 1) + "留뚯썝")
    });
    $("#slider-range .ui-slider-handle").draggable();
    $(function() {
        var $openPFBtn = $("#srchDetailFilter"),
            $pfFilter = $("#pfFilterArea"),
            $closePFBtn = $pfFilter.find(".close");
        var ariaHidden = "aria-hidden";

        function pfFilterFunc() {
            var winw = $(window).width();
            if (winw < 801) {
                $openPFBtn.click(function(e) {
                    scrollLock("lock");
                    if (device.isApp == true && !document.querySelector("#wrap").classList.contains("useWebGnb")) {
                        var scrollValue = $(window).scrollTop();
                        if (scrollValue < 50) $pfFilter.css("top", device.appHgt + "px");
                        else {
                            $pfFilter.css("top", "0" + "px");
                            if(window.secapp){ window.secapp.showAndHideGnb("GONE")}

                        }
                    }
                    e.preventDefault();
                    $pfFilter.show().attr(ariaHidden, "false").focus();
                    $("body, html").css("overflow", "hidden");
                    if ($(".pf-filter-mask").length <= 0) $("body").append("<div class='pf-filter-mask'></div>");
                    $(".pf-filter-mask").show()
                });
                $closePFBtn.click(function(e) {
                    e.preventDefault();
                    $pfFilter.hide().attr(ariaHidden, "true");
                    $("#srchDetailFilter").focus();
                    $("body, html").css("overflow", "");
                    $(".pf-filter-mask").hide();
                    scrollLock("unlock");
                    setTimeout(function() {
                        $(".pf-filter-mask").remove()
                    }, 500);
                    if (device.isApp == true && !document.querySelector("#wrap").classList.contains("useWebGnb")) {
                        var scrollValue = $(window).scrollTop();
                        // 230414 KDP-28262
                        // if (window.secapp){
                        //     if (scrollValue < 50) window.secapp.showAndHideGnb("VISIBLE");
                        //     else window.secapp.showAndHideGnb("GONE")
                        // }
                    }
                })
            }
        }
        pfFilterFunc();
        var winOrigin = $(window).width();
        $(window).resize(function() {
            var newWinw = $(window).width();
            if (newWinw !== winOrigin) {
                winOrigin = newWinw;
                if (newWinw < 801) {
                    if ($pfFilter.is(":visible")) {
                        $pfFilter.hide().attr(ariaHidden, "true");
                        $(".pf-filter-mask").remove()
                    }
                    pfFilterFunc()
                } else {
                    $("body, html").css("overflow", "");
                    $(".pf-filter-mask").remove();
                    if (!$pfFilter.is(":visible")) $pfFilter.show().attr(ariaHidden,
                        "false")
                }
            }
        }).resize()
    })
};

function filterSel() {
    $(".filter-slick").each(function() {
        var _this = $(this);
        var check = _this.find("input:checked");
        var checkIdx = 0;
        if (_this.data("width") === undefined || _this.data("width") == 0) _this.data("width", _this.width());
        _this.find("input:radio").click(function() {
            $(this).is(":checked");
            $(this).parent("li").siblings().find("input:radio").prop("checked", false);
            checkIdx = $(this).parent().index();
            slider.slideTo(checkIdx)
        });
        if (_this.data("width") > _this.parent().width())
            if (_this.data("slider") === undefined) {
                _this.parent().addClass("slideOn");
                _this.data("slider", slider)
            } else _this.data("slider").update();
        else if (_this.data("slider") !== undefined) {
            _this.data("slider").destroy();
            _this.removeData("slider");
            _this.removeData("width");
            _this.parent().removeClass("slideOn")
        }
        var slider = new Swiper(_this, {
            slidesPerView: "auto",
            slideToClickedSlide: true,
            initialSlide: check.parent().index(),
            navigation: {
                nextEl: _this.find(".btn-next"),
                prevEl: _this.find(".btn-prev")
            },
            spaceBetween: 5,
            breakpoints: {
                801: {
                    spaceBetween: 8
                },
                1441: {
                    spaceBetween: 10
                }
            }
        })
    })
}

function colorOptSel() {
    $(".option-slick").each(function() {
        var _this = $(this);
        var check = _this.find("input:checked");
        var checkIdx = 0;
        if (_this.data("width") === undefined || _this.data("width") == 0) _this.data("width", _this.width());
        if (check.parent().index() > 0) checkIdx = check.parent().index();
        if (_this.data("width") > _this.parent().width())
            if (_this.data("slider") === undefined) {
                _this.parent().addClass("slideOn");
                var slider = new Swiper(_this, {
                    slidesPerView: "auto",
                    navigation: {
                        nextEl: _this.find(".btn-next"),
                        prevEl: _this.find(".btn-prev")
                    },
                    spaceBetween: 2
                });
                slider.slideTo(checkIdx);
                _this.data("slider", slider)
            } else _this.data("slider").update();
        else if (_this.data("slider") !== undefined) {
            _this.data("slider").destroy();
            _this.removeData("slider");
            _this.removeData("width");
            _this.parent().removeClass("slideOn")
        }
    })
}
var prdCompare = {
    state: false,
    brieflySlide: null,
    unbriefly: function() {
        var layer = $(".pf-compare");
        var slide = layer.find(".slider-prd-compare");
        if (slide.find("> .prd").length < 4 && device.val === "p") {
            prdCompare.state = false;
            prdCompare.brieflySlide.slick("unslick")
        }
    },
    briefly: function() {
        var layer = $(".pf-compare");
        var slide = layer.find(".slider-prd-compare");
        if (!layer.hasClass("open")) {
            layer.show().stop().animate({
                "bottom": 0
            }, 300, function() {
                if (slide.find("> .prd").length > 3 && device.val === "p") {
                    prdCompare.state = true;
                    prdCompare.brieflySlide = slide.slick({
                        slidesToShow: 3,
                        infinite: false,
                        responsive: [{
                            breakpoint: 800,
                            settings: "unslick"
                        }]
                    })
                }
            });
            layer.addClass("open")
        } else if (prdCompare.state == false)
            if (slide.find("> .prd").length > 3 && device.val !== "m") {
                prdCompare.state = true;
                prdCompare.brieflySlide = slide.slick({
                    slidesToShow: 3,
                    infinite: false,
                    responsive: [{
                        breakpoint: 800,
                        settings: "unslick"
                    }]
                })
            } layer.find(".slider-prd-compare").focus();
        layer.find(".btn-reset").click(function(e) {
            e.preventDefault();
            if (layer.hasClass("open")) layer.stop().animate({
                    "bottom": "-50%"
                },
                700,
                function() {
                    layer.removeClass("open").hide();
                    $(".list-product li").find(".link-compare[data-compare-target='true']").focus().removeAttr("data-compare-target")
                })
        });
        layer.find(".btn-compare").click(function(e) {
            e.preventDefault();
            setTimeout(function() {
                prdCompare.detail()
            }, 300)
        })
    },
    detailSlide: null,
    detail: function() {
        var layerWrap = $(".layer-pf-compare .layer-content");
        filterSel();
        colorOptSel();
        layerWrap.on("scroll", function() {
            var _thisScroll = $(this).scrollTop();
            var scrTop = layerWrap.height() / 2 + _thisScroll;
            var sel = layerWrap.find(".wrap-droplist");
            if (layerWrap.find(".slick-arrow").length > 0) {
                var arrow = layerWrap.find(".slick-arrow");
                arrow.css({
                    top: scrTop + "px"
                });
                sel.css({
                    top: _thisScroll + "px"
                })
            }
        })
    }
};
var pfListFunc = function() {
    $(function() {
        if ($("#slideCarousel01").find("li").length > 1) {
            $("#slideCarousel01").slick({
                arrows: false,
                autoplay: false,
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 9999,
                    settings: "unslick"
                }, {
                    breakpoint: 801,
                    settings: {
                        centerPadding: "25vw",
                        slidesToShow: 1.2,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 560,
                    settings: {
                        centerPadding: "24px",
                        slidesToShow: 1.2,
                        slidesToScroll: 1
                    }
                }]
            });
            $(window).on("resize orientationchange", function() {
                $("#slideCarousel01").slick("resize")
            })
        }
        if ($("#slideCarousel02").find("li").length >
            1) {
            $("#slideCarousel02").slick({
                arrows: false,
                autoplay: false,
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 9999,
                    settings: "unslick"
                }, {
                    breakpoint: 801,
                    settings: {
                        centerPadding: "48px",
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true
                    }
                }, {
                    breakpoint: 560,
                    settings: {
                        centerPadding: "24px",
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true
                    }
                }]
            });
            $(window).on("resize orientationchange", function() {
                $("#slideCarousel02").slick("resize")
            })
        }
        var ariaHidden = '"aria-hidden';
        if ($(".list-product").length >
            0) $(".list-product li, .ranking-inner").find(".link-compare").click(function(e) {
            e.preventDefault();
            prdCompare.briefly();
            $(".list-product li").find(".link-compare").removeAttr("data-compare-target");
            $(this).attr("data-compare-target", "true")
        });
        $(document).on("click", ".price-detail .btn-downtool", function(e) {
            var $this = $(this);
            $this.toggleClass("open");
            if (!$this.next(".box-tip").is(":visible")) $this.next(".box-tip").show().attr("aria-hidden", "false");
            else $this.next(".box-tip").hide().attr("aria-hidden",
                "true")
        });
        $(document).on("mouseleave", ".price-detail .pic .box-tip, .price-detail .pic", function(e) {
            var $this = $(this);
            $(".box-tip").removeClass("open").hide().attr("aria-hidden", "true");
            $(".btn-downtool").removeClass("open").attr("aria-hidden", "true")
        });
        $(window).on("resize orientationchange", function() {
            filterSel();
            colorOptSel()
        });
        $(window).resize(function() {
            var winw = $(window).width();
            if (winw > 800) $(".customScrollbar").mCustomScrollbar({
                theme: "minimal-dark"
            });
            else $(".customScrollbar").mCustomScrollbar("destroy")
        }).resize()
    });
    pfImgChange();
    window.addEventListener("load", pfListHeight);
    window.addEventListener("resize", pfListHeight)
};
var CpnPrdCardListing = function() {
    var setCols = 4;
    $(window).resize(function() {
        listHeightControl("#productCardListing", ".box-product-card");
        var winw = $(window).width();
        setCols = winw > 800 ? 4 : 2;
        CpnPrdCardSet(setCols);
        filterSel();
        colorOptSel()
    }).resize()
};

function CpnPrdCardSet(setCols) {
    var setCols = setCols;
    $(".slider-select-prdlist").each(function() {
        var _thisEl = $(this).find(".box-product-card:visible");
        _thisEl.removeClass("last-left").removeClass("last-right").removeClass("first-right");
        var total = _thisEl.length;
        if (total > 0) {
            if (total < setCols) _thisEl.eq(total - 1).addClass("first-right");
            var restCols = total % setCols;
            if (restCols === 0) _thisEl.eq(total - setCols).addClass("last-left");
            else {
                if (total > setCols) _thisEl.eq(total - restCols - 1).addClass("last-right");
                _thisEl.eq(total -
                    setCols + (setCols - restCols)).addClass("last-left")
            }
            _thisEl.eq(total - 1).addClass("last-right")
        }
    })
}

// 230119 鍮꾧탳�섍린 �뚮줈�� �꾩튂
var toastH = $('.pfpd-compare').outerHeight();
var compareinnerH ;
function floatingStickyComparePosition() {
	if($(window).width() <= 800){ //mobile ver
		if($('.pfpd-compare').hasClass('only-pdCompare')){ //pd.html
			bPosition = $('.itm-total-bottom').outerHeight();
			if($('.pfpd-compare').hasClass('close')){
				$('.floating-sticky').css('margin-bottom', bPosition);	
				$('.floating-sticky').addClass('pfpd-compare-mo-position-close');
			}else if($('.pfpd-compare').hasClass('open')){
				toastH = $('.pfpd-compare').outerHeight();
				$('.floating-sticky').css('margin-bottom', toastH);	
				$('.floating-sticky').removeClass('pfpd-compare-mo-position-close');
			}
		}else{ //pf.html
			console.log('mo > pf');
			floatingPfpdCompareNormalPosition(-100);
		}
	}else{ //pc ver
		floatingPfpdCompareNormalPosition(-100);		
	}	
}
function floatingPfpdCompareNormalPosition(setPositionNum) { // 230119 
	if($('.pfpd-compare').hasClass('close')){
		$('.floating-sticky').css('margin-bottom',setPositionNum);
		setTimeout(function() {
			toastH = $('.pfpd-compare').outerHeight();
			$('.floating-sticky').css('margin-bottom',toastH );
		}, 500);
	}else if($('.pfpd-compare').hasClass('open')){
		$('.floating-sticky').css('margin-bottom',setPositionNum);
		setTimeout(function() {
			toastH = $('.pfpd-compare').outerHeight();
			$('.floating-sticky').css('margin-bottom',toastH );
		}, 500);
	}
}

function mobLog(str) {
    if ($(window).find(".moblog")) $(".moblog").remove();
    $("#wrap").append('<p class="moblog" style="position:fixed;top:50%;left:50%;background:red;font-size:20px;z-index: 1000">' + str + "</p>")
}
window.addEventListener("DOMContentLoaded", function() {
    var navLinkWin, navLinkOffset, navLinkSTop, navLinkEl = $(".wrap-html-content .nav-cpnt-wrap");
    $(window).resize(function() {
        if (navLinkEl.length > 0) {
            navLinkWin = $(window).outerWidth();
            navLinkOffset = navLinkEl.offset().top;
            navLinkFixed()
        }
    });
    $(window).scroll(function() {
        if (navLinkEl.length > 0) {
            navLinkSTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
            navLinkFixed()
        }
    });

    function navLinkFixed() {
        if (540 >=
            navLinkWin)
            if (navLinkSTop > navLinkOffset) navLinkEl.addClass("fixed");
            else navLinkEl.removeClass("fixed")
    }
});
var stickyPos, stickyTargetHeight, stickyStartTop;
$(window).on("scroll resize load", function(e) {
    stickyScrollPos()
});

function stickyScrollPos() {
    var stickyEl = $(".floating-sticky");
    if (stickyEl.length > 0) {
        stickyPos = stickyEl.offset().top + stickyEl.outerHeight();
        if (device.val === "p" || device.val === "t")
            if ($(".footer-content").eq(2).length > 0) {
                stickyStartTop = $(".footer-content").eq(2).offset().top;
                stickyTargetHeight = 100;
                if (stickyEl.hasClass("on")) stickyPos = stickyPos + stickyTargetHeight;
                if (stickyPos >= stickyStartTop) stickyEl.addClass("on").css({
                    "margin-bottom": stickyTargetHeight + "px"
                });
                else stickyEl.removeClass("on").css({
                    "margin-bottom": "0"
                })
            } if (device.val ===
            "m") {
            if ($(".itm-total-bottom").length > 0) {
                stickyStartTop = $(".itm-total-bottom").offset().top;
                stickyTargetHeight = $(".itm-total-bottom").css("display") === "none" ? 0 : $(".itm-total-bottom").outerHeight()
            }
            if ($(".m-buy-btn-box").length > 0) {
                stickyStartTop = $(".m-buy-btn-box").offset().top;
                stickyTargetHeight = $(".m-buy-btn-box").outerHeight()
            }
            if ($(".itm-total-bottom").length > 0 || $(".m-buy-btn-box").length > 0) {
                if (stickyEl.hasClass("on")) stickyPos = stickyPos + stickyTargetHeight;
                if (stickyPos >= stickyStartTop) stickyEl.addClass("on").css({
                    "margin-bottom": stickyTargetHeight +
                        "px"
                });
                else stickyEl.removeClass("on").css({
                    "margin-bottom": "0"
                })
            }
        }
    }
}
defsize = 15;

function fontZoom(n) {
    objs = $(".layer-pop *").not("h2, .btn-font-size > li, .btn-font-size > li > button, .pop-close");
    if (13 < defsize && defsize < 21) {
        defsize += n;
        if (defsize == 13) defsize += 1;
        if (defsize == 21) defsize -= 1
    }
    if (13 < defsize && defsize < 21) $(objs).css("font-size", defsize + "px")
}

function fontInit() {
    defsize = 15;
    objs = $(".layer-pop *");
    $(objs).css("font-size", defsize + "px")
}

function initPrint() {
    fontInit();
    zoomInit()
}
checkFocusSearchLayer();

function checkFocusSearchLayer() {
    $(document).on("focus", ".btn-search", function() {
        headerSearch.eventListener.uinifiedSearchInp()
    })
}

function mouseOverArrow() {
    var linkUrl = $(".link-over");
    linkUrl.on("mouseenter", function() {
        $(this).parent(".link-over-wrap").addClass("over")
    }).on("mouseleave", function() {
        $(this).parent(".link-over-wrap").addClass("out");
        setTimeout(function() {
            $(".link-over-wrap").removeClass("over out")
        }, 200)
    })
}
$(function() {
    mobSlickSlide(".videoStore .stepInfo", 800, 2, 1, true, false)
});

function mobSlickSlide(slickContainer, mobBreakPoint, mobSlideShow, mobSlideScroll, mobIndi, mobHeight) {
    $(slickContainer).slick({
        arrows: false,
        autoplay: false,
        infinite: false,
        dots: false,
        responsive: [{
            breakpoint: 9999,
            settings: "unslick"
        }, {
            breakpoint: mobBreakPoint,
            settings: {
                arrows: true,
                dots: mobIndi,
                adaptiveHeight: mobHeight,
                slidesToShow: mobSlideShow,
                slidesToScroll: mobSlideScroll
            }
        }]
    });
    $(window).on("resize orientationchange", function() {
        $(slickContainer).slick("resize")
    })
}

function sdCompoSlide(slideId, pcBg, moBg, ctArrow, ctDots, aPlay, aSpeed) {
    var _sdSlide = $(slideId);
    var _sdWrap = _sdSlide.closest(".story-double-content");
    var _sdCtrl = _sdWrap.find(".slider-controls");
    var ctrlWrap = _sdCtrl.children(".wrap-controls");
    var ctrlPlay = _sdCtrl.children(".slide-btn");
    var ctrl = _sdSlide.attr("data-control");
    var arws = _sdSlide.attr("data-arrow");
    var slickSet = {
        responsive: [{
            breakpoint: 9999,
            settings: "unslick"
        }, {
            breakpoint: 800,
            settings: {
                dots: ctDots,
                arrows: ctArrow,
                autoplay: aPlay,
                autoplaySpeed: aSpeed,
                appendDots: ctrlWrap,
                customPaging: function(slider, index) {
                    var title = $(slider.$slides[index]).attr("data-ind-title");
                    var omni = $(slider.$slides[index]).attr("data-omni");
                    return "<button type='button' data-omni='" + omni + "'>" + title + "</button>"
                }
            }
        }]
    };
    _sdWrap.addClass("control-" + ctrl).addClass("arrow-" + arws);
    if (aPlay == false) _sdCtrl.addClass("none-auto");
    $(window).on("resize orientationchange", function() {
        _sdSlide.slick("resize");
        _sdCtrl.removeClass("paused");
        if (device.val == "m") {
            ctrlPlay.on("click", function() {
                var _this =
                    $(this);
                if (_this.hasClass("slide-play")) {
                    _sdCtrl.removeClass("paused");
                    _sdSlide.slick("slickPlay")
                } else {
                    _sdCtrl.addClass("paused");
                    _sdSlide.slick("slickPause")
                }
            });
            _sdWrap.css("background-color", moBg)
        } else _sdWrap.css("background-color", pcBg)
    });
    _sdSlide.slick(slickSet)
}

function galcamsSlide(slideID, arrow, dots, auto, speed, height) {
    var _gsID = $(slideID);
    var _gsWrp = _gsID.closest(".galcams-popup");
    var _gsCtrl = _gsWrp.find(".slider-controls");
    var _ctrl = _gsCtrl.children(".wrap-controls");
    var galcamsSet = {
        lazyload: "ondemand",
        dots: dots,
        arrows: arrow,
        autoplay: auto,
        autoplaySpeed: speed,
        appendDots: _ctrl,
        adaptiveHeight: height,
        customPaging: function(slider, index) {
            var title = $(slider.$slides[index]).attr("data-ind-title");
            var omni = $(slider.$slides[index]).attr("data-omni");
            return "<button type='button' data-omni='" +
                omni + "'><span>" + title + "</span></button>"
        }
    };
    _gsID.slick(galcamsSet)
}
$(document).ready(function() {
    $("#customerService").on("mouseenter mouseleave", function() {
        $(this).toggleClass("open")
    })
});