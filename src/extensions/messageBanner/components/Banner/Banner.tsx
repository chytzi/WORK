/*
import * as React from 'react';
const { useState, useEffect } = React;
import { IBannerProps } from './IBannerProps';
import styles from './Banner.module.scss';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import BannerPanel from '../BannerPanel/BannerPanel';
import * as strings from 'MessageBannerApplicationCustomizerStrings';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { SPPermission } from '@microsoft/sp-page-context';
import isPast from 'date-fns/isPast';
import formatDate from 'date-fns/format';
import { Text } from '@microsoft/sp-core-library';

import { DEFAULT_PROPERTIES } from '../../../../models/IMessageBannerProperties';
import { IHostProperties } from '../../../../models/IHostProperties';


const BANNER_CONTAINER_ID = 'CustomMessageBannerContainer';

const Banner = (props: IBannerProps) => {
  const [defaultSettings, setDefaultSettings] = useState(props.settings);
  const [settings, setSettings] = useState(props.settings);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Adjust pre allocated parent container height for previewing
    if (props.settings.enableSetPreAllocatedTopHeight) {
      document.getElementById(BANNER_CONTAINER_ID).parentElement.style.height = `${settings.bannerHeightPx}px`;
    }
  }, [settings.bannerHeightPx]);

  const visibleStartDate = settings.visibleStartDate ? new Date(settings.visibleStartDate) : null;
  const isPastVisibleStartDate = settings.visibleStartDate && isPast(visibleStartDate);
  const isCurrentUserAdmin = props.context.pageContext.web.permissions.hasPermission(SPPermission.manageWeb);

  const handleOpenClick = (): void => {
    setIsPanelOpen(true);
  };

  const handleCancelOrDismiss = (): void => {
    if (!isSaving) {
      setIsPanelOpen(false);
      setSettings(defaultSettings); //return to original settings
    }
  };

  const handleSave = async (): Promise<void> => {
    try {
      setIsSaving(true);
      const hostProperties : IHostProperties = {};
      // Set host property 'preAllocatedApplicationCustomizerTopHeight' when saving custom action properties
      if (props.settings.enableSetPreAllocatedTopHeight) {
          hostProperties.preAllocatedApplicationCustomizerTopHeight = settings.bannerHeightPx;
      }
      await props.clientSideComponentService.setProperties(settings, hostProperties);
      setIsPanelOpen(false);
      setIsSaving(false);
      setDefaultSettings(settings);
    }
    catch (error) {
      console.log(`Unable to set custom action properties. ${error.message}`, error);
    }
  };

  const handleFieldChange = (newSetting: {[ key: string ]: unknown }): void => {
    const newSettings = { ...settings, ...newSetting };
    setSettings(newSettings);
  };

  const resetToDefaults = (): void => {
    const mergedDefaultSettings = { ...settings, ...DEFAULT_PROPERTIES };
    setSettings(mergedDefaultSettings);
  };

  const parseTokens = (textWithTokens: string, context: BaseComponentContext): string => {
    const tokens = [
      { token: '{siteUrl}', value: context.pageContext.site.absoluteUrl },
      { token: '{webUrl}', value: context.pageContext.web.absoluteUrl },
    ];

    const outputText = tokens.reduce((text, tokenItem) => {
      return text.replace(tokenItem.token, tokenItem.value);
    }, textWithTokens);

    return outputText;
  };


  //If there is a future start date and it hasn't yet occurred,
  // and either the current user isn't an admin or the user is an admin but the disableSiteAdminUI flag is set,
  // then render nothing
  if (visibleStartDate && !isPastVisibleStartDate && (!isCurrentUserAdmin || settings.disableSiteAdminUI)) return null;

  return (
    <div id={BANNER_CONTAINER_ID} style={{ backgroundColor: settings.backgroundColor }}>
      <div className={styles.BannerContainer} style={{ height: settings.bannerHeightPx }}>
        {!settings.disableSiteAdminUI && isCurrentUserAdmin && !!visibleStartDate && (isPastVisibleStartDate
          ? <div className={styles.AdminUserVisibilityBadge}>{strings.BannerBadgeIsVisibleToUsersMessage}</div>
          : <div className={styles.AdminUserVisibilityBadge}>{Text.format(strings.BannerBadgeNotVisibleToUsersMessage, formatDate(visibleStartDate, 'PPPP'))}</div>
        )}
                <div className={styles.BannerContent}>
          {!!(settings.iconName && settings.iconName.trim()) && (
            <Icon
              iconName={settings.iconName.trim()}
              className={styles.BannerIcon}
              styles={{ root: { color: settings.textColor } }}
            />
          )}

          {!!(settings.imageUrl && settings.imageUrl.trim()) && (
            settings.imageLinkUrl && settings.imageLinkUrl.trim()
              ? (
                <a
                  className={styles.BannerImageLink}
                  href={parseTokens(settings.imageLinkUrl, props.context)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={styles.BannerImage}
                    src={parseTokens(settings.imageUrl, props.context)}
                    alt={settings.imageAltText || ''}
                  />
                </a>
              )
              : (
                <img
                  className={styles.BannerImage}
                  src={parseTokens(settings.imageUrl, props.context)}
                  alt={settings.imageAltText || ''}
                />
              )
          )}

          <div
            className={styles.BannerMessage}
            dangerouslySetInnerHTML={{__html: parseTokens(settings.message, props.context)}}
            style={{ color: settings.textColor, fontSize: settings.textFontSizePx }}
          />
        </div>
        {}
          {!settings.disableSiteAdminUI && isCurrentUserAdmin && (
            <IconButton
              className={styles.EditButtonIcon}
              iconProps={{ iconName: 'Edit' }}
              onClick={handleOpenClick}
            />
          )}

          {}
          {!settings.disableSiteAdminUI && (
            <BannerPanel
              settings={settings}
              isOpen={isPanelOpen}
              isSaving={isSaving}
              onSave={handleSave}
              onCancelOrDismiss={handleCancelOrDismiss}
              onFieldChange={handleFieldChange}
              resetToDefaults={resetToDefaults}
            />
          )}
    </div>
    </div>
  );
  
};

export default Banner; 
*/

import * as React from 'react';
const { useState } = React;

import { IBannerProps } from './IBannerProps';
import styles from './Banner.module.scss';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import BannerPanel from '../BannerPanel/BannerPanel';

import { BaseComponentContext } from '@microsoft/sp-component-base';
import { SPPermission } from '@microsoft/sp-page-context';

import { DEFAULT_PROPERTIES } from '../../../../models/IMessageBannerProperties';

const BANNER_CONTAINER_ID = 'CustomMessageBannerContainer';
const FIXED_HEIGHT_PX = 48;

const Banner = (props: IBannerProps) => {
  const [defaultSettings, setDefaultSettings] = useState(props.settings);
  const [settings, setSettings] = useState(props.settings);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isCurrentUserAdmin = props.context.pageContext.web.permissions.hasPermission(SPPermission.manageWeb);

  //const handleOpenClick = (): void => setIsPanelOpen(true);
  const handleOpenClick = (): void => setIsPanelOpen(prev => !prev);

  const handleCancelOrDismiss = (): void => {
    if (!isSaving) {
      setIsPanelOpen(false);
      setSettings(defaultSettings);
    }
  };

  const handleSave = async (): Promise<void> => {
    try {
      setIsSaving(true);
      await props.clientSideComponentService.setProperties(settings);
      setIsPanelOpen(false);
      setDefaultSettings(settings);
    } catch (error: any) {
      console.log(`Unable to set custom action properties. ${error?.message}`, error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFieldChange = (newSetting: { [key: string]: unknown }): void => {
    setSettings({ ...settings, ...newSetting });
  };

  const resetToDefaults = (): void => {
    setSettings({ ...settings, ...DEFAULT_PROPERTIES });
  };

  const parseTokens = (textWithTokens: string, context: BaseComponentContext): string => {
    const tokens = [
      { token: '{siteUrl}', value: context.pageContext.site.absoluteUrl },
      { token: '{webUrl}', value: context.pageContext.web.absoluteUrl },
    ];

    return tokens.reduce((text, tokenItem) => text.replace(tokenItem.token, tokenItem.value), textWithTokens);
  };

  const imageUrl = (settings.imageUrl || '').trim();
  const imageLinkUrl = (settings.imageLinkUrl || '').trim();
  const alt = settings.imageAltText || '';
  const text = (settings.text || '').trim();

  // אם אין תמונה וטקסט, משתמש רגיל לא רואה כלום; אדמין כן (כדי שיוכל לערוך עם העיפרון)
  if (!imageUrl && !text && !isCurrentUserAdmin) return null;

  return (
    <div id={BANNER_CONTAINER_ID}>
      <div className={styles.BannerContainer}>
        <div className={styles.BannerRow}>
        <div className={styles.ImageWrap}>
          {imageUrl && (
            imageLinkUrl ? (
              <a
                href={parseTokens(imageLinkUrl, props.context)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.BannerImageLink}
              >
                <img
                  className={styles.BannerImage}
                  src={parseTokens(imageUrl, props.context)}
                  alt={alt}
                />
              </a>
            ) : (
              <img
                className={styles.BannerImage}
                src={parseTokens(imageUrl, props.context)}
                alt={alt}
              />
            )
          )}
          {!!text && (
            <span className={styles.BannerText}>
              {parseTokens(text, props.context)}
            </span>
          )}
          {isCurrentUserAdmin && (
            <IconButton
              className={styles.EditButtonIcon}
              iconProps={{ iconName: 'Edit' }}
              onClick={handleOpenClick}
            />
          )}
        </div>
          
        </div>
        

        {isCurrentUserAdmin && (
          <BannerPanel
            context={props.context}
            settings={settings}
            isOpen={isPanelOpen}
            isSaving={isSaving}
            onSave={handleSave}
            onCancelOrDismiss={handleCancelOrDismiss}
            onFieldChange={handleFieldChange}
            resetToDefaults={resetToDefaults}
          />
        )}
      </div>
    </div>
  );
};

export default Banner;
/*
{imageUrl && (
          imageLinkUrl ? (
            <a
              href={parseTokens(imageLinkUrl, props.context)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img
                src={parseTokens(imageUrl, props.context)}
                alt={alt}
                style={{ height: 32, width: 'auto', cursor: 'pointer' }}
              />
            </a>
          ) : (
            <img
              src={parseTokens(imageUrl, props.context)}
              alt={alt}
              style={{ height: 32, width: 'auto' }}
            />
          )
        )}

        {isCurrentUserAdmin && (
          <IconButton
            className={styles.EditButtonIcon}
            iconProps={{ iconName: 'Edit' }}
            onClick={handleOpenClick}
          />
        )}




        _________________________________________________
        
        {imageUrl && (
          imageLinkUrl ? (
            <a
              href={parseTokens(imageLinkUrl, props.context)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img
                src={parseTokens(imageUrl, props.context)}
                alt={alt}
                style={{ height: 32, width: 'auto', cursor: 'pointer' }}
              />
            </a>
          ) : (
            <img
              src={parseTokens(imageUrl, props.context)}
              alt={alt}
              style={{ height: 32, width: 'auto' }}
            />
          )
        )}

        {isCurrentUserAdmin && (
          <IconButton
            className={styles.EditButtonIcon}
            iconProps={{ iconName: 'Edit' }}
            onClick={handleOpenClick}
          />
        )}

*/