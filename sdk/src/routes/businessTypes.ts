import * as businessSdk from "./business";

export interface DropDownPickerItem {
  label: string; // The text displayed in the dropdown
  value: any; // The unique value associated with the item
}

export const getBusinessTypesForDropDown = async (): Promise<
  DropDownPickerItem[] | undefined
> => {
  const response = await businessSdk.getBusinessTypes();

  if ("error" in response) {
    return;
  }

  if (response.status === 200) {
    const businessTypes: DropDownPickerItem[] = [];

    response.json.forEach((item) => {
      const label = item.name.charAt(0).toUpperCase() + item.name.slice(1);
      const type: DropDownPickerItem = {
        label,
        value: item.name,
      };
      businessTypes.push(type);
    });

    businessTypes.push({ label: "Anything", value: "any" });
    return businessTypes;
  }
};
