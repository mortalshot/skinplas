(() => {
  "use strict";
  const e = {};
  let t = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        t.Android() || t.BlackBerry() || t.iOS() || t.Opera() || t.Windows()
      );
    },
  };
  function s() {
    if (location.hash) return location.hash.replace("#", "");
  }
  let a = (e, t = 500, s = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = s ? `${s}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !s),
            !s && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !s && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: e } })
            );
        }, t));
    },
    i = (e, t = 500, s = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          s && e.style.removeProperty("height");
        let a = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = a + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: e } })
              );
          }, t);
      }
    },
    n = (e, t = 500) => (e.hidden ? i(e, t) : a(e, t)),
    l = !0,
    r = (e = 500) => {
      document.documentElement.classList.contains("lock") ? o(e) : c(e);
    },
    o = (e = 500) => {
      let t = document.querySelector("body");
      if (l) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (l = !1),
          setTimeout(function () {
            l = !0;
          }, e);
      }
    },
    c = (e = 500) => {
      let t = document.querySelector("body");
      if (l) {
        let s = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < s.length; e++) {
          s[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (l = !1),
          setTimeout(function () {
            l = !0;
          }, e);
      }
    };
  function d(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function p(e, t) {
    const s = Array.from(e).filter(function (e, s, a) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (s.length) {
      const e = [];
      s.forEach((s) => {
        const a = {},
          i = s.dataset[t].split(",");
        (a.value = i[0]),
          (a.type = i[1] ? i[1].trim() : "max"),
          (a.item = s),
          e.push(a);
      });
      let a = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      a = (function (e) {
        return e.filter(function (e, t, s) {
          return s.indexOf(e) === t;
        });
      })(a);
      const i = [];
      if (a.length)
        return (
          a.forEach((t) => {
            const s = t.split(","),
              a = s[1],
              n = s[2],
              l = window.matchMedia(s[0]),
              r = e.filter(function (e) {
                if (e.value === a && e.type === n) return !0;
              });
            i.push({ itemsArray: r, matchMedia: l });
          }),
          i
        );
    }
  }
  e.popup = new (class {
    constructor(e) {
      let t = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...t,
          ...e,
          classes: { ...t.classes, ...e?.classes },
          hashSettings: { ...t.hashSettings, ...e?.hashSettings },
          on: { ...t.on, ...e?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("??????????????????"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (t)
            return (
              e.preventDefault(),
              (this._dataValue = t.getAttribute(
                this.options.attributeOpenButton
              )
                ? t.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = t),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `???? ????, ???? ???????????????? ?????????????? ?? ${t.classList}`
                  )
            );
          return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (e.preventDefault(), void this.close())
            : void 0;
        }.bind(this)
      ),
        document.addEventListener(
          "keydown",
          function (e) {
            if (
              this.options.closeEsc &&
              27 == e.which &&
              "Escape" === e.code &&
              this.isOpen
            )
              return e.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == e.which &&
              this.isOpen &&
              this._focusCatch(e);
          }.bind(this)
        ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this)
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this)
          ));
    }
    open(e) {
      if (
        (e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute
            )}?rel=0&showinfo=0&autoplay=1`,
            t = document.createElement("iframe");
          t.setAttribute("allowfullscreen", "");
          const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
          t.setAttribute("allow", `${s}; encrypted-media`),
            t.setAttribute("src", e),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(t);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : r(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } })
          ),
          this.popupLogging("???????????? ??????????");
      } else
        this.popupLogging(
          "???? ????, ???????????? ???????????? ??????. ?????????????????? ???????????????????????? ??????????. "
        );
    }
    close(e) {
      e &&
        "string" == typeof e &&
        "" !== e.trim() &&
        (this.previousOpen.selector = e),
        this.isOpen &&
          l &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            r(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("???????????? ??????????"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let e = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
        e &&
        this.open(e);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const t = this.targetOpen.element.querySelectorAll(this._focusEl),
        s = Array.prototype.slice.call(t),
        a = s.indexOf(document.activeElement);
      e.shiftKey && 0 === a && (s[s.length - 1].focus(), e.preventDefault()),
        e.shiftKey || a !== s.length - 1 || (s[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e[0].focus();
    }
    popupLogging(e) {
      this.options.logging && d(`[??????????????]: ${e}`);
    }
  })({});
  let u = (e, t = !1, s = 500, a = 0) => {
    const i = document.querySelector(e);
    if (i) {
      let n = "",
        l = 0;
      t &&
        ((n = "header.header"), (l = document.querySelector(n).offsetHeight));
      let r = {
        speedAsDuration: !0,
        speed: s,
        header: n,
        offset: a,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (o(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(i, "", r);
      else {
        let e = i.getBoundingClientRect().top + scrollY;
        (e = l ? e - l : e),
          (e = a ? e - a : e),
          window.scrollTo({ top: e, behavior: "smooth" });
      }
      d(`[gotoBlock]: ????????...???????? ?? ${e}`);
    } else d(`[gotoBlock]: ???? ????..???????????? ?????????? ?????? ???? ????????????????: ${e}`);
  };
  let h = {
    getErrors(e) {
      let t = 0,
        s = e.querySelectorAll("*[data-required]");
      return (
        s.length &&
          s.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(t) {
      t.reset(),
        setTimeout(() => {
          let s = t.querySelectorAll("input,textarea");
          for (let e = 0; e < s.length; e++) {
            const t = s[e];
            t.parentElement.classList.remove("_form-focus"),
              t.classList.remove("_form-focus"),
              h.removeError(t);
          }
          let a = t.querySelectorAll(".checkbox__input");
          if (a.length > 0)
            for (let e = 0; e < a.length; e++) {
              a[e].checked = !1;
            }
          if (e.select) {
            let s = t.querySelectorAll(".select");
            if (s.length)
              for (let t = 0; t < s.length; t++) {
                const a = s[t].querySelector("select");
                e.select.selectBuild(a);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  function m(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function f(e = {}, t = {}) {
    Object.keys(t).forEach((s) => {
      void 0 === e[s]
        ? (e[s] = t[s])
        : m(t[s]) && m(e[s]) && Object.keys(t[s]).length > 0 && f(e[s], t[s]);
    });
  }
  e.select = new (class {
    constructor(e, t = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
        (this.selectClasses = {
          classSelect: "select",
          classSelectBody: "select__body",
          classSelectTitle: "select__title",
          classSelectValue: "select__value",
          classSelectLabel: "select__label",
          classSelectInput: "select__input",
          classSelectText: "select__text",
          classSelectLink: "select__link",
          classSelectOptions: "select__options",
          classSelectOptionsScroll: "select__scroll",
          classSelectOption: "select__option",
          classSelectContent: "select__content",
          classSelectRow: "select__row",
          classSelectData: "select__asset",
          classSelectDisabled: "_select-disabled",
          classSelectTag: "_select-tag",
          classSelectOpen: "_select-open",
          classSelectActive: "_select-active",
          classSelectFocus: "_select-focus",
          classSelectMultiple: "_select-multiple",
          classSelectCheckBox: "_select-checkbox",
          classSelectOptionSelected: "_select-selected",
          classSelectPseudoLabel: "_select-pseudo-label",
        }),
        (this._this = this),
        this.config.init)
      ) {
        const e = t
          ? document.querySelectorAll(t)
          : document.querySelectorAll("select");
        e.length
          ? (this.selectsInit(e),
            this.setLogging(`??????????????????, ???????????????? ????????????????: (${e.length})`))
          : this.setLogging("????????, ?????? ???? ???????????? select zzZZZzZZz");
      }
    }
    getSelectClass(e) {
      return `.${e}`;
    }
    getSelectElement(e, t) {
      return {
        originalSelect: e.querySelector("select"),
        selectElement: e.querySelector(this.getSelectClass(t)),
      };
    }
    selectsInit(e) {
      e.forEach((e, t) => {
        this.selectInit(e, t + 1);
      }),
        document.addEventListener(
          "click",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        ),
        document.addEventListener(
          "keydown",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        ),
        document.addEventListener(
          "focusin",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        ),
        document.addEventListener(
          "focusout",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        );
    }
    selectInit(e, t) {
      const s = this;
      let a = document.createElement("div");
      if (
        (a.classList.add(this.selectClasses.classSelect),
        e.parentNode.insertBefore(a, e),
        a.appendChild(e),
        (e.hidden = !0),
        t && (e.dataset.id = t),
        this.getSelectPlaceholder(e) &&
          ((e.dataset.placeholder = this.getSelectPlaceholder(e).value),
          this.getSelectPlaceholder(e).label.show))
      ) {
        this.getSelectElement(
          a,
          this.selectClasses.classSelectTitle
        ).selectElement.insertAdjacentHTML(
          "afterbegin",
          `<span class="${this.selectClasses.classSelectLabel}">${
            this.getSelectPlaceholder(e).label.text
              ? this.getSelectPlaceholder(e).label.text
              : this.getSelectPlaceholder(e).value
          }</span>`
        );
      }
      a.insertAdjacentHTML(
        "beforeend",
        `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`
      ),
        this.selectBuild(e),
        (e.dataset.speed = e.dataset.speed ? e.dataset.speed : "150"),
        e.addEventListener("change", function (e) {
          s.selectChange(e);
        });
    }
    selectBuild(e) {
      const t = e.parentElement;
      (t.dataset.id = e.dataset.id),
        t.classList.add(
          e.getAttribute("class") ? `select_${e.getAttribute("class")}` : ""
        ),
        e.multiple
          ? t.classList.add(this.selectClasses.classSelectMultiple)
          : t.classList.remove(this.selectClasses.classSelectMultiple),
        e.hasAttribute("data-checkbox") && e.multiple
          ? t.classList.add(this.selectClasses.classSelectCheckBox)
          : t.classList.remove(this.selectClasses.classSelectCheckBox),
        this.setSelectTitleValue(t, e),
        this.setOptions(t, e),
        e.hasAttribute("data-search") && this.searchActions(t),
        e.hasAttribute("data-open") && this.selectAction(t),
        this.selectDisabled(t, e);
    }
    selectsActions(e) {
      const t = e.target,
        s = e.type;
      if (
        t.closest(this.getSelectClass(this.selectClasses.classSelect)) ||
        t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
      ) {
        const a = t.closest(".select")
            ? t.closest(".select")
            : document.querySelector(
                `.${this.selectClasses.classSelect}[data-id="${
                  t.closest(
                    this.getSelectClass(this.selectClasses.classSelectTag)
                  ).dataset.selectId
                }"]`
              ),
          i = this.getSelectElement(a).originalSelect;
        if ("click" === s) {
          if (!i.disabled)
            if (
              t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
            ) {
              const e = t.closest(
                  this.getSelectClass(this.selectClasses.classSelectTag)
                ),
                s = document.querySelector(
                  `.${this.selectClasses.classSelect}[data-id="${e.dataset.selectId}"] .select__option[data-value="${e.dataset.value}"]`
                );
              this.optionAction(a, i, s);
            } else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectTitle)
              )
            )
              this.selectAction(a);
            else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption)
              )
            ) {
              const e = t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption)
              );
              this.optionAction(a, i, e);
            }
        } else
          "focusin" === s || "focusout" === s
            ? t.closest(this.getSelectClass(this.selectClasses.classSelect)) &&
              ("focusin" === s
                ? a.classList.add(this.selectClasses.classSelectFocus)
                : a.classList.remove(this.selectClasses.classSelectFocus))
            : "keydown" === s && "Escape" === e.code && this.selects??lose();
      } else this.selects??lose();
    }
    selects??lose(e) {
      const t = (e || document).querySelectorAll(
        `${this.getSelectClass(
          this.selectClasses.classSelect
        )}${this.getSelectClass(this.selectClasses.classSelectOpen)}`
      );
      t.length &&
        t.forEach((e) => {
          this.select??lose(e);
        });
    }
    select??lose(e) {
      const t = this.getSelectElement(e).originalSelect,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions
        ).selectElement;
      s.classList.contains("_slide") ||
        (e.classList.remove(this.selectClasses.classSelectOpen),
        a(s, t.dataset.speed));
    }
    selectAction(e) {
      const t = this.getSelectElement(e).originalSelect,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions
        ).selectElement;
      if (t.closest("[data-one-select]")) {
        const e = t.closest("[data-one-select]");
        this.selects??lose(e);
      }
      s.classList.contains("_slide") ||
        (e.classList.toggle(this.selectClasses.classSelectOpen),
        n(s, t.dataset.speed));
    }
    setSelectTitleValue(e, t) {
      const s = this.getSelectElement(
          e,
          this.selectClasses.classSelectBody
        ).selectElement,
        a = this.getSelectElement(
          e,
          this.selectClasses.classSelectTitle
        ).selectElement;
      a && a.remove(),
        s.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(e, t));
    }
    getSelectTitleValue(e, t) {
      let s = this.getSelectedOptionsData(t, 2).html;
      t.multiple &&
        t.hasAttribute("data-tags") &&
        ((s = this.getSelectedOptionsData(t)
          .elements.map(
            (t) =>
              `<span role="button" data-select-id="${
                e.dataset.id
              }" data-value="${
                t.value
              }" class="_select-tag">${this.getSelectElementContent(t)}</span>`
          )
          .join("")),
        t.dataset.tags &&
          document.querySelector(t.dataset.tags) &&
          ((document.querySelector(t.dataset.tags).innerHTML = s),
          t.hasAttribute("data-search") && (s = !1))),
        (s = s.length ? s : t.dataset.placeholder ? t.dataset.placeholder : "");
      let a = "",
        i = "";
      if (
        (t.hasAttribute("data-pseudo-label") &&
          ((a = t.dataset.pseudoLabel
            ? ` data-pseudo-label="${t.dataset.pseudoLabel}"`
            : ' data-pseudo-label="?????????????????? ??????????????"'),
          (i = ` ${this.selectClasses.classSelectPseudoLabel}`)),
        this.getSelectedOptionsData(t).values.length
          ? e.classList.add(this.selectClasses.classSelectActive)
          : e.classList.remove(this.selectClasses.classSelectActive),
        t.hasAttribute("data-search"))
      )
        return `<div class="${this.selectClasses.classSelectTitle}"><span${a} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${s}" data-placeholder="${s}" class="${this.selectClasses.classSelectInput}"></span></div>`;
      {
        const e =
          this.getSelectedOptionsData(t).elements.length &&
          this.getSelectedOptionsData(t).elements[0].dataset.class
            ? ` ${this.getSelectedOptionsData(t).elements[0].dataset.class}`
            : "";
        return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${a} class="${this.selectClasses.classSelectValue}${i}"><span class="${this.selectClasses.classSelectContent}${e}">${s}</span></span></button>`;
      }
    }
    getSelectElementContent(e) {
      const t = e.dataset.asset ? `${e.dataset.asset}` : "",
        s = t.indexOf("img") >= 0 ? `<img src="${t}" alt="">` : t;
      let a = "";
      return (
        (a += t ? `<span class="${this.selectClasses.classSelectRow}">` : ""),
        (a += t ? `<span class="${this.selectClasses.classSelectData}">` : ""),
        (a += t ? s : ""),
        (a += t ? "</span>" : ""),
        (a += t ? `<span class="${this.selectClasses.classSelectText}">` : ""),
        (a += e.textContent),
        (a += t ? "</span>" : ""),
        (a += t ? "</span>" : ""),
        a
      );
    }
    getSelectPlaceholder(e) {
      const t = Array.from(e.options).find((e) => !e.value);
      if (t)
        return {
          value: t.textContent,
          show: t.hasAttribute("data-show"),
          label: { show: t.hasAttribute("data-label"), text: t.dataset.label },
        };
    }
    getSelectedOptionsData(e, t) {
      let s = [];
      return (
        e.multiple
          ? (s = Array.from(e.options)
              .filter((e) => e.value)
              .filter((e) => e.selected))
          : s.push(e.options[e.selectedIndex]),
        {
          elements: s.map((e) => e),
          values: s.filter((e) => e.value).map((e) => e.value),
          html: s.map((e) => this.getSelectElementContent(e)),
        }
      );
    }
    getOptions(e) {
      let t = e.hasAttribute("data-scroll") ? "data-simplebar" : "",
        s = e.dataset.scroll ? `style="max-height:${e.dataset.scroll}px"` : "",
        a = Array.from(e.options);
      if (a.length > 0) {
        let i = "";
        return (
          ((this.getSelectPlaceholder(e) &&
            !this.getSelectPlaceholder(e).show) ||
            e.multiple) &&
            (a = a.filter((e) => e.value)),
          (i += t
            ? `<div ${t} ${s} class="${this.selectClasses.classSelectOptionsScroll}">`
            : ""),
          a.forEach((t) => {
            i += this.getOption(t, e);
          }),
          (i += t ? "</div>" : ""),
          i
        );
      }
    }
    getOption(e, t) {
      const s =
          e.selected && t.multiple
            ? ` ${this.selectClasses.classSelectOptionSelected}`
            : "",
        a =
          !e.selected || t.hasAttribute("data-show-selected") || t.multiple
            ? ""
            : "hidden",
        i = e.dataset.class ? ` ${e.dataset.class}` : "",
        n = !!e.dataset.href && e.dataset.href,
        l = e.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
      let r = "";
      return (
        (r += n
          ? `<a ${l} ${a} href="${n}" data-value="${e.value}" class="${this.selectClasses.classSelectOption}${i}${s}">`
          : `<button ${a} class="${this.selectClasses.classSelectOption}${i}${s}" data-value="${e.value}" type="button">`),
        (r += this.getSelectElementContent(e)),
        (r += n ? "</a>" : "</button>"),
        r
      );
    }
    setOptions(e, t) {
      this.getSelectElement(
        e,
        this.selectClasses.classSelectOptions
      ).selectElement.innerHTML = this.getOptions(t);
    }
    optionAction(e, t, s) {
      if (t.multiple) {
        s.classList.toggle(this.selectClasses.classSelectOptionSelected);
        this.getSelectedOptionsData(t).elements.forEach((e) => {
          e.removeAttribute("selected");
        });
        e.querySelectorAll(
          this.getSelectClass(this.selectClasses.classSelectOptionSelected)
        ).forEach((e) => {
          t.querySelector(`option[value="${e.dataset.value}"]`).setAttribute(
            "selected",
            "selected"
          );
        });
      } else
        t.hasAttribute("data-show-selected") ||
          (e.querySelector(
            `${this.getSelectClass(
              this.selectClasses.classSelectOption
            )}[hidden]`
          ) &&
            (e.querySelector(
              `${this.getSelectClass(
                this.selectClasses.classSelectOption
              )}[hidden]`
            ).hidden = !1),
          (s.hidden = !0)),
          (t.value = s.hasAttribute("data-value")
            ? s.dataset.value
            : s.textContent),
          this.selectAction(e);
      this.setSelectTitleValue(e, t), this.setSelectChange(t);
    }
    selectChange(e) {
      const t = e.target;
      this.selectBuild(t), this.setSelectChange(t);
    }
    setSelectChange(e) {
      if (
        (e.hasAttribute("data-validate") && h.validateInput(e),
        e.hasAttribute("data-submit") && e.value)
      ) {
        let t = document.createElement("button");
        (t.type = "submit"), e.closest("form").append(t), t.click(), t.remove();
      }
      const t = e.parentElement;
      this.selectCallback(t, e);
    }
    selectDisabled(e, t) {
      t.disabled
        ? (e.classList.add(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle
          ).selectElement.disabled = !0))
        : (e.classList.remove(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle
          ).selectElement.disabled = !1));
    }
    searchActions(e) {
      this.getSelectElement(e).originalSelect;
      const t = this.getSelectElement(
          e,
          this.selectClasses.classSelectInput
        ).selectElement,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions
        ).selectElement,
        a = s.querySelectorAll(`.${this.selectClasses.classSelectOption}`),
        i = this;
      t.addEventListener("input", function () {
        a.forEach((e) => {
          e.textContent.toUpperCase().indexOf(t.value.toUpperCase()) >= 0
            ? (e.hidden = !1)
            : (e.hidden = !0);
        }),
          !0 === s.hidden && i.selectAction(e);
      });
    }
    selectCallback(e, t) {
      document.dispatchEvent(
        new CustomEvent("selectCallback", { detail: { select: t } })
      );
    }
    setLogging(e) {
      this.config.logging && d(`[select]: ${e}`);
    }
  })({});
  const g = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function v() {
    const e = "undefined" != typeof document ? document : {};
    return f(e, g), e;
  }
  const b = {
    document: g,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function w() {
    const e = "undefined" != typeof window ? window : {};
    return f(e, b), e;
  }
  class y extends Array {
    constructor(e) {
      "number" == typeof e
        ? super(e)
        : (super(...(e || [])),
          (function (e) {
            const t = e.__proto__;
            Object.defineProperty(e, "__proto__", {
              get: () => t,
              set(e) {
                t.__proto__ = e;
              },
            });
          })(this));
    }
  }
  function S(e = []) {
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...S(e)) : t.push(e);
      }),
      t
    );
  }
  function C(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function E(e, t) {
    const s = w(),
      a = v();
    let i = [];
    if (!t && e instanceof y) return e;
    if (!e) return new y(i);
    if ("string" == typeof e) {
      const s = e.trim();
      if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
        let e = "div";
        0 === s.indexOf("<li") && (e = "ul"),
          0 === s.indexOf("<tr") && (e = "tbody"),
          (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
          0 === s.indexOf("<tbody") && (e = "table"),
          0 === s.indexOf("<option") && (e = "select");
        const t = a.createElement(e);
        t.innerHTML = s;
        for (let e = 0; e < t.childNodes.length; e += 1)
          i.push(t.childNodes[e]);
      } else
        i = (function (e, t) {
          if ("string" != typeof e) return [e];
          const s = [],
            a = t.querySelectorAll(e);
          for (let e = 0; e < a.length; e += 1) s.push(a[e]);
          return s;
        })(e.trim(), t || a);
    } else if (e.nodeType || e === s || e === a) i.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof y) return e;
      i = e;
    }
    return new y(
      (function (e) {
        const t = [];
        for (let s = 0; s < e.length; s += 1)
          -1 === t.indexOf(e[s]) && t.push(e[s]);
        return t;
      })(i)
    );
  }
  E.fn = y.prototype;
  const T = "resize scroll".split(" ");
  function x(e) {
    return function (...t) {
      if (void 0 === t[0]) {
        for (let t = 0; t < this.length; t += 1)
          T.indexOf(e) < 0 &&
            (e in this[t] ? this[t][e]() : E(this[t]).trigger(e));
        return this;
      }
      return this.on(e, ...t);
    };
  }
  x("click"),
    x("blur"),
    x("focus"),
    x("focusin"),
    x("focusout"),
    x("keyup"),
    x("keydown"),
    x("keypress"),
    x("submit"),
    x("change"),
    x("mousedown"),
    x("mousemove"),
    x("mouseup"),
    x("mouseenter"),
    x("mouseleave"),
    x("mouseout"),
    x("mouseover"),
    x("touchstart"),
    x("touchend"),
    x("touchmove"),
    x("resize"),
    x("scroll");
  const $ = {
    addClass: function (...e) {
      const t = S(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.add(...t);
        }),
        this
      );
    },
    removeClass: function (...e) {
      const t = S(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.remove(...t);
        }),
        this
      );
    },
    hasClass: function (...e) {
      const t = S(e.map((e) => e.split(" ")));
      return (
        C(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function (...e) {
      const t = S(e.map((e) => e.split(" ")));
      this.forEach((e) => {
        t.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let s = 0; s < this.length; s += 1)
        if (2 === arguments.length) this[s].setAttribute(e, t);
        else
          for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
      return this;
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this;
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1)
        this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function (...e) {
      let [t, s, a, i] = e;
      function n(e) {
        const t = e.target;
        if (!t) return;
        const i = e.target.dom7EventData || [];
        if ((i.indexOf(e) < 0 && i.unshift(e), E(t).is(s))) a.apply(t, i);
        else {
          const e = E(t).parents();
          for (let t = 0; t < e.length; t += 1)
            E(e[t]).is(s) && a.apply(e[t], i);
        }
      }
      function l(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), a.apply(this, t);
      }
      "function" == typeof e[1] && (([t, a, i] = e), (s = void 0)),
        i || (i = !1);
      const r = t.split(" ");
      let o;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (s)
          for (o = 0; o < r.length; o += 1) {
            const e = r[o];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: a, proxyListener: n }),
              t.addEventListener(e, n, i);
          }
        else
          for (o = 0; o < r.length; o += 1) {
            const e = r[o];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: a, proxyListener: l }),
              t.addEventListener(e, l, i);
          }
      }
      return this;
    },
    off: function (...e) {
      let [t, s, a, i] = e;
      "function" == typeof e[1] && (([t, a, i] = e), (s = void 0)),
        i || (i = !1);
      const n = t.split(" ");
      for (let e = 0; e < n.length; e += 1) {
        const t = n[e];
        for (let e = 0; e < this.length; e += 1) {
          const n = this[e];
          let l;
          if (
            (!s && n.dom7Listeners
              ? (l = n.dom7Listeners[t])
              : s && n.dom7LiveListeners && (l = n.dom7LiveListeners[t]),
            l && l.length)
          )
            for (let e = l.length - 1; e >= 0; e -= 1) {
              const s = l[e];
              (a && s.listener === a) ||
              (a &&
                s.listener &&
                s.listener.dom7proxy &&
                s.listener.dom7proxy === a)
                ? (n.removeEventListener(t, s.proxyListener, i), l.splice(e, 1))
                : a ||
                  (n.removeEventListener(t, s.proxyListener, i),
                  l.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function (...e) {
      const t = w(),
        s = e[0].split(" "),
        a = e[1];
      for (let i = 0; i < s.length; i += 1) {
        const n = s[i];
        for (let s = 0; s < this.length; s += 1) {
          const i = this[s];
          if (t.CustomEvent) {
            const s = new t.CustomEvent(n, {
              detail: a,
              bubbles: !0,
              cancelable: !0,
            });
            (i.dom7EventData = e.filter((e, t) => t > 0)),
              i.dispatchEvent(s),
              (i.dom7EventData = []),
              delete i.dom7EventData;
          }
        }
      }
      return this;
    },
    transitionEnd: function (e) {
      const t = this;
      return (
        e &&
          t.on("transitionend", function s(a) {
            a.target === this && (e.call(this, a), t.off("transitionend", s));
          }),
        this
      );
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(e.getPropertyValue("margin-right")) +
            parseFloat(e.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(e.getPropertyValue("margin-top")) +
            parseFloat(e.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    styles: function () {
      const e = w();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = w(),
          t = v(),
          s = this[0],
          a = s.getBoundingClientRect(),
          i = t.body,
          n = s.clientTop || i.clientTop || 0,
          l = s.clientLeft || i.clientLeft || 0,
          r = s === e ? e.scrollY : s.scrollTop,
          o = s === e ? e.scrollX : s.scrollLeft;
        return { top: a.top + r - n, left: a.left + o - l };
      }
      return null;
    },
    css: function (e, t) {
      const s = w();
      let a;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (a = 0; a < this.length; a += 1)
            for (const t in e) this[a].style[t] = e[t];
          return this;
        }
        if (this[0])
          return s.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, s) => {
            e.apply(t, [t, s]);
          }),
          this)
        : this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      const t = w(),
        s = v(),
        a = this[0];
      let i, n;
      if (!a || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (a.matches) return a.matches(e);
        if (a.webkitMatchesSelector) return a.webkitMatchesSelector(e);
        if (a.msMatchesSelector) return a.msMatchesSelector(e);
        for (i = E(e), n = 0; n < i.length; n += 1) if (i[n] === a) return !0;
        return !1;
      }
      if (e === s) return a === s;
      if (e === t) return a === t;
      if (e.nodeType || e instanceof y) {
        for (i = e.nodeType ? [e] : e, n = 0; n < i.length; n += 1)
          if (i[n] === a) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      let e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return E([]);
      if (e < 0) {
        const s = t + e;
        return E(s < 0 ? [] : [this[s]]);
      }
      return E([this[e]]);
    },
    append: function (...e) {
      let t;
      const s = v();
      for (let a = 0; a < e.length; a += 1) {
        t = e[a];
        for (let e = 0; e < this.length; e += 1)
          if ("string" == typeof t) {
            const a = s.createElement("div");
            for (a.innerHTML = t; a.firstChild; )
              this[e].appendChild(a.firstChild);
          } else if (t instanceof y)
            for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
          else this[e].appendChild(t);
      }
      return this;
    },
    prepend: function (e) {
      const t = v();
      let s, a;
      for (s = 0; s < this.length; s += 1)
        if ("string" == typeof e) {
          const i = t.createElement("div");
          for (i.innerHTML = e, a = i.childNodes.length - 1; a >= 0; a -= 1)
            this[s].insertBefore(i.childNodes[a], this[s].childNodes[0]);
        } else if (e instanceof y)
          for (a = 0; a < e.length; a += 1)
            this[s].insertBefore(e[a], this[s].childNodes[0]);
        else this[s].insertBefore(e, this[s].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && E(this[0].nextElementSibling).is(e)
            ? E([this[0].nextElementSibling])
            : E([])
          : this[0].nextElementSibling
          ? E([this[0].nextElementSibling])
          : E([])
        : E([]);
    },
    nextAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return E([]);
      for (; s.nextElementSibling; ) {
        const a = s.nextElementSibling;
        e ? E(a).is(e) && t.push(a) : t.push(a), (s = a);
      }
      return E(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && E(t.previousElementSibling).is(e)
            ? E([t.previousElementSibling])
            : E([])
          : t.previousElementSibling
          ? E([t.previousElementSibling])
          : E([]);
      }
      return E([]);
    },
    prevAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return E([]);
      for (; s.previousElementSibling; ) {
        const a = s.previousElementSibling;
        e ? E(a).is(e) && t.push(a) : t.push(a), (s = a);
      }
      return E(t);
    },
    parent: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1)
        null !== this[s].parentNode &&
          (e
            ? E(this[s].parentNode).is(e) && t.push(this[s].parentNode)
            : t.push(this[s].parentNode));
      return E(t);
    },
    parents: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        let a = this[s].parentNode;
        for (; a; ) e ? E(a).is(e) && t.push(a) : t.push(a), (a = a.parentNode);
      }
      return E(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? E([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const a = this[s].querySelectorAll(e);
        for (let e = 0; e < a.length; e += 1) t.push(a[e]);
      }
      return E(t);
    },
    children: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const a = this[s].children;
        for (let s = 0; s < a.length; s += 1)
          (e && !E(a[s]).is(e)) || t.push(a[s]);
      }
      return E(t);
    },
    filter: function (e) {
      return E(C(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  Object.keys($).forEach((e) => {
    Object.defineProperty(E.fn, e, { value: $[e], writable: !0 });
  });
  const L = E;
  function A(e, t = 0) {
    return setTimeout(e, t);
  }
  function O() {
    return Date.now();
  }
  function k(e, t = "x") {
    const s = w();
    let a, i, n;
    const l = (function (e) {
      const t = w();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((i = l.transform || l.webkitTransform),
          i.split(",").length > 6 &&
            (i = i
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (n = new s.WebKitCSSMatrix("none" === i ? "" : i)))
        : ((n =
            l.MozTransform ||
            l.OTransform ||
            l.MsTransform ||
            l.msTransform ||
            l.transform ||
            l
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (a = n.toString().split(","))),
      "x" === t &&
        (i = s.WebKitCSSMatrix
          ? n.m41
          : 16 === a.length
          ? parseFloat(a[12])
          : parseFloat(a[4])),
      "y" === t &&
        (i = s.WebKitCSSMatrix
          ? n.m42
          : 16 === a.length
          ? parseFloat(a[13])
          : parseFloat(a[5])),
      i || 0
    );
  }
  function P(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function _(...e) {
    const t = Object(e[0]),
      s = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < e.length; i += 1) {
      const n = e[i];
      if (
        null != n &&
        ((a = n),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? a instanceof HTMLElement
          : a && (1 === a.nodeType || 11 === a.nodeType)))
      ) {
        const e = Object.keys(Object(n)).filter((e) => s.indexOf(e) < 0);
        for (let s = 0, a = e.length; s < a; s += 1) {
          const a = e[s],
            i = Object.getOwnPropertyDescriptor(n, a);
          void 0 !== i &&
            i.enumerable &&
            (P(t[a]) && P(n[a])
              ? n[a].__swiper__
                ? (t[a] = n[a])
                : _(t[a], n[a])
              : !P(t[a]) && P(n[a])
              ? ((t[a] = {}), n[a].__swiper__ ? (t[a] = n[a]) : _(t[a], n[a]))
              : (t[a] = n[a]));
        }
      }
    }
    var a;
    return t;
  }
  function M(e, t, s) {
    e.style.setProperty(t, s);
  }
  function I({ swiper: e, targetPosition: t, side: s }) {
    const a = w(),
      i = -e.translate;
    let n,
      l = null;
    const r = e.params.speed;
    (e.wrapperEl.style.scrollSnapType = "none"),
      a.cancelAnimationFrame(e.cssModeFrameID);
    const o = t > i ? "next" : "prev",
      c = (e, t) => ("next" === o && e >= t) || ("prev" === o && e <= t),
      d = () => {
        (n = new Date().getTime()), null === l && (l = n);
        const o = Math.max(Math.min((n - l) / r, 1), 0),
          p = 0.5 - Math.cos(o * Math.PI) / 2;
        let u = i + p * (t - i);
        if ((c(u, t) && (u = t), e.wrapperEl.scrollTo({ [s]: u }), c(u, t)))
          return (
            (e.wrapperEl.style.overflow = "hidden"),
            (e.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (e.wrapperEl.style.overflow = ""),
                e.wrapperEl.scrollTo({ [s]: u });
            }),
            void a.cancelAnimationFrame(e.cssModeFrameID)
          );
        e.cssModeFrameID = a.requestAnimationFrame(d);
      };
    d();
  }
  let z, D, q;
  function B() {
    return (
      z ||
        (z = (function () {
          const e = w(),
            t = v();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const s = Object.defineProperty({}, "passive", {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, s);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      z
    );
  }
  function H(e = {}) {
    return (
      D ||
        (D = (function ({ userAgent: e } = {}) {
          const t = B(),
            s = w(),
            a = s.navigator.platform,
            i = e || s.navigator.userAgent,
            n = { ios: !1, android: !1 },
            l = s.screen.width,
            r = s.screen.height,
            o = i.match(/(Android);?[\s\/]+([\d.]+)?/);
          let c = i.match(/(iPad).*OS\s([\d_]+)/);
          const d = i.match(/(iPod)(.*OS\s([\d_]+))?/),
            p = !c && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            u = "Win32" === a;
          let h = "MacIntel" === a;
          return (
            !c &&
              h &&
              t.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${l}x${r}`) >= 0 &&
              ((c = i.match(/(Version)\/([\d.]+)/)),
              c || (c = [0, 1, "13_0_0"]),
              (h = !1)),
            o && !u && ((n.os = "android"), (n.android = !0)),
            (c || p || d) && ((n.os = "ios"), (n.ios = !0)),
            n
          );
        })(e)),
      D
    );
  }
  function G() {
    return (
      q ||
        (q = (function () {
          const e = w();
          return {
            isSafari: (function () {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            })(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      q
    );
  }
  const N = {
    on(e, t, s) {
      const a = this;
      if ("function" != typeof t) return a;
      const i = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          a.eventsListeners[e] || (a.eventsListeners[e] = []),
            a.eventsListeners[e][i](t);
        }),
        a
      );
    },
    once(e, t, s) {
      const a = this;
      if ("function" != typeof t) return a;
      function i(...s) {
        a.off(e, i), i.__emitterProxy && delete i.__emitterProxy, t.apply(a, s);
      }
      return (i.__emitterProxy = t), a.on(e, i, s);
    },
    onAny(e, t) {
      const s = this;
      if ("function" != typeof e) return s;
      const a = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return s.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((a, i) => {
                  (a === t || (a.__emitterProxy && a.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(i, 1);
                });
          }),
          s)
        : s;
    },
    emit(...e) {
      const t = this;
      if (!t.eventsListeners) return t;
      let s, a, i;
      "string" == typeof e[0] || Array.isArray(e[0])
        ? ((s = e[0]), (a = e.slice(1, e.length)), (i = t))
        : ((s = e[0].events), (a = e[0].data), (i = e[0].context || t)),
        a.unshift(i);
      return (
        (Array.isArray(s) ? s : s.split(" ")).forEach((e) => {
          t.eventsAnyListeners &&
            t.eventsAnyListeners.length &&
            t.eventsAnyListeners.forEach((t) => {
              t.apply(i, [e, ...a]);
            }),
            t.eventsListeners &&
              t.eventsListeners[e] &&
              t.eventsListeners[e].forEach((e) => {
                e.apply(i, a);
              });
        }),
        t
      );
    },
  };
  const j = {
    updateSize: function () {
      const e = this;
      let t, s;
      const a = e.$el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : a[0].clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : a[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(a.css("padding-left") || 0, 10) -
            parseInt(a.css("padding-right") || 0, 10)),
          (s =
            s -
            parseInt(a.css("padding-top") || 0, 10) -
            parseInt(a.css("padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
      }
      const a = e.params,
        { $wrapperEl: i, size: n, rtlTranslate: l, wrongRTL: r } = e,
        o = e.virtual && a.virtual.enabled,
        c = o ? e.virtual.slides.length : e.slides.length,
        d = i.children(`.${e.params.slideClass}`),
        p = o ? e.virtual.slides.length : d.length;
      let u = [];
      const h = [],
        m = [];
      let f = a.slidesOffsetBefore;
      "function" == typeof f && (f = a.slidesOffsetBefore.call(e));
      let g = a.slidesOffsetAfter;
      "function" == typeof g && (g = a.slidesOffsetAfter.call(e));
      const v = e.snapGrid.length,
        b = e.slidesGrid.length;
      let w = a.spaceBetween,
        y = -f,
        S = 0,
        C = 0;
      if (void 0 === n) return;
      "string" == typeof w &&
        w.indexOf("%") >= 0 &&
        (w = (parseFloat(w.replace("%", "")) / 100) * n),
        (e.virtualSize = -w),
        l
          ? d.css({ marginLeft: "", marginBottom: "", marginTop: "" })
          : d.css({ marginRight: "", marginBottom: "", marginTop: "" }),
        a.centeredSlides &&
          a.cssMode &&
          (M(e.wrapperEl, "--swiper-centered-offset-before", ""),
          M(e.wrapperEl, "--swiper-centered-offset-after", ""));
      const E = a.grid && a.grid.rows > 1 && e.grid;
      let T;
      E && e.grid.initSlides(p);
      const x =
        "auto" === a.slidesPerView &&
        a.breakpoints &&
        Object.keys(a.breakpoints).filter(
          (e) => void 0 !== a.breakpoints[e].slidesPerView
        ).length > 0;
      for (let i = 0; i < p; i += 1) {
        T = 0;
        const l = d.eq(i);
        if (
          (E && e.grid.updateSlide(i, l, p, t), "none" !== l.css("display"))
        ) {
          if ("auto" === a.slidesPerView) {
            x && (d[i].style[t("width")] = "");
            const n = getComputedStyle(l[0]),
              r = l[0].style.transform,
              o = l[0].style.webkitTransform;
            if (
              (r && (l[0].style.transform = "none"),
              o && (l[0].style.webkitTransform = "none"),
              a.roundLengths)
            )
              T = e.isHorizontal() ? l.outerWidth(!0) : l.outerHeight(!0);
            else {
              const e = s(n, "width"),
                t = s(n, "padding-left"),
                a = s(n, "padding-right"),
                i = s(n, "margin-left"),
                r = s(n, "margin-right"),
                o = n.getPropertyValue("box-sizing");
              if (o && "border-box" === o) T = e + i + r;
              else {
                const { clientWidth: s, offsetWidth: n } = l[0];
                T = e + t + a + i + r + (n - s);
              }
            }
            r && (l[0].style.transform = r),
              o && (l[0].style.webkitTransform = o),
              a.roundLengths && (T = Math.floor(T));
          } else
            (T = (n - (a.slidesPerView - 1) * w) / a.slidesPerView),
              a.roundLengths && (T = Math.floor(T)),
              d[i] && (d[i].style[t("width")] = `${T}px`);
          d[i] && (d[i].swiperSlideSize = T),
            m.push(T),
            a.centeredSlides
              ? ((y = y + T / 2 + S / 2 + w),
                0 === S && 0 !== i && (y = y - n / 2 - w),
                0 === i && (y = y - n / 2 - w),
                Math.abs(y) < 0.001 && (y = 0),
                a.roundLengths && (y = Math.floor(y)),
                C % a.slidesPerGroup == 0 && u.push(y),
                h.push(y))
              : (a.roundLengths && (y = Math.floor(y)),
                (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                  e.params.slidesPerGroup ==
                  0 && u.push(y),
                h.push(y),
                (y = y + T + w)),
            (e.virtualSize += T + w),
            (S = T),
            (C += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, n) + g),
        l &&
          r &&
          ("slide" === a.effect || "coverflow" === a.effect) &&
          i.css({ width: `${e.virtualSize + a.spaceBetween}px` }),
        a.setWrapperSize &&
          i.css({ [t("width")]: `${e.virtualSize + a.spaceBetween}px` }),
        E && e.grid.updateWrapperSize(T, u, t),
        !a.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < u.length; s += 1) {
          let i = u[s];
          a.roundLengths && (i = Math.floor(i)),
            u[s] <= e.virtualSize - n && t.push(i);
        }
        (u = t),
          Math.floor(e.virtualSize - n) - Math.floor(u[u.length - 1]) > 1 &&
            u.push(e.virtualSize - n);
      }
      if ((0 === u.length && (u = [0]), 0 !== a.spaceBetween)) {
        const s = e.isHorizontal() && l ? "marginLeft" : t("marginRight");
        d.filter((e, t) => !a.cssMode || t !== d.length - 1).css({
          [s]: `${w}px`,
        });
      }
      if (a.centeredSlides && a.centeredSlidesBounds) {
        let e = 0;
        m.forEach((t) => {
          e += t + (a.spaceBetween ? a.spaceBetween : 0);
        }),
          (e -= a.spaceBetween);
        const t = e - n;
        u = u.map((e) => (e < 0 ? -f : e > t ? t + g : e));
      }
      if (a.centerInsufficientSlides) {
        let e = 0;
        if (
          (m.forEach((t) => {
            e += t + (a.spaceBetween ? a.spaceBetween : 0);
          }),
          (e -= a.spaceBetween),
          e < n)
        ) {
          const t = (n - e) / 2;
          u.forEach((e, s) => {
            u[s] = e - t;
          }),
            h.forEach((e, s) => {
              h[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: d,
          snapGrid: u,
          slidesGrid: h,
          slidesSizesGrid: m,
        }),
        a.centeredSlides && a.cssMode && !a.centeredSlidesBounds)
      ) {
        M(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
          M(
            e.wrapperEl,
            "--swiper-centered-offset-after",
            e.size / 2 - m[m.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      p !== c && e.emit("slidesLengthChange"),
        u.length !== v &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        h.length !== b && e.emit("slidesGridLengthChange"),
        a.watchSlidesProgress && e.updateSlidesOffset();
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        a = t.virtual && t.params.virtual.enabled;
      let i,
        n = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const l = (e) =>
        a
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
            )[0]
          : t.slides.eq(e)[0];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          t.visibleSlides.each((e) => {
            s.push(e);
          });
        else
          for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
            const e = t.activeIndex + i;
            if (e > t.slides.length && !a) break;
            s.push(l(e));
          }
      else s.push(l(t.activeIndex));
      for (i = 0; i < s.length; i += 1)
        if (void 0 !== s[i]) {
          const e = s[i].offsetHeight;
          n = e > n ? e : n;
        }
      (n || 0 === n) && t.$wrapperEl.css("height", `${n}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides;
      for (let s = 0; s < t.length; s += 1)
        t[s].swiperSlideOffset = e.isHorizontal()
          ? t[s].offsetLeft
          : t[s].offsetTop;
    },
    updateSlidesProgress: function (e = (this && this.translate) || 0) {
      const t = this,
        s = t.params,
        { slides: a, rtlTranslate: i, snapGrid: n } = t;
      if (0 === a.length) return;
      void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
      let l = -e;
      i && (l = e),
        a.removeClass(s.slideVisibleClass),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < a.length; e += 1) {
        const r = a[e];
        let o = r.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (o -= a[0].swiperSlideOffset);
        const c =
            (l + (s.centeredSlides ? t.minTranslate() : 0) - o) /
            (r.swiperSlideSize + s.spaceBetween),
          d =
            (l - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) /
            (r.swiperSlideSize + s.spaceBetween),
          p = -(l - o),
          u = p + t.slidesSizesGrid[e];
        ((p >= 0 && p < t.size - 1) ||
          (u > 1 && u <= t.size) ||
          (p <= 0 && u >= t.size)) &&
          (t.visibleSlides.push(r),
          t.visibleSlidesIndexes.push(e),
          a.eq(e).addClass(s.slideVisibleClass)),
          (r.progress = i ? -c : c),
          (r.originalProgress = i ? -d : d);
      }
      t.visibleSlides = L(t.visibleSlides);
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        a = t.maxTranslate() - t.minTranslate();
      let { progress: i, isBeginning: n, isEnd: l } = t;
      const r = n,
        o = l;
      0 === a
        ? ((i = 0), (n = !0), (l = !0))
        : ((i = (e - t.minTranslate()) / a), (n = i <= 0), (l = i >= 1)),
        Object.assign(t, { progress: i, isBeginning: n, isEnd: l }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        n && !r && t.emit("reachBeginning toEdge"),
        l && !o && t.emit("reachEnd toEdge"),
        ((r && !n) || (o && !l)) && t.emit("fromEdge"),
        t.emit("progress", i);
    },
    updateSlidesClasses: function () {
      const e = this,
        {
          slides: t,
          params: s,
          $wrapperEl: a,
          activeIndex: i,
          realIndex: n,
        } = e,
        l = e.virtual && s.virtual.enabled;
      let r;
      t.removeClass(
        `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
      ),
        (r = l
          ? e.$wrapperEl.find(
              `.${s.slideClass}[data-swiper-slide-index="${i}"]`
            )
          : t.eq(i)),
        r.addClass(s.slideActiveClass),
        s.loop &&
          (r.hasClass(s.slideDuplicateClass)
            ? a
                .children(
                  `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${n}"]`
                )
                .addClass(s.slideDuplicateActiveClass)
            : a
                .children(
                  `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${n}"]`
                )
                .addClass(s.slideDuplicateActiveClass));
      let o = r.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
      s.loop && 0 === o.length && ((o = t.eq(0)), o.addClass(s.slideNextClass));
      let c = r.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
      s.loop &&
        0 === c.length &&
        ((c = t.eq(-1)), c.addClass(s.slidePrevClass)),
        s.loop &&
          (o.hasClass(s.slideDuplicateClass)
            ? a
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${o.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass)
            : a
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${o.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass),
          c.hasClass(s.slideDuplicateClass)
            ? a
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)
            : a
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          slidesGrid: a,
          snapGrid: i,
          params: n,
          activeIndex: l,
          realIndex: r,
          snapIndex: o,
        } = t;
      let c,
        d = e;
      if (void 0 === d) {
        for (let e = 0; e < a.length; e += 1)
          void 0 !== a[e + 1]
            ? s >= a[e] && s < a[e + 1] - (a[e + 1] - a[e]) / 2
              ? (d = e)
              : s >= a[e] && s < a[e + 1] && (d = e + 1)
            : s >= a[e] && (d = e);
        n.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
      }
      if (i.indexOf(s) >= 0) c = i.indexOf(s);
      else {
        const e = Math.min(n.slidesPerGroupSkip, d);
        c = e + Math.floor((d - e) / n.slidesPerGroup);
      }
      if ((c >= i.length && (c = i.length - 1), d === l))
        return void (c !== o && ((t.snapIndex = c), t.emit("snapIndexChange")));
      const p = parseInt(
        t.slides.eq(d).attr("data-swiper-slide-index") || d,
        10
      );
      Object.assign(t, {
        snapIndex: c,
        realIndex: p,
        previousIndex: l,
        activeIndex: d,
      }),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        r !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        s = t.params,
        a = L(e).closest(`.${s.slideClass}`)[0];
      let i,
        n = !1;
      if (a)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === a) {
            (n = !0), (i = e);
            break;
          }
      if (!a || !n)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = a),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              L(a).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = i),
        s.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const V = {
    getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
      const { params: t, rtlTranslate: s, translate: a, $wrapperEl: i } = this;
      if (t.virtualTranslate) return s ? -a : a;
      if (t.cssMode) return a;
      let n = k(i[0], e);
      return s && (n = -n), n || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        {
          rtlTranslate: a,
          params: i,
          $wrapperEl: n,
          wrapperEl: l,
          progress: r,
        } = s;
      let o,
        c = 0,
        d = 0;
      s.isHorizontal() ? (c = a ? -e : e) : (d = e),
        i.roundLengths && ((c = Math.floor(c)), (d = Math.floor(d))),
        i.cssMode
          ? (l[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -c
              : -d)
          : i.virtualTranslate ||
            n.transform(`translate3d(${c}px, ${d}px, 0px)`),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? c : d);
      const p = s.maxTranslate() - s.minTranslate();
      (o = 0 === p ? 0 : (e - s.minTranslate()) / p),
        o !== r && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e = 0, t = this.params.speed, s = !0, a = !0, i) {
      const n = this,
        { params: l, wrapperEl: r } = n;
      if (n.animating && l.preventInteractionOnTransition) return !1;
      const o = n.minTranslate(),
        c = n.maxTranslate();
      let d;
      if (
        ((d = a && e > o ? o : a && e < c ? c : e),
        n.updateProgress(d),
        l.cssMode)
      ) {
        const e = n.isHorizontal();
        if (0 === t) r[e ? "scrollLeft" : "scrollTop"] = -d;
        else {
          if (!n.support.smoothScroll)
            return (
              I({ swiper: n, targetPosition: -d, side: e ? "left" : "top" }), !0
            );
          r.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (n.setTransition(0),
            n.setTranslate(d),
            s &&
              (n.emit("beforeTransitionStart", t, i), n.emit("transitionEnd")))
          : (n.setTransition(t),
            n.setTranslate(d),
            s &&
              (n.emit("beforeTransitionStart", t, i),
              n.emit("transitionStart")),
            n.animating ||
              ((n.animating = !0),
              n.onTranslateToWrapperTransitionEnd ||
                (n.onTranslateToWrapperTransitionEnd = function (e) {
                  n &&
                    !n.destroyed &&
                    e.target === this &&
                    (n.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      n.onTranslateToWrapperTransitionEnd
                    ),
                    n.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      n.onTranslateToWrapperTransitionEnd
                    ),
                    (n.onTranslateToWrapperTransitionEnd = null),
                    delete n.onTranslateToWrapperTransitionEnd,
                    s && n.emit("transitionEnd"));
                }),
              n.$wrapperEl[0].addEventListener(
                "transitionend",
                n.onTranslateToWrapperTransitionEnd
              ),
              n.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                n.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function F({ swiper: e, runCallbacks: t, direction: s, step: a }) {
    const { activeIndex: i, previousIndex: n } = e;
    let l = s;
    if (
      (l || (l = i > n ? "next" : i < n ? "prev" : "reset"),
      e.emit(`transition${a}`),
      t && i !== n)
    ) {
      if ("reset" === l) return void e.emit(`slideResetTransition${a}`);
      e.emit(`slideChangeTransition${a}`),
        "next" === l
          ? e.emit(`slideNextTransition${a}`)
          : e.emit(`slidePrevTransition${a}`);
    }
  }
  const W = {
    slideTo: function (e = 0, t = this.params.speed, s = !0, a, i) {
      if ("number" != typeof e && "string" != typeof e)
        throw new Error(
          `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
        );
      if ("string" == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const n = this;
      let l = e;
      l < 0 && (l = 0);
      const {
        params: r,
        snapGrid: o,
        slidesGrid: c,
        previousIndex: d,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: m,
      } = n;
      if ((n.animating && r.preventInteractionOnTransition) || (!m && !a && !i))
        return !1;
      const f = Math.min(n.params.slidesPerGroupSkip, l);
      let g = f + Math.floor((l - f) / n.params.slidesPerGroup);
      g >= o.length && (g = o.length - 1),
        (p || r.initialSlide || 0) === (d || 0) &&
          s &&
          n.emit("beforeSlideChangeStart");
      const v = -o[g];
      if ((n.updateProgress(v), r.normalizeSlideIndex))
        for (let e = 0; e < c.length; e += 1) {
          const t = -Math.floor(100 * v),
            s = Math.floor(100 * c[e]),
            a = Math.floor(100 * c[e + 1]);
          void 0 !== c[e + 1]
            ? t >= s && t < a - (a - s) / 2
              ? (l = e)
              : t >= s && t < a && (l = e + 1)
            : t >= s && (l = e);
        }
      if (n.initialized && l !== p) {
        if (!n.allowSlideNext && v < n.translate && v < n.minTranslate())
          return !1;
        if (
          !n.allowSlidePrev &&
          v > n.translate &&
          v > n.maxTranslate() &&
          (p || 0) !== l
        )
          return !1;
      }
      let b;
      if (
        ((b = l > p ? "next" : l < p ? "prev" : "reset"),
        (u && -v === n.translate) || (!u && v === n.translate))
      )
        return (
          n.updateActiveIndex(l),
          r.autoHeight && n.updateAutoHeight(),
          n.updateSlidesClasses(),
          "slide" !== r.effect && n.setTranslate(v),
          "reset" !== b && (n.transitionStart(s, b), n.transitionEnd(s, b)),
          !1
        );
      if (r.cssMode) {
        const e = n.isHorizontal(),
          s = u ? v : -v;
        if (0 === t) {
          const t = n.virtual && n.params.virtual.enabled;
          t &&
            ((n.wrapperEl.style.scrollSnapType = "none"),
            (n._immediateVirtual = !0)),
            (h[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (n.wrapperEl.style.scrollSnapType = ""),
                  (n._swiperImmediateVirtual = !1);
              });
        } else {
          if (!n.support.smoothScroll)
            return (
              I({ swiper: n, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        n.setTransition(t),
        n.setTranslate(v),
        n.updateActiveIndex(l),
        n.updateSlidesClasses(),
        n.emit("beforeTransitionStart", t, a),
        n.transitionStart(s, b),
        0 === t
          ? n.transitionEnd(s, b)
          : n.animating ||
            ((n.animating = !0),
            n.onSlideToWrapperTransitionEnd ||
              (n.onSlideToWrapperTransitionEnd = function (e) {
                n &&
                  !n.destroyed &&
                  e.target === this &&
                  (n.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    n.onSlideToWrapperTransitionEnd
                  ),
                  n.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    n.onSlideToWrapperTransitionEnd
                  ),
                  (n.onSlideToWrapperTransitionEnd = null),
                  delete n.onSlideToWrapperTransitionEnd,
                  n.transitionEnd(s, b));
              }),
            n.$wrapperEl[0].addEventListener(
              "transitionend",
              n.onSlideToWrapperTransitionEnd
            ),
            n.$wrapperEl[0].addEventListener(
              "webkitTransitionEnd",
              n.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e = 0, t = this.params.speed, s = !0, a) {
      const i = this;
      let n = e;
      return i.params.loop && (n += i.loopedSlides), i.slideTo(n, t, s, a);
    },
    slideNext: function (e = this.params.speed, t = !0, s) {
      const a = this,
        { animating: i, enabled: n, params: l } = a;
      if (!n) return a;
      let r = l.slidesPerGroup;
      "auto" === l.slidesPerView &&
        1 === l.slidesPerGroup &&
        l.slidesPerGroupAuto &&
        (r = Math.max(a.slidesPerViewDynamic("current", !0), 1));
      const o = a.activeIndex < l.slidesPerGroupSkip ? 1 : r;
      if (l.loop) {
        if (i && l.loopPreventsSlide) return !1;
        a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
      }
      return l.rewind && a.isEnd
        ? a.slideTo(0, e, t, s)
        : a.slideTo(a.activeIndex + o, e, t, s);
    },
    slidePrev: function (e = this.params.speed, t = !0, s) {
      const a = this,
        {
          params: i,
          animating: n,
          snapGrid: l,
          slidesGrid: r,
          rtlTranslate: o,
          enabled: c,
        } = a;
      if (!c) return a;
      if (i.loop) {
        if (n && i.loopPreventsSlide) return !1;
        a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
      }
      function d(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const p = d(o ? a.translate : -a.translate),
        u = l.map((e) => d(e));
      let h = l[u.indexOf(p) - 1];
      if (void 0 === h && i.cssMode) {
        let e;
        l.forEach((t, s) => {
          p >= t && (e = s);
        }),
          void 0 !== e && (h = l[e > 0 ? e - 1 : e]);
      }
      let m = 0;
      return (
        void 0 !== h &&
          ((m = r.indexOf(h)),
          m < 0 && (m = a.activeIndex - 1),
          "auto" === i.slidesPerView &&
            1 === i.slidesPerGroup &&
            i.slidesPerGroupAuto &&
            ((m = m - a.slidesPerViewDynamic("previous", !0) + 1),
            (m = Math.max(m, 0)))),
        i.rewind && a.isBeginning
          ? a.slideTo(a.slides.length - 1, e, t, s)
          : a.slideTo(m, e, t, s)
      );
    },
    slideReset: function (e = this.params.speed, t = !0, s) {
      return this.slideTo(this.activeIndex, e, t, s);
    },
    slideToClosest: function (e = this.params.speed, t = !0, s, a = 0.5) {
      const i = this;
      let n = i.activeIndex;
      const l = Math.min(i.params.slidesPerGroupSkip, n),
        r = l + Math.floor((n - l) / i.params.slidesPerGroup),
        o = i.rtlTranslate ? i.translate : -i.translate;
      if (o >= i.snapGrid[r]) {
        const e = i.snapGrid[r];
        o - e > (i.snapGrid[r + 1] - e) * a && (n += i.params.slidesPerGroup);
      } else {
        const e = i.snapGrid[r - 1];
        o - e <= (i.snapGrid[r] - e) * a && (n -= i.params.slidesPerGroup);
      }
      return (
        (n = Math.max(n, 0)),
        (n = Math.min(n, i.slidesGrid.length - 1)),
        i.slideTo(n, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, $wrapperEl: s } = e,
        a =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let i,
        n = e.clickedIndex;
      if (t.loop) {
        if (e.animating) return;
        (i = parseInt(L(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
          t.centeredSlides
            ? n < e.loopedSlides - a / 2 ||
              n > e.slides.length - e.loopedSlides + a / 2
              ? (e.loopFix(),
                (n = s
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                A(() => {
                  e.slideTo(n);
                }))
              : e.slideTo(n)
            : n > e.slides.length - a
            ? (e.loopFix(),
              (n = s
                .children(
                  `.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`
                )
                .eq(0)
                .index()),
              A(() => {
                e.slideTo(n);
              }))
            : e.slideTo(n);
      } else e.slideTo(n);
    },
  };
  const R = {
    loopCreate: function () {
      const e = this,
        t = v(),
        { params: s, $wrapperEl: a } = e,
        i = a.children().length > 0 ? L(a.children()[0].parentNode) : a;
      i.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
      let n = i.children(`.${s.slideClass}`);
      if (s.loopFillGroupWithBlank) {
        const e = s.slidesPerGroup - (n.length % s.slidesPerGroup);
        if (e !== s.slidesPerGroup) {
          for (let a = 0; a < e; a += 1) {
            const e = L(t.createElement("div")).addClass(
              `${s.slideClass} ${s.slideBlankClass}`
            );
            i.append(e);
          }
          n = i.children(`.${s.slideClass}`);
        }
      }
      "auto" !== s.slidesPerView ||
        s.loopedSlides ||
        (s.loopedSlides = n.length),
        (e.loopedSlides = Math.ceil(
          parseFloat(s.loopedSlides || s.slidesPerView, 10)
        )),
        (e.loopedSlides += s.loopAdditionalSlides),
        e.loopedSlides > n.length && (e.loopedSlides = n.length);
      const l = [],
        r = [];
      n.each((t, s) => {
        const a = L(t);
        s < e.loopedSlides && r.push(t),
          s < n.length && s >= n.length - e.loopedSlides && l.push(t),
          a.attr("data-swiper-slide-index", s);
      });
      for (let e = 0; e < r.length; e += 1)
        i.append(L(r[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
      for (let e = l.length - 1; e >= 0; e -= 1)
        i.prepend(L(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
    },
    loopFix: function () {
      const e = this;
      e.emit("beforeLoopFix");
      const {
        activeIndex: t,
        slides: s,
        loopedSlides: a,
        allowSlidePrev: i,
        allowSlideNext: n,
        snapGrid: l,
        rtlTranslate: r,
      } = e;
      let o;
      (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
      const c = -l[t] - e.getTranslate();
      if (t < a) {
        (o = s.length - 3 * a + t), (o += a);
        e.slideTo(o, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((r ? -e.translate : e.translate) - c);
      } else if (t >= s.length - a) {
        (o = -s.length + t + a), (o += a);
        e.slideTo(o, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((r ? -e.translate : e.translate) - c);
      }
      (e.allowSlidePrev = i), (e.allowSlideNext = n), e.emit("loopFix");
    },
    loopDestroy: function () {
      const { $wrapperEl: e, params: t, slides: s } = this;
      e
        .children(
          `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
        )
        .remove(),
        s.removeAttr("data-swiper-slide-index");
    },
  };
  function Y(e) {
    const t = this,
      s = v(),
      a = w(),
      i = t.touchEventsData,
      { params: n, touches: l, enabled: r } = t;
    if (!r) return;
    if (t.animating && n.preventInteractionOnTransition) return;
    !t.animating && n.cssMode && n.loop && t.loopFix();
    let o = e;
    o.originalEvent && (o = o.originalEvent);
    let c = L(o.target);
    if ("wrapper" === n.touchEventsTarget && !c.closest(t.wrapperEl).length)
      return;
    if (
      ((i.isTouchEvent = "touchstart" === o.type),
      !i.isTouchEvent && "which" in o && 3 === o.which)
    )
      return;
    if (!i.isTouchEvent && "button" in o && o.button > 0) return;
    if (i.isTouched && i.isMoved) return;
    !!n.noSwipingClass &&
      "" !== n.noSwipingClass &&
      o.target &&
      o.target.shadowRoot &&
      e.path &&
      e.path[0] &&
      (c = L(e.path[0]));
    const d = n.noSwipingSelector
        ? n.noSwipingSelector
        : `.${n.noSwipingClass}`,
      p = !(!o.target || !o.target.shadowRoot);
    if (
      n.noSwiping &&
      (p
        ? (function (e, t = this) {
            return (function t(s) {
              return s && s !== v() && s !== w()
                ? (s.assignedSlot && (s = s.assignedSlot),
                  s.closest(e) || t(s.getRootNode().host))
                : null;
            })(t);
          })(d, o.target)
        : c.closest(d)[0])
    )
      return void (t.allowClick = !0);
    if (n.swipeHandler && !c.closest(n.swipeHandler)[0]) return;
    (l.currentX = "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX),
      (l.currentY =
        "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY);
    const u = l.currentX,
      h = l.currentY,
      m = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection,
      f = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
    if (m && (u <= f || u >= a.innerWidth - f)) {
      if ("prevent" !== m) return;
      e.preventDefault();
    }
    if (
      (Object.assign(i, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
      (l.startX = u),
      (l.startY = h),
      (i.touchStartTime = O()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      n.threshold > 0 && (i.allowThresholdMove = !1),
      "touchstart" !== o.type)
    ) {
      let e = !0;
      c.is(i.focusableElements) && (e = !1),
        s.activeElement &&
          L(s.activeElement).is(i.focusableElements) &&
          s.activeElement !== c[0] &&
          s.activeElement.blur();
      const a = e && t.allowTouchMove && n.touchStartPreventDefault;
      (!n.touchStartForcePreventDefault && !a) ||
        c[0].isContentEditable ||
        o.preventDefault();
    }
    t.emit("touchStart", o);
  }
  function X(e) {
    const t = v(),
      s = this,
      a = s.touchEventsData,
      { params: i, touches: n, rtlTranslate: l, enabled: r } = s;
    if (!r) return;
    let o = e;
    if ((o.originalEvent && (o = o.originalEvent), !a.isTouched))
      return void (
        a.startMoving &&
        a.isScrolling &&
        s.emit("touchMoveOpposite", o)
      );
    if (a.isTouchEvent && "touchmove" !== o.type) return;
    const c =
        "touchmove" === o.type &&
        o.targetTouches &&
        (o.targetTouches[0] || o.changedTouches[0]),
      d = "touchmove" === o.type ? c.pageX : o.pageX,
      p = "touchmove" === o.type ? c.pageY : o.pageY;
    if (o.preventedByNestedSwiper) return (n.startX = d), void (n.startY = p);
    if (!s.allowTouchMove)
      return (
        (s.allowClick = !1),
        void (
          a.isTouched &&
          (Object.assign(n, { startX: d, startY: p, currentX: d, currentY: p }),
          (a.touchStartTime = O()))
        )
      );
    if (a.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
      if (s.isVertical()) {
        if (
          (p < n.startY && s.translate <= s.maxTranslate()) ||
          (p > n.startY && s.translate >= s.minTranslate())
        )
          return (a.isTouched = !1), void (a.isMoved = !1);
      } else if (
        (d < n.startX && s.translate <= s.maxTranslate()) ||
        (d > n.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      a.isTouchEvent &&
      t.activeElement &&
      o.target === t.activeElement &&
      L(o.target).is(a.focusableElements)
    )
      return (a.isMoved = !0), void (s.allowClick = !1);
    if (
      (a.allowTouchCallbacks && s.emit("touchMove", o),
      o.targetTouches && o.targetTouches.length > 1)
    )
      return;
    (n.currentX = d), (n.currentY = p);
    const u = n.currentX - n.startX,
      h = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(u ** 2 + h ** 2) < s.params.threshold)
      return;
    if (void 0 === a.isScrolling) {
      let e;
      (s.isHorizontal() && n.currentY === n.startY) ||
      (s.isVertical() && n.currentX === n.startX)
        ? (a.isScrolling = !1)
        : u * u + h * h >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(h), Math.abs(u))) / Math.PI),
          (a.isScrolling = s.isHorizontal()
            ? e > i.touchAngle
            : 90 - e > i.touchAngle));
    }
    if (
      (a.isScrolling && s.emit("touchMoveOpposite", o),
      void 0 === a.startMoving &&
        ((n.currentX === n.startX && n.currentY === n.startY) ||
          (a.startMoving = !0)),
      a.isScrolling)
    )
      return void (a.isTouched = !1);
    if (!a.startMoving) return;
    (s.allowClick = !1),
      !i.cssMode && o.cancelable && o.preventDefault(),
      i.touchMoveStopPropagation && !i.nested && o.stopPropagation(),
      a.isMoved ||
        (i.loop && !i.cssMode && s.loopFix(),
        (a.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating &&
          s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        (a.allowMomentumBounce = !1),
        !i.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", o)),
      s.emit("sliderMove", o),
      (a.isMoved = !0);
    let m = s.isHorizontal() ? u : h;
    (n.diff = m),
      (m *= i.touchRatio),
      l && (m = -m),
      (s.swipeDirection = m > 0 ? "prev" : "next"),
      (a.currentTranslate = m + a.startTranslate);
    let f = !0,
      g = i.resistanceRatio;
    if (
      (i.touchReleaseOnEdges && (g = 0),
      m > 0 && a.currentTranslate > s.minTranslate()
        ? ((f = !1),
          i.resistance &&
            (a.currentTranslate =
              s.minTranslate() -
              1 +
              (-s.minTranslate() + a.startTranslate + m) ** g))
        : m < 0 &&
          a.currentTranslate < s.maxTranslate() &&
          ((f = !1),
          i.resistance &&
            (a.currentTranslate =
              s.maxTranslate() +
              1 -
              (s.maxTranslate() - a.startTranslate - m) ** g)),
      f && (o.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        a.currentTranslate < a.startTranslate &&
        (a.currentTranslate = a.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        a.currentTranslate > a.startTranslate &&
        (a.currentTranslate = a.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (a.currentTranslate = a.startTranslate),
      i.threshold > 0)
    ) {
      if (!(Math.abs(m) > i.threshold || a.allowThresholdMove))
        return void (a.currentTranslate = a.startTranslate);
      if (!a.allowThresholdMove)
        return (
          (a.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (a.currentTranslate = a.startTranslate),
          void (n.diff = s.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY)
        );
    }
    i.followFinger &&
      !i.cssMode &&
      (((i.freeMode && i.freeMode.enabled && s.freeMode) ||
        i.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      s.params.freeMode &&
        i.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(a.currentTranslate),
      s.setTranslate(a.currentTranslate));
  }
  function U(e) {
    const t = this,
      s = t.touchEventsData,
      { params: a, touches: i, rtlTranslate: n, slidesGrid: l, enabled: r } = t;
    if (!r) return;
    let o = e;
    if (
      (o.originalEvent && (o = o.originalEvent),
      s.allowTouchCallbacks && t.emit("touchEnd", o),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && a.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    a.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = O(),
      d = c - s.touchStartTime;
    if (t.allowClick) {
      const e = o.path || (o.composedPath && o.composedPath());
      t.updateClickedSlide((e && e[0]) || o.target),
        t.emit("tap click", o),
        d < 300 &&
          c - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", o);
    }
    if (
      ((s.lastClickTime = O()),
      A(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === i.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let p;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (p = a.followFinger
        ? n
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      a.cssMode)
    )
      return;
    if (t.params.freeMode && a.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: p });
    let u = 0,
      h = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < l.length;
      e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup
    ) {
      const t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
      void 0 !== l[e + t]
        ? p >= l[e] && p < l[e + t] && ((u = e), (h = l[e + t] - l[e]))
        : p >= l[e] && ((u = e), (h = l[l.length - 1] - l[l.length - 2]));
    }
    const m = (p - l[u]) / h,
      f = u < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    if (d > a.longSwipesMs) {
      if (!a.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (m >= a.longSwipesRatio ? t.slideTo(u + f) : t.slideTo(u)),
        "prev" === t.swipeDirection &&
          (m > 1 - a.longSwipesRatio ? t.slideTo(u + f) : t.slideTo(u));
    } else {
      if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (o.target === t.navigation.nextEl || o.target === t.navigation.prevEl)
        ? o.target === t.navigation.nextEl
          ? t.slideTo(u + f)
          : t.slideTo(u)
        : ("next" === t.swipeDirection && t.slideTo(u + f),
          "prev" === t.swipeDirection && t.slideTo(u));
    }
  }
  function K() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: a, allowSlidePrev: i, snapGrid: n } = e;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
      e.isEnd &&
      !e.isBeginning &&
      !e.params.centeredSlides
        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = i),
      (e.allowSlideNext = a),
      e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
  }
  function Q(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function Z() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: a } = e;
    if (!a) return;
    let i;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      -0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const n = e.maxTranslate() - e.minTranslate();
    (i = 0 === n ? 0 : (e.translate - e.minTranslate()) / n),
      i !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  let J = !1;
  function ee() {}
  const te = (e, t) => {
    const s = v(),
      {
        params: a,
        touchEvents: i,
        el: n,
        wrapperEl: l,
        device: r,
        support: o,
      } = e,
      c = !!a.nested,
      d = "on" === t ? "addEventListener" : "removeEventListener",
      p = t;
    if (o.touch) {
      const t = !(
        "touchstart" !== i.start ||
        !o.passiveListener ||
        !a.passiveListeners
      ) && { passive: !0, capture: !1 };
      n[d](i.start, e.onTouchStart, t),
        n[d](
          i.move,
          e.onTouchMove,
          o.passiveListener ? { passive: !1, capture: c } : c
        ),
        n[d](i.end, e.onTouchEnd, t),
        i.cancel && n[d](i.cancel, e.onTouchEnd, t);
    } else
      n[d](i.start, e.onTouchStart, !1),
        s[d](i.move, e.onTouchMove, c),
        s[d](i.end, e.onTouchEnd, !1);
    (a.preventClicks || a.preventClicksPropagation) &&
      n[d]("click", e.onClick, !0),
      a.cssMode && l[d]("scroll", e.onScroll),
      a.updateOnWindowResize
        ? e[p](
            r.ios || r.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            K,
            !0
          )
        : e[p]("observerUpdate", K, !0);
  };
  const se = {
      attachEvents: function () {
        const e = this,
          t = v(),
          { params: s, support: a } = e;
        (e.onTouchStart = Y.bind(e)),
          (e.onTouchMove = X.bind(e)),
          (e.onTouchEnd = U.bind(e)),
          s.cssMode && (e.onScroll = Z.bind(e)),
          (e.onClick = Q.bind(e)),
          a.touch && !J && (t.addEventListener("touchstart", ee), (J = !0)),
          te(e, "on");
      },
      detachEvents: function () {
        te(this, "off");
      },
    },
    ae = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const ie = {
    setBreakpoint: function () {
      const e = this,
        {
          activeIndex: t,
          initialized: s,
          loopedSlides: a = 0,
          params: i,
          $el: n,
        } = e,
        l = i.breakpoints;
      if (!l || (l && 0 === Object.keys(l).length)) return;
      const r = e.getBreakpoint(l, e.params.breakpointsBase, e.el);
      if (!r || e.currentBreakpoint === r) return;
      const o = (r in l ? l[r] : void 0) || e.originalParams,
        c = ae(e, i),
        d = ae(e, o),
        p = i.enabled;
      c && !d
        ? (n.removeClass(
            `${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`
          ),
          e.emitContainerClasses())
        : !c &&
          d &&
          (n.addClass(`${i.containerModifierClass}grid`),
          ((o.grid.fill && "column" === o.grid.fill) ||
            (!o.grid.fill && "column" === i.grid.fill)) &&
            n.addClass(`${i.containerModifierClass}grid-column`),
          e.emitContainerClasses());
      const u = o.direction && o.direction !== i.direction,
        h = i.loop && (o.slidesPerView !== i.slidesPerView || u);
      u && s && e.changeDirection(), _(e.params, o);
      const m = e.params.enabled;
      Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev,
      }),
        p && !m ? e.disable() : !p && m && e.enable(),
        (e.currentBreakpoint = r),
        e.emit("_beforeBreakpoint", o),
        h &&
          s &&
          (e.loopDestroy(),
          e.loopCreate(),
          e.updateSlides(),
          e.slideTo(t - a + e.loopedSlides, 0, !1)),
        e.emit("breakpoint", o);
    },
    getBreakpoint: function (e, t = "window", s) {
      if (!e || ("container" === t && !s)) return;
      let a = !1;
      const i = w(),
        n = "window" === t ? i.innerHeight : s.clientHeight,
        l = Object.keys(e).map((e) => {
          if ("string" == typeof e && 0 === e.indexOf("@")) {
            const t = parseFloat(e.substr(1));
            return { value: n * t, point: e };
          }
          return { value: e, point: e };
        });
      l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
      for (let e = 0; e < l.length; e += 1) {
        const { point: n, value: r } = l[e];
        "window" === t
          ? i.matchMedia(`(min-width: ${r}px)`).matches && (a = n)
          : r <= s.clientWidth && (a = n);
      }
      return a || "max";
    },
  };
  const ne = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: s, rtl: a, $el: i, device: n, support: l } = e,
        r = (function (e, t) {
          const s = [];
          return (
            e.forEach((e) => {
              "object" == typeof e
                ? Object.keys(e).forEach((a) => {
                    e[a] && s.push(t + a);
                  })
                : "string" == typeof e && s.push(t + e);
            }),
            s
          );
        })(
          [
            "initialized",
            s.direction,
            { "pointer-events": !l.touch },
            { "free-mode": e.params.freeMode && s.freeMode.enabled },
            { autoheight: s.autoHeight },
            { rtl: a },
            { grid: s.grid && s.grid.rows > 1 },
            {
              "grid-column":
                s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
            },
            { android: n.android },
            { ios: n.ios },
            { "css-mode": s.cssMode },
            { centered: s.cssMode && s.centeredSlides },
          ],
          s.containerModifierClass
        );
      t.push(...r), i.addClass([...t].join(" ")), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { $el: e, classNames: t } = this;
      e.removeClass(t.join(" ")), this.emitContainerClasses();
    },
  };
  const le = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function re(e, t) {
    return function (s = {}) {
      const a = Object.keys(s)[0],
        i = s[a];
      "object" == typeof i && null !== i
        ? (["navigation", "pagination", "scrollbar"].indexOf(a) >= 0 &&
            !0 === e[a] &&
            (e[a] = { auto: !0 }),
          a in e && "enabled" in i
            ? (!0 === e[a] && (e[a] = { enabled: !0 }),
              "object" != typeof e[a] ||
                "enabled" in e[a] ||
                (e[a].enabled = !0),
              e[a] || (e[a] = { enabled: !1 }),
              _(t, s))
            : _(t, s))
        : _(t, s);
    };
  }
  const oe = {
      eventsEmitter: N,
      update: j,
      translate: V,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode || s.$wrapperEl.transition(e),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e = !0, t) {
          const s = this,
            { params: a } = s;
          a.cssMode ||
            (a.autoHeight && s.updateAutoHeight(),
            F({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e = !0, t) {
          const s = this,
            { params: a } = s;
          (s.animating = !1),
            a.cssMode ||
              (s.setTransition(0),
              F({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: W,
      loop: R,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            t.support.touch ||
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (s.style.cursor = "move"),
            (s.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
            (s.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
            (s.style.cursor = e ? "grabbing" : "grab");
        },
        unsetGrabCursor: function () {
          const e = this;
          e.support.touch ||
            (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = "");
        },
      },
      events: se,
      breakpoints: ie,
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: a } = s;
          if (a) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: ne,
      images: {
        loadImage: function (e, t, s, a, i, n) {
          const l = w();
          let r;
          function o() {
            n && n();
          }
          L(e).parent("picture")[0] || (e.complete && i)
            ? o()
            : t
            ? ((r = new l.Image()),
              (r.onload = o),
              (r.onerror = o),
              a && (r.sizes = a),
              s && (r.srcset = s),
              t && (r.src = t))
            : o();
        },
        preloadImages: function () {
          const e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (let s = 0; s < e.imagesToLoad.length; s += 1) {
            const a = e.imagesToLoad[s];
            e.loadImage(
              a,
              a.currentSrc || a.getAttribute("src"),
              a.srcset || a.getAttribute("srcset"),
              a.sizes || a.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      },
    },
    ce = {};
  class de {
    constructor(...e) {
      let t, s;
      if (
        (1 === e.length &&
        e[0].constructor &&
        "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
          ? (s = e[0])
          : ([t, s] = e),
        s || (s = {}),
        (s = _({}, s)),
        t && !s.el && (s.el = t),
        s.el && L(s.el).length > 1)
      ) {
        const e = [];
        return (
          L(s.el).each((t) => {
            const a = _({}, s, { el: t });
            e.push(new de(a));
          }),
          e
        );
      }
      const a = this;
      (a.__swiper__ = !0),
        (a.support = B()),
        (a.device = H({ userAgent: s.userAgent })),
        (a.browser = G()),
        (a.eventsListeners = {}),
        (a.eventsAnyListeners = []),
        (a.modules = [...a.__modules__]),
        s.modules && Array.isArray(s.modules) && a.modules.push(...s.modules);
      const i = {};
      a.modules.forEach((e) => {
        e({
          swiper: a,
          extendParams: re(s, i),
          on: a.on.bind(a),
          once: a.once.bind(a),
          off: a.off.bind(a),
          emit: a.emit.bind(a),
        });
      });
      const n = _({}, le, i);
      return (
        (a.params = _({}, n, ce, s)),
        (a.originalParams = _({}, a.params)),
        (a.passedParams = _({}, s)),
        a.params &&
          a.params.on &&
          Object.keys(a.params.on).forEach((e) => {
            a.on(e, a.params.on[e]);
          }),
        a.params && a.params.onAny && a.onAny(a.params.onAny),
        (a.$ = L),
        Object.assign(a, {
          enabled: a.params.enabled,
          el: t,
          classNames: [],
          slides: L(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === a.params.direction,
          isVertical: () => "vertical" === a.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: a.params.allowSlideNext,
          allowSlidePrev: a.params.allowSlidePrev,
          touchEvents: (function () {
            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
              t = ["pointerdown", "pointermove", "pointerup"];
            return (
              (a.touchEventsTouch = {
                start: e[0],
                move: e[1],
                end: e[2],
                cancel: e[3],
              }),
              (a.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
              a.support.touch || !a.params.simulateTouch
                ? a.touchEventsTouch
                : a.touchEventsDesktop
            );
          })(),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: a.params.focusableElements,
            lastClickTime: O(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0,
          },
          allowClick: !0,
          allowTouchMove: a.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        a.emit("_swiper"),
        a.params.init && a.init(),
        a
      );
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const a = s.minTranslate(),
        i = (s.maxTranslate() - a) * e + a;
      s.translateTo(i, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return e.className
        .split(" ")
        .filter(
          (e) =>
            0 === e.indexOf("swiper-slide") ||
            0 === e.indexOf(t.params.slideClass)
        )
        .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((s) => {
        const a = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: a }), e.emit("_slideClass", s, a);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e = "current", t = !1) {
      const {
        params: s,
        slides: a,
        slidesGrid: i,
        slidesSizesGrid: n,
        size: l,
        activeIndex: r,
      } = this;
      let o = 1;
      if (s.centeredSlides) {
        let e,
          t = a[r].swiperSlideSize;
        for (let s = r + 1; s < a.length; s += 1)
          a[s] &&
            !e &&
            ((t += a[s].swiperSlideSize), (o += 1), t > l && (e = !0));
        for (let s = r - 1; s >= 0; s -= 1)
          a[s] &&
            !e &&
            ((t += a[s].swiperSlideSize), (o += 1), t > l && (e = !0));
      } else if ("current" === e)
        for (let e = r + 1; e < a.length; e += 1) {
          (t ? i[e] + n[e] - i[r] < l : i[e] - i[r] < l) && (o += 1);
        }
      else
        for (let e = r - 1; e >= 0; e -= 1) {
          i[r] - i[e] < l && (o += 1);
        }
      return o;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function a() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let i;
      s.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (a(), e.params.autoHeight && e.updateAutoHeight())
          : ((i =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            i || a()),
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t = !0) {
      const s = this,
        a = s.params.direction;
      return (
        e || (e = "horizontal" === a ? "vertical" : "horizontal"),
        e === a ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.$el
            .removeClass(`${s.params.containerModifierClass}${a}`)
            .addClass(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.each((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const s = L(e || t.params.el);
      if (!(e = s[0])) return !1;
      e.swiper = t;
      const a = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let i = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = L(e.shadowRoot.querySelector(a()));
          return (t.children = (e) => s.children(e)), t;
        }
        return s.children(a());
      })();
      if (0 === i.length && t.params.createElements) {
        const e = v().createElement("div");
        (i = L(e)),
          (e.className = t.params.wrapperClass),
          s.append(e),
          s.children(`.${t.params.slideClass}`).each((e) => {
            i.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: s,
          el: e,
          $wrapperEl: i,
          wrapperEl: i[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
          wrongRTL: "-webkit-box" === i.css("display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.params.loop && t.loopCreate(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.preloadImages && t.preloadImages(),
          t.params.loop
            ? t.slideTo(
                t.params.initialSlide + t.loopedSlides,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.attachEvents(),
          (t.initialized = !0),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e = !0, t = !0) {
      const s = this,
        { params: a, $el: i, $wrapperEl: n, slides: l } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          a.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            i.removeAttr("style"),
            n.removeAttr("style"),
            l &&
              l.length &&
              l
                .removeClass(
                  [
                    a.slideVisibleClass,
                    a.slideActiveClass,
                    a.slideNextClass,
                    a.slidePrevClass,
                  ].join(" ")
                )
                .removeAttr("style")
                .removeAttr("data-swiper-slide-index")),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.$el[0].swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      _(ce, e);
    }
    static get extendedDefaults() {
      return ce;
    }
    static get defaults() {
      return le;
    }
    static installModule(e) {
      de.prototype.__modules__ || (de.prototype.__modules__ = []);
      const t = de.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => de.installModule(e)), de)
        : (de.installModule(e), de);
    }
  }
  Object.keys(oe).forEach((e) => {
    Object.keys(oe[e]).forEach((t) => {
      de.prototype[t] = oe[e][t];
    });
  }),
    de.use([
      function ({ swiper: e, on: t, emit: s }) {
        const a = w();
        let i = null;
        const n = () => {
            e &&
              !e.destroyed &&
              e.initialized &&
              (s("beforeResize"), s("resize"));
          },
          l = () => {
            e && !e.destroyed && e.initialized && s("orientationchange");
          };
        t("init", () => {
          e.params.resizeObserver && void 0 !== a.ResizeObserver
            ? e &&
              !e.destroyed &&
              e.initialized &&
              ((i = new ResizeObserver((t) => {
                const { width: s, height: a } = e;
                let i = s,
                  l = a;
                t.forEach(
                  ({ contentBoxSize: t, contentRect: s, target: a }) => {
                    (a && a !== e.el) ||
                      ((i = s ? s.width : (t[0] || t).inlineSize),
                      (l = s ? s.height : (t[0] || t).blockSize));
                  }
                ),
                  (i === s && l === a) || n();
              })),
              i.observe(e.el))
            : (a.addEventListener("resize", n),
              a.addEventListener("orientationchange", l));
        }),
          t("destroy", () => {
            i && i.unobserve && e.el && (i.unobserve(e.el), (i = null)),
              a.removeEventListener("resize", n),
              a.removeEventListener("orientationchange", l);
          });
      },
      function ({ swiper: e, extendParams: t, on: s, emit: a }) {
        const i = [],
          n = w(),
          l = (e, t = {}) => {
            const s = new (n.MutationObserver || n.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void a("observerUpdate", e[0]);
                const t = function () {
                  a("observerUpdate", e[0]);
                };
                n.requestAnimationFrame
                  ? n.requestAnimationFrame(t)
                  : n.setTimeout(t, 0);
              }
            );
            s.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              i.push(s);
          };
        t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          s("init", () => {
            if (e.params.observer) {
              if (e.params.observeParents) {
                const t = e.$el.parents();
                for (let e = 0; e < t.length; e += 1) l(t[e]);
              }
              l(e.$el[0], { childList: e.params.observeSlideChildren }),
                l(e.$wrapperEl[0], { attributes: !1 });
            }
          }),
          s("destroy", () => {
            i.forEach((e) => {
              e.disconnect();
            }),
              i.splice(0, i.length);
          });
      },
    ]);
  const pe = de;
  function ue({ swiper: e, extendParams: t, on: s, emit: a }) {
    const i = w();
    let n;
    t({
      mousewheel: {
        enabled: !1,
        releaseOnEdges: !1,
        invert: !1,
        forceToAxis: !1,
        sensitivity: 1,
        eventsTarget: "container",
        thresholdDelta: null,
        thresholdTime: null,
      },
    }),
      (e.mousewheel = { enabled: !1 });
    let l,
      r = O();
    const o = [];
    function c() {
      e.enabled && (e.mouseEntered = !0);
    }
    function d() {
      e.enabled && (e.mouseEntered = !1);
    }
    function p(t) {
      return (
        !(
          e.params.mousewheel.thresholdDelta &&
          t.delta < e.params.mousewheel.thresholdDelta
        ) &&
        !(
          e.params.mousewheel.thresholdTime &&
          O() - r < e.params.mousewheel.thresholdTime
        ) &&
        ((t.delta >= 6 && O() - r < 60) ||
          (t.direction < 0
            ? (e.isEnd && !e.params.loop) ||
              e.animating ||
              (e.slideNext(), a("scroll", t.raw))
            : (e.isBeginning && !e.params.loop) ||
              e.animating ||
              (e.slidePrev(), a("scroll", t.raw)),
          (r = new i.Date().getTime()),
          !1))
      );
    }
    function u(t) {
      let s = t,
        i = !0;
      if (!e.enabled) return;
      const r = e.params.mousewheel;
      e.params.cssMode && s.preventDefault();
      let c = e.$el;
      if (
        ("container" !== e.params.mousewheel.eventsTarget &&
          (c = L(e.params.mousewheel.eventsTarget)),
        !e.mouseEntered && !c[0].contains(s.target) && !r.releaseOnEdges)
      )
        return !0;
      s.originalEvent && (s = s.originalEvent);
      let d = 0;
      const u = e.rtlTranslate ? -1 : 1,
        h = (function (e) {
          let t = 0,
            s = 0,
            a = 0,
            i = 0;
          return (
            "detail" in e && (s = e.detail),
            "wheelDelta" in e && (s = -e.wheelDelta / 120),
            "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120),
            "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
            "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = s), (s = 0)),
            (a = 10 * t),
            (i = 10 * s),
            "deltaY" in e && (i = e.deltaY),
            "deltaX" in e && (a = e.deltaX),
            e.shiftKey && !a && ((a = i), (i = 0)),
            (a || i) &&
              e.deltaMode &&
              (1 === e.deltaMode
                ? ((a *= 40), (i *= 40))
                : ((a *= 800), (i *= 800))),
            a && !t && (t = a < 1 ? -1 : 1),
            i && !s && (s = i < 1 ? -1 : 1),
            { spinX: t, spinY: s, pixelX: a, pixelY: i }
          );
        })(s);
      if (r.forceToAxis)
        if (e.isHorizontal()) {
          if (!(Math.abs(h.pixelX) > Math.abs(h.pixelY))) return !0;
          d = -h.pixelX * u;
        } else {
          if (!(Math.abs(h.pixelY) > Math.abs(h.pixelX))) return !0;
          d = -h.pixelY;
        }
      else
        d = Math.abs(h.pixelX) > Math.abs(h.pixelY) ? -h.pixelX * u : -h.pixelY;
      if (0 === d) return !0;
      r.invert && (d = -d);
      let m = e.getTranslate() + d * r.sensitivity;
      if (
        (m >= e.minTranslate() && (m = e.minTranslate()),
        m <= e.maxTranslate() && (m = e.maxTranslate()),
        (i =
          !!e.params.loop ||
          !(m === e.minTranslate() || m === e.maxTranslate())),
        i && e.params.nested && s.stopPropagation(),
        e.params.freeMode && e.params.freeMode.enabled)
      ) {
        const t = { time: O(), delta: Math.abs(d), direction: Math.sign(d) },
          i =
            l &&
            t.time < l.time + 500 &&
            t.delta <= l.delta &&
            t.direction === l.direction;
        if (!i) {
          (l = void 0), e.params.loop && e.loopFix();
          let c = e.getTranslate() + d * r.sensitivity;
          const p = e.isBeginning,
            u = e.isEnd;
          if (
            (c >= e.minTranslate() && (c = e.minTranslate()),
            c <= e.maxTranslate() && (c = e.maxTranslate()),
            e.setTransition(0),
            e.setTranslate(c),
            e.updateProgress(),
            e.updateActiveIndex(),
            e.updateSlidesClasses(),
            ((!p && e.isBeginning) || (!u && e.isEnd)) &&
              e.updateSlidesClasses(),
            e.params.freeMode.sticky)
          ) {
            clearTimeout(n), (n = void 0), o.length >= 15 && o.shift();
            const s = o.length ? o[o.length - 1] : void 0,
              a = o[0];
            if (
              (o.push(t),
              s && (t.delta > s.delta || t.direction !== s.direction))
            )
              o.splice(0);
            else if (
              o.length >= 15 &&
              t.time - a.time < 500 &&
              a.delta - t.delta >= 1 &&
              t.delta <= 6
            ) {
              const s = d > 0 ? 0.8 : 0.2;
              (l = t),
                o.splice(0),
                (n = A(() => {
                  e.slideToClosest(e.params.speed, !0, void 0, s);
                }, 0));
            }
            n ||
              (n = A(() => {
                (l = t),
                  o.splice(0),
                  e.slideToClosest(e.params.speed, !0, void 0, 0.5);
              }, 500));
          }
          if (
            (i || a("scroll", s),
            e.params.autoplay &&
              e.params.autoplayDisableOnInteraction &&
              e.autoplay.stop(),
            c === e.minTranslate() || c === e.maxTranslate())
          )
            return !0;
        }
      } else {
        const s = {
          time: O(),
          delta: Math.abs(d),
          direction: Math.sign(d),
          raw: t,
        };
        o.length >= 2 && o.shift();
        const a = o.length ? o[o.length - 1] : void 0;
        if (
          (o.push(s),
          a
            ? (s.direction !== a.direction ||
                s.delta > a.delta ||
                s.time > a.time + 150) &&
              p(s)
            : p(s),
          (function (t) {
            const s = e.params.mousewheel;
            if (t.direction < 0) {
              if (e.isEnd && !e.params.loop && s.releaseOnEdges) return !0;
            } else if (e.isBeginning && !e.params.loop && s.releaseOnEdges)
              return !0;
            return !1;
          })(s))
        )
          return !0;
      }
      return s.preventDefault ? s.preventDefault() : (s.returnValue = !1), !1;
    }
    function h(t) {
      let s = e.$el;
      "container" !== e.params.mousewheel.eventsTarget &&
        (s = L(e.params.mousewheel.eventsTarget)),
        s[t]("mouseenter", c),
        s[t]("mouseleave", d),
        s[t]("wheel", u);
    }
    function m() {
      return e.params.cssMode
        ? (e.wrapperEl.removeEventListener("wheel", u), !0)
        : !e.mousewheel.enabled && (h("on"), (e.mousewheel.enabled = !0), !0);
    }
    function f() {
      return e.params.cssMode
        ? (e.wrapperEl.addEventListener(event, u), !0)
        : !!e.mousewheel.enabled && (h("off"), (e.mousewheel.enabled = !1), !0);
    }
    s("init", () => {
      !e.params.mousewheel.enabled && e.params.cssMode && f(),
        e.params.mousewheel.enabled && m();
    }),
      s("destroy", () => {
        e.params.cssMode && m(), e.mousewheel.enabled && f();
      }),
      Object.assign(e.mousewheel, { enable: m, disable: f });
  }
  function he(e, t, s, a) {
    const i = v();
    return (
      e.params.createElements &&
        Object.keys(a).forEach((n) => {
          if (!s[n] && !0 === s.auto) {
            let l = e.$el.children(`.${a[n]}`)[0];
            l ||
              ((l = i.createElement("div")),
              (l.className = a[n]),
              e.$el.append(l)),
              (s[n] = l),
              (t[n] = l);
          }
        }),
      s
    );
  }
  function me({ swiper: e, extendParams: t, on: s, emit: a }) {
    function i(t) {
      let s;
      return (
        t &&
          ((s = L(t)),
          e.params.uniqueNavElements &&
            "string" == typeof t &&
            s.length > 1 &&
            1 === e.$el.find(t).length &&
            (s = e.$el.find(t))),
        s
      );
    }
    function n(t, s) {
      const a = e.params.navigation;
      t &&
        t.length > 0 &&
        (t[s ? "addClass" : "removeClass"](a.disabledClass),
        t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = s),
        e.params.watchOverflow &&
          e.enabled &&
          t[e.isLocked ? "addClass" : "removeClass"](a.lockClass));
    }
    function l() {
      if (e.params.loop) return;
      const { $nextEl: t, $prevEl: s } = e.navigation;
      n(s, e.isBeginning && !e.params.rewind),
        n(t, e.isEnd && !e.params.rewind);
    }
    function r(t) {
      t.preventDefault(),
        (!e.isBeginning || e.params.loop || e.params.rewind) && e.slidePrev();
    }
    function o(t) {
      t.preventDefault(),
        (!e.isEnd || e.params.loop || e.params.rewind) && e.slideNext();
    }
    function c() {
      const t = e.params.navigation;
      if (
        ((e.params.navigation = he(
          e,
          e.originalParams.navigation,
          e.params.navigation,
          { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
        )),
        !t.nextEl && !t.prevEl)
      )
        return;
      const s = i(t.nextEl),
        a = i(t.prevEl);
      s && s.length > 0 && s.on("click", o),
        a && a.length > 0 && a.on("click", r),
        Object.assign(e.navigation, {
          $nextEl: s,
          nextEl: s && s[0],
          $prevEl: a,
          prevEl: a && a[0],
        }),
        e.enabled ||
          (s && s.addClass(t.lockClass), a && a.addClass(t.lockClass));
    }
    function d() {
      const { $nextEl: t, $prevEl: s } = e.navigation;
      t &&
        t.length &&
        (t.off("click", o), t.removeClass(e.params.navigation.disabledClass)),
        s &&
          s.length &&
          (s.off("click", r), s.removeClass(e.params.navigation.disabledClass));
    }
    t({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
      },
    }),
      (e.navigation = {
        nextEl: null,
        $nextEl: null,
        prevEl: null,
        $prevEl: null,
      }),
      s("init", () => {
        c(), l();
      }),
      s("toEdge fromEdge lock unlock", () => {
        l();
      }),
      s("destroy", () => {
        d();
      }),
      s("enable disable", () => {
        const { $nextEl: t, $prevEl: s } = e.navigation;
        t &&
          t[e.enabled ? "removeClass" : "addClass"](
            e.params.navigation.lockClass
          ),
          s &&
            s[e.enabled ? "removeClass" : "addClass"](
              e.params.navigation.lockClass
            );
      }),
      s("click", (t, s) => {
        const { $nextEl: i, $prevEl: n } = e.navigation,
          l = s.target;
        if (e.params.navigation.hideOnClick && !L(l).is(n) && !L(l).is(i)) {
          if (
            e.pagination &&
            e.params.pagination &&
            e.params.pagination.clickable &&
            (e.pagination.el === l || e.pagination.el.contains(l))
          )
            return;
          let t;
          i
            ? (t = i.hasClass(e.params.navigation.hiddenClass))
            : n && (t = n.hasClass(e.params.navigation.hiddenClass)),
            a(!0 === t ? "navigationShow" : "navigationHide"),
            i && i.toggleClass(e.params.navigation.hiddenClass),
            n && n.toggleClass(e.params.navigation.hiddenClass);
        }
      }),
      Object.assign(e.navigation, { update: l, init: c, destroy: d });
  }
  function fe(e = "") {
    return `.${e
      .trim()
      .replace(/([\.:!\/])/g, "\\$1")
      .replace(/ /g, ".")}`;
  }
  function ge({ swiper: e, extendParams: t, on: s, emit: a }) {
    const i = "swiper-pagination";
    let n;
    t({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${i}-bullet`,
        bulletActiveClass: `${i}-bullet-active`,
        modifierClass: `${i}-`,
        currentClass: `${i}-current`,
        totalClass: `${i}-total`,
        hiddenClass: `${i}-hidden`,
        progressbarFillClass: `${i}-progressbar-fill`,
        progressbarOppositeClass: `${i}-progressbar-opposite`,
        clickableClass: `${i}-clickable`,
        lockClass: `${i}-lock`,
        horizontalClass: `${i}-horizontal`,
        verticalClass: `${i}-vertical`,
      },
    }),
      (e.pagination = { el: null, $el: null, bullets: [] });
    let l = 0;
    function r() {
      return (
        !e.params.pagination.el ||
        !e.pagination.el ||
        !e.pagination.$el ||
        0 === e.pagination.$el.length
      );
    }
    function o(t, s) {
      const { bulletActiveClass: a } = e.params.pagination;
      t[s]().addClass(`${a}-${s}`)[s]().addClass(`${a}-${s}-${s}`);
    }
    function c() {
      const t = e.rtl,
        s = e.params.pagination;
      if (r()) return;
      const i =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : e.slides.length,
        c = e.pagination.$el;
      let d;
      const p = e.params.loop
        ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup)
        : e.snapGrid.length;
      if (
        (e.params.loop
          ? ((d = Math.ceil(
              (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
            )),
            d > i - 1 - 2 * e.loopedSlides && (d -= i - 2 * e.loopedSlides),
            d > p - 1 && (d -= p),
            d < 0 && "bullets" !== e.params.paginationType && (d = p + d))
          : (d = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
        "bullets" === s.type &&
          e.pagination.bullets &&
          e.pagination.bullets.length > 0)
      ) {
        const a = e.pagination.bullets;
        let i, r, p;
        if (
          (s.dynamicBullets &&
            ((n = a.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
            c.css(
              e.isHorizontal() ? "width" : "height",
              n * (s.dynamicMainBullets + 4) + "px"
            ),
            s.dynamicMainBullets > 1 &&
              void 0 !== e.previousIndex &&
              ((l += d - (e.previousIndex - e.loopedSlides || 0)),
              l > s.dynamicMainBullets - 1
                ? (l = s.dynamicMainBullets - 1)
                : l < 0 && (l = 0)),
            (i = Math.max(d - l, 0)),
            (r = i + (Math.min(a.length, s.dynamicMainBullets) - 1)),
            (p = (r + i) / 2)),
          a.removeClass(
            ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
              .map((e) => `${s.bulletActiveClass}${e}`)
              .join(" ")
          ),
          c.length > 1)
        )
          a.each((e) => {
            const t = L(e),
              a = t.index();
            a === d && t.addClass(s.bulletActiveClass),
              s.dynamicBullets &&
                (a >= i && a <= r && t.addClass(`${s.bulletActiveClass}-main`),
                a === i && o(t, "prev"),
                a === r && o(t, "next"));
          });
        else {
          const t = a.eq(d),
            n = t.index();
          if ((t.addClass(s.bulletActiveClass), s.dynamicBullets)) {
            const t = a.eq(i),
              l = a.eq(r);
            for (let e = i; e <= r; e += 1)
              a.eq(e).addClass(`${s.bulletActiveClass}-main`);
            if (e.params.loop)
              if (n >= a.length) {
                for (let e = s.dynamicMainBullets; e >= 0; e -= 1)
                  a.eq(a.length - e).addClass(`${s.bulletActiveClass}-main`);
                a.eq(a.length - s.dynamicMainBullets - 1).addClass(
                  `${s.bulletActiveClass}-prev`
                );
              } else o(t, "prev"), o(l, "next");
            else o(t, "prev"), o(l, "next");
          }
        }
        if (s.dynamicBullets) {
          const i = Math.min(a.length, s.dynamicMainBullets + 4),
            l = (n * i - n) / 2 - p * n,
            r = t ? "right" : "left";
          a.css(e.isHorizontal() ? r : "top", `${l}px`);
        }
      }
      if (
        ("fraction" === s.type &&
          (c.find(fe(s.currentClass)).text(s.formatFractionCurrent(d + 1)),
          c.find(fe(s.totalClass)).text(s.formatFractionTotal(p))),
        "progressbar" === s.type)
      ) {
        let t;
        t = s.progressbarOpposite
          ? e.isHorizontal()
            ? "vertical"
            : "horizontal"
          : e.isHorizontal()
          ? "horizontal"
          : "vertical";
        const a = (d + 1) / p;
        let i = 1,
          n = 1;
        "horizontal" === t ? (i = a) : (n = a),
          c
            .find(fe(s.progressbarFillClass))
            .transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${n})`)
            .transition(e.params.speed);
      }
      "custom" === s.type && s.renderCustom
        ? (c.html(s.renderCustom(e, d + 1, p)), a("paginationRender", c[0]))
        : a("paginationUpdate", c[0]),
        e.params.watchOverflow &&
          e.enabled &&
          c[e.isLocked ? "addClass" : "removeClass"](s.lockClass);
    }
    function d() {
      const t = e.params.pagination;
      if (r()) return;
      const s =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : e.slides.length,
        i = e.pagination.$el;
      let n = "";
      if ("bullets" === t.type) {
        let a = e.params.loop
          ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup)
          : e.snapGrid.length;
        e.params.freeMode &&
          e.params.freeMode.enabled &&
          !e.params.loop &&
          a > s &&
          (a = s);
        for (let s = 0; s < a; s += 1)
          t.renderBullet
            ? (n += t.renderBullet.call(e, s, t.bulletClass))
            : (n += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
        i.html(n), (e.pagination.bullets = i.find(fe(t.bulletClass)));
      }
      "fraction" === t.type &&
        ((n = t.renderFraction
          ? t.renderFraction.call(e, t.currentClass, t.totalClass)
          : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
        i.html(n)),
        "progressbar" === t.type &&
          ((n = t.renderProgressbar
            ? t.renderProgressbar.call(e, t.progressbarFillClass)
            : `<span class="${t.progressbarFillClass}"></span>`),
          i.html(n)),
        "custom" !== t.type && a("paginationRender", e.pagination.$el[0]);
    }
    function p() {
      e.params.pagination = he(
        e,
        e.originalParams.pagination,
        e.params.pagination,
        { el: "swiper-pagination" }
      );
      const t = e.params.pagination;
      if (!t.el) return;
      let s = L(t.el);
      0 !== s.length &&
        (e.params.uniqueNavElements &&
          "string" == typeof t.el &&
          s.length > 1 &&
          ((s = e.$el.find(t.el)),
          s.length > 1 &&
            (s = s.filter((t) => L(t).parents(".swiper")[0] === e.el))),
        "bullets" === t.type && t.clickable && s.addClass(t.clickableClass),
        s.addClass(t.modifierClass + t.type),
        s.addClass(t.modifierClass + e.params.direction),
        "bullets" === t.type &&
          t.dynamicBullets &&
          (s.addClass(`${t.modifierClass}${t.type}-dynamic`),
          (l = 0),
          t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
        "progressbar" === t.type &&
          t.progressbarOpposite &&
          s.addClass(t.progressbarOppositeClass),
        t.clickable &&
          s.on("click", fe(t.bulletClass), function (t) {
            t.preventDefault();
            let s = L(this).index() * e.params.slidesPerGroup;
            e.params.loop && (s += e.loopedSlides), e.slideTo(s);
          }),
        Object.assign(e.pagination, { $el: s, el: s[0] }),
        e.enabled || s.addClass(t.lockClass));
    }
    function u() {
      const t = e.params.pagination;
      if (r()) return;
      const s = e.pagination.$el;
      s.removeClass(t.hiddenClass),
        s.removeClass(t.modifierClass + t.type),
        s.removeClass(t.modifierClass + e.params.direction),
        e.pagination.bullets &&
          e.pagination.bullets.removeClass &&
          e.pagination.bullets.removeClass(t.bulletActiveClass),
        t.clickable && s.off("click", fe(t.bulletClass));
    }
    s("init", () => {
      p(), d(), c();
    }),
      s("activeIndexChange", () => {
        (e.params.loop || void 0 === e.snapIndex) && c();
      }),
      s("snapIndexChange", () => {
        e.params.loop || c();
      }),
      s("slidesLengthChange", () => {
        e.params.loop && (d(), c());
      }),
      s("snapGridLengthChange", () => {
        e.params.loop || (d(), c());
      }),
      s("destroy", () => {
        u();
      }),
      s("enable disable", () => {
        const { $el: t } = e.pagination;
        t &&
          t[e.enabled ? "removeClass" : "addClass"](
            e.params.pagination.lockClass
          );
      }),
      s("lock unlock", () => {
        c();
      }),
      s("click", (t, s) => {
        const i = s.target,
          { $el: n } = e.pagination;
        if (
          e.params.pagination.el &&
          e.params.pagination.hideOnClick &&
          n.length > 0 &&
          !L(i).hasClass(e.params.pagination.bulletClass)
        ) {
          if (
            e.navigation &&
            ((e.navigation.nextEl && i === e.navigation.nextEl) ||
              (e.navigation.prevEl && i === e.navigation.prevEl))
          )
            return;
          const t = n.hasClass(e.params.pagination.hiddenClass);
          a(!0 === t ? "paginationShow" : "paginationHide"),
            n.toggleClass(e.params.pagination.hiddenClass);
        }
      }),
      Object.assign(e.pagination, {
        render: d,
        update: c,
        init: p,
        destroy: u,
      });
  }
  function ve({ swiper: e, extendParams: t, on: s, emit: a }) {
    const i = v();
    let n,
      l,
      r,
      o,
      c = !1,
      d = null,
      p = null;
    function u() {
      if (!e.params.scrollbar.el || !e.scrollbar.el) return;
      const { scrollbar: t, rtlTranslate: s, progress: a } = e,
        { $dragEl: i, $el: n } = t,
        o = e.params.scrollbar;
      let c = l,
        p = (r - l) * a;
      s
        ? ((p = -p), p > 0 ? ((c = l - p), (p = 0)) : -p + l > r && (c = r + p))
        : p < 0
        ? ((c = l + p), (p = 0))
        : p + l > r && (c = r - p),
        e.isHorizontal()
          ? (i.transform(`translate3d(${p}px, 0, 0)`),
            (i[0].style.width = `${c}px`))
          : (i.transform(`translate3d(0px, ${p}px, 0)`),
            (i[0].style.height = `${c}px`)),
        o.hide &&
          (clearTimeout(d),
          (n[0].style.opacity = 1),
          (d = setTimeout(() => {
            (n[0].style.opacity = 0), n.transition(400);
          }, 1e3)));
    }
    function h() {
      if (!e.params.scrollbar.el || !e.scrollbar.el) return;
      const { scrollbar: t } = e,
        { $dragEl: s, $el: a } = t;
      (s[0].style.width = ""),
        (s[0].style.height = ""),
        (r = e.isHorizontal() ? a[0].offsetWidth : a[0].offsetHeight),
        (o =
          e.size /
          (e.virtualSize +
            e.params.slidesOffsetBefore -
            (e.params.centeredSlides ? e.snapGrid[0] : 0))),
        (l =
          "auto" === e.params.scrollbar.dragSize
            ? r * o
            : parseInt(e.params.scrollbar.dragSize, 10)),
        e.isHorizontal()
          ? (s[0].style.width = `${l}px`)
          : (s[0].style.height = `${l}px`),
        (a[0].style.display = o >= 1 ? "none" : ""),
        e.params.scrollbar.hide && (a[0].style.opacity = 0),
        e.params.watchOverflow &&
          e.enabled &&
          t.$el[e.isLocked ? "addClass" : "removeClass"](
            e.params.scrollbar.lockClass
          );
    }
    function m(t) {
      return e.isHorizontal()
        ? "touchstart" === t.type || "touchmove" === t.type
          ? t.targetTouches[0].clientX
          : t.clientX
        : "touchstart" === t.type || "touchmove" === t.type
        ? t.targetTouches[0].clientY
        : t.clientY;
    }
    function f(t) {
      const { scrollbar: s, rtlTranslate: a } = e,
        { $el: i } = s;
      let o;
      (o =
        (m(t) -
          i.offset()[e.isHorizontal() ? "left" : "top"] -
          (null !== n ? n : l / 2)) /
        (r - l)),
        (o = Math.max(Math.min(o, 1), 0)),
        a && (o = 1 - o);
      const c = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * o;
      e.updateProgress(c),
        e.setTranslate(c),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
    }
    function g(t) {
      const s = e.params.scrollbar,
        { scrollbar: i, $wrapperEl: l } = e,
        { $el: r, $dragEl: o } = i;
      (c = !0),
        (n =
          t.target === o[0] || t.target === o
            ? m(t) -
              t.target.getBoundingClientRect()[
                e.isHorizontal() ? "left" : "top"
              ]
            : null),
        t.preventDefault(),
        t.stopPropagation(),
        l.transition(100),
        o.transition(100),
        f(t),
        clearTimeout(p),
        r.transition(0),
        s.hide && r.css("opacity", 1),
        e.params.cssMode && e.$wrapperEl.css("scroll-snap-type", "none"),
        a("scrollbarDragStart", t);
    }
    function b(t) {
      const { scrollbar: s, $wrapperEl: i } = e,
        { $el: n, $dragEl: l } = s;
      c &&
        (t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
        f(t),
        i.transition(0),
        n.transition(0),
        l.transition(0),
        a("scrollbarDragMove", t));
    }
    function w(t) {
      const s = e.params.scrollbar,
        { scrollbar: i, $wrapperEl: n } = e,
        { $el: l } = i;
      c &&
        ((c = !1),
        e.params.cssMode &&
          (e.$wrapperEl.css("scroll-snap-type", ""), n.transition("")),
        s.hide &&
          (clearTimeout(p),
          (p = A(() => {
            l.css("opacity", 0), l.transition(400);
          }, 1e3))),
        a("scrollbarDragEnd", t),
        s.snapOnRelease && e.slideToClosest());
    }
    function y(t) {
      const {
          scrollbar: s,
          touchEventsTouch: a,
          touchEventsDesktop: n,
          params: l,
          support: r,
        } = e,
        o = s.$el[0],
        c = !(!r.passiveListener || !l.passiveListeners) && {
          passive: !1,
          capture: !1,
        },
        d = !(!r.passiveListener || !l.passiveListeners) && {
          passive: !0,
          capture: !1,
        };
      if (!o) return;
      const p = "on" === t ? "addEventListener" : "removeEventListener";
      r.touch
        ? (o[p](a.start, g, c), o[p](a.move, b, c), o[p](a.end, w, d))
        : (o[p](n.start, g, c), i[p](n.move, b, c), i[p](n.end, w, d));
    }
    function S() {
      const { scrollbar: t, $el: s } = e;
      e.params.scrollbar = he(
        e,
        e.originalParams.scrollbar,
        e.params.scrollbar,
        { el: "swiper-scrollbar" }
      );
      const a = e.params.scrollbar;
      if (!a.el) return;
      let i = L(a.el);
      e.params.uniqueNavElements &&
        "string" == typeof a.el &&
        i.length > 1 &&
        1 === s.find(a.el).length &&
        (i = s.find(a.el));
      let n = i.find(`.${e.params.scrollbar.dragClass}`);
      0 === n.length &&
        ((n = L(`<div class="${e.params.scrollbar.dragClass}"></div>`)),
        i.append(n)),
        Object.assign(t, { $el: i, el: i[0], $dragEl: n, dragEl: n[0] }),
        a.draggable && e.params.scrollbar.el && y("on"),
        i &&
          i[e.enabled ? "removeClass" : "addClass"](
            e.params.scrollbar.lockClass
          );
    }
    function C() {
      e.params.scrollbar.el && y("off");
    }
    t({
      scrollbar: {
        el: null,
        dragSize: "auto",
        hide: !1,
        draggable: !1,
        snapOnRelease: !0,
        lockClass: "swiper-scrollbar-lock",
        dragClass: "swiper-scrollbar-drag",
      },
    }),
      (e.scrollbar = { el: null, dragEl: null, $el: null, $dragEl: null }),
      s("init", () => {
        S(), h(), u();
      }),
      s("update resize observerUpdate lock unlock", () => {
        h();
      }),
      s("setTranslate", () => {
        u();
      }),
      s("setTransition", (t, s) => {
        !(function (t) {
          e.params.scrollbar.el &&
            e.scrollbar.el &&
            e.scrollbar.$dragEl.transition(t);
        })(s);
      }),
      s("enable disable", () => {
        const { $el: t } = e.scrollbar;
        t &&
          t[e.enabled ? "removeClass" : "addClass"](
            e.params.scrollbar.lockClass
          );
      }),
      s("destroy", () => {
        C();
      }),
      Object.assign(e.scrollbar, {
        updateSize: h,
        setTranslate: u,
        init: S,
        destroy: C,
      });
  }
  function be({ swiper: e, extendParams: t, on: s, emit: a }) {
    t({
      lazy: {
        checkInView: !1,
        enabled: !1,
        loadPrevNext: !1,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: !1,
        scrollingElement: "",
        elementClass: "swiper-lazy",
        loadingClass: "swiper-lazy-loading",
        loadedClass: "swiper-lazy-loaded",
        preloaderClass: "swiper-lazy-preloader",
      },
    }),
      (e.lazy = {});
    let i = !1,
      n = !1;
    function l(t, s = !0) {
      const i = e.params.lazy;
      if (void 0 === t) return;
      if (0 === e.slides.length) return;
      const n =
          e.virtual && e.params.virtual.enabled
            ? e.$wrapperEl.children(
                `.${e.params.slideClass}[data-swiper-slide-index="${t}"]`
              )
            : e.slides.eq(t),
        r = n.find(
          `.${i.elementClass}:not(.${i.loadedClass}):not(.${i.loadingClass})`
        );
      !n.hasClass(i.elementClass) ||
        n.hasClass(i.loadedClass) ||
        n.hasClass(i.loadingClass) ||
        r.push(n[0]),
        0 !== r.length &&
          r.each((t) => {
            const r = L(t);
            r.addClass(i.loadingClass);
            const o = r.attr("data-background"),
              c = r.attr("data-src"),
              d = r.attr("data-srcset"),
              p = r.attr("data-sizes"),
              u = r.parent("picture");
            e.loadImage(r[0], c || o, d, p, !1, () => {
              if (null != e && e && (!e || e.params) && !e.destroyed) {
                if (
                  (o
                    ? (r.css("background-image", `url("${o}")`),
                      r.removeAttr("data-background"))
                    : (d && (r.attr("srcset", d), r.removeAttr("data-srcset")),
                      p && (r.attr("sizes", p), r.removeAttr("data-sizes")),
                      u.length &&
                        u.children("source").each((e) => {
                          const t = L(e);
                          t.attr("data-srcset") &&
                            (t.attr("srcset", t.attr("data-srcset")),
                            t.removeAttr("data-srcset"));
                        }),
                      c && (r.attr("src", c), r.removeAttr("data-src"))),
                  r.addClass(i.loadedClass).removeClass(i.loadingClass),
                  n.find(`.${i.preloaderClass}`).remove(),
                  e.params.loop && s)
                ) {
                  const t = n.attr("data-swiper-slide-index");
                  if (n.hasClass(e.params.slideDuplicateClass)) {
                    l(
                      e.$wrapperEl
                        .children(
                          `[data-swiper-slide-index="${t}"]:not(.${e.params.slideDuplicateClass})`
                        )
                        .index(),
                      !1
                    );
                  } else {
                    l(
                      e.$wrapperEl
                        .children(
                          `.${e.params.slideDuplicateClass}[data-swiper-slide-index="${t}"]`
                        )
                        .index(),
                      !1
                    );
                  }
                }
                a("lazyImageReady", n[0], r[0]),
                  e.params.autoHeight && e.updateAutoHeight();
              }
            }),
              a("lazyImageLoad", n[0], r[0]);
          });
    }
    function r() {
      const { $wrapperEl: t, params: s, slides: a, activeIndex: i } = e,
        r = e.virtual && s.virtual.enabled,
        o = s.lazy;
      let c = s.slidesPerView;
      function d(e) {
        if (r) {
          if (
            t.children(`.${s.slideClass}[data-swiper-slide-index="${e}"]`)
              .length
          )
            return !0;
        } else if (a[e]) return !0;
        return !1;
      }
      function p(e) {
        return r ? L(e).attr("data-swiper-slide-index") : L(e).index();
      }
      if (
        ("auto" === c && (c = 0), n || (n = !0), e.params.watchSlidesProgress)
      )
        t.children(`.${s.slideVisibleClass}`).each((e) => {
          l(r ? L(e).attr("data-swiper-slide-index") : L(e).index());
        });
      else if (c > 1) for (let e = i; e < i + c; e += 1) d(e) && l(e);
      else l(i);
      if (o.loadPrevNext)
        if (c > 1 || (o.loadPrevNextAmount && o.loadPrevNextAmount > 1)) {
          const e = o.loadPrevNextAmount,
            t = c,
            s = Math.min(i + t + Math.max(e, t), a.length),
            n = Math.max(i - Math.max(t, e), 0);
          for (let e = i + c; e < s; e += 1) d(e) && l(e);
          for (let e = n; e < i; e += 1) d(e) && l(e);
        } else {
          const e = t.children(`.${s.slideNextClass}`);
          e.length > 0 && l(p(e));
          const a = t.children(`.${s.slidePrevClass}`);
          a.length > 0 && l(p(a));
        }
    }
    function o() {
      const t = w();
      if (!e || e.destroyed) return;
      const s = e.params.lazy.scrollingElement
          ? L(e.params.lazy.scrollingElement)
          : L(t),
        a = s[0] === t,
        n = a ? t.innerWidth : s[0].offsetWidth,
        l = a ? t.innerHeight : s[0].offsetHeight,
        c = e.$el.offset(),
        { rtlTranslate: d } = e;
      let p = !1;
      d && (c.left -= e.$el[0].scrollLeft);
      const u = [
        [c.left, c.top],
        [c.left + e.width, c.top],
        [c.left, c.top + e.height],
        [c.left + e.width, c.top + e.height],
      ];
      for (let e = 0; e < u.length; e += 1) {
        const t = u[e];
        if (t[0] >= 0 && t[0] <= n && t[1] >= 0 && t[1] <= l) {
          if (0 === t[0] && 0 === t[1]) continue;
          p = !0;
        }
      }
      const h = !(
        "touchstart" !== e.touchEvents.start ||
        !e.support.passiveListener ||
        !e.params.passiveListeners
      ) && { passive: !0, capture: !1 };
      p ? (r(), s.off("scroll", o, h)) : i || ((i = !0), s.on("scroll", o, h));
    }
    s("beforeInit", () => {
      e.params.lazy.enabled &&
        e.params.preloadImages &&
        (e.params.preloadImages = !1);
    }),
      s("init", () => {
        e.params.lazy.enabled && (e.params.lazy.checkInView ? o() : r());
      }),
      s("scroll", () => {
        e.params.freeMode &&
          e.params.freeMode.enabled &&
          !e.params.freeMode.sticky &&
          r();
      }),
      s("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
        e.params.lazy.enabled && (e.params.lazy.checkInView ? o() : r());
      }),
      s("transitionStart", () => {
        e.params.lazy.enabled &&
          (e.params.lazy.loadOnTransitionStart ||
            (!e.params.lazy.loadOnTransitionStart && !n)) &&
          (e.params.lazy.checkInView ? o() : r());
      }),
      s("transitionEnd", () => {
        e.params.lazy.enabled &&
          !e.params.lazy.loadOnTransitionStart &&
          (e.params.lazy.checkInView ? o() : r());
      }),
      s("slideChange", () => {
        const {
          lazy: t,
          cssMode: s,
          watchSlidesProgress: a,
          touchReleaseOnEdges: i,
          resistanceRatio: n,
        } = e.params;
        t.enabled && (s || (a && (i || 0 === n))) && r();
      }),
      Object.assign(e.lazy, { load: r, loadInSlide: l });
  }
  function we({ swiper: e, extendParams: t, on: s, emit: a }) {
    let i;
    function n() {
      const t = e.slides.eq(e.activeIndex);
      let s = e.params.autoplay.delay;
      t.attr("data-swiper-autoplay") &&
        (s = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
        clearTimeout(i),
        (i = A(() => {
          let t;
          e.params.autoplay.reverseDirection
            ? e.params.loop
              ? (e.loopFix(),
                (t = e.slidePrev(e.params.speed, !0, !0)),
                a("autoplay"))
              : e.isBeginning
              ? e.params.autoplay.stopOnLastSlide
                ? r()
                : ((t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0)),
                  a("autoplay"))
              : ((t = e.slidePrev(e.params.speed, !0, !0)), a("autoplay"))
            : e.params.loop
            ? (e.loopFix(),
              (t = e.slideNext(e.params.speed, !0, !0)),
              a("autoplay"))
            : e.isEnd
            ? e.params.autoplay.stopOnLastSlide
              ? r()
              : ((t = e.slideTo(0, e.params.speed, !0, !0)), a("autoplay"))
            : ((t = e.slideNext(e.params.speed, !0, !0)), a("autoplay")),
            ((e.params.cssMode && e.autoplay.running) || !1 === t) && n();
        }, s));
    }
    function l() {
      return (
        void 0 === i &&
        !e.autoplay.running &&
        ((e.autoplay.running = !0), a("autoplayStart"), n(), !0)
      );
    }
    function r() {
      return (
        !!e.autoplay.running &&
        void 0 !== i &&
        (i && (clearTimeout(i), (i = void 0)),
        (e.autoplay.running = !1),
        a("autoplayStop"),
        !0)
      );
    }
    function o(t) {
      e.autoplay.running &&
        (e.autoplay.paused ||
          (i && clearTimeout(i),
          (e.autoplay.paused = !0),
          0 !== t && e.params.autoplay.waitForTransition
            ? ["transitionend", "webkitTransitionEnd"].forEach((t) => {
                e.$wrapperEl[0].addEventListener(t, d);
              })
            : ((e.autoplay.paused = !1), n())));
    }
    function c() {
      const t = v();
      "hidden" === t.visibilityState && e.autoplay.running && o(),
        "visible" === t.visibilityState &&
          e.autoplay.paused &&
          (n(), (e.autoplay.paused = !1));
    }
    function d(t) {
      e &&
        !e.destroyed &&
        e.$wrapperEl &&
        t.target === e.$wrapperEl[0] &&
        (["transitionend", "webkitTransitionEnd"].forEach((t) => {
          e.$wrapperEl[0].removeEventListener(t, d);
        }),
        (e.autoplay.paused = !1),
        e.autoplay.running ? n() : r());
    }
    function p() {
      e.params.autoplay.disableOnInteraction ? r() : o(),
        ["transitionend", "webkitTransitionEnd"].forEach((t) => {
          e.$wrapperEl[0].removeEventListener(t, d);
        });
    }
    function u() {
      e.params.autoplay.disableOnInteraction || ((e.autoplay.paused = !1), n());
    }
    (e.autoplay = { running: !1, paused: !1 }),
      t({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !0,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      }),
      s("init", () => {
        if (e.params.autoplay.enabled) {
          l();
          v().addEventListener("visibilitychange", c),
            e.params.autoplay.pauseOnMouseEnter &&
              (e.$el.on("mouseenter", p), e.$el.on("mouseleave", u));
        }
      }),
      s("beforeTransitionStart", (t, s, a) => {
        e.autoplay.running &&
          (a || !e.params.autoplay.disableOnInteraction
            ? e.autoplay.pause(s)
            : r());
      }),
      s("sliderFirstMove", () => {
        e.autoplay.running &&
          (e.params.autoplay.disableOnInteraction ? r() : o());
      }),
      s("touchEnd", () => {
        e.params.cssMode &&
          e.autoplay.paused &&
          !e.params.autoplay.disableOnInteraction &&
          n();
      }),
      s("destroy", () => {
        e.$el.off("mouseenter", p),
          e.$el.off("mouseleave", u),
          e.autoplay.running && r();
        v().removeEventListener("visibilitychange", c);
      }),
      Object.assign(e.autoplay, { pause: o, run: n, start: l, stop: r });
  }
  function ye({ swiper: e, extendParams: t, on: s }) {
    t({
      thumbs: {
        swiper: null,
        multipleActiveThumbs: !0,
        autoScrollOffset: 0,
        slideThumbActiveClass: "swiper-slide-thumb-active",
        thumbsContainerClass: "swiper-thumbs",
      },
    });
    let a = !1,
      i = !1;
    function n() {
      const t = e.thumbs.swiper;
      if (!t) return;
      const s = t.clickedIndex,
        a = t.clickedSlide;
      if (a && L(a).hasClass(e.params.thumbs.slideThumbActiveClass)) return;
      if (null == s) return;
      let i;
      if (
        ((i = t.params.loop
          ? parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10)
          : s),
        e.params.loop)
      ) {
        let t = e.activeIndex;
        e.slides.eq(t).hasClass(e.params.slideDuplicateClass) &&
          (e.loopFix(),
          (e._clientLeft = e.$wrapperEl[0].clientLeft),
          (t = e.activeIndex));
        const s = e.slides
            .eq(t)
            .prevAll(`[data-swiper-slide-index="${i}"]`)
            .eq(0)
            .index(),
          a = e.slides
            .eq(t)
            .nextAll(`[data-swiper-slide-index="${i}"]`)
            .eq(0)
            .index();
        i = void 0 === s ? a : void 0 === a ? s : a - t < t - s ? a : s;
      }
      e.slideTo(i);
    }
    function l() {
      const { thumbs: t } = e.params;
      if (a) return !1;
      a = !0;
      const s = e.constructor;
      if (t.swiper instanceof s)
        (e.thumbs.swiper = t.swiper),
          Object.assign(e.thumbs.swiper.originalParams, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
          Object.assign(e.thumbs.swiper.params, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          });
      else if (P(t.swiper)) {
        const a = Object.assign({}, t.swiper);
        Object.assign(a, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
          (e.thumbs.swiper = new s(a)),
          (i = !0);
      }
      return (
        e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
        e.thumbs.swiper.on("tap", n),
        !0
      );
    }
    function r(t) {
      const s = e.thumbs.swiper;
      if (!s) return;
      const a =
          "auto" === s.params.slidesPerView
            ? s.slidesPerViewDynamic()
            : s.params.slidesPerView,
        i = e.params.thumbs.autoScrollOffset,
        n = i && !s.params.loop;
      if (e.realIndex !== s.realIndex || n) {
        let l,
          r,
          o = s.activeIndex;
        if (s.params.loop) {
          s.slides.eq(o).hasClass(s.params.slideDuplicateClass) &&
            (s.loopFix(),
            (s._clientLeft = s.$wrapperEl[0].clientLeft),
            (o = s.activeIndex));
          const t = s.slides
              .eq(o)
              .prevAll(`[data-swiper-slide-index="${e.realIndex}"]`)
              .eq(0)
              .index(),
            a = s.slides
              .eq(o)
              .nextAll(`[data-swiper-slide-index="${e.realIndex}"]`)
              .eq(0)
              .index();
          (l =
            void 0 === t
              ? a
              : void 0 === a
              ? t
              : a - o == o - t
              ? s.params.slidesPerGroup > 1
                ? a
                : o
              : a - o < o - t
              ? a
              : t),
            (r = e.activeIndex > e.previousIndex ? "next" : "prev");
        } else (l = e.realIndex), (r = l > e.previousIndex ? "next" : "prev");
        n && (l += "next" === r ? i : -1 * i),
          s.visibleSlidesIndexes &&
            s.visibleSlidesIndexes.indexOf(l) < 0 &&
            (s.params.centeredSlides
              ? (l =
                  l > o ? l - Math.floor(a / 2) + 1 : l + Math.floor(a / 2) - 1)
              : l > o && s.params.slidesPerGroup,
            s.slideTo(l, t ? 0 : void 0));
      }
      let l = 1;
      const r = e.params.thumbs.slideThumbActiveClass;
      if (
        (e.params.slidesPerView > 1 &&
          !e.params.centeredSlides &&
          (l = e.params.slidesPerView),
        e.params.thumbs.multipleActiveThumbs || (l = 1),
        (l = Math.floor(l)),
        s.slides.removeClass(r),
        s.params.loop || (s.params.virtual && s.params.virtual.enabled))
      )
        for (let t = 0; t < l; t += 1)
          s.$wrapperEl
            .children(`[data-swiper-slide-index="${e.realIndex + t}"]`)
            .addClass(r);
      else
        for (let t = 0; t < l; t += 1) s.slides.eq(e.realIndex + t).addClass(r);
    }
    (e.thumbs = { swiper: null }),
      s("beforeInit", () => {
        const { thumbs: t } = e.params;
        t && t.swiper && (l(), r(!0));
      }),
      s("slideChange update resize observerUpdate", () => {
        e.thumbs.swiper && r();
      }),
      s("setTransition", (t, s) => {
        const a = e.thumbs.swiper;
        a && a.setTransition(s);
      }),
      s("beforeDestroy", () => {
        const t = e.thumbs.swiper;
        t && i && t && t.destroy();
      }),
      Object.assign(e.thumbs, { init: l, update: r });
  }
  window.addEventListener("load", function (e) {
    !(function () {
      if (
        (document.querySelector(".banner__slider") &&
          new pe(".banner__slider", {
            modules: [ge, be, we],
            observer: !0,
            observeParents: !0,
            slidesPerView: 1,
            spaceBetween: 10,
            autoHeight: !0,
            speed: 800,
            loop: !1,
            autoplay: { delay: 3e3, disableOnInteraction: !1 },
            preloadImages: !0,
            lazy: { loanOnTransitionStart: !0, loadPrevNext: !0 },
            pagination: { el: ".banner-controlls__dotts", clickable: !0 },
            on: {
              init: function (e) {
                const t = document.querySelector(".fraction-controll__all"),
                  s = document.querySelectorAll(
                    ".banner__slide:not(.swiper-slide-duplicate)"
                  );
                t.innerHTML = s.length < 10 ? `0${s.length}` : s.length;
              },
              slideChange: function (e) {
                document.querySelector(
                  ".fraction-controll__current"
                ).innerHTML =
                  e.realIndex + 1 < 10
                    ? `0${e.realIndex + 1}`
                    : e.realIndex + 1;
              },
            },
          }),
        document.querySelector(".showcase__products") &&
          new pe(".showcase__products", {
            modules: [be, ue, ve],
            observer: !0,
            observeParents: !0,
            watchOverflow: !0,
            slidesPerView: 1,
            spaceBetween: 10,
            autoHeight: !1,
            speed: 800,
            loop: !1,
            preloadImages: !0,
            lazy: { loanOnTransitionStart: !0, loadPrevNext: !0 },
            scrollbar: { el: ".showcase__scrollbar", draggable: !0 },
            breakpoints: {
              350: { slidesPerView: 2 },
              480: { slidesPerView: 3 },
              992: { slidesPerView: 4, spaceBetween: 24 },
            },
          }),
        document.querySelector(".gallery-product__thumbs"))
      ) {
        const e = new pe(".gallery-product__thumbs", {
          modules: [me, be, we, ye],
          observer: !0,
          observeParents: !0,
          watchOverflow: !0,
          slidesPerView: 3,
          spaceBetween: 3,
          autoHeight: !1,
          speed: 800,
          loop: !1,
          direction: "vertical",
          preloadImages: !0,
          lazy: { loanOnTransitionStart: !0, loadPrevNext: !0 },
          navigation: {
            nextEl: ".swiper__button-next",
            prevEl: ".swiper__button-prev",
          },
        });
        new pe(".gallery-product__slider", {
          modules: [be, we, ye, ge],
          observer: !0,
          observeParents: !0,
          watchOverflow: !0,
          slidesPerView: 1,
          spaceBetween: 20,
          autoHeight: !1,
          speed: 800,
          loop: !1,
          preloadImages: !0,
          lazy: { loanOnTransitionStart: !0, loadPrevNext: !0 },
          pagination: {
            el: ".gallery-product__slider .swiper-pagination",
            clickable: !0,
            dynamicBullets: !0,
          },
          thumbs: { swiper: e },
        });
      }
    })();
  });
  let Se = !1;
  function Ce(e) {
    this.type = e;
  }
  setTimeout(() => {
    if (Se) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (Ce.prototype.init = function () {
      const e = this;
      (this.??bjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          s = t.dataset.da.trim().split(","),
          a = {};
        (a.element = t),
          (a.parent = t.parentNode),
          (a.destination = document.querySelector(s[0].trim())),
          (a.breakpoint = s[1] ? s[1].trim() : "767"),
          (a.place = s[2] ? s[2].trim() : "last"),
          (a.index = this.indexInParent(a.parent, a.element)),
          this.??bjects.push(a);
      }
      this.arraySort(this.??bjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.??bjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, s) {
            return Array.prototype.indexOf.call(s, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const s = this.mediaQueries[t],
          a = String.prototype.split.call(s, ","),
          i = window.matchMedia(a[0]),
          n = a[1],
          l = Array.prototype.filter.call(this.??bjects, function (e) {
            return e.breakpoint === n;
          });
        i.addListener(function () {
          e.mediaHandler(i, l);
        }),
          this.mediaHandler(i, l);
      }
    }),
    (Ce.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const s = t[e];
          (s.index = this.indexInParent(s.parent, s.element)),
            this.moveTo(s.place, s.element, s.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const s = t[e];
          s.element.classList.contains(this.daClassname) &&
            this.moveBack(s.parent, s.element, s.index);
        }
    }),
    (Ce.prototype.moveTo = function (e, t, s) {
      t.classList.add(this.daClassname),
        "last" === e || e >= s.children.length
          ? s.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? s.children[e].insertAdjacentElement("beforebegin", t)
          : s.insertAdjacentElement("afterbegin", t);
    }),
    (Ce.prototype.moveBack = function (e, t, s) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[s]
          ? e.children[s].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (Ce.prototype.indexInParent = function (e, t) {
      const s = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(s, t);
    }),
    (Ce.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new Ce("max").init(),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    window.addEventListener("load", function () {
      setTimeout(function () {
        document.documentElement.classList.add("loaded");
      }, 0);
    }),
    document.querySelector(".icon-menu") &&
      document.addEventListener("click", function (e) {
        l &&
          e.target.closest(".icon-menu") &&
          (r(), document.documentElement.classList.toggle("menu-open"));
      }),
    (function () {
      if (document.querySelectorAll("[data-fullscreen]").length && t.any()) {
        function e() {
          let e = 0.01 * window.innerHeight;
          document.documentElement.style.setProperty("--vh", `${e}px`);
        }
        window.addEventListener("resize", e), e();
      }
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const t = Array.from(e).filter(function (e, t, s) {
          return !e.dataset.spollers.split(",")[0];
        });
        t.length && i(t);
        let s = p(e, "spollers");
        function i(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  l(e),
                  e.addEventListener("click", r))
                : (e.classList.remove("_spoller-init"),
                  l(e, !1),
                  e.removeEventListener("click", r));
          });
        }
        function l(e, t = !0) {
          let s = e.querySelectorAll("[data-spoller]");
          s.length &&
            ((s = Array.from(s).filter(
              (t) => t.closest("[data-spollers]") === e
            )),
            s.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            }));
        }
        function r(e) {
          const t = e.target;
          if (t.closest("[data-spoller]")) {
            const s = t.closest("[data-spoller]"),
              a = s.closest("[data-spollers]"),
              i = a.hasAttribute("data-one-spoller"),
              l = a.dataset.spollersSpeed
                ? parseInt(a.dataset.spollersSpeed)
                : 500;
            a.querySelectorAll("._slide").length ||
              (i && !s.classList.contains("_spoller-active") && o(a),
              s.classList.toggle("_spoller-active"),
              n(s.nextElementSibling, l)),
              e.preventDefault();
          }
        }
        function o(e) {
          const t = e.querySelector("[data-spoller]._spoller-active"),
            s = e.dataset.spollersSpeed
              ? parseInt(e.dataset.spollersSpeed)
              : 500;
          t &&
            !e.querySelectorAll("._slide").length &&
            (t.classList.remove("_spoller-active"), a(t.nextElementSibling, s));
        }
        s &&
          s.length &&
          s.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              i(e.itemsArray, e.matchMedia);
            }),
              i(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    (function () {
      const e = document.querySelectorAll("[data-tabs]");
      let t = [];
      if (e.length > 0) {
        const a = s();
        a && a.startsWith("tab-") && (t = a.replace("tab-", "").split("-")),
          e.forEach((e, s) => {
            e.classList.add("_tab-init"),
              e.setAttribute("data-tabs-index", s),
              e.addEventListener("click", r),
              (function (e) {
                let s = e.querySelectorAll("[data-tabs-titles]>*"),
                  a = e.querySelectorAll("[data-tabs-body]>*");
                const i = e.dataset.tabsIndex,
                  n = t[0] == i;
                if (n) {
                  const t = e.querySelector("[data-tabs-titles]>._tab-active");
                  t && t.classList.remove("_tab-active");
                }
                a.length &&
                  ((a = Array.from(a).filter(
                    (t) => t.closest("[data-tabs]") === e
                  )),
                  (s = Array.from(s).filter(
                    (t) => t.closest("[data-tabs]") === e
                  )),
                  a.forEach((e, a) => {
                    s[a].setAttribute("data-tabs-title", ""),
                      e.setAttribute("data-tabs-item", ""),
                      n && a == t[1] && s[a].classList.add("_tab-active"),
                      (e.hidden = !s[a].classList.contains("_tab-active"));
                  }));
              })(e);
          });
        let i = p(e, "tabs");
        i &&
          i.length &&
          i.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              n(e.itemsArray, e.matchMedia);
            }),
              n(e.itemsArray, e.matchMedia);
          });
      }
      function n(e, t) {
        e.forEach((e) => {
          let s = (e = e.item).querySelector("[data-tabs-titles]"),
            a = e.querySelectorAll("[data-tabs-title]"),
            i = e.querySelector("[data-tabs-body]"),
            n = e.querySelectorAll("[data-tabs-item]");
          (a = Array.from(a).filter((t) => t.closest("[data-tabs]") === e)),
            (n = Array.from(n).filter((t) => t.closest("[data-tabs]") === e)),
            n.forEach((n, l) => {
              t.matches
                ? (i.append(a[l]), i.append(n), e.classList.add("_tab-spoller"))
                : (s.append(a[l]), e.classList.remove("_tab-spoller"));
            });
        });
      }
      function l(e) {
        let t = e.querySelectorAll("[data-tabs-title]"),
          s = e.querySelectorAll("[data-tabs-item]");
        const n = e.dataset.tabsIndex;
        const l = (function (e) {
          if (e.hasAttribute("data-tabs-animate"))
            return e.dataset.tabsAnimate > 0
              ? Number(e.dataset.tabsAnimate)
              : 500;
        })(e);
        if (s.length > 0) {
          const r = e.hasAttribute("data-tabs-hash");
          (s = Array.from(s).filter((t) => t.closest("[data-tabs]") === e)),
            (t = Array.from(t).filter((t) => t.closest("[data-tabs]") === e)),
            s.forEach((e, s) => {
              var o;
              t[s].classList.contains("_tab-active")
                ? (l ? i(e, l) : (e.hidden = !1),
                  r &&
                    !e.closest(".popup") &&
                    ((o = (o = `tab-${n}-${s}`)
                      ? `#${o}`
                      : window.location.href.split("#")[0]),
                    history.pushState("", "", o)))
                : l
                ? a(e, l)
                : (e.hidden = !0);
            });
        }
      }
      function r(e) {
        const t = e.target;
        if (t.closest("[data-tabs-title]")) {
          const s = t.closest("[data-tabs-title]"),
            a = s.closest("[data-tabs]");
          if (
            !s.classList.contains("_tab-active") &&
            !a.querySelector("._slide")
          ) {
            let e = a.querySelectorAll("[data-tabs-title]._tab-active");
            e.length &&
              (e = Array.from(e).filter((e) => e.closest("[data-tabs]") === a)),
              e.length && e[0].classList.remove("_tab-active"),
              s.classList.add("_tab-active"),
              l(a);
          }
          e.preventDefault();
        }
      }
    })(),
    window.addEventListener("load", function (e) {
      const t = document.querySelectorAll("[data-showmore]");
      let s, n;
      function l(e) {
        e.forEach((e) => {
          r(e.itemsArray, e.matchMedia);
        });
      }
      function r(e, t) {
        e.forEach((e) => {
          !(function (e, t = !1) {
            let s = (e = t ? e.item : e).querySelectorAll(
                "[data-showmore-content]"
              ),
              n = e.querySelectorAll("[data-showmore-button]");
            (s = Array.from(s).filter(
              (t) => t.closest("[data-showmore]") === e
            )[0]),
              (n = Array.from(n).filter(
                (t) => t.closest("[data-showmore]") === e
              )[0]);
            const l = o(e, s);
            (t.matches || !t) &&
            l <
              (function (e) {
                let t,
                  s = e.offsetHeight;
                e.style.removeProperty("height"),
                  e.closest("[hidden]") &&
                    ((t = e.closest("[hidden]")), (t.hidden = !1));
                let a = e.offsetHeight;
                return t && (t.hidden = !0), (e.style.height = `${s}px`), a;
              })(s)
              ? (a(s, 0, l), (n.hidden = !1))
              : (i(s, 0, l), (n.hidden = !0));
          })(e, t);
        });
      }
      function o(e, t) {
        let s = 0;
        if ("items" === (e.dataset.showmore ? e.dataset.showmore : "size")) {
          const e = t.dataset.showmoreContent ? t.dataset.showmoreContent : 3,
            a = t.children;
          for (
            let t = 1;
            t < a.length && ((s += a[t - 1].offsetHeight), t != e);
            t++
          );
        } else s = t.dataset.showmoreContent ? t.dataset.showmoreContent : 150;
        return s;
      }
      function c(e) {
        const t = e.target,
          c = e.type;
        if ("click" === c) {
          if (t.closest("[data-showmore-button]")) {
            const e = t
                .closest("[data-showmore-button]")
                .closest("[data-showmore]"),
              s = e.querySelector("[data-showmore-content]"),
              n = e.dataset.showmoreButton ? e.dataset.showmoreButton : "500",
              l = o(e, s);
            s.classList.contains("_slide") ||
              (e.classList.contains("_showmore-active")
                ? a(s, n, l)
                : i(s, n, l),
              e.classList.toggle("_showmore-active"));
          }
        } else "resize" === c && (s && s.length && r(s), n && n.length && l(n));
      }
      t.length &&
        ((s = Array.from(t).filter(function (e, t, s) {
          return !e.dataset.showmoreMedia;
        })),
        s.length && r(s),
        document.addEventListener("click", c),
        window.addEventListener("resize", c),
        (n = p(t, "showmoreMedia")),
        n &&
          n.length &&
          (n.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              r(e.itemsArray, e.matchMedia);
            });
          }),
          l(n)));
    }),
    document.addEventListener("click", function (e) {
      let t = e.target;
      if (t.closest(".quantity__button")) {
        let e = parseInt(t.closest(".quantity").querySelector("input").value);
        t.classList.contains("quantity__button_plus")
          ? e++
          : (--e, e < 1 && (e = 1)),
          (t.closest(".quantity").querySelector("input").value = e);
      }
    }),
    (function () {
      const e = document.querySelectorAll(".rating");
      e.length > 0 &&
        (function () {
          let t, s;
          for (let t = 0; t < e.length; t++) {
            a(e[t]);
          }
          function a(e) {
            i(e), n(), e.classList.contains("rating_set") && l(e);
          }
          function i(e) {
            (t = e.querySelector(".rating__active")),
              (s = e.querySelector(".rating__value"));
          }
          function n(e = s.innerHTML) {
            const a = e / 0.05;
            t.style.width = `${a}%`;
          }
          function l(e) {
            const t = e.querySelectorAll(".rating__item");
            for (let a = 0; a < t.length; a++) {
              const l = t[a];
              l.addEventListener("mouseenter", function (t) {
                i(e), n(l.value);
              }),
                l.addEventListener("mouseleave", function (e) {
                  n();
                }),
                l.addEventListener("click", function (t) {
                  i(e),
                    e.dataset.ajax
                      ? r(l.value, e)
                      : ((s.innerHTML = a + 1), n());
                });
            }
          }
          async function r(e, t) {
            if (!t.classList.contains("rating_sending")) {
              t.classList.add("rating_sending");
              let e = await fetch("rating.json", { method: "GET" });
              if (e.ok) {
                const a = (await e.json()).newRating;
                (s.innerHTML = a), n(), t.classList.remove("rating_sending");
              } else alert("????????????"), t.classList.remove("rating_sending");
            }
          }
        })();
    })(),
    (function () {
      function e(e) {
        if ("click" === e.type) {
          const t = e.target;
          if (t.closest("[data-goto]")) {
            const s = t.closest("[data-goto]"),
              a = s.dataset.goto ? s.dataset.goto : "",
              i = !!s.hasAttribute("data-goto-header"),
              n = s.dataset.gotoSpeed ? s.dataset.gotoSpeed : 500,
              l = s.dataset.gotoTop ? parseInt(s.dataset.gotoTop) : 0;
            u(a, i, n, l), e.preventDefault();
          }
        } else if ("watcherCallback" === e.type && e.detail) {
          const t = e.detail.entry,
            s = t.target;
          if ("navigator" === s.dataset.watch) {
            document.querySelector("[data-goto]._navigator-active");
            let e;
            if (s.id && document.querySelector(`[data-goto="#${s.id}"]`))
              e = document.querySelector(`[data-goto="#${s.id}"]`);
            else if (s.classList.length)
              for (let t = 0; t < s.classList.length; t++) {
                const a = s.classList[t];
                if (document.querySelector(`[data-goto=".${a}"]`)) {
                  e = document.querySelector(`[data-goto=".${a}"]`);
                  break;
                }
              }
            t.isIntersecting
              ? e && e.classList.add("_navigator-active")
              : e && e.classList.remove("_navigator-active");
          }
        }
      }
      if (
        (document.addEventListener("click", e),
        document.addEventListener("watcherCallback", e),
        s())
      ) {
        let e;
        document.querySelector(`#${s()}`)
          ? (e = `#${s()}`)
          : document.querySelector(`.${s()}`) && (e = `.${s()}`),
          e && u(e, !0, 500, 20);
      }
    })(),
    (function () {
      Se = !0;
      const e = document.querySelector("header.header"),
        t = e.hasAttribute("data-scroll-show"),
        s = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
        a = e.dataset.scroll ? e.dataset.scroll : 1,
        i = document.querySelector(".page");
      let n,
        l = 0;
      document.addEventListener("windowScroll", function (r) {
        const o = window.scrollY;
        clearTimeout(n),
          o >= a
            ? (!e.classList.contains("_header-scroll") &&
                e.classList.add("_header-scroll"),
              e.setAttribute("data-lp", 0),
              (i.style.paddingTop = e.offsetHeight + "px"),
              t &&
                (o > l
                  ? e.classList.contains("_header-show") &&
                    e.classList.remove("_header-show")
                  : !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show"),
                (n = setTimeout(() => {
                  !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show");
                }, s))))
            : (e.classList.contains("_header-scroll") &&
                e.classList.remove("_header-scroll"),
              (i.style.paddingTop = 0),
              e.removeAttribute("data-lp"),
              t &&
                e.classList.contains("_header-show") &&
                e.classList.remove("_header-show")),
          (l = o <= 0 ? 0 : o);
      });
    })(),
    (Se = !0),
    (function () {
      const e = document.querySelectorAll("[data-sticky]");
      e.length &&
        e.forEach((e) => {
          let t = {
            media: e.dataset.sticky ? parseInt(e.dataset.sticky) : null,
            top: e.dataset.stickyTop ? parseInt(e.dataset.stickyTop) : 0,
            bottom: e.dataset.stickyBottom
              ? parseInt(e.dataset.stickyBottom)
              : 0,
            header: e.hasAttribute("data-sticky-header")
              ? document.querySelector("header.header").offsetHeight
              : 0,
          };
          !(function (e, t) {
            const s = e.querySelector("[data-sticky-item]"),
              a = t.header + t.top,
              i = s.getBoundingClientRect().top + scrollY - a;
            function n(n) {
              const l =
                e.offsetHeight +
                e.getBoundingClientRect().top +
                scrollY -
                (a + s.offsetHeight + t.bottom);
              let r = {
                position: "relative",
                bottom: "auto",
                top: "0px",
                left: "0px",
                width: "auto",
              };
              (!t.media || t.media < window.innerWidth) &&
                a + t.bottom + s.offsetHeight < window.innerHeight &&
                (scrollY >= i && scrollY <= l
                  ? ((r.position = "fixed"),
                    (r.bottom = "auto"),
                    (r.top = `${a}px`),
                    (r.left = `${s.getBoundingClientRect().left}px`),
                    (r.width = `${s.offsetWidth}px`))
                  : scrollY >= l &&
                    ((r.position = "absolute"),
                    (r.bottom = `${t.bottom}px`),
                    (r.top = "auto"),
                    (r.left = "0px"),
                    (r.width = `${s.offsetWidth}px`))),
                (function (e, t) {
                  e.style.cssText = `position:${t.position};bottom:${t.bottom};top:${t.top};left:${t.left};width:${t.width};`;
                })(s, r);
            }
            document.addEventListener("windowScroll", n);
          })(e, t);
        });
    })();
})();
