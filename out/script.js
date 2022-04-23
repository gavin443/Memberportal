class TransferOutWidget {
    constructor(widgetId) {
        this.widgetId = widgetId;
        this.init();
        this.pageCount = 0;
    }
    init() {
        this.transferOptions = document.querySelectorAll('input[name="transfer-option"], input[name^="request-"]');
        this.turnSection = document.querySelectorAll(".next-section,.prev-section");
        this.setupListeners();
    }
    validateOptions() {
        var _a, _b, _c, _d, _e, _f, _g;
        //some data-set values can be the reverse of the data-set, for consistency use a data-tag
        const canShow = ((_a = ((document.querySelector(`[data-transferpage='${this.pageCount}'] input[name^="request-"]:checked`)))) === null || _a === void 0 ? void 0 : _a.dataset.text) == "true";
        const noneChecked = document.querySelectorAll(`[data-transferpage='${this.pageCount}'] input[name^="request-"]:checked`).length > 0;
        (_b = ((document.querySelector(`[data-transferpage='${this.pageCount}'] .step-text`)))) === null || _b === void 0 ? void 0 : _b.classList.toggle("d-none", canShow);
        switch (this.pageCount) {
            case 0:
                (_c = document
                    .querySelector(`[data-transferbtn='${this.pageCount}'].request`)) === null || _c === void 0 ? void 0 : _c.classList.toggle("d-none", canShow);
                (_d = document
                    .querySelector(`[data-transferbtn='${this.pageCount}'].next-section`)) === null || _d === void 0 ? void 0 : _d.classList.toggle("d-none", !canShow);
                break;
            case 3:
                (_e = document
                    .querySelector(`[data-transferpage='${this.pageCount}'] .read-more`)) === null || _e === void 0 ? void 0 : _e.classList.toggle("d-none", !canShow);
                (_f = document
                    .querySelector(`[data-transferbtn='${this.pageCount}'].next-section`)) === null || _f === void 0 ? void 0 : _f.classList.toggle("d-none", canShow);
                break;
            default:
                (_g = document
                    .querySelector(`[data-transferbtn='${this.pageCount}'].next-section`)) === null || _g === void 0 ? void 0 : _g.classList.toggle("d-none", !noneChecked);
                break;
        }
    }
    setupListeners() {
        this.transferOptions.forEach((node) => {
            node.addEventListener("click", () => {
                this.validateOptions();
            });
        });
        this.turnSection.forEach((node) => {
            node.addEventListener("click", (e) => {
                var _a, _b;
                document
                    .querySelector(`[data-transferpage='${this.pageCount}']`)
                    .classList.add("d-none");
                if (e.target.matches(".prev-section")) {
                    document
                        .querySelector(`[data-transferstep='${this.pageCount}']`)
                        .classList.remove("active");
                    this.pageCount--;
                    document
                        .querySelector(`[data-transferstep='${this.pageCount}']`)
                        .classList.replace("completed", "active");
                }
                else {
                    document
                        .querySelector(`[data-transferstep='${this.pageCount}']`)
                        .classList.replace("active", "completed");
                    this.pageCount++;
                }
                (_a = document
                    .querySelector(`[data-transferstep='${this.pageCount}']`)
                    .classList) === null || _a === void 0 ? void 0 : _a.add("active");
                (_b = document
                    .querySelector(`[data-transferpage='${this.pageCount}']`)) === null || _b === void 0 ? void 0 : _b.classList.remove("d-none");
            });
        });
    }
}
//# sourceMappingURL=script.js.map