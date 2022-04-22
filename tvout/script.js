var TransferOutWidget = /** @class */ (function () {
    function TransferOutWidget(widgetId) {
        this.widgetId = widgetId;
        this.init();
        this.pageCount = 0;
    }
    TransferOutWidget.prototype.init = function () {
        this.transferOptions = document.querySelectorAll('input[name="transfer-option"], input[name^="request-"]');
        this.turnSection = document.querySelectorAll(".next-section,.prev-section");
        this.setupListeners();
    };
    TransferOutWidget.prototype.validateOptions = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        //some data-set values can be the reverse of the data-set, for consistency use a data-tag
        var canShow = ((_a = (document.querySelector("[data-tranferpage='" + this.pageCount + "'] input[name^=\"request-\"]:checked"))) === null || _a === void 0 ? void 0 : _a.dataset.text) == "true";
        var noneChecked = document.querySelectorAll("[data-tranferpage='" + this.pageCount + "'] input[name^=\"request-\"]:checked").length > 0;
        console.log(noneChecked);
        (_b = (document.querySelector("[data-tranferpage='" + this.pageCount + "'] .step-text"))) === null || _b === void 0 ? void 0 : _b.classList.toggle("d-none", canShow);
        console.log(this.pageCount);
        switch (this.pageCount) {
            case 0:
                (_c = (document.querySelector("[data-tranferbtn='" + this.pageCount + "'].request"))) === null || _c === void 0 ? void 0 : _c.classList.toggle("d-none", canShow);
                (_d = (document.querySelector("[data-tranferbtn='" + this.pageCount + "'].next-section"))) === null || _d === void 0 ? void 0 : _d.classList.toggle("d-none", !canShow);
                break;
            case 3:
                (_e = (document.querySelector("[data-tranferpage='" + this.pageCount + "'] .read-more"))) === null || _e === void 0 ? void 0 : _e.classList.toggle("d-none", !canShow);
                (_f = (document.querySelector("[data-tranferbtn='" + this.pageCount + "'].next-section"))) === null || _f === void 0 ? void 0 : _f.classList.toggle("d-none", canShow);
                break;
            default:
                console.log(document.querySelector("[data-tranferbtn='" + this.pageCount + "'].next-section"));
                (_g = (document.querySelector("[data-tranferbtn='" + this.pageCount + "'].next-section"))) === null || _g === void 0 ? void 0 : _g.classList.toggle("d-none", !noneChecked);
                break;
        }
    };
    TransferOutWidget.prototype.setupListeners = function () {
        var _this = this;
        this.transferOptions.forEach(function (node) {
            node.addEventListener("click", function () {
                _this.validateOptions();
            });
        });
        this.turnSection.forEach(function (node) {
            node.addEventListener("click", function (e) {
                var _a, _b;
                (document.querySelector("[data-tranferpage='" + _this.pageCount + "']")).classList.add("d-none");
                if (e.target.matches(".prev-section")) {
                    (document.querySelector("[data-transferstep='" + _this.pageCount + "']")).classList.remove("active");
                    _this.pageCount--;
                    (document.querySelector("[data-transferstep='" + _this.pageCount + "']")).classList.replace("completed", "active");
                }
                else {
                    (document.querySelector("[data-transferstep='" + _this.pageCount + "']")).classList.replace("active", "completed");
                    _this.pageCount++;
                }
                (_a = (document.querySelector("[data-transferstep='" + _this.pageCount + "']")).classList) === null || _a === void 0 ? void 0 : _a.add("active");
                (_b = (document.querySelector("[data-tranferpage='" + _this.pageCount + "']"))) === null || _b === void 0 ? void 0 : _b.classList.remove("d-none");
            });
        });
    };
    return TransferOutWidget;
}());
