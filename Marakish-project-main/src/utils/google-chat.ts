const WEBHOOK_URL =
  'https://chat.googleapis.com/v1/spaces/AAQAsZNmmjY/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=9yzf11it7EWmUvCczJyGi-dXMD7-l3eQKvITlNSPxQk';

export interface CardSectionWidget {
  keyValue?: {
    topLabel?: string;
    content: string;
    bottomLabel?: string;
    icon?: string;
  };
  textParagraph?: {
    text: string;
  };
  buttons?: Array<{
    textButton: {
      text: string;
      onClick: {
        openLink: {
          url: string;
        };
      };
    };
  }>;
}

export interface CardSection {
  header?: string;
  widgets: CardSectionWidget[];
}

export interface GoogleChatCard {
  header: {
    title: string;
    subtitle?: string;
    imageUrl?: string;
    imageStyle?: 'IMAGE' | 'AVATAR';
  };
  sections: CardSection[];
}

export const sendGoogleChatNotification = async (card: GoogleChatCard) => {
  try {
    console.log('📤 Sending Google Chat notification:', card.header.title);

    // Google Chat webhooks require cardsV2 format
    const payload = {
      cardsV2: [
        {
          cardId: `card-${Date.now()}`,
          card,
        },
      ],
    };

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Google Chat API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      return false;
    }

    console.log('✅ Google Chat notification sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to send Google Chat notification:', error);
    return false;
  }
};

export const formatCurrency = (amount: number) =>
  `AED ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
