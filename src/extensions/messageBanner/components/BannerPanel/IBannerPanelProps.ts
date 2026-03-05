import { IMessageBannerProperties } from "../../../../models/IMessageBannerProperties";
import { BaseComponentContext } from '@microsoft/sp-component-base';

export interface IBannerPanelProps {
  context: BaseComponentContext;
  settings: IMessageBannerProperties;
  isOpen: boolean;
  isSaving: boolean;
  onSave: () => Promise<void>;
  onCancelOrDismiss: () => void;
  onFieldChange: (newSetting: {[ key: string ]: unknown }) => void;
  resetToDefaults: () => void;
}
