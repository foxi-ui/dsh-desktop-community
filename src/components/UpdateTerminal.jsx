import React from 'react'

/* 模拟「应用内一键更新」的终端视觉 */
export default function UpdateTerminal() {
  return (
    <div className="ut-window">
      <div className="ut-titlebar">
        <div className="ut-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="ut-title">检查更新 · DeepSeek Harness Desktop</span>
      </div>

      <div className="ut-body">
        <div className="ut-line">
          <span className="ut-prompt">$</span>
          <span className="ut-cmd">dsh --version</span>
        </div>
        <div className="ut-line ut-dim">0.1.0-rc.7 (node v24.0.0, electron 43)</div>

        <div className="ut-line ut-gap">
          <span className="ut-prompt">›</span>
          <span className="ut-cmd">检查更新… (deepseek-ai/deepseek-harness)</span>
        </div>
        <div className="ut-line ut-ok">
          <span className="ut-ok-mark">✓</span>
          发现新版本 <span className="ut-hl">0.1.1-rc.1</span> — 是否拉取并更新？
        </div>

        <div className="ut-line ut-gap">
          <span className="ut-prompt">›</span>
          <span className="ut-cmd">git pull --ff-only</span>
        </div>
        <div className="ut-line ut-ok">
          <span className="ut-ok-mark">✓</span>
          Fast-forward: +48 files, −12 files
        </div>

        <div className="ut-line ut-gap">
          <span className="ut-prompt">›</span>
          <span className="ut-cmd">pnpm install</span>
        </div>
        <div className="ut-line ut-ok">
          <span className="ut-ok-mark">✓</span>
          依赖已同步 (3s)
        </div>

        <div className="ut-line ut-gap">
          <span className="ut-prompt">›</span>
          <span className="ut-cmd">重新打包…</span>
        </div>
        <div className="ut-line ut-ok">
          <span className="ut-ok-mark">✓</span>
          更新完成，重启后生效
        </div>

        <div className="ut-line ut-cursor">
          <span className="ut-prompt">$</span>
          <span className="ut-block" />
        </div>
      </div>
    </div>
  )
}
