import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { doc, query, orderBy, updateDoc, collection, onSnapshot } from 'firebase/firestore';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import { fToNow } from 'src/utils/format-time';

import { db } from 'src/firebase';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

interface Notification {
  id: string;
  title: string;
  description: string;
  type: string;
  isUnRead: boolean;
  postedAt: any;
  avatarUrl?: string;
}

export function NotificationsView() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    const q = query(collection(db, 'notifications'), orderBy('postedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        postedAt: docSnap.data().postedAt?.toDate ? docSnap.data().postedAt.toDate() : docSnap.data().postedAt,
      })) as Notification[];
      setNotifications(data);
    });
    return () => unsubscribe();
  }, []);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, { isUnRead: false });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'unread') {
      return notification.isUnRead;
    }
    return true;
  });

  const unreadCount = notifications.filter((n) => n.isUnRead).length;

  return (
    <DashboardContent maxWidth="md">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h4">{t('notifications.title')}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            {unreadCount > 0
              ? t('notifications.unread', { count: unreadCount })
              : 'All caught up!'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant={filter === 'all' ? 'contained' : 'outlined'}
            color="inherit"
            onClick={() => setFilter('all')}
            size="small"
          >
            All ({notifications.length})
          </Button>
          <Button
            variant={filter === 'unread' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setFilter('unread')}
            size="small"
          >
            Unread ({unreadCount})
          </Button>
        </Box>
      </Box>

      <Card sx={{ display: 'flex', flexDirection: 'column' }}>
        <Scrollbar sx={{ maxHeight: 'calc(100vh - 250px)' }}>
          <List disablePadding>
            {filteredNotifications.map((notification, index) => (
              <Box key={notification.id}>
                <ListItemButton
                  onClick={() => {
                    if (notification.isUnRead) {
                      handleMarkAsRead(notification.id);
                    }
                  }}
                  sx={{
                    py: 2,
                    px: 3,
                    ...(notification.isUnRead && {
                      bgcolor: 'action.selected',
                      borderLeft: 4,
                      borderColor: 'primary.main',
                    }),
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: notification.isUnRead ? 'primary.lighter' : 'background.neutral' }}>
                      {renderIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2" sx={{ flex: 1 }}>
                          {notification.title}
                        </Typography>
                        {notification.isUnRead && (
                          <Chip
                            label="New"
                            size="small"
                            color="primary"
                            sx={{ height: 20, fontSize: '0.75rem' }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}
                        >
                          {notification.description}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            mt: 0.5,
                            gap: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            color: 'text.disabled',
                          }}
                        >
                          <Iconify width={14} icon="solar:clock-circle-outline" />
                          {fToNow(notification.postedAt)}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItemButton>
                {index !== filteredNotifications.length - 1 && <Divider sx={{ borderStyle: 'dashed' }} />}
              </Box>
            ))}

            {filteredNotifications.length === 0 && (
              <Box sx={{ py: 10, textAlign: 'center' }}>
                <Iconify
                  icon={"solar:bell-bing-bold-duotone" as any}
                  width={64}
                  sx={{ color: 'text.disabled', mb: 2 }}
                />
                <Typography variant="h6" color="text.secondary">
                  {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                </Typography>
                <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                  {filter === 'unread'
                    ? 'All caught up! You have no unread notifications.'
                    : 'Notifications will appear here when there are updates.'}
                </Typography>
              </Box>
            )}
          </List>
        </Scrollbar>
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

function renderIcon(type: string) {
  switch (type) {
    case 'vehicle-purchase':
      return <img alt="purchase" src="/assets/icons/notification/ic-notification-package.svg" />;
    case 'vehicle-sale':
      return <img alt="sale" src="/assets/icons/notification/ic-notification-shipping.svg" />;
    case 'vehicle-status':
      return <img alt="status" src="/assets/icons/notification/ic-notification-chat.svg" />;
    case 'vehicle-expense':
      return <img alt="expense" src="/assets/icons/notification/ic-notification-mail.svg" />;
    case 'parking-move':
      return <img alt="parking" src="/assets/icons/notification/ic-notification-chat.svg" />;
    default:
      return <img alt="default" src="/assets/icons/notification/ic-notification-chat.svg" />;
  }
}
