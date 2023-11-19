import axios from 'axios';
import { Env } from 'env';
import { getDeviceId, getSystemVersion } from 'react-native-device-info';

const splitMessages = (message: string, maxCharacters = 1024) => {
  const messages = [];

  while (message.length > maxCharacters) {
    messages.push(message.slice(0, maxCharacters));
    message = message.slice(maxCharacters);
  }

  messages.push(message);

  return messages;
};

export const reportErrorToDiscord = async (errorMessage: string) => {
  if (!Env.REPORT_WEBHOOK) return;

  const messages = splitMessages(errorMessage);

  const deviceId = getDeviceId();
  const systemVersion = getSystemVersion();

  const deviceEmbed = {
    title: 'Device Info',
    description: `
Device ID: ${deviceId}
System Version: ${systemVersion}
App Version: ${Env.VERSION}
    `,
  };

  const embeds = messages.slice(0, 9).map((message, index) => ({
    title: `Error Report ${index + 1}`,
    description: message,
    color: 16711680, // Red color
  }));

  await axios.post(Env.REPORT_WEBHOOK, {
    embeds: [deviceEmbed, ...embeds],
  });
};
