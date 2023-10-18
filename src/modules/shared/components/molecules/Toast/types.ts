export interface ToastData {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
}
