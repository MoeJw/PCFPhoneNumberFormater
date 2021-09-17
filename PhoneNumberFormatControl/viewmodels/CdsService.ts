export class CdsService {
  static serviceProviderName = "CdsService";
  context: ComponentFramework.Context<unknown>;
  config: { countryCode: string | undefined; phoneNumber: string | undefined };
  constructor(
    context: ComponentFramework.Context<unknown>,
      config: { countryCode: string | undefined; phoneNumber: string | undefined, doNotContact: boolean | undefined, entityLogicalName: string | undefined ,id:string | undefined,entityLogicalFieldName:string | undefined},
  ) {
    this.context = context;
    this.config = config;
  }
}
