var device = {
    agent: navigator.userAgent.toLocaleLowerCase(),
    os: null,
    ver: null,
    isApp: null,
    appHgt: 0,
    val: "",
    isGnb: false /* 2022-05-20 */,
    init: function () {
      var str;
      var ver;
      if (device.agent !== undefined) {
        if (device.agent.indexOf("iphone") > -1 || device.agent.indexOf("ipad") > -1) {
          str = device.agent.substring(device.agent.indexOf("os") + 3);
          ver = str.substring(0, str.indexOf(" like"));
          device.os = "ios";
          device.ver = device.os + ver;
        }
        if (device.agent.indexOf("android") > -1) {
          str = device.agent.substring(device.agent.indexOf("android") + 8);
          var strSub = str.substring(0, str.indexOf(";"));
          ver = strSub.replace(/[.]/gi, "_");
          device.os = "android";
          device.ver = device.os + ver;
        }
      }
      device.set();
    },
    set: function () {
      var html = document.querySelector("html");
      var htmlClass = html.getAttribute("class");
      var etc = "";
      if (device.agent.indexOf("samsung") > -1) etc += " samsung";
      if (device.agent.indexOf("naver") > -1) etc += " naver";
      if (device.agent.indexOf("secapp") > -1) {
        device.ver += " secapp";
        device.isApp = true;
      }
      if (device.os !== null) {
        htmlClass
          ? html.setAttribute("class", htmlClass + " " + device.ver + etc)
          : html.setAttribute("class", device.ver + etc);
      }
      device.resp();
      window.addEventListener("resize", device.resp);
    },
    resp: function () {
      if (window.innerWidth > 1100) device.val = "p";
      if (window.innerWidth <= 1100 && window.innerWidth >= 801) device.val = "t";
      if (window.innerWidth < 801) device.val = "m";
      if (window.innerWidth > 1281) device.isGnb = true; /* 2022-05-20 */
  
      setTimeout(function () {
        if (window.innerWidth > 1100) device.val = "p";
        if (window.innerWidth <= 1100 && window.innerWidth >= 801) device.val = "t";
        if (window.innerWidth < 801) device.val = "m";
        if (window.innerWidth > 1281) device.isGnb = true; /* 2022-05-20 */
      }, 100);
    },
  };
  device.init();
  
  function siblingsJs(t) {
    var children = t.parentElement.children;
    var tempArr = [];
  
    for (var i = 0; i < children.length; i++) {
      tempArr.push(children[i]);
    }
  
    return tempArr.filter(function (e) {
      return e != t;
    });
  }
  
  const gnbObj = (function(){
    const gnbInner = document.querySelector(".header__inner");
    const menu = document.querySelector(".menu__wrap");
    const menuItems = document.querySelectorAll(".menuitem__l0");
    const menuButton = document.querySelectorAll(".item__button");
    const depth1 = document.querySelectorAll(".menuitem__l1__container");
    const mOpen = document.querySelector(".menu__button");
    const mClose = document.querySelector(".menu__close__button");
    const outerMask = document.querySelector(".outer__mask");
    const innerMask = document.querySelector(".inner__mask");
    let _thisActiveDepth = null;
    let _thisActiveUtility = null;
    let menuActive = false;
    let depthActive = false;
    let isOpenMenu = false;
    function init() {
      console.log("...GNB initialized");
      console.log(`device mode is "${device.val}"`);
  
      $(".utility__wrap")
        .children()
        .on("click", function () {
          let buttonType = this.dataset.name.split("__")[1];
          ultilityEvent(buttonType);
        });
  
      document.addEventListener("click", function (e) {
        e.stopPropagation();
        let _thisNode = e.target.className;
  
        if (_thisNode == "outer__mask" || _thisNode == "inner__mask") {
          $(".utility__wrap").children().removeClass("active");
          mask("close");
          close(menuItems, "close");
        }
      });
  
      if (device.val == "m" || device.val == "t" || window.innerWidth <= 1280) {
        let menulistT = document.querySelector(".menu__list").offsetTop;
        let menuheadH = document.querySelector(".menu__head").clientHeight;
        // let mainListH = document.querySelector(".menu__list").clientHeight; 
        let mainListH = document.querySelector(".menu__list").height; 
  
        document.querySelector("#header__navi").classList.remove("invert");
  
        mOpen.addEventListener("click", function () {
          open();
          menuButton[0].click();
        });
  
        mClose.addEventListener("click", function () {
          close(menuItems, "close");
        });
        
        [].forEach.call(menuButton, function (el, idx) {
          el.addEventListener("click", function () {
  
  
  
  
            depthMove(el);
            // $(".menuitem__slider").slick("slickGoTo", 0);
            $(".menu__wrap").animate({ scrollTop: 0 }, 200);
          });
        });
  
        setTimeout(() => {
          const depth2Wrap = $(".menuitem__l1__container"); 
          
          depth2Wrap.css({ height: mainListH + "px" });
          menu.style.paddingTop = menuheadH + "px";
          menuItems[0].classList.add('active');
        }, 100);
  
      } else if (window.innerWidth > 1280 || device.val == "p") {
        
        [].forEach.call(menuButton, function (el, idx) {
          el.addEventListener("mouseenter", function (e) {
            $(".utility__wrap").children().removeClass("active");
            // mask("open", "menu", el.parentNode);
            open(el);
          });
  
          el.addEventListener("focus", function (e) {
            // mask("open", "menu", el.parentNode);
            open(el);
          });
        });
  
        gnbInner.addEventListener("mouseleave", function (e) {
          e.stopPropagation();
          if (isOpenMenu) {
            close(menuItems, "close");
          }
        });
  
        menu.addEventListener("mouseleave", function (e) {
          e.stopPropagation();
          if (isOpenMenu) {
            close(menuItems, "close");
          }
        });
      
        $(".menuitem__l1__container").css({ height: "auto" });
        $(".menuitem__slider").css({ width: "auto" });
        menuItems[0].classList.remove("active");
        menu.style.paddingTop = 0;
      }
    }
    function mask(action, data, element) {
      const elem = element || null;
      
      if(action == 'close') { // hide
        innerMask.style.display = 'none';
        outerMask.style.display = 'none';
        innerMask.dataset.type = data;
        outerMask.dataset.type = data;
        screenLock("unlock");
      }else{ // show
        if (device.val == "m" || device.val == "t" || window.innerWidth <= 1280) { // m, t size
          handleMask(data);
          screenLock("lock");
        } else { // p size
          if (elem == null) {
            // element 誘몄��뺤떆(null) mask on / data type �쎌엯
            outerMask.style.display = "block";
            outerMask.dataset.type = data;
          } else if (elem.children.length <= 1) {
            // element �� �덉쑝�� �섏쐞�먯떇�� �놁쑝硫� mask off
            outerMask.style.display = "none";
            screenLock("unlock");
            return;
          } else {
            // element 媛� �덇퀬 �섏쐞�먯떇�� �덉쑝硫� mask on :
            outerMask.style.display = "block";
            // outerMask.dataset.type = data;
          }
        }
      }
      
      function handleMask(data) {
        // console.log("thisdata : " + data);
  
        if (data == "cart" || data == 'location') {
          outerMask.style.display = "block";
          outerMask.dataset.type = data;
        } else {
          innerMask.style.display = "block";
          innerMask.dataset.type = data;
        }
        screenLock("lock");
      }
  
      function screenLock(action){
        if(action == 'lock'){
          $("html, body").css({
            height: 100 + "%",
            overflow: "hidden",
          });
        }else{
          $("html, body").css({
            height: "auto",
            overflow: "unset",
          });
        }
      }
    }
    function open(el) {
      const _thisMenu = el == undefined ? menu : el.parentElement;
  
      if (device.val == "m" || device.val == "t" || window.innerWidth <= 1280) {
        _thisMenu.style.right = 0;
      } else {
        $(".menuitem__l0").siblings().removeClass("active");
        _thisMenu.classList.add("active");
        // console.log(menuActive + " : " + el);
      }
  
      // console.log(_thisMenu);
      isOpenMenu = true;
      mask("open", "menu", _thisMenu);
    }
    function close(list) {
      if (device.val == "m" || device.val == "t" || window.innerWidth <= 1280) {
        $(".menuitem__l0").removeClass("active");
        menuItems[0].classList.add("active");
  
        if (depthActive == true) {
          // gotoBack();
          menu.style.right = "-" + 100 + "%";
        }
        menu.style.right = "-" + 100 + "%";
      } else {
        [].forEach.call(list, function (el, idx) {
          if (el.classList.contains("active")) {
            el.classList.remove("active");
            // list[idx].querySelector("a").setAttribute(ariaSelected, false);
          }
        });
      }
  
      isOpenMenu = false;
      mask("close");
    }
    function focusEvent() {
      console.log(this);
      const list = menuItems;
      [].forEach.call(list, function (el, idx) {
        if (el.classList.contains("active")) {
          list[idx].classList.remove("active");
          // el.parentNode.classList.remove("onDepth");
          el.classList.add("active");
        }
      });
    }
    function depthMove(el) {
      depthActive = true;
      let _thisItem = el;
      _thisActiveDepth = _thisItem.nextElementSibling;
  
      if (_thisActiveDepth == null) return;
  
      // 珥덇린��
      [].forEach.call(menuItems, function (el) {
        el.classList.remove("active");
      });
      
      _thisItem.parentElement.classList.add("active");
      // mBack.classList.add("active");
    }
    function gotoBack() {
      let _thisItem = _thisActiveDepth;
  
      if (depthActive == true) {
        // mBack.classList.remove("active");
        _thisItem.classList.remove("active");
        depthActive = false;
      }
    }
    function ultilityEvent(buttonType) {
      let btnType = buttonType;
      // console.log("button Type : " + _thisActiveUtility);
      // console.log("ultility button Type : " + btnType);
      // console.log($(".utility__button__" + btnType));
  
      $(".utility__wrap").children().removeClass("active");
      $(".utility__button__" + btnType).addClass("active");
  
      // 媛� 踰꾪듉 湲곕뒫 �몄텧
      switch (btnType) {
        case "search":
          // search();
          return false;
        case "location":
          return false;
        case "barcode":
          mask("close");
          return false;
        case "cart":
          cart();
          break;
        case "user":
          user();
          break;
        case "menu":
          break;
        default:
          break;
      }
  
      // mask
      if (device.val == "m" || device.val == "t" || window.innerWidth <= 1280) {
        // console.log(_thisActiveUtility == btnType);
        if (_thisActiveUtility != buttonType) {
          mask("close");
          mask("open", btnType);
          _thisActiveUtility = buttonType;
        } else {
          mask("open", btnType);
        }
      } else {
        mask("open", btnType);
      }
    }
    function search() {
      const searchBar = document.querySelector(".unified-search-input-wrap");
      // const searchList = document.querySelector(".unified-search-layer");
  
      isOpenMenu = false;
      menu.style.right = "-" + 100 + "%";
  
      $("html, body").css({ overflow: "hidden" });
      searchBar.style.display = "block";
      document.querySelector("#unifiedInputSearch").focus();
  
      const handleSearchClose = () => {
        // searchList.style.display = "none";
        searchBar.style.display = "none";
        $("html, body").css({ overflow: "unset" });
      };
  
      document.addEventListener("click", function (e) {
        let _thisNode = e.target.className;
        if (_thisNode == "btn-close-search" || _thisNode == "outer__mask" || _thisNode == "inner__mask" ) {
          handleSearchClose();
          mask("close");
        }
      });
    }
    function location() {
      console.log("location active!");
    }
    function cart() {
      close(menuItems, "close");
      $(".cart__list").on("mouseleave", function () {
        $(this).parent().removeClass("active");
        mask("close");
      });
    }
    function user(){
      $(".user__list").on("mouseleave", function () {
        $(this).parent().removeClass("active");
        mask("close");
      });
    }
  
    return {
      init: init,
      ultilityEvent: ultilityEvent,
    };
  })();
  
  window.addEventListener("DOMContentLoaded", function () {
    gnbObj.init();
  });
  
  // resize init
  let delay = 300;
  let timer = null;
  
  window.addEventListener("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      gnbObj.init();
    }, delay);
  });
  