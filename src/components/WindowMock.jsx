import React from 'react'
import { SparkIcon, TerminalIcon, ArrowUpRightIcon } from './Icons'

/* 模拟 dsh Web UI 的桌面窗口（纯 CSS 绘制） */
export default function WindowMock() {
  return (
    <div className="wm-window">
      {/* 标题栏 */}
      <div className="wm-titlebar">
        <div className="wm-dots">
          <span className="wm-dot wm-dot-red" />
          <span className="wm-dot wm-dot-yellow" />
          <span className="wm-dot wm-dot-green" />
        </div>
        <div className="wm-url">
          <span className="wm-url-dot" />
          localhost · DeepSeek Harness Desktop
        </div>
        <div className="wm-titlebar-spacer" />
      </div>

      <div className="wm-body">
        {/* 侧边栏 */}
        <aside className="wm-sidebar">
          <div className="wm-logo">
            <img src="/icon.png" alt="" />
            <span className="wm-logo-text">
              DeepSeek
              <br />
              Harness
            </span>
          </div>

          <nav className="wm-nav">
            <div className="wm-nav-item is-active">
              <SparkIcon width={14} height={14} />
              <span>新会话</span>
              <span className="wm-kbd">⌘N</span>
            </div>
            <div className="wm-nav-item">
              <TerminalIcon width={14} height={14} />
              <span>终端</span>
            </div>
            <div className="wm-nav-item">
              <span className="wm-nav-ic">▦</span>
              <span>插件</span>
            </div>
            <div className="wm-nav-item">
              <span className="wm-nav-ic">⚙</span>
              <span>设置</span>
            </div>
          </nav>

          <div className="wm-sidebar-foot">
            <div className="wm-avatar">DS</div>
            <div className="wm-user">
              <span className="wm-user-name">dsh-desktop</span>
              <span className="wm-user-status">v0.1.0</span>
            </div>
          </div>
        </aside>

        {/* 主区域 */}
        <main className="wm-main">
          <div className="wm-main-head">
            <div className="wm-model">
              <span className="wm-model-dot" />
              标准模式 · dsh 0.1.0-rc.7
            </div>
            <div className="wm-head-actions">
              <span className="wm-pill">Trajectory</span>
              <span className="wm-pill wm-pill-ghost">分享</span>
            </div>
          </div>

          <div className="wm-chat">
            <div className="wm-msg wm-user">
              <div className="wm-bubble wm-bubble-user">
                用 Python 分析一下本目录的代码行数分布，并按文件类型生成一份统计表。
              </div>
            </div>

            <div className="wm-msg">
              <div className="wm-avatar wm-avatar-ai">⌘</div>
              <div className="wm-msg-content">
                <div className="wm-tool-call">
                  <div className="wm-tool-head">
                    <span className="wm-tool-ic">⚡</span>
                    <span>工具调用 · bash</span>
                    <span className="wm-tool-status">完成</span>
                  </div>
                  <pre className="wm-tool-code">{`$ find . -type f | grep -E '\\.(js|ts|py)$' | xargs wc -l`}</pre>
                </div>

                <div className="wm-bubble">
                  <p>分析完成。按文件类型统计结果如下：</p>
                  <pre className="wm-table">
{`类型      文件数    代码行数
.ts       128      18,432
.js       46       5,204
.py       12       1,877`}
                  </pre>
                  <p className="wm-bubble-foot">
                    已生成 <span className="wm-link">line-stats.md</span>，并将图表保存到工作区。
                  </p>
                </div>
              </div>
            </div>

            <div className="wm-typing">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="wm-input">
            <span className="wm-input-plus">＋</span>
            <span className="wm-input-text">输入消息，@ 引用文件，/ 选择技能…</span>
            <span className="wm-input-send">↑</span>
          </div>
        </main>
      </div>
    </div>
  )
}
