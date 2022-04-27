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
    const isTrue: boolean =
      document.querySelector<HTMLInputElement>(
        `[data-transferpage='${this.pageCount}'] input[name^="request-"]:checked`
      )?.value == "Yes";

    const isRequestChecked =
      document.querySelectorAll(
        `[data-transferpage='${this.pageCount}'] input[name^="request-"]:checked`
      ).length > 0;

    const isTransferChecked =
      document.querySelectorAll(
        `[data-transferpage='${this.pageCount}'] input[name^="transfer-option"]:checked`
      ).length > 0;

    document
      .querySelector<HTMLInputElement>(
        `[data-transferpage='${this.pageCount}'] .step-text`
      )
      ?.classList.toggle("d-none", isTrue);

    switch (this.pageCount) {
      case 0:
        document
          .querySelector<HTMLInputElement>(
            `[data-transferbtn='${this.pageCount}'].request`
          )
          ?.classList.toggle("d-none", isTrue);

        document
          .querySelector<HTMLInputElement>(
            `[data-transferbtn='${this.pageCount}'].next-section`
          )
          ?.classList.toggle("d-none", !isTrue);
        break;
      case 3:
        document
          .querySelector<HTMLInputElement>(
            `[data-transferpage='${this.pageCount}'] .read-more`
          )
          ?.classList.toggle("d-none", isTrue);
        document
          .querySelector<HTMLInputElement>(
            `[data-transferbtn='${this.pageCount}'].next-section`
          )
          ?.classList.toggle("d-none", !(isTransferChecked && isTrue));
        document
          .querySelector<HTMLInputElement>(
            `[data-transferpage='${this.pageCount}'] .step-text`
          )
          ?.classList.toggle("d-none", !isTrue);
        break;
      default:
        document
          .querySelector<HTMLInputElement>(
            `[data-transferbtn='${this.pageCount}'].next-section`
          )
          ?.classList.toggle("d-none", !isRequestChecked);
        break;
    }
  }

  private setupListeners(): void {
    document.querySelector("iframe").onload = function () {
      console.log("iframe loaded");
    };

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
