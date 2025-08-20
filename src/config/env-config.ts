const envConfig = {
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  VITE_STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  BASE_API: import.meta.env.VITE_BASE_API,
  GTM_ID: import.meta.env.VITE_GTM_ID,
};

export default Object.freeze(envConfig);
