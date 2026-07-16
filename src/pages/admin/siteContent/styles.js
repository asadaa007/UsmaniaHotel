// Re-exports the shared dashboard theme under the names the siteContent editors already use,
// so those files don't need their imports touched every time the theme changes.
import { fieldStyle, labelStyle, cardStyle, primaryButtonStyle, dangerButtonStyle } from '../adminTheme';

export { fieldStyle, labelStyle, cardStyle, dangerButtonStyle };
export const saveButtonStyle = primaryButtonStyle;
export const addButtonStyle = primaryButtonStyle;
