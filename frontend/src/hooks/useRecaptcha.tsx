import { useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const verifyRecaptcha = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return null;
    }
    try {
      const token = await executeRecaptcha('submit_contact_form');
      return token;
    } catch (error) {
      console.error('reCAPTCHA verification failed:', error);
      return null;
    }
  }, [executeRecaptcha]);

  return { verifyRecaptcha };
};

export default useRecaptcha;