class RetirementWidget {
  private dobFull: HTMLInputElement;
  private dobValidation: HTMLElement;
  private dobInputs: NodeListOf<Element>;
  private benefitOptions: NodeListOf<HTMLInputElement>;
  private estimateNotification: HTMLElement;
  private benefitForm: HTMLFormElement;

  constructor(private widgetId: string) {
    this.init();
  }
  private init(): void {
    this.dobValidation = document.getElementById(
      `date-of-birth-validation-${this.widgetId}`
    ) as HTMLElement;

    this.estimateNotification = document.getElementById(
      `estimate-notification-${this.widgetId}`
    ) as HTMLElement;

    this.benefitOptions = document.querySelectorAll(
      'input[name="request-estimate"]'
    ) as NodeListOf<HTMLInputElement>;

    this.dobFull = document.getElementById(
      `date-of-birth-hidden-${this.widgetId}`
    ) as HTMLInputElement;

    this.dobInputs = document.querySelectorAll(
      ".dob-single-part"
    ) as NodeListOf<Element>;

    this.benefitForm = document.getElementById(
      `benefit-form-${this.widgetId}`
    ) as HTMLFormElement;

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
    this.benefitForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.dobFull.value && this.validateDOB(this.dobFull.value)) {
        this.benefitForm.submit();
        return true;
      } else {
        this.dobValidation.classList.toggle("d-none", false);
        document.querySelectorAll(".dob-single-part").forEach((dob) => {
          dob.classList.toggle("is-invalid", true);
        });
        return false;
      }
    });

    this.benefitOptions.forEach((node) => {
      node.addEventListener("click", () => {
        const isTrue: boolean =
          document.querySelector<HTMLInputElement>(
            `input[name="request-estimate"]:checked`
          ).value == "Yes";
        this.estimateNotification.classList.toggle("d-none", isTrue);
      });
    });

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

        if (day && month && year)
          this.dobFull.value = day + "/" + month + "/" + year;
      });
    });
  }
}
