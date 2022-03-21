export class MailModel {
    constructor(
      public from?: string,
      public to?: string,
      public subject?: string,
      public message?: string,
      public isHtml?: boolean
    ) {}
  }