// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import { _AttachmentCard, _AttachmentCardProps } from './AttachmentCard';
import { render, screen } from '@testing-library/react';
import { Icon, registerIcons } from '@fluentui/react';

describe('AttachmentCard should be rendered properly', () => {
  beforeEach(() => {
    registerIcons({
      icons: {
        docx24_svg: <></>,
        cancelattachmentupload: <></>
      }
    });
  });

  it('should render the component', () => {
    renderAttachmentCardWithDefaults();
    expect(screen.getByText('MockAttachmentCard')).toBeDefined();
  });

  it('should render the component with progress bar', () => {
    renderAttachmentCardWithDefaults({ progress: 0.5 });
    const progressIndicator = screen.getByRole('progressbar');
    const progressBar = progressIndicator.firstElementChild as HTMLElement;
    expect(progressBar.style.width).toContain('50%');
  });

  it('should render the component with action icon', () => {
    renderAttachmentCardWithDefaults({
      actionIcon: <Icon iconName="CancelFileUpload" />
    });

    const button = screen.getAllByRole('button');
    expect(button.length).toBe(1);
  });
});

describe('AttachmentCard action handler should be called', () => {
  beforeEach(() => {
    registerIcons({
      icons: {
        docx24_svg: <></>,
        cancelfileupload: <></>
      }
    });
  });

  it('should call the action handler when action icon is clicked', () => {
    const actionHandler = jest.fn();
    renderAttachmentCardWithDefaults({
      actionIcon: <Icon iconName="CancelFileUpload" />,
      actionHandler: actionHandler
    });

    const button = screen.getAllByRole('button')[0];
    button.click();
    expect(actionHandler).toHaveBeenCalledTimes(1);
  });
});

const renderAttachmentCardWithDefaults = (props?: Partial<_AttachmentCardProps>): void => {
  const mergedProps: _AttachmentCardProps = {
    attachmentName: 'MockAttachmentCard',
    attachmentExtension: 'docx',
    ...(props ?? {})
  };

  render(<_AttachmentCard {...mergedProps} />);
};
