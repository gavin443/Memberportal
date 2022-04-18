class TransferOutWidget {
  private maxPensionablePayInput: HTMLInputElement;
  private nextSection: NodeListOf<Element>;
  private pageCount = 0;

  constructor(private widgetId: string) {
    this.init();
  }

  private init(): void {
    this.maxPensionablePayInput = document.getElementById(
      `max-pensionable-pay-input-${this.widgetId}`
    ) as HTMLInputElement;
    this.nextSection = document.querySelectorAll(
      ".next-section"
    ) as NodeListOf<Element>;
    this.setupListeners();
  }

  private setupListeners(): void {
    //this.maxPensionablePayInput.addEventListener("input", () => {});
    this.nextSection.forEach((node) => {
      node.addEventListener("click", () => {
        (<HTMLElement>(
          document.querySelector(`[data-tranferpage='${this.pageCount}']`)
        )).classList.add("d-none");
        (<HTMLElement>(
          document.querySelector(`[data-tranferpage='${this.pageCount + 1}']`)
        )).classList.remove("d-none");
        (<HTMLElement>(
          document.querySelector(`[data-transferstep='${this.pageCount}']`)
        )).classList.replace("active", "completed");
        (<HTMLElement>(
          document.querySelector(`[data-transferstep='${this.pageCount + 1}']`)
        )).classList.add("active");
        this.pageCount++;
      });
    });
  }
}
