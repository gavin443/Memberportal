class TransferOutWidget {
  private transferOptions: NodeListOf<HTMLInputElement>;
  private turnSection: NodeListOf<Element>;
  private pageCount: number;
  constructor(private widgetId: string) {
    this.init();
    this.pageCount = 0;
  }

  private init(): void {
    this.transferOptions = document.querySelectorAll(
      'input[name="transfer-option"], input[name^="request-"]'
    ) as NodeListOf<HTMLInputElement>;

    this.turnSection = document.querySelectorAll(
      ".next-section,.prev-section"
    ) as NodeListOf<Element>;
    this.setupListeners();
  }

  private validateOptions(): void {
    //some data-set values can be the reverse of the data-set, for consistency use a data-tag
    const canShow: boolean =
      document.querySelector<HTMLInputElement>(
        `[data-transferpage='${this.pageCount}'] input[name^="request-"]:checked`
      )?.dataset.text == "true";

    const noneChecked =
      document.querySelectorAll(
        `[data-transferpage='${this.pageCount}'] input[name^="request-"]:checked`
      ).length > 0;

    document
      .querySelector<HTMLInputElement>(
        `[data-transferpage='${this.pageCount}'] .step-text`
      )
      ?.classList.toggle("d-none", canShow);

    switch (this.pageCount) {
      case 0:
        document
          .querySelector<HTMLInputElement>(
            `[data-transferbtn='${this.pageCount}'].request`
          )
          ?.classList.toggle("d-none", canShow);

        document
          .querySelector<HTMLInputElement>(
            `[data-transferbtn='${this.pageCount}'].next-section`
          )
          ?.classList.toggle("d-none", !canShow);
        break;
      case 3:
        document
          .querySelector<HTMLInputElement>(
            `[data-transferpage='${this.pageCount}'] .read-more`
          )
          ?.classList.toggle("d-none", !canShow);
        document
          .querySelector<HTMLInputElement>(
            `[data-transferbtn='${this.pageCount}'].next-section`
          )
          ?.classList.toggle("d-none", canShow);
        document
          .querySelector<HTMLInputElement>(
            `[data-transferpage='${this.pageCount}'] .content-box-blue`
          )
          ?.classList.toggle("d-none", canShow);
        break;
      default:
        document
          .querySelector<HTMLInputElement>(
            `[data-transferbtn='${this.pageCount}'].next-section`
          )
          ?.classList.toggle("d-none", !noneChecked);
        break;
    }
  }

  private setupListeners(): void {
    this.transferOptions.forEach((node) => {
      node.addEventListener("click", () => {
        this.validateOptions();
      });
    });

    this.turnSection.forEach((node) => {
      node.addEventListener("click", (e) => {
        document
          .querySelector<HTMLElement>(`[data-transferpage='${this.pageCount}']`)
          .classList.add("d-none");
        if ((<Element>e.target).matches(".prev-section")) {
          document
            .querySelector<HTMLElement>(
              `[data-transferstep='${this.pageCount}']`
            )
            .classList.remove("active");
          this.pageCount--;
          document
            .querySelector<HTMLElement>(
              `[data-transferstep='${this.pageCount}']`
            )
            .classList.replace("completed", "active");
        } else {
          document
            .querySelector<HTMLElement>(
              `[data-transferstep='${this.pageCount}']`
            )
            .classList.replace("active", "completed");
          this.pageCount++;
        }
        document
          .querySelector<HTMLElement>(`[data-transferstep='${this.pageCount}']`)
          .classList?.add("active");
        document
          .querySelector<HTMLElement>(`[data-transferpage='${this.pageCount}']`)
          ?.classList.remove("d-none");
      });
    });
  }
}
