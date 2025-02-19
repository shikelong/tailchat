import React from 'react';
import { regGroupPanel, useCurrentGroupPanelInfo } from '@capital/common';

const PLUGIN_NAME = 'com.msgbyte.webview';

const GroupWebPanelRender = () => {
  const groupPanelInfo = useCurrentGroupPanelInfo();

  if (!groupPanelInfo) {
    return <div>加载失败, 面板信息不存在</div>;
  }

  const url = groupPanelInfo.meta?.url;

  return (
    <iframe key={String(url)} className="w-full h-full bg-white" src={url} />
  );
};

regGroupPanel({
  name: `${PLUGIN_NAME}/grouppanel`,
  label: '网页面板',
  provider: PLUGIN_NAME,
  extraFormMeta: [{ type: 'text', name: 'url', label: '网址' }],
  render: GroupWebPanelRender,
});
