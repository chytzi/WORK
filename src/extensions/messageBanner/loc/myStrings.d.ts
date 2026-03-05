declare interface IMessageBannerApplicationCustomizerStrings {
  Title: string;
  BannerPanelHeaderText: string;

  BannerPanelFieldImageUrlLabel: string;
  BannerPanelFieldImageLinkUrlLabel: string;
  BannerPanelFieldImageAltTextLabel: string;

  BannerPanelButtonSaveText: string;
  BannerPanelButtonCancelText: string;
  BannerPanelButtonResetToDefaultsText: string;
}

declare module 'MessageBannerApplicationCustomizerStrings' {
  const strings: IMessageBannerApplicationCustomizerStrings;
  export = strings;
}