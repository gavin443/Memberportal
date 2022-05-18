class RetirementWidget {
  private dobFull: HTMLInputElement;
  private dobValidation: HTMLElement;
  private dobInputs: NodeListOf<Element>;

  constructor(private widgetId: string) {
    this.init();
  }
  private init(): void {
    this.dobValidation = document.getElementById(
      `date-of-birth-validation-${this.widgetId}`
    ) as HTMLElement;

    this.dobFull = document.getElementById(
      `date-of-birth-hidden-${this.widgetId}`
    ) as HTMLInputElement;

    this.dobInputs = document.querySelectorAll(
      ".dob-single-part"
    ) as NodeListOf<Element>;
    this.setupListeners();
  }

  private validateDOB(dob: string): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const date = moment(dob, ["YYYY-MM-DD", "DD/MM/YYYY", "D/M/YYYY"], true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return date.isValid();
    // && date.isSameOrAfter(moment(), "day");
  }

  private setupListeners(): void {
    this.dobInputs.forEach((node) => {
      node.addEventListener("blur", () => {
        const day = (
          document.querySelector("[name='DateOfBirthDay']") as HTMLInputElement
        ).value;

        const month = (
          document.querySelector(
            "[name='DateOfBirthMonth']"
          ) as HTMLInputElement
        ).value;

        const year = (
          document.querySelector("[name='DateOfBirthYear']") as HTMLInputElement
        ).value;
        //validate date
        if (day && month && year) {
          this.dobFull.value = day + "/" + month + "/" + year;
          this.dobValidation.classList.toggle(
            "d-none",
            this.validateDOB(this.dobFull.value)
          );
          document.querySelectorAll(".dob-single-part").forEach((dob) => {
            dob.classList.toggle(
              "is-invalid",
              !this.validateDOB(this.dobFull.value)
            );
          });
        }
      });
    });
  }
}
