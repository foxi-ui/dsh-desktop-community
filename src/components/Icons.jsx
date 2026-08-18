/* 站点通用线性图标 */
import React from 'react'

const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const GitHubIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M8 1a7 7 0 0 0-2.21 13.65c.35.06.48-.15.48-.34v-1.2c-1.95.42-2.36-.94-2.36-.94-.32-.81-.78-1.03-.78-1.03-.63-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.63 1.07 1.64.76 2.04.58.06-.45.24-.76.44-.94-1.55-.18-3.19-.78-3.19-3.46 0-.76.27-1.39.72-1.88-.07-.18-.31-.9.07-1.87 0 0 .59-.19 1.93.72a6.7 6.7 0 0 1 3.52 0c1.34-.91 1.93-.72 1.93-.72.38.97.14 1.69.07 1.87.45.49.72 1.12.72 1.88 0 2.69-1.64 3.28-3.2 3.45.25.22.47.64.47 1.29v1.92c0 .19.13.4.48.34A7 7 0 0 0 8 1Z" />
  </svg>
)

export const DocIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 1.5h5.5L13 5v9.5H4z" />
    <path d="M9.5 1.5V5H13" />
    <path d="M6.5 8.5h3M6.5 11h3" />
  </svg>
)

export const PluginIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M8 5.5V1.5a1.5 1.5 0 1 0-3 0v4a1.5 1.5 0 0 1-1.5 1.5H1a1.5 1.5 0 0 0 0 3h2.5A1.5 1.5 0 0 1 5 11.5v4a1.5 1.5 0 0 0 3 0v-4a1.5 1.5 0 0 1 1.5-1.5H12a1.5 1.5 0 0 0 0-3H9.5A1.5 1.5 0 0 1 8 5.5Z" />
  </svg>
)

export const PaperIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M13.5 6.5v6a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h5z" />
    <path d="M10 1.5V6h4.5" />
  </svg>
)

export const DownloadIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M8 1v8.5" />
    <path d="M4.5 6.5 8 10l3.5-3.5" />
    <path d="M2 12.5v1A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5v-1" />
  </svg>
)

export const AppleIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M11.2 8.4c0-1.8 1.47-2.66 1.54-2.7-.84-1.23-2.15-1.4-2.61-1.42-1.11-.11-2.17.65-2.73.65-.56 0-1.44-.63-2.36-.62-1.21.02-2.33.7-2.95 1.79-1.26 2.19-.32 5.43.9 7.2.6.87 1.32 1.84 2.26 1.8.9-.04 1.25-.58 2.34-.58 1.1 0 1.4.58 2.36.56.98-.02 1.6-.88 2.2-1.75.69-1.01.98-2 .99-2.05-.02-.01-1.9-.73-1.94-2.88Z" />
    <path d="M9.6 3.06c.5-.6.83-1.44.74-2.28-.71.03-1.58.47-2.1 1.07-.46.53-.86 1.38-.75 2.19.79.06 1.6-.4 2.11-1Z" />
  </svg>
)

export const WindowsIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M1.5 3.6 7 2.8v5.05H1.5zM7.75 2.65 14.5 1.5v6.35H7.75zM1.5 8.6H7v5.05l-5.5-.8zM7.75 8.6h6.75V14.5L7.75 13.35z" />
  </svg>
)

export const LinuxIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M8 1.5c1.05 0 1.7.72 1.9 1.83.14.78.42 1.6.78 2.3l.24.46c.63 1.16 1.03 2.5 1.12 3.9.08 1.26-.4 2.12-1.34 2.71l-.02.9c-.24 1.26-.77 1.98-1.78 2.23-.53.13-1.08.17-1.62.17h-.56c-.54 0-1.09-.04-1.62-.17-1.01-.25-1.54-.97-1.78-2.23l-.02-.9c-.94-.59-1.42-1.45-1.34-2.71.09-1.4.49-2.74 1.12-3.9l.24-.46c.36-.7.64-1.52.78-2.3C6.3 2.22 6.95 1.5 8 1.5Z" />
    <path d="M5.5 11.5h5M5.5 13.5h5" />
    <circle cx="8" cy="5" r="1" />
    <circle cx="8" cy="7.2" r=".8" />
  </svg>
)

export const CopyIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="5" y="5" width="9" height="9" rx="1.5" />
    <path d="M2.5 11h-.5a1 1 0 0 1-1-1V2.5a1 1 0 0 1 1-1H10a1 1 0 0 1 1 1v.5" />
  </svg>
)

export const CheckIcon = (p) => (
  <svg {...base} {...p}>
    <path d="m3 8.5 3.2 3.2L13 4.5" />
  </svg>
)

export const MenuIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
  </svg>
)

export const CloseIcon = (p) => (
  <svg {...base} {...p}>
    <path d="m4 4 8 8M12 4l-8 8" />
  </svg>
)

export const ArrowUpRightIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" />
  </svg>
)

export const CursorIcon = (p) => (
  <svg {...base} {...p}>
    <path d="m4.5 2.5 7.5 6.3-3.3.8 1.8 3.9-2.4 1.1-1.8-3.9-3.4 3.3z" />
  </svg>
)

export const SparkIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M8 1.5c.55 3.5 2.2 5.15 5.7 5.7-3.5.55-5.15 2.2-5.7 5.7-.55-3.5-2.2-5.15-5.7-5.7 3.5-.55 5.15-2.2 5.7-5.7Z" />
  </svg>
)

export const RefreshIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" />
    <path d="M13.5 1.5v3h-3" />
  </svg>
)

export const FolderIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M1.5 4.5h13v8a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1z" />
    <path d="M1.5 6.5V3.5a1 1 0 0 1 1-1h3.3l1.6 2h6.1" />
  </svg>
)

export const TerminalIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" />
    <path d="m4.5 6 2.5 2-2.5 2M8.5 10h3" />
  </svg>
)

export const ChevronDownIcon = (p) => (
  <svg {...base} {...p}>
    <path d="m3.5 6 4.5 4.5L12.5 6" />
  </svg>
)

export const ShieldIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M8 1.5 13 3.5v4c0 3.6-2.2 6-5 7-2.8-1-5-3.4-5-7v-4z" />
    <path d="m5.5 8 1.7 1.7L10.5 6.5" />
  </svg>
)
