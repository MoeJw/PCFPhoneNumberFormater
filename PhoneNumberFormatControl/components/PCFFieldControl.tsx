/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { ServiceProvider } from "./pcf-react/ServiceProvider";
import { PhoneNumberFormatControlVM } from "../viewmodels/PhoneNumberFormatControlVM";
import { ServiceProviderContext } from "../viewmodels/context";
import { Stack, IconButton, IIconProps } from "@fluentui/react";
import { TextInput } from "./pcf-fluent-ui/TextInput";
import { OptionSetInput } from "./pcf-fluent-ui/OptionSetInput";
import { observer } from "mobx-react";

export interface PCFFieldControlProps {
  controlWidth?: number;
  controlHeight?: number;
    serviceProvider: ServiceProvider;
    context: ComponentFramework.Context<unknown>; 
}
export interface PCFFieldControlState {
  hasError: boolean;
}

export class PCFFieldControl extends React.Component<PCFFieldControlProps, PCFFieldControlState> {
  vm: PhoneNumberFormatControlVM;
  constructor(props: PCFFieldControlProps) {
    super(props);
    this.vm = props.serviceProvider.get<PhoneNumberFormatControlVM>("ViewModel");
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any): PCFFieldControlState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render(): JSX.Element {
    const {
        countryCodeIndex,
        countryCode,
        phoneNumber,
        doNotContact,
        entityLogicalName,
        entityLogicalFieldName,
        id,
      countryCodeOptions,
      samplePhoneNumber,
      isValidPhoneNumber,
      isRequired,
      onPhoneNumberChanged,
      onCountryCodeChanged,
      } = this.vm;
     
      const callIcon: IIconProps = { iconName: "Phone" };
      const phoneCallIconClick =async () => {
          const entityFormOption: any = {
              entityName : "phonecall",
              useQuickCreateForm : true

          }
          var entityRef = null;
      
          if(id !=null &&  id !=undefined && entityLogicalName != null ){
           let PrimaryEntity=await this.props.context.webAPI.retrieveRecord(entityLogicalName ,id);
           let fieldName = entityLogicalFieldName != null ?PrimaryEntity[entityLogicalFieldName] : ""
            entityRef= [{entityType:entityLogicalName,id,name:fieldName}]
          }

           
          
          const formParameters: any = {
              phonenumber: phoneNumber ,
              dc_countrycode: countryCode,
              to:entityRef,
              regardingobjectid:entityRef


          }
          this.props.context.navigation.openForm(entityFormOption, formParameters);

      };
    const phoneRef: string = "tel:" + phoneNumber;
    return this.state.hasError ? (
      <>Error</>
    ) : (
      <ServiceProviderContext.Provider value={this.props.serviceProvider}>
        <Stack>
          <Stack horizontal tokens={{ maxWidth: 230, childrenGap: 2 }}>
            <Stack.Item>
              <OptionSetInput value={countryCodeIndex} options={countryCodeOptions} onChange={onCountryCodeChanged} />
            </Stack.Item>
            <Stack.Item>
              <Stack horizontal tokens={{ childrenGap: 2 }}>
                <TextInput
                  value={phoneNumber}
                  //placeholder={samplePhoneNumber}
                  onChange={onPhoneNumberChanged}
                  isRequired={isRequired}
                ></TextInput>
                <IconButton
                  iconProps={callIcon}
                  onClick={phoneCallIconClick}
                  title="Click To Call"
                  aria-label="ClickToCall"
                  disabled={ doNotContact || !isValidPhoneNumber  }
                  href={phoneRef}
                ></IconButton>
              </Stack>
            </Stack.Item>
          </Stack>
         
        </Stack>
      </ServiceProviderContext.Provider>
    );
  }
}

observer(PCFFieldControl);
