

// ----------------------------------------------------------------------

export type NotificationType =
  | 'vehicle-purchase'
  | 'vehicle-sale'
  | 'vehicle-status'
  | 'vehicle-expense'
  | 'parking-move'
  | 'bank-transaction';

interface AddNotificationProps {
  title: string;
  description: string;
  type: NotificationType;
}

export async function addNotification({ title, description, type }: AddNotificationProps) {
  // Notifications are disabled as per requirements.
  return;
}

function getAvatarUrl(type: NotificationType): string {
  switch (type) {
    case 'vehicle-purchase':
      return '/assets/icons/notification/ic-notification-package.svg';
    case 'vehicle-sale':
      return '/assets/icons/notification/ic-notification-shipping.svg';
    case 'vehicle-status':
      return '/assets/icons/notification/ic-notification-chat.svg';
    case 'vehicle-expense':
      return '/assets/icons/notification/ic-notification-mail.svg';
    case 'parking-move':
      return '/assets/icons/notification/ic-notification-chat.svg';
    default:
      return '/assets/icons/notification/ic-notification-chat.svg';
  }
}
