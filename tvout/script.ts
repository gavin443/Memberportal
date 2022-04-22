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
      (<HTMLInputElement>(
        document.querySelector(
          `[data-tranferpage='${this.pageCount}'] input[name^="request-"]:checked`
        )
      ))?.dataset.text == "true";

    const noneChecked =
      document.querySelectorAll(
        `[data-tranferpage='${this.pageCount}'] input[name^="request-"]:checked`
      ).length > 0;

    console.log(noneChecked);

    (<HTMLInputElement>(
      document.querySelector(
        `[data-tranferpage='${this.pageCount}'] .step-text`
      )
    ))?.classList.toggle("d-none", canShow);

    console.log(this.pageCount);
    switch (this.pageCount) {
      case 0:
        (<HTMLInputElement>(
          document.querySelector(
            `[data-tranferbtn='${this.pageCount}'].request`
          )
        ))?.classList.toggle("d-none", canShow);
        (<HTMLInputElement>(
          document.querySelector(
            `[data-tranferbtn='${this.pageCount}'].next-section`
          )
        ))?.classList.toggle("d-none", !canShow);
        break;
      case 3:
        (<HTMLInputElement>(
          document.querySelector(
            `[data-tranferpage='${this.pageCount}'] .read-more`
          )
        ))?.classList.toggle("d-none", !canShow);
        (<HTMLInputElement>(
          document.querySelector(
            `[data-tranferbtn='${this.pageCount}'].next-section`
          )
        ))?.classList.toggle("d-none", canShow);
        break;
      default:
        console.log(
          document.querySelector(
            `[data-tranferbtn='${this.pageCount}'].next-section`
          )
        );
        (<HTMLInputElement>(
          document.querySelector(
            `[data-tranferbtn='${this.pageCount}'].next-section`
          )
        ))?.classList.toggle("d-none", !noneChecked);
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
        (<HTMLElement>(
          document.querySelector(`[data-tranferpage='${this.pageCount}']`)
        )).classList.add("d-none");
        if ((<Element>e.target).matches(".prev-section")) {
          (<HTMLElement>(
            document.querySelector(`[data-transferstep='${this.pageCount}']`)
          )).classList.remove("active");
          this.pageCount--;
          (<HTMLElement>(
            document.querySelector(`[data-transferstep='${this.pageCount}']`)
          )).classList.replace("completed", "active");
        } else {
          (<HTMLElement>(
            document.querySelector(`[data-transferstep='${this.pageCount}']`)
          )).classList.replace("active", "completed");
          this.pageCount++;
        }
        (<HTMLElement>(
          document.querySelector(`[data-transferstep='${this.pageCount}']`)
        )).classList?.add("active");
        (<HTMLElement>(
          document.querySelector(`[data-tranferpage='${this.pageCount}']`)
        ))?.classList.remove("d-none");
      });
    });
  }
}
