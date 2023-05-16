import { useSpeechSynthesis } from 'react-speech-kit';

export const useSpeech = () => {
  const { speak } = useSpeechSynthesis()

  const speakHandler = (text: string) => {
    speak({ text });
  }

  return ([speakHandler]);
};