(function () {
  function fkInterval(w, si) {
    w.setInterval = function (fn, ...args) {
      let id;
      id = si(function (...cba) {
        if (typeof fn === 'string') {
          new Function(fn)();
        } else {
          fn(...cba);
        }
      }, 0);
      return id;
    };
  }

  function fkRadio() {
    document.querySelectorAll("input[type='radio'][value='4']").forEach((el) => {
      el.click();
    });
  }

  function fkNext() {
    document.querySelectorAll("button[data-block='false'] span").forEach((el) => {
      if (el.innerText === '다음' || el.innerText === '회고 완료') {
        el.parentElement.click();
      }
    });
  }

  function fkSegment() {
    document.querySelectorAll('button').forEach((el) => {
      if (el.innerText === '보통') {
        el.click();
      }
    });
  }

  var observeDOM = (function () {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    return function (obj, callback) {
      if (!obj || obj.nodeType !== 1) return;

      if (MutationObserver) {
        // define a new observer
        var mutationObserver = new MutationObserver(callback);

        // have the observer observe for changes in children
        mutationObserver.observe(obj, { childList: true, subtree: true });
        return mutationObserver;
      }

      // browser support fallback
      else if (window.addEventListener) {
        obj.addEventListener('DOMNodeInserted', callback, false);
        obj.addEventListener('DOMNodeRemoved', callback, false);
      }
    };
  })();

  fkInterval(window, window.setInterval);
  observeDOM(document.body, function () {
    fkRadio();
    fkNext();
    fkSegment();
  });
})();
